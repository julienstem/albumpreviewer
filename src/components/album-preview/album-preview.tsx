import { useAlbum } from "../../context/album-context/album-context";
import "./album-preview.css";

function AlbumPreview() {
  const context = useAlbum();

  return (
    <div className="album-preview">
      <div className="album-preview-component">
        <div className="details-and-cover">
          {context.album.coverUrl ? (
            <img className="cover-preview" src={context.album.coverUrl}></img>
          ) : (
            <div className="cover-placeholder">
              <p className="cover-text-placeholder">Cover</p>
            </div>
          )}
          <div className="details-preview">
            <h1 className="title">
              {context.album.title.length > 0 ? context.album.title : "Title"}
            </h1>
            <div className="details-info">
              <p className="info">
                {context.album.artist.length > 0
                  ? context.album.artist
                  : "Artist"}
              </p>
              <p className="info muted">
                {context.album.tracks.length + " tracks"}
              </p>
              <p className="info muted">{context.calculateAlbumDuration()}</p>
            </div>
          </div>
        </div>
        <div className="tracklist">
          <table className="tracklist-table">
            <th>#</th>
            <th>Title</th>
            <th className="duration">Duration</th>
            <tbody>
              {context.album.tracks.map((track, index) => {
                return (
                  <tr>
                    <td className="info-cell">{index + 1}</td>
                    <td className="info-cell">{track.title}</td>
                    <td className="info-cell duration">{track.duration}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AlbumPreview;
