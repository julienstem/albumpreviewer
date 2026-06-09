import MetadataDragDrop from "../metadata-drag-drop/metadata-drag-drop";
import MetadataList from "../metadata-list/metadata-list";
import "./tracks-manager.css";

function TracksManager() {
  return (
    <div className="tracks-manager">
      <>
        <MetadataList />
        <MetadataDragDrop />
      </>
    </div>
  );
}

export default TracksManager;
