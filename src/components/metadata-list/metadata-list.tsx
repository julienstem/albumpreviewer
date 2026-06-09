import { useEffect, useState } from "react";
import type { Metadata } from "../../types/metadata";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import "./metadata-list.css";
import { RxCross2 } from "react-icons/rx";
import { useAlbum } from "../../context/album-context/album-context";
import { MdDragIndicator } from "react-icons/md";

interface MetadataListProps {
  metadataList: Metadata[];
  onRemoveTrack: (index: number) => void;
}

function MetadataList({ metadataList, onRemoveTrack }: MetadataListProps) {
  const [metadataListState, setMetadataListState] =
    useState<Metadata[]>(metadataList);
  const context = useAlbum();
  const [selectedTracks, setSelectedTracks] = useState<number[]>([]);

  useEffect(() => {
    if (metadataList && metadataList.length > 0) {
      setMetadataListState(metadataList);
    }
  }, [metadataList]);

  const isAllSelected =
    metadataListState.length > 0 &&
    selectedTracks.length === metadataListState.length;
  const handleToggleTrack = (index: number, isSelected: boolean) => {
    const handleSelectTrack = (index: number) => {
      context.addTrack(metadataListState[index]);
      setSelectedTracks((prev) => [...prev, index]);
    };
    const handleDeselectTrack = (index: number) => {
      context.removeTrack(index);
      setSelectedTracks((prev) => prev.filter((i) => i !== index));
    };
    if (isSelected) {
      if (selectedTracks.includes(index)) {
        return;
      }
      handleSelectTrack(index);
    } else {
      handleDeselectTrack(index);
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    swapMetadataListPosition(result.source.index, result.destination.index);
    const newSelectedTracks = [...selectedTracks];
    const [movedTrack] = newSelectedTracks.splice(result.source.index, 1);
    newSelectedTracks.splice(result.destination.index, 0, movedTrack);
    setSelectedTracks(newSelectedTracks);
  };

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      metadataListState.forEach((_, index) => handleToggleTrack(index, true));
    } else {
      context.cleanTracks();
      setSelectedTracks([]);
    }
  };

  const swapMetadataListPosition = (startIndex: number, endIndex: number) => {
    const newMetadataList = [...metadataListState];
    const [removed] = newMetadataList.splice(startIndex, 1);
    newMetadataList.splice(endIndex, 0, removed);
    setMetadataListState(newMetadataList);
  };

  return (
    <div className="metadata-list">
      <table className="metadata-table" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th></th>
            <th>
              <input
                type="checkbox"
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={isAllSelected}
              />
            </th>
            <th>#</th>
            <th>Title</th>
            <th>Featuring</th>
            <th>Duration</th>
            <th></th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="metadataList">
            {(provided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {metadataListState.map((metadata, index) => (
                  <Draggable
                    key={index}
                    draggableId={`track-${index}`}
                    index={index}
                  >
                    {(provided) => (
                      <tr
                        key={index}
                        className={"table-row"}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <td
                          {...provided.dragHandleProps}
                          className="drag-handle"
                        >
                          <MdDragIndicator />
                        </td>
                        <td>
                          <input
                            type="checkbox"
                            onChange={(e) =>
                              handleToggleTrack(index, e.target.checked)
                            }
                            checked={selectedTracks.includes(index)}
                          />
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
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>
    </div>
  );
}

export default MetadataList;
