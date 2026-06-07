import { useState, type ReactElement, type ReactNode } from "react";
import type { Metadata } from "../../types/metadata";
import "./album-builder.css";
import DragDrop from "../drag-drop/drag-drop";
import MetadataList from "../metadata-list/metadata-list";
import TracksManager from "../tracks-manager/tracks-manager";

const builderTabs = ["Tracks", "Details"];

function AlbumBuilder() {
  const [metadataList, setMetadataList] = useState<Metadata[]>([]);
  const [selectedTab, setSelectedTab] = useState<string>(builderTabs[0]);

  const handleFileUpload = (newMetadataList: Metadata[]) => {
    setMetadataList((prevList) => [...prevList, ...newMetadataList]);
  };

  const handleRemoveTrack = (index: number) => {
    setMetadataList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const handleChangeTab = (label: string) => {
    setSelectedTab(label);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Tracks":
        return (
          <TracksManager
            metadataList={metadataList}
            handleFileUpload={handleFileUpload}
            handleRemoveTrack={handleRemoveTrack}
          />
        );
      case "Details":
        return (
          <div className="tab-panel">
            Formulaire des infos de l'album (Exemple)
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="album-builder">
      <div className="album-builder-tabs">
        {builderTabs.map((label) => {
          return (
            <button onClick={() => handleChangeTab(label)}>{label}</button>
          );
        })}
      </div>
      {renderTabContent()}
    </div>
  );
}

export default AlbumBuilder;
