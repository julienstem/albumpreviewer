import { useState } from "react";
import { useAlbum } from "../../context/album-context/album-context";
import "./cover-manager.css";

function CoverManager() {
  const context = useAlbum();
  const [coverList, setCoverList] = useState<string[]>([]);
  const [activeCoverIndex, setActiveCoverIndex] = useState<number>();

  const handleAddCover = (url: string) => {
    setCoverList((prevList) => [...prevList, url]);
  };

  const handleRemoveCover = (indexToRemove: number) => {
    setCoverList((prevList) =>
      prevList.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleActiveCoverChange = (index: number) => {
    setActiveCoverIndex(index);
    const coverUrl = coverList[index];
    context.updateAlbumInfo({ coverUrl });
  };

  return <div className="cover-manager"></div>;
}

export default CoverManager;
