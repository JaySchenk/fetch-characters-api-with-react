const router = require('express').Router()

/* GET home page */
router.get('/', async (req, res) => {
  try {
    const responseFromAPI = await fetch('https://ih-crud-api.herokuapp.com/characters')
    if (responseFromAPI.ok) {
      const charactersFromAPI = await responseFromAPI.json()
      console.log()
      res.json({ characters: charactersFromAPI })
    }
  } catch (error) {
    console.error(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const responseFromAPI = await fetch(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`
    )
    if (responseFromAPI.ok) {
      const characterFromAPI = await responseFromAPI.json()
      res.json({ character: characterFromAPI })
    }
  } catch (error) {
    console.error(error)
  }
})



router.post('/', async (request, response) => {
  try {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.body)
    };

    const fetchResponse = await fetch('https://ih-crud-api.herokuapp.com/characters', fetchOptions);

    if (fetchResponse.ok) {
      const newCharacter = await fetchResponse.json();
      response.status(201).json({ character: newCharacter });
    } else {
      throw new Error('Failed to create new character');
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (request, response) => {
  const { id } = request.params;
  console.log(JSON.stringify(request.body))
  try {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.body)
    };

    const fetchResponse = await fetch(`https://ih-crud-api.herokuapp.com/characters/${id}`, fetchOptions);

    if (fetchResponse.ok) {
      const newCharacter = await fetchResponse.json();
      response.status(201).json({ character: newCharacter });
    } else {
      throw new Error('Failed to update');
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (request, response) => {
  const { id } = request.params;
  try {
    const fetchOptions = {
      method: 'DELETE',
    /*  headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(request.body)*/
    };

    const fetchResponse = await fetch(`https://ih-crud-api.herokuapp.com/characters/${id}`, fetchOptions);

    if (fetchResponse.ok) {
            response.status(201).json({ succes: "Character deleted" });
    } else {
      throw new Error('Failed to delete character');
    }
  } catch (error) {
    console.log(error);
    response.status(400).json({ error: error.message });
  }
});


module.exports = router

// https://ih-crud-api.herokuapp.com/characters
