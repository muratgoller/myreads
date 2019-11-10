import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import SelectList from './SelectList'
import * as Constants from './Constants'
//import serializeForm from 'form-serialize'

class SearchBooks extends Component
{
    state = 
    {
        query : ''
    }

    updateQuery = (query) => {
        this.setState(()=>({
            query : query.trim()
        }))
    } 

    render()
    {
        const { query } = this.state
        const { books, handleStateChange } = this.props

        //console.log(books)

        const showingBooks = query === '' 
        ? books 
        : books.filter((b) => (
            b.title.toLowerCase().includes(query.toLowerCase()) || 
            b.authors.filter((author) => (
                author.toLowerCase().includes(query.toLowerCase())
            )).length > 0
        ))

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" onClick={handleStateChange}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            onChange={(event)=>this.updateQuery(event.target.value)}
                            />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {showingBooks.map((book) => (
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
        )
    }
}

export default SearchBooks