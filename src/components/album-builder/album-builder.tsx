import { useState } from "react";
import type { Metadata } from "../../types/metadata";
import "./album-builder.css";
import TracksManager from "../tracks-manager/tracks-manager";
import DetailsManager from "../details-manager/details-manager";
import CoverManager from "../cover-manager/cover-manager";

const builderTabs = ["Tracks", "Details", "Cover"];

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
        return <DetailsManager></DetailsManager>;
      case "Cover":
        return <CoverManager></CoverManager>;
      default:
        return null;
    }
  };

  return (
    <div className="album-builder">
      <div className="album-builder-tabs">
        {builderTabs.map((label) => {
          return (
            <button
              className={
                "tab-button " + (selectedTab == label ? "selected-tab" : "")
              }
              onClick={() => handleChangeTab(label)}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div className="content-div">{renderTabContent()}</div>
    </div>
  );
}

export default AlbumBuilder;
