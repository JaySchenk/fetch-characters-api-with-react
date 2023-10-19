import { Routes, Route } from "react-router-dom";
import AllCharactersPage from "./pages/AllCharactersPage";
import CharacterDetails from "./pages/CharacterDetails";
import CreateCharacter from "./pages/CreateCharacter";
import EditCharacter from "./pages/EditCharacter";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<AllCharactersPage />} />
        <Route path="/characters/:characterId" element={<CharacterDetails />} />
        <Route path="/characters/createChar" element={<CreateCharacter />} />
        <Route
          path="/charactersEdit/:characterId"
          element={<EditCharacter />}
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
