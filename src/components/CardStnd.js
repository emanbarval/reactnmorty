import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Dropdown, Button, Image } from 'react-bootstrap';

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
  let status;
  if(character.status === 'Alive')
  {
    status = <span className='alive'>{character.status}</span>;
  }
  else if(character.status === 'Dead')
  {
    status = <span className='dead'>{character.status}</span>;
  }
  else if(character.status === 'unknown')
  {
    status = (character.status[0].toUpperCase() + character.status.slice(1));
    status = <span className='unknown'>{status}</span>;
  }
  console.log(status)
  return (
    <Card style={{ width: '18rem' }} className="align-items-center">
      <Image  src={character.image} roundedCircle style={{width:'50%'}}/>
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <Card.Text>
          {status} | {character.species} | {character.gender}
        </Card.Text>
        <Dropdown>
          <Dropdown.Toggle variant="none" id="location-dropdown" style={{color:'black', fontWeight:'bold'}}>
            Location
          </Dropdown.Toggle>
          <Dropdown.Menu style={{border:'#0D6EFD solid 1px'}}>
            <Dropdown.Item style={{color:'grey'}}>{character.location.name}</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown>
          <Dropdown.Toggle variant="none" id="episode-dropdown" style={{color:'black', fontWeight:'bold'}}>
            Episodes
          </Dropdown.Toggle>
          <Dropdown.Menu style={{border:'#0D6EFD solid 1px'}}>
            {character.episode.map((episode, index) => (
              <Dropdown.Item style={{color:'grey'}} key={index}>{episode}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" onClick={handleGoToCatalog}>
          Back
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardStnd;