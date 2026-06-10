import { compressAndResizeImage } from "../../utils/image-compressor";
import DragDrop from "../drag-drop/drag-drop";
import "./cover-drag-drop.css";

const fileTypes = ["JPG", "PNG", "JPEG"];

interface CoverDragDropInterface {
  onCoverDrop: (coversUrl: string[]) => void;
}

function CoverDragDrop({ onCoverDrop }: CoverDragDropInterface) {
  const onFileUpload = async (fileList: File[]) => {
    const filesArray = Array.from(fileList);
    const urlsPromises: Promise<string>[] = filesArray.map((file) => {
      return compressAndResizeImage(file);
    });
    onCoverDrop(await Promise.all(urlsPromises));
  };

  return (
    <DragDrop
      onFileUpload={async (files: File[]) => await onFileUpload(files)}
      placeholder="Drop your image files here or click to open file selector"
      fileTypes={fileTypes}
      multiple={true}
    ></DragDrop>
  );
}

export default CoverDragDrop;
