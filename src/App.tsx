import "./App.css";
import AlbumBuilder from "./components/album-builder/album-builder";
import AlbumPreview from "./components/album-preview/album-preview";
import { AlbumProvider } from "./context/album-context/album-context";

function App() {
  return (
    <div className="App">
      <AlbumProvider>
        <div className="main-stage">
          <AlbumBuilder />
          <AlbumPreview />
        </div>
      </AlbumProvider>
    </div>
  );
}

export default App;
