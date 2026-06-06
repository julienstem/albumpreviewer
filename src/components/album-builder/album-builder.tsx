import { useState } from "react";
import type { Metadata } from "../../types/metadata";
import "./album-builder.css";
import DragDrop from "../drag-drop/drag-drop";

function AlbumBuilder() {
  const [metadataList, setMetadataList] = useState<Metadata[]>([]);

  const handleFileUpload = (newMetadataList: Metadata[]) => {
    setMetadataList(newMetadataList);
  };

  return (
    <div className="album-builder">
      <DragDrop onFileUpload={handleFileUpload} />
    </div>
  );
}

export default AlbumBuilder;
