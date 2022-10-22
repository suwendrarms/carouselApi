import Carousel from "./Slider";
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

function CarouselHome() {
  return (
    <>
      <Carousel slides="7" infinite={true} />


      <div className="d-grid gap-2 add-btn">
        <Link to={'/create-slider'} >
          <Button variant="primary" size="lg">
            Create Slide
          </Button>
        </Link>
      </div>
    </>)
  
}

export default CarouselHome;