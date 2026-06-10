import { useState } from "react";
import "./album-builder.css";
import TracksManager from "../tracks-manager/tracks-manager";
import DetailsManager from "../details-manager/details-manager";
import CoverManager from "../cover-manager/cover-manager";
import { useBuilder } from "../../context/builder-context/builder-context";
import { useAlbum } from "../../context/album-context/album-context";
import { exportAlbumConfig, importAlbumConfig } from "../../utils/save-manager";
import Modal from "react-modal";
import DragDrop from "../drag-drop/drag-drop";

const builderTabs = ["Tracks", "Details", "Cover"];

function AlbumBuilder() {
  const [selectedTab, setSelectedTab] = useState<string>(builderTabs[0]);

  const contextBuilder = useBuilder();
  const contextAlbum = useAlbum();
  const { album, setAlbum } = contextAlbum;
  const { metadataList, coverList, setCoverList, setMetadataList } =
    contextBuilder;
  const [showImportDialog, setShowImportDialog] = useState<boolean>(false);

  const handleReset = () => {
    contextBuilder.resetBuilder();
    contextAlbum.resetAlbum();
  };

  const handleExport = () => {
    const builderDetails = { metadataList, coverList };
    exportAlbumConfig({ album, builderDetails });
  };

  const handleImport = () => {
    setShowImportDialog(true);
  };

  const handleImportFileDrop = (file: File) => {
    console.log(file);
    importAlbumConfig({
      file: file,
      setAlbum,
      setCoverList,
      setMetadataList,
    });
    handleCancel();
  };

  const handleCancel = () => {
    setShowImportDialog(false);
  };

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
      <div className="top-part">
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
        <div className="pill-buttons">
          <button className="pill-button" onClick={() => handleExport()}>
            Export
          </button>
          <button className="pill-button" onClick={() => handleImport()}>
            Import
          </button>
          <button className="pill-button reset" onClick={() => handleReset()}>
            Reset
          </button>
        </div>
      </div>
      <div className="content-div">{renderTabContent()}</div>
      <Modal className="import-modal" isOpen={showImportDialog}>
        <DragDrop
          fileTypes={["json"]}
          placeholder="Drop a .json save"
          onFileUpload={handleImportFileDrop}
          multiple={false}
        ></DragDrop>
        <div className="cancel-container">
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default AlbumBuilder;
