import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./drag-drop.css";
import type { Metadata } from "../../types/metadata";
import jsmediatags from "jsmediatags";

const fileTypes = ["MP3", "FLAC", "OGG", "WAV", "AAC", "ALAC", "AIFF"];

interface DragDropProps {
  onFileUpload: (metadataList: Metadata[]) => void;
}

function DragDrop({ onFileUpload }: DragDropProps) {
  const [file, setFile] = useState<File | File[] | null>(null);

  const handleChange = (file: any) => {
    const extractedFiles = Array.from(file) as unknown as File; // Extract the first file from the array
    setFile(extractedFiles);
    Promise.all(
      Array.isArray(extractedFiles)
        ? extractedFiles.map(readMetadata)
        : [readMetadata(extractedFiles)],
    )
      .then((metadataList) => {
        onFileUpload(metadataList);
      })
      .catch((error) => {
        console.error("Erreur lors de la lecture des métadonnées :", error);
      });
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
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

    const tags = await new Promise<any>((resolve) => {
      jsmediatags.read(file, {
        onSuccess: (result: any) => {
          resolve({
            title: result.tags.title || file.name,
            artist: result.tags.artist || "Artiste inconnu",
          });
        },
        onError: (error: any) => {
          console.warn(
            "Erreur lecture ID3, fallback sur le nom du fichier",
            error,
          );
          resolve({ title: file.name });
        },
      });
    });

    const metadata: Metadata = {
      title: file.name,
      artist: tags.artist,
      duration: durationStr,
    };
    return metadata;
  };

  return (
    <div className="drag-drop">
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        multiple={true}
      >
        <div className="drag-drop-area">
          {file ? (
            <p>
              {Array.isArray(file)
                ? file.map((f: File) => f.name).join(", ")
                : file.name}{" "}
              uploaded successfully!
            </p>
          ) : (
            <p>Drag and drop your music files here, or click to select files</p>
          )}
        </div>
      </FileUploader>
    </div>
  );
}

export default DragDrop;
