import { useAlbum } from "../../context/album-context/album-context";
import "./details-manager.css";

function DetailsManager() {
  const context = useAlbum();
  const { title, artist } = context.album;
  const handleTitleInput = (input: string) => {
    context.updateAlbumInfo({ title: input, artist: artist });
  };

  const handleArtistInput = (input: string) => {
    context.updateAlbumInfo({ title: title, artist: input });
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
          value={context.album.title}
        ></input>
      </div>
      <div className="detail-field">
        <h2>Artist:</h2>
        <input
          className="album-details-input"
          type="text"
          placeholder="Enter your artist name here"
          value={context.album.artist}
          onChange={(event) => handleArtistInput(event.target.value)}
        ></input>
      </div>
    </div>
  );
}

export default DetailsManager;
