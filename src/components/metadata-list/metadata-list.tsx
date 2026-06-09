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
import { useBuilder } from "../../context/builder-context/builder-context";

function MetadataList() {
  const builderContext = useBuilder();
  const { metadataList, removeMetadata } = builderContext;
  const [metadataListState, setMetadataListState] =
    useState<Metadata[]>(metadataList);
  const context = useAlbum();

  useEffect(() => {
    if (metadataList) {
      setMetadataListState(metadataList);
    }
  }, [metadataList]);

  const isAllSelected =
    metadataListState.length > 0 &&
    metadataListState.every((track) =>
      context.album.tracks.some((ctxTrack) => ctxTrack.title === track.title),
    );

  const isTrackSelected = (track: Metadata) => {
    return context.album.tracks.some(
      (ctxTrack) => ctxTrack.title === track.title,
    );
  };

  const handleToggleTrack = (index: number, isChecked: boolean) => {
    const track = metadataListState[index];

    if (isChecked) {
      if (!isTrackSelected(track)) {
        context.addTrack(track);
      }
    } else {
      const contextIndex = context.album.tracks.findIndex(
        (ctxTrack) => ctxTrack.title === track.title,
      );
      if (contextIndex !== -1) {
        context.removeTrack(contextIndex);
      }
    }
  };

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      metadataListState.forEach((track) => {
        if (!isTrackSelected(track)) {
          context.addTrack(track);
        }
      });
    } else {
      context.cleanTracks();
    }
  };

  const handleRemoveTrack = (index: number, isChecked: boolean) => {
    const trackToRemove = metadataListState[index];
    removeMetadata(index);
    if (isChecked) {
      const contextIndex = context.album.tracks.findIndex(
        (ctxTrack) => ctxTrack.title === trackToRemove.title,
      );
      if (contextIndex !== -1) {
        context.removeTrack(contextIndex);
      }
    }
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const newMetadataList = [...metadataListState];
    const [movedTrack] = newMetadataList.splice(result.source.index, 1);
    newMetadataList.splice(result.destination.index, 0, movedTrack);

    setMetadataListState(newMetadataList);

    const newContextTracks: Metadata[] = [];

    newMetadataList.forEach((track) => {
      const isSelected = context.album.tracks.some(
        (ctxTrack) => ctxTrack.title === track.title,
      );

      if (isSelected) {
        newContextTracks.push(track);
      }
    });

    context.cleanTracks();
    newContextTracks.forEach((track) => context.addTrack(track));
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
            <th>Duration</th>
            <th></th>
          </tr>
        </thead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="metadataList">
            {(provided) => (
              <tbody ref={provided.innerRef} {...provided.droppableProps}>
                {metadataListState.map((metadata, index) => {
                  const rowKey = `${metadata.title}-${index}`;
                  const isChecked = isTrackSelected(metadata);

                  return (
                    <Draggable
                      key={rowKey}
                      draggableId={`track-${rowKey}`}
                      index={index}
                    >
                      {(provided) => (
                        <tr
                          className="table-row"
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
                              checked={isChecked}
                            />
                          </td>
                          <td>{index + 1}</td>
                          <td>{metadata.title}</td>
                          <td>{metadata.duration}</td>
                          <td>
                            <button
                              className="remove-button"
                              onClick={() =>
                                handleRemoveTrack(index, isChecked)
                              }
                            >
                              <RxCross2 />
                            </button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  );
                })}
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
