import DragDrop from "../drag-drop/drag-drop";
import "./cover-drag-drop.css";

const fileTypes = ["JPG", "PNG", "JPEG"];

interface CoverDragDropInterface {
  onCoverDrop: (coversUrl: string[]) => void;
}

function CoverDragDrop({ onCoverDrop }: CoverDragDropInterface) {
  const onFileUpload = (fileList: File[]) => {
    const filesArray = Array.from(fileList);
    const urls: string[] = filesArray.map((file) => {
      return URL.createObjectURL(file).toString();
    });
    onCoverDrop(urls);
  };

  return (
    <DragDrop
      onFileUpload={(files) => onFileUpload(files)}
      placeholder="Drop your image files here or click to open file selector"
      fileTypes={fileTypes}
    ></DragDrop>
  );
}

export default CoverDragDrop;
