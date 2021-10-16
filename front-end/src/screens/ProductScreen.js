import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import axios from 'axios';
import Rating from '../components/Rating';

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await axios.get(`/products/${match.params.id}`);

      setProduct(res.data);
    };

    fetchProduct();
  }, []);

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variants='flush'>
            <ListGroup.Item>
              <h2>{product.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={` ${product.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price : ${product.price}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description : {product.description}</strong>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <Row>
                <Col>Status :</Col>{' '}
                <Col>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </Col>
              </Row>
            </ListGroup.Item>
            <Button
              className='btn-block'
              type='button'
              disabled={product.countInStock === 0}
            >
              Add To Cart
            </Button>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;