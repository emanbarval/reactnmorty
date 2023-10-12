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
      return true;
    } else {
      return character.status === filterStatus;
    }
  });

  const showCharacters = filteredCharacters.slice((page - 1) * 8, page * 8);

  return (
    <Container>
      <Container className="d-flex justify-content-center">
        <div>
          <div>
            <button
              className={filterStatus === "" ? "active" : ""}
              onClick={() => handleFilterStatus("")}
            >
              All
            </button>
            <button
              className={filterStatus === "Alive" ? "active" : ""}
              onClick={() => handleFilterStatus("Alive")}
            >
              Alive
            </button>
            <button
              className={filterStatus === "Dead" ? "active" : ""}
              onClick={() => handleFilterStatus("Dead")}
            >
              Dead
            </button>
            <button
              className={filterStatus === "unknown" ? "active" : ""}
              onClick={() => handleFilterStatus("unknown")}
            >
              Unknown
            </button>
          </div>
        </div>
      </Container>
      <Container className="d-flex align-items-center">
        <Row xs={1} md={2} lg={4} className="g-4">
          {showCharacters.map(character => (
            <Col key={character.id}>
              <CardCat
                id={character.id}
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
        {characters.length > 0 && showCharacters.length < characters.length && (
          <button onClick={loadMore}>Load More</button>
        )}
      </Container>
    </Container>
  );
};

export default Catalog;