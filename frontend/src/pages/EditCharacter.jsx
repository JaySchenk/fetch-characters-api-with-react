import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditCharacter = () => {
  const { characterId } = useParams();

  const [character, setCharacter] = useState();
  const [name, setName] = useState("");
  const [occupation, setOccupation] = useState();
  const [weapon, setWeapon] = useState();

  const fetchCharacter = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/characters/${characterId}`
      );
      if (responseFromBackend.ok) {
        const parsedFromBackend = await responseFromBackend.json();
        console.log(parsedFromBackend);
        setCharacter(parsedFromBackend.character);
        setName(parsedFromBackend.character.name);
        setOccupation(parsedFromBackend.character.occupation);
        setWeapon(parsedFromBackend.character.weapon);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  const handleUpdateObject = async () => {
    const updatedCharacter = {
      name: name,
      occupation: occupation,
      weapon: weapon,
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/characters/${character.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedCharacter),
        }
      );
      console.log(updatedCharacter);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return character ? (
    <>
      <h1>You're updating {character.name}</h1>
      <form>
        <label htmlFor="name">Char name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="occupation">Char occupation</label>
        <input
          id="occupation"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />
        <br />
        <label htmlFor="weapon">Char weapon</label>
        <input
          id="weapon"
          value={weapon}
          onChange={(e) => setWeapon(e.target.value)}
        />
      </form>
      <button className="objectButton" onClick={handleUpdateObject}>
        Update character
      </button>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

export default EditCharacter;
