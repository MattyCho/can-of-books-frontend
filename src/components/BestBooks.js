import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import '../css/BestBooks.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksArray: [],
      email: '',
      book: [],
      bookName: '',
      bookDescription: '',
      bookStatus: '',
      img: '',
      showModal: false,
      updateId: '',
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    this.props.auth0.getIdTokenClaims()
    .then(async res => {
      const jwt = res.__raw;

      const config = {
        headers: {"authorization" : `Bearer ${jwt}`}, 
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        params: { email: this.props.auth0.user.email },
        method: 'get'
      }
      const books = await axios(config);

      this.setState({ booksArray: books.data });
    })
    .catch(err => console.error(err));
  }

  addBook = (e) => {
    e.preventDefault();
    this.props.auth0.getIdTokenClaims()
    .then(async res => {
      const jwt = res.__raw;

      const config = {
        headers: {"Authorization" : `Bearer ${jwt}`},
        data: {
          email: this.props.auth0.user.email,
          name: this.state.bookName,
          description: this.state.bookDescription,
          status: this.state.bookStatus,
          img: this.state.img,
        },
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        method: 'post'
      }
      
      const bookResults = await axios(config);

      this.setState({
        booksArray: bookResults.data,
      });
    })
    .catch(err => console.error(err));
  }

  updateBookName = (e) => {
    e.preventDefault();
    this.setState({ bookName: e.target.value })
  }

  updateBookDescription = (e) => {
    e.preventDefault();
    this.setState({ bookDescription: e.target.value })
  }

  updateBookStatus = (e) => {
    e.preventDefault();
    this.setState({ bookStatus: e.target.value })
  }

  deleteBook = (idx) => {
    this.props.auth0.getIdTokenClaims()
    .then(async res => {
      const jwt = res.__raw;

      const config = {
        headers: {"Authorization" : `Bearer ${jwt}`},
        params: {
          email: this.props.auth0.user.email,
          id: this.state.booksArray[idx]._id,
        },
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        method: 'delete'
      }
      
      const bookResults = await axios(config);
      this.setState({
        booksArray: bookResults.data,
      });
    })
    .catch(err => console.error(err));
  }

  showModal = (idx) => {
    this.setState({
      showModal: true,
      updateId: this.state.booksArray[idx]._id,
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false,
    })
  }

  updateBook = (e) => {
    this.props.auth0.getIdTokenClaims()
    .then(async res => {
      const jwt = res.__raw;

      const config = {
        headers: {"Authorization" : `Bearer ${jwt}`},
        params: {
          email: this.props.auth0.user.email,
          id: this.state.updateId,
          name: this.state.bookName,
          description: this.state.bookDescription,
          status: this.state.bookStatus,
        },
        baseURL: process.env.REACT_APP_SERVER,
        url: '/books',
        method: 'put'
      }
      
      const bookResults = await axios(config);
      this.setState({
        booksArray: bookResults.data,
      });
    })
    .catch(err => console.error(err));  }

  render() {
    return(
      <>
        <Carousel>
          {this.state.booksArray.map((book, idx) => {
            return (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x200.png"
                  alt="Book Cover"
                />
                <Carousel.Caption>
                  <h3>{book.name}</h3>
                  <p>{book.description}</p>
                  <Button onClick={() => this.showModal(idx)}>Update this book</Button>
                  <Button onClick={() => this.deleteBook(idx)}>Remove this book</Button>
                </Carousel.Caption>
              </Carousel.Item>
          )})}
        </Carousel>

        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Book</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.updateBook}>
              <Form.Group className="mb-3" controlId="formBookTitle">
                <Form.Label>Book Title</Form.Label>
                <Form.Control type="text" placeholder="Update book name" onChange={this.updateBookName}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBookDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Update description" onChange={this.updateBookDescription}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBookStatus">
                <Form.Label>Describe Status</Form.Label>
                <Form.Control type="text" placeholder="Update Status" onChange={this.updateBookStatus}/>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={this.updateBook}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Form onSubmit={this.addBook}>
          <Form.Group className="mb-3" controlId="formBookTitle">
            <Form.Label>Book Title</Form.Label>
            <Form.Control type="text" placeholder="Enter book name" onChange={this.updateBookName}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUserDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" placeholder="Enter short description" onChange={this.updateBookDescription}/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSetStatus">
            <Form.Label>Describe Status</Form.Label>
            <Form.Control type="text" placeholder="Reading, Completed, On hold, etc." onChange={this.updateBookStatus}/>
          </Form.Group>

          <Button variant="primary" type="submit" onClick={this.addBook}>
            Submit
          </Button>
        </Form>
      </>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
