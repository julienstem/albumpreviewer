import "./App.css";
import AlbumBuilder from "./components/album-builder/album-builder";
import { AlbumProvider } from "./context/album-context/album-context";

function App() {
  return (
    <div className="App">
      <AlbumProvider>
        <AlbumBuilder />
      </AlbumProvider>
    </div>
  );
}

export default App;
