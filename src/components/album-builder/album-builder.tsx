import { useState } from "react";
import "./album-builder.css";
import TracksManager from "../tracks-manager/tracks-manager";
import DetailsManager from "../details-manager/details-manager";
import CoverManager from "../cover-manager/cover-manager";

const builderTabs = ["Tracks", "Details", "Cover"];

function AlbumBuilder() {
  const [selectedTab, setSelectedTab] = useState<string>(builderTabs[0]);

  const handleChangeTab = (label: string) => {
    setSelectedTab(label);
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case "Tracks":
        return <TracksManager />;
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
