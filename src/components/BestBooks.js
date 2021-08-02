import React from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import '../css/BestBooks.css';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import {Button} from 'react-bootstrap';


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
    }
  }

  componentDidMount() {
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

        // const books = await axios.get('${http://localhost:3001}/books', {headers: {"authorization" : `Bearer ${jwt}`}})

        this.setState({ booksArray: books.data });
      })
      .catch(err => console.error(err));
  }

  addBook = () => {
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

      // const bookResults = await axios.post('http://localhost:3001/books', {headers: {"authorization" : `Bearer ${jwt}`}})

      this.props.updateBookArray(bookResults.data);
    })
    .catch(err => console.error(err));
  }

  updateBookName = (e) => {
    this.setState({ name: e.target.value })
  }

  updateBookDescription = (e) => {
    this.setState({ description: e.target.value })
  }

  updateBookStatus = (e) => {
    this.setState({ status: e.target.value })
  }

  deleteBook = (e, id) => {
    e.preventDefault();
    axios.delete(`${process.env.REACT_APP_SERVER}/books/${id}`)
      .then(result => {
        console.log(result);
      })
  }

  render() {
    return(
      <>
        <Carousel>
          {this.state.booksArray > 1 && this.state.booksArray.map((book, idx) => {
            return (
              <Carousel.Item key={idx}>
                <img
                  className="d-block w-100"
                  src="https://via.placeholder.com/800x200.png"
                  alt="Book Cover"
                />
                <Carousel.Caption>
                  <h3>{book.books[0].name}</h3>
                  <p>{book.books[0].description}</p>
                  <Button onClick={this.deleteBook}> Remove this book</Button>
                </Carousel.Caption>
              </Carousel.Item>
          )})}
        </Carousel>

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
