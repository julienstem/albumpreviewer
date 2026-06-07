import { useState } from "react";
import { useAlbum } from "../../context/album-context/album-context";
import "./details-manager.css";

function DetailsManager() {
  const context = useAlbum();
  const [title, setTitle] = useState<string>("");
  const [artist, setArtist] = useState<string>("");
  const handleTitleInput = (input: string) => {
    setTitle(input);
    context.updateAlbumInfo({ title, artist });
  };

  const handleArtistInput = (input: string) => {
    setArtist(input);
    context.updateAlbumInfo({ title, artist });
  };

  return (
    <div className="details-manager">
      <div className="detail-field">
        <h2>Title:</h2>
        <input
          className="album-details-input"
          type="text"
          placeholder="Enter your album name here"
          onChange={(event) => handleTitleInput(event.target.value)}
        ></input>
      </div>
      <div className="detail-field">
        <h2>Artist:</h2>
        <input
          className="album-details-input"
          type="text"
          placeholder="Enter your artist name here"
          onChange={(event) => handleArtistInput(event.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default DetailsManager;
