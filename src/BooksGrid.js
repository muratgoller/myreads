import React, { Component } from 'react'
import SelectList from './SelectList'
import * as Constants from './Constants'

class BooksGrid extends Component
{
    render(){

        const { books, handleStateChange } = this.props

        //console.log(books)

        return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            {Constants.shelves.map((shelf) => (
                <div key={shelf.Value} className="bookshelf">
                <h2 className="bookshelf-title">{shelf.Text}</h2>
                <div className="bookshelf-books">
                    <ol key={shelf.Value} className="books-grid">
                        {books.filter((b) => (b.shelf === shelf.Value)).map((book) => (
                            <li key={book.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                        <div className="book-shelf-changer">
                                        <SelectList 
                                            SelectedValue={book.shelf}
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
            ))}
          </div>
        </div>
        )
    }
}

export default BooksGrid