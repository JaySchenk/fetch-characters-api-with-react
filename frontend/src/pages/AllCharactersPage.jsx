import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AllCharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const navigate = useNavigate();
  const fetchAllCharacters = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/characters`
      );
      if (responseFromBackend.ok) {
        const parsed = await responseFromBackend.json();
        console.log(parsed);
        setCharacters(parsed.characters);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteObject = async (objectId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this object? This can't be undone"
      )
    ) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/characters/${objectId}`,
          {
            method: "DELETE",
          }
        );
      } catch (error) {
        console.error("An error occurred:", error);
      }
    }
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  return (
    <>
      <h2>Characters List</h2>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <Link to={`/characters/${character.id}`}> {character.name}</Link>
            <button onClick={() => handleDeleteObject(character.id)}>
              delete
            </button>
            <button
              onClick={() => {
                navigate(`/charactersEdit/${character.id}`);
              }}
            >
              edit
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllCharactersPage;
