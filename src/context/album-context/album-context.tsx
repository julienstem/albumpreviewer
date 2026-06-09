import { createContext, useContext, useState } from "react";
import type { Album } from "../../types/album";
import type { Metadata } from "../../types/metadata";

interface AlbumContextType {
  album: Album;
  updateTrackMetadata: (index: number, metadata: Partial<Metadata>) => void;
  addTrack: (metadata: Metadata) => void;
  addMultipleTracks: (metadataList: Metadata[]) => void;
  removeTrack: (index: number) => void;
  updateAlbumInfo: (info: Partial<Omit<Album, "tracks">>) => void;
  reorderTracks: (startIndex: number, endIndex: number) => void;
  cleanTracks: () => void;
  calculateAlbumDuration: () => string;
}

const AlbumContext = createContext<AlbumContextType | undefined>(undefined);

const initialAlbum: Album = {
  title: "",
  artist: "",
  tracks: [],
  coverUrl: null,
};

export function AlbumProvider({ children }: { children: React.ReactNode }) {
  const [album, setAlbum] = useState<Album>(initialAlbum);

  const updateTrackMetadata = (index: number, metadata: Partial<Metadata>) => {
    setAlbum((prev) => {
      const updatedTracks = [...prev.tracks];
      updatedTracks[index] = { ...updatedTracks[index], ...metadata };
      return { ...prev, tracks: updatedTracks };
    });
  };

  const addTrack = (newTrack: Metadata) => {
    setAlbum((prev) => ({
      ...prev,
      tracks: [...prev.tracks, newTrack],
    }));
  };

  const addMultipleTracks = (metadataList: Metadata[]) => {
    setAlbum((prev) => ({
      ...prev,
      tracks: [...prev.tracks, ...metadataList],
    }));
  };

  const removeTrack = (index: number) => {
    setAlbum((prev) => ({
      ...prev,
      tracks: prev.tracks.filter((_, i) => i !== index),
    }));
  };

  const cleanTracks = () => {
    setAlbum((prev) => ({
      ...prev,
      tracks: [],
    }));
  };

  const reorderTracks = (startIndex: number, endIndex: number) => {
    setAlbum((prev) => {
      const updatedTracks = [...prev.tracks];
      const [removed] = updatedTracks.splice(startIndex, 1);
      updatedTracks.splice(endIndex, 0, removed);
      return { ...prev, tracks: updatedTracks };
    });
  };

  const updateAlbumInfo = (info: Partial<Omit<Album, "tracks">>) => {
    setAlbum((prev) => ({
      ...prev,
      ...info,
    }));
  };

  function calculateAlbumDuration(): string {
    let totalSeconds = 0;

    album.tracks.forEach((metadata) => {
      const [minuts, seconds] = metadata.duration.split(":").map(Number);

      totalSeconds += minuts * 60 + seconds;
    });

    const totalHours = Math.floor(totalSeconds / 3600);
    const leftoverSecondsAfterHours = totalSeconds % 3600;

    const totalMinuts = Math.floor(leftoverSecondsAfterHours / 60);
    const leftoverSecondsFinal = leftoverSecondsAfterHours % 60;

    const hh = String(totalHours).padStart(2, "0");
    const mm = String(totalMinuts).padStart(2, "0");
    const ss = String(leftoverSecondsFinal).padStart(2, "0");

    return `${hh}:${mm}:${ss}`;
  }

  return (
    <AlbumContext.Provider
      value={{
        album,
        updateTrackMetadata,
        addTrack,
        addMultipleTracks,
        removeTrack,
        updateAlbumInfo,
        reorderTracks,
        cleanTracks,
        calculateAlbumDuration,
      }}
    >
      {children}
    </AlbumContext.Provider>
  );
}

export function useAlbum() {
  const context = useContext(AlbumContext);
  if (!context) {
    throw new Error("useAlbum must be used within an AlbumProvider");
  }
  return context;
}
