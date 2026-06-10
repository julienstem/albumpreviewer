import type { Album } from "../types/album";
import type { Metadata } from "../types/metadata";

interface BuilderDetails {
  metadataList: Metadata[];
  coverList: string[];
}

interface SaveManagerExportProps {
  album: Album;
  builderDetails: BuilderDetails;
}

// --- EXPORT CORRIGÉ ---
export const exportAlbumConfig = ({
  album,
  builderDetails,
}: SaveManagerExportProps) => {
  const globalPayload = {
    album,
    builderDetails,
  };

  const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(globalPayload, null, 2),
  )}`;

  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", jsonString);

  const fileName = album.title
    ? `album-${album.title.toLowerCase().replace(/\s+/g, "-")}.json`
    : "album-config.json";

  downloadAnchor.setAttribute("download", fileName);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
};

interface SaveManagerImportProps {
  file: File;
  // Modifié pour recevoir directement l'objet Album plutôt que la string brute JSON
  setAlbum: (album: Album) => void;
  setCoverList: (coverList: string[]) => void;
  setMetadataList: (metadataList: Metadata[]) => void;
}

// --- IMPORT ADAPTÉ ---
export const importAlbumConfig = ({
  file,
  setAlbum,
  setCoverList,
  setMetadataList,
}: SaveManagerImportProps): Promise<void> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      try {
        const fileContent = event.target?.result as string;
        const parsedData = JSON.parse(fileContent);

        if (
          parsedData &&
          typeof parsedData === "object" &&
          "album" in parsedData &&
          "builderDetails" in parsedData &&
          Array.isArray(parsedData.builderDetails.metadataList) &&
          Array.isArray(parsedData.builderDetails.coverList)
        ) {
          setAlbum(parsedData.album);
          setMetadataList(parsedData.builderDetails.metadataList);
          setCoverList(parsedData.builderDetails.coverList);

          resolve();
        } else {
          reject(new Error("Le format du fichier de sauvegarde est invalide."));
        }
      } catch (error) {
        reject(new Error("Impossible de lire le fichier JSON."));
      }
    };

    fileReader.onerror = () =>
      reject(new Error("Erreur lors de la lecture du fichier."));

    fileReader.readAsText(file);
  });
};
