import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SelectList from './SelectList'
import * as Constants from './Constants'
//import serializeForm from 'form-serialize'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component
{
    state = {
        query: '',
        booksList: [],
        myLibrary: []
    }

    // Update search query
    updateQuery = (query) => {
        
        this.setState({
          query: query
    
        })
        this.updateSearchedBooks(query);
    }

    // Update search books with query entered
    updateSearchedBooks = (query) => {
        if(query){
          BooksAPI.search(query).then((searchedBooks) => {
            if (searchedBooks.error){
              this.setState({booksList: []});
            } else {
              this.setState({booksList: searchedBooks});
            }
          })

          BooksAPI.getAll().then((books) => {
            this.setState({myLibrary: books});
            console.log(this.state)
          })

        } else {
          this.setState({ booksList: []});
        }
    }

    matchMyLibrary = (bookID) => {
        const matchedBooks = this.state.myLibrary.filter(e => e.id == bookID)
        
        return matchedBooks.length == 0 ? "currentlyReading" : matchedBooks[0].shelf
    }

    render()
    {
        const { query, booksList } = this.state
        const { handleStateChange } = this.props

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" onClick={handleStateChange}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            onChange={(e) => this.updateQuery(e.target.value)}
                            />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {booksList.length == 0 ? null : booksList.map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                        <SelectList 
                                            SelectedValue={this.matchMyLibrary(book.id)}
                                            Book = {book}
                                            handleStateChange = {handleStateChange}
                                            ></SelectList>
                                        </div>
                                    </div>
                                    <div className="book-title">{book.title}</div>
                                    <div className="book-authors">{book.authors}</div>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBooks