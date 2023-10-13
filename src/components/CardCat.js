import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

function CardCat({id, name, image, status, species, gender}) {
  if(status === 'Alive')
  {
    status = <span className='alive'>{status}</span>;
  }
  else if(status === 'Dead')
  {
    status = <span className='dead'>{status}</span>;
  }
  else if(status === 'unknown')
  {
    status = (status[0].toUpperCase() + status.slice(1));
    status = <span className='unknown'>{status}</span>;
  }
  return (
    
    <Link to={`/profile/${id}`}>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {status} | {species} | {gender}
        </Card.Text>
      </Card.Body>
    </Card>
    </Link>
  );
}

export default CardCat;