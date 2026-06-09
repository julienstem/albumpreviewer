import { createContext, useContext, useState, useEffect } from "react";
import type { Metadata } from "../../types/metadata";

// 1. Interface enrichie avec les fonctions d'ajout et de suppression
interface BuilderContextType {
  metadataList: Metadata[];
  coverList: string[];
  setMetadataList: (metadataList: Metadata[]) => void;
  setCoverList: (coverList: string[]) => void;
  addMetadata: (track: Metadata) => void;
  removeMetadata: (index: number) => void;
  addCover: (coverUrl: string) => void;
  removeCover: (index: number) => void;
  resetBuilder: () => void;
}

const STORAGE_KEY_METADATA = "annex_builder_metadata";
const STORAGE_KEY_COVERS = "annex_builder_covers";

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: React.ReactNode }) {
  const [metadataList, setMetadataListState] = useState<Metadata[]>([]);
  const [coverList, setCoverListState] = useState<string[]>([]);

  useEffect(() => {
    const savedMetadata = localStorage.getItem(STORAGE_KEY_METADATA);
    const savedCovers = localStorage.getItem(STORAGE_KEY_COVERS);

    if (savedMetadata) {
      try {
        setMetadataListState(JSON.parse(savedMetadata));
      } catch (e) {
        console.error("Erreur de récupération des métadonnées annexes", e);
      }
    }

    if (savedCovers) {
      try {
        setCoverListState(JSON.parse(savedCovers));
      } catch (e) {
        console.error("Erreur de récupération des pochettes annexes", e);
      }
    }
  }, []);

  const setMetadataList = (newList: Metadata[]) => {
    setMetadataListState(newList);
    localStorage.setItem(STORAGE_KEY_METADATA, JSON.stringify(newList));
  };

  const setCoverList = (newList: string[]) => {
    setCoverListState(newList);
    localStorage.setItem(STORAGE_KEY_COVERS, JSON.stringify(newList));
  };

  const addMetadata = (track: Metadata) => {
    setMetadataListState((prev) => {
      const updated = [...prev, track];
      localStorage.setItem(STORAGE_KEY_METADATA, JSON.stringify(updated));
      return updated;
    });
  };

  const removeMetadata = (index: number) => {
    setMetadataListState((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEY_METADATA, JSON.stringify(updated));
      return updated;
    });
  };

  const addCover = (coverUrl: string) => {
    setCoverListState((prev) => {
      if (prev.includes(coverUrl)) return prev;

      const updated = [...prev, coverUrl];
      localStorage.setItem(STORAGE_KEY_COVERS, JSON.stringify(updated));
      return updated;
    });
  };

  const removeCover = (index: number) => {
    setCoverListState((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      localStorage.setItem(STORAGE_KEY_COVERS, JSON.stringify(updated));
      return updated;
    });
  };

  const resetBuilder = () => {
    localStorage.removeItem(STORAGE_KEY_METADATA);
    localStorage.removeItem(STORAGE_KEY_COVERS);
    setMetadataListState([]);
    setCoverListState([]);
  };

  return (
    <BuilderContext.Provider
      value={{
        metadataList,
        coverList,
        setMetadataList,
        setCoverList,
        addMetadata,
        removeMetadata,
        addCover,
        removeCover,
        resetBuilder,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (!context) {
    throw new Error("useBuilder doit être enveloppé dans un BuilderProvider");
  }
  return context;
}
