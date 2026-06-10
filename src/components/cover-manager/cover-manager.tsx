import { useState } from "react";
import { useAlbum } from "../../context/album-context/album-context";
import "./cover-manager.css";
import CoverDragDrop from "../cover-drag-drop/cover-drag-drop";
import { FaTrashAlt } from "react-icons/fa";
import { useBuilder } from "../../context/builder-context/builder-context";

function CoverManager() {
  const context = useAlbum();
  const contextBuilder = useBuilder();
  const { coverList, addCover, removeCover } = contextBuilder;

  const [activeCover, setActiveCover] = useState<string>(
    context.album.coverUrl ? context.album.coverUrl : "",
  );

  const handleRemoveCover = (index: number) => {
    if (coverList[index] === activeCover)
      context.updateAlbumInfos({ coverUrl: null });
    removeCover(index);
  };
  const handleActiveCoverChange = (index: number) => {
    const coverUrl = coverList[index];
    context.updateAlbumInfos({ coverUrl });
    setActiveCover(coverUrl);
  };

  const handleAddCovers = (covers: string[]) => {
    covers.forEach((cover) => addCover(cover));
  };

  return (
    <div className="cover-manager">
      <div className="info-div">
        <p>Click on an image to select it</p>
      </div>
      <div className="cover-list">
        {coverList.map((coverUrl, index) => {
          return (
            <div className="cover-div">
              <button
                className={
                  "cover-selector-button " +
                  (activeCover == coverUrl ? "selected-cover" : "")
                }
                onClick={() => handleActiveCoverChange(index)}
              >
                <img className="cover-in-list" src={coverUrl} />
              </button>
              <button
                className="remove-button"
                onClick={() => handleRemoveCover(index)}
              >
                <FaTrashAlt className="trash-icon"></FaTrashAlt>
              </button>
            </div>
          );
        })}
      </div>
      <CoverDragDrop
        onCoverDrop={(urls) => handleAddCovers(urls)}
      ></CoverDragDrop>
    </div>
  );
}

export default CoverManager;
