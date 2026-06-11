import { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import "./drag-drop.css";

interface DragDropProps {
  onFileUpload: ((fileList: File[]) => void) | ((file: File) => void);
  fileTypes: string[];
  placeholder: string;
  multiple: boolean;
}

function DragDrop({
  onFileUpload,
  fileTypes,
  placeholder,
  multiple = true,
}: DragDropProps) {
  const [file, setFile] = useState<File | File[] | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (!file) return;

    const timer = setTimeout(() => {
      setFile(null);
    }, 4000);

    return () => clearTimeout(timer);
  }, [file]);

  const handleChange = (file: any) => {
    const extractedFiles = Array.from(file) as unknown as File;
    setFile(extractedFiles);
    onFileUpload(file);
  };

  const handleDraggingState = (dragging: boolean) => {
    setIsDragging(dragging);
  };

  return (
    <div className="drag-drop">
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        multiple={multiple}
        onDraggingStateChange={handleDraggingState}
        hoverTitle=""
        dropMessageStyle={{
          display: "none",
          opacity: 0,
          backgroundColor: "transparent",
        }}
      >
        <div className={`drag-drop-area ${isDragging ? "is-dragging" : ""}`}>
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
