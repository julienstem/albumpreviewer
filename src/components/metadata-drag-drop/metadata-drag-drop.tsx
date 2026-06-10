import { useBuilder } from "../../context/builder-context/builder-context";
import type { Metadata } from "../../types/metadata";
import DragDrop from "../drag-drop/drag-drop";
import "./metadata-drag-drop.css";

const fileTypes = ["MP3", "FLAC", "OGG", "WAV", "AAC", "ALAC", "AIFF"];

function MetadataDragDrop() {
  const builderContext = useBuilder();
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const formatName = (name: string): string => {
    const parts = name.split(".");
    parts.pop();
    return parts.join();
  };

  const readMetadata = async (file: File): Promise<Metadata> => {
    const durationStr = await new Promise<string>((resolve) => {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);
      audio.addEventListener("loadedmetadata", () => {
        URL.revokeObjectURL(audio.src);
        resolve(formatDuration(audio.duration));
      });
      audio.addEventListener("error", () => resolve("0:00"));
    });

    const metadata: Metadata = {
      title: formatName(file.name),
      duration: durationStr,
    };
    return metadata;
  };
  const handleNewFiles = async (fileList: File[]) => {
    const filesArray = Array.from(fileList);

    const promiseList = filesArray.map((file) => {
      return readMetadata(file);
    });

    const metadataList: Metadata[] = await Promise.all(promiseList);
    metadataList.forEach((metadata) => builderContext.addMetadata(metadata));
  };

  return (
    <DragDrop
      onFileUpload={async (files: File[]) => await handleNewFiles(files)}
      placeholder="Drop your music files here or click to open file selector"
      fileTypes={fileTypes}
      multiple={true}
    ></DragDrop>
  );
}

export default MetadataDragDrop;
