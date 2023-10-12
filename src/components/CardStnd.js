import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { Card, Dropdown, Button } from 'react-bootstrap';

const CardStnd = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  //const history = useHistory();
  const [visitedCharacter, setVisitedCharacter] = useState(null);

  useEffect(() => {
    const getCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        const characterData = response.data;
        setCharacter(characterData);
        setVisitedCharacter(characterData);
      } catch (error) {
        console.error(error);
      }
    };

    getCharacter();
  }, [id]);

  const handleGoToCatalog = () => {
    window.location.href = '/';
  };

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={character.image} />
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <Card.Text>
          {character.status} | {character.species} | {character.gender}
        </Card.Text>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="location-dropdown">
            Location
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>{character.location.name}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="episode-dropdown">
            Episodes
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {character.episode.map((episode, index) => (
              <Dropdown.Item key={index}>{episode}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" onClick={handleGoToCatalog}>
          Go to Catalog
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardStnd;