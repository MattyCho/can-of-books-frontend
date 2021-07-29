import React from 'react';
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
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/books')
      .then(books => {
        this.setState({
          booksArray: books.data,
          email: books.data[0].email,
        })
        console.log('State = ', this.state.booksArray);
      }
    )
  }

  addBook = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/books', { email: this.state.email, books: [{ name: this.state.bookName, description: this.state.bookDescription, status: this.state.bookStatus}] })
      .then(cat => {
        // update to match my variables
        console.log(cat.data.name);
        this.setState({ cats: [...this.state.cats, {name: cat.data.name}] }) // rewatch this part of the lecture
      })
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
    axios.delete(`http://localhost:3001/books/${id}`)
      .then(result => {
        console.log(result);
        // in order to remove the cat from our list of cats, filter out the cat via it's id
      })
  }

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

export default MyFavoriteBooks;
