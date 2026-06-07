import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./drag-drop.css";

interface DragDropProps {
  onFileUpload: (fileList: File[]) => void;
  fileTypes: string[];
  placeholder: string;
}

function DragDrop({ onFileUpload, fileTypes, placeholder }: DragDropProps) {
  const [file, setFile] = useState<File | File[] | null>(null);

  const handleChange = (file: any) => {
    const extractedFiles = Array.from(file) as unknown as File;
    setFile(extractedFiles);
    onFileUpload(file);
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
            <p>{placeholder}</p>
          )}
        </div>
      </FileUploader>
    </div>
  );
}

export default DragDrop;
