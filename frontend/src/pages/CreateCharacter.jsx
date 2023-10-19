import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CreateCharacter = () => {
  const { characterId } = useParams();

  const [character, setCharacter] = useState();

  const fetchCharacter = async () => {
    try {
      const responseFromBackend = await fetch(
        `${import.meta.env.VITE_API_URL}/characters/${characterId}`
      );
      if (responseFromBackend.ok) {
        const parsedFromBackend = await responseFromBackend.json();
        console.log(parsedFromBackend);
        setCharacter(parsedFromBackend.character);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCharacter();
  }, []);

  return character ? (
    <>
      <h2>Details of {character.name}</h2>
      <h3>Occupation: {character.occupation}</h3>
      <p>Weapon: {character.weapon}</p>
    </>
  ) : (
    <h1>Loading...</h1>
  );
};

export default CreateCharacter;
