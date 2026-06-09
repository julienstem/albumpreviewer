import { useState } from "react";
import { useAlbum } from "../../context/album-context/album-context";
import "./cover-manager.css";
import CoverDragDrop from "../cover-drag-drop/cover-drag-drop";
import { FaTrashAlt } from "react-icons/fa";

interface CoverManagerProps {
  coverList: string[];
  handleAddCover: (coverList: string[]) => void;
  handleRemoveCover: (index: number) => void;
}

function CoverManager({
  coverList,
  handleAddCover,
  handleRemoveCover,
}: CoverManagerProps) {
  const context = useAlbum();

  const [activeCover, setActiveCover] = useState<string>(
    context.album.coverUrl ? context.album.coverUrl : "",
  );

  const handleActiveCoverChange = (index: number) => {
    const coverUrl = coverList[index];
    context.updateAlbumInfo({ coverUrl });
    setActiveCover(coverUrl);
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
              <button className="remove-button">
                <FaTrashAlt className="trash-icon"></FaTrashAlt>
              </button>
            </div>
          );
        })}
      </div>
      <CoverDragDrop
        onCoverDrop={(urls) => handleAddCover(urls)}
      ></CoverDragDrop>
    </div>
  );
}

export default CoverManager;
