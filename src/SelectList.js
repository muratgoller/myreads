import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import * as Constants from './Constants'

class SelectList extends Component
{
    state = {
        Book : {}
    }

    handleSubmit = (e) =>
    {
        BooksAPI.update(this.state.Book, e.target.value);

        this.props.handleStateChange(e)
    }

    componentDidMount()
    {
        this.setState({ Book: this.props.Book });
    }

    render()
    {
        const { SelectedValue, Book } = this.props

        return(
            <select id={Book.id} key={Book} defaultValue={SelectedValue} onChange={this.handleSubmit}>
                    {Constants.Options.map((option) => (
                        <option 
                            key={option.value} 
                            value={option.value}
                            disabled={option.value == 'move'}
                        >{option.label}</option>
                    ))}
            </select>
        )
    }
}

export default SelectList