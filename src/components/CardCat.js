import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardCat({name, image, status, species, gender}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {status} | {species} | {gender}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default CardCat;