import { useState } from "react";
import type { Metadata } from "../../types/metadata";
import "./album-builder.css";
import DragDrop from "../drag-drop/drag-drop";
import MetadataList from "../metadata-list/metadata-list";

function AlbumBuilder() {
  const [metadataList, setMetadataList] = useState<Metadata[]>([]);

  const handleFileUpload = (newMetadataList: Metadata[]) => {
    setMetadataList((prevList) => [...prevList, ...newMetadataList]);
  };

  const handleRemoveTrack = (index: number) => {
    setMetadataList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <div className="album-builder">
      <MetadataList
        metadataList={metadataList}
        onRemoveTrack={handleRemoveTrack}
      />
      <DragDrop onFileUpload={handleFileUpload} />
    </div>
  );
}

export default AlbumBuilder;
