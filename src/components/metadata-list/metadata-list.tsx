import type { Metadata } from "../../types/metadata";
import "./metadata-list.css";
import { RxCross2 } from "react-icons/rx";

interface MetadataListProps {
  metadataList: Metadata[];
  onRemoveTrack: (index: number) => void;
}

function MetadataList({ metadataList, onRemoveTrack }: MetadataListProps) {
  return (
    <div className="metadata-list">
      <table className="metadata-table" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Title</th>
            <th>Featuring</th>
            <th>Duration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {metadataList.map((metadata, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "even-row" : "odd-row"}
            >
              <td>
                <input type="checkbox" />
              </td>
              <td>{index + 1}</td>
              <td>{metadata.title}</td>
              <td>{metadata.artist}</td>
              <td>{metadata.duration}</td>
              <td>
                <button
                  className="remove-button"
                  onClick={() => onRemoveTrack(index)}
                >
                  <RxCross2 />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MetadataList;
