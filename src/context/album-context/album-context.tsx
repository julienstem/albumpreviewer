import { createContext, useContext, useEffect, useState } from "react";
import type { Album } from "../../types/album";
import type { Metadata } from "../../types/metadata";

interface AlbumContextType {
  album: Album;
  addTrack: (metadata: Metadata) => void;
  removeTrack: (index: number) => void;
  setTracks: (metadataList: Metadata[]) => void;
  updateAlbumInfos: (info: Partial<Omit<Album, "tracks">>) => void;
  cleanTracks: () => void;
  calculateAlbumDuration: () => string;
  resetAlbum: () => void;
  setAlbum: (album: Album) => void;
}

const AlbumContext = createContext<AlbumContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "music_builder_album";

const initialAlbum: Album = {
  title: "",
  artist: "",
  tracks: [],
  coverUrl: null,
};

export function AlbumProvider({ children }: { children: React.ReactNode }) {
  const [album, setAlbum] = useState<Album>(initialAlbum);

  useEffect(() => {
    const savedAlbum = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedAlbum) {
      try {
        setAlbumWithJson(savedAlbum);
      } catch (error) {
        console.error("Erreur lors du chargement de l'album sauvegardé", error);
      }
    }
  }, []);

  const saveAlbum = (albumToSave: Album) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(albumToSave));
  };

  const addTrack = (track: Metadata) => {
    setAlbum((prev) => {
      const updated = { ...prev, tracks: [...prev.tracks, track] };
      saveAlbum(updated); // On sauvegarde le nouvel état
      return updated;
    });
  };

  const removeTrack = (index: number) => {
    setAlbum((prev) => {
      const updated = {
        ...prev,
        tracks: prev.tracks.filter((_, i) => i !== index),
      };
      saveAlbum(updated);
      return updated;
    });
  };

  const setTracks = (newTracks: Metadata[]) => {
    setAlbum((prev) => {
      const updated = { ...prev, tracks: newTracks };
      saveAlbum(updated);
      return updated;
    });
  };

  const updateAlbumInfos = (fields: Partial<Omit<Album, "tracks">>) => {
    setAlbum((prev) => {
      const updated = { ...prev, ...fields };
      saveAlbum(updated);
      return updated;
    });
  };

  const cleanTracks = () => {
    setAlbum((prev) => {
      const updated = { ...prev, tracks: [] };
      saveAlbum(updated);
      return updated;
    });
  };

  const resetAlbum = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setAlbum(initialAlbum);
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

  const setAlbumWithJson = (json: string) => {
    setAlbum(JSON.parse(json));
  };

  return (
    <AlbumContext.Provider
      value={{
        album,
        addTrack,
        removeTrack,
        setTracks,
        calculateAlbumDuration,
        cleanTracks,
        updateAlbumInfos,
        resetAlbum,
        setAlbum,
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
