import type { Metadata } from "../../types/metadata";
import DragDrop from "../drag-drop/drag-drop";
import MetadataList from "../metadata-list/metadata-list";
import "./tracks-manager.css";

interface TracksManagerProps {
  metadataList: Metadata[];
  handleRemoveTrack: (index: number) => void;
  handleFileUpload: (metadataList: Metadata[]) => void;
}

function TracksManager({
  metadataList,
  handleRemoveTrack,
  handleFileUpload,
}: TracksManagerProps) {
  return (
    <div className="tracks-manager">
      <>
        <MetadataList
          metadataList={metadataList}
          onRemoveTrack={handleRemoveTrack}
        />
        <DragDrop onFileUpload={handleFileUpload} />
      </>
    </div>
  );
}

export default TracksManager;
