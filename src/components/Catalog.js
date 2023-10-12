import React, { useEffect, useState } from "react";
import axios from "axios";
import CardCat from "./CardCat";
import { Container, Row, Col } from 'react-bootstrap';

const Catalog = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [charNumber, setCharNumber] = useState(0);
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character?page=${page}`
      );
      if (page === 1) {
        // Verificar si ya existen personajes en el estado characters
        const existingCharacters = characters.filter(
          character => character.page !== 1
        );

        setCharacters([
          ...existingCharacters,
          ...response.data.results.map(character => ({
            ...character,
            page: 1
          }))
        ]);
      } else {
        setCharacters(prevCharacters => [
          ...prevCharacters,
          ...response.data.results.map(character => ({
            ...character,
            page: page
          }))
        ]);
      }
    };

    fetchCharacters();
  }, [page]);

  const loadMore = () => {
    if (charNumber+8 >= 20) {
      setPage(prevPage => prevPage + 1);
    }
    setCharNumber(charNumber + 8);
  };

  const handleFilterStatus = (status) => {
    setFilterStatus(status);
  };

  const filteredCharacters = characters.filter(character => {
    if (filterStatus === '') {
      return true; // Mostrar todos los personajes si no hay filtro aplicado
    } else {
      return character.status === filterStatus; // Filtrar por estado seleccionado
    }
  });

  const showCharacters = filteredCharacters.slice((page - 1) * 8, page * 8);

  return (
    <Container>
      <Container className="d-flex align-items-center">
        <Row xs={1} md={2} lg={4} className="g-4">
          {showCharacters.map(character => (
            <Col key={character.id}>
              <CardCat
                name={character.name}
                image={character.image}
                status={character.status}
                species={character.species}
                gender={character.gender}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <Container className="d-flex justify-content-center">
        <div>
          <label htmlFor="filterStatus">Filter by Status:</label>
          <select id="filterStatus" value={filterStatus} onChange={(e) => handleFilterStatus(e.target.value)}>
            <option value="">All</option>
            <option value="Alive">Alive</option>
            <option value="Dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>
        </div>
        {characters.length > 0 && showCharacters.length < characters.length && (
          <button onClick={loadMore}>Load More</button>
        )}
      </Container>
    </Container>
  );
};

export default Catalog;