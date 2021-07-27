import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import '../css/BestBooks.css';
import axios from 'axios';

class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booksArray: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/books')
      .then(books => {
        this.setState({booksArray: books.data})
        console.log('State = ', this.state.booksArray)
      }
    )
  }

  render() {
    return(
      <Carousel>
        {this.state.booksArray.map((book, idx) => {
          return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://via.placeholder.com/500x200.png"
                alt="Book Cover Picture"
              />
              <Carousel.Caption>
                <h3>{book.books[0].name}</h3>
                <p>{book.books[0].description}</p>
              </Carousel.Caption>
            </Carousel.Item>
        )})}
      </Carousel>
      // <Jumbotron>
      //   <h1>My Favorite Books</h1>
      //   {this.state.booksArray.map(( book, idx) => {
      //     return (
      //       <div key={idx}>
      //         <p>{book.books[0].name}</p>
      //         <p>{book.books[0].description}</p>
      //        <p>{book.books[0].status}</p>
      //       </div>
      //     )
      //   })};
      // </Jumbotron>
    )
  }
}

export default MyFavoriteBooks;
