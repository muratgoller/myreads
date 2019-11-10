import React, { Component } from 'react'
import './App.css'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
import SearchBooks from './SearchBooks'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class BooksApp extends Component {

  constructor(props) {
    super(props)
    this.handleStateChange = this.handleStateChange.bind(this)
    this.state = {
      booksList: []
    }
}
  
   bindGrid(){
    BooksAPI.getAll()
    .then((books) => {
      this.setState(() => ({
        booksList : books
      }))
    }) 
  }

  componentDidMount(){
    this.bindGrid()
  }

  handleStateChange(){
    
    console.log(this.state.booksList)

      setTimeout(
        function() {
          this.bindGrid()
        }
        .bind(this),
        500
    );
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
          <div className="app">
            <BooksGrid
              books={this.state.booksList}
              handleStateChange={this.handleStateChange}
            ></BooksGrid>
            <div className="open-search">
              <Link to="/search">
                <button>Add a book</button>
              </Link>
            </div>
          </div>
        )}></Route>
        
        <Route path='/search' render={({history}) => (
          <SearchBooks
            books = {this.state.booksList}
            handleStateChange={this.handleStateChange}
          ></SearchBooks>
        )}>
        </Route>
      </div>

      
    )
  }
}

export default BooksApp
