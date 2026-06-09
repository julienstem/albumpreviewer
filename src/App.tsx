import "./App.css";
import AlbumBuilder from "./components/album-builder/album-builder";
import AlbumPreview from "./components/album-preview/album-preview";
import { AlbumProvider } from "./context/album-context/album-context";
import { BuilderProvider } from "./context/builder-context/builder-context";

function App() {
  return (
    <div className="App">
      <AlbumProvider>
        <BuilderProvider>
          <div className="main-stage">
            <AlbumBuilder />
            <AlbumPreview />
          </div>
        </BuilderProvider>
      </AlbumProvider>
    </div>
  );
}

export default App;
