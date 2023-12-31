import css from './SearchBar.module.css';
import PropTypes from "prop-types";
import { Component } from 'react';

class SearchBar extends Component {
    state = {
        inputValue: ''
    }

    handleFormInput = (e) => {
        this.setState({ inputValue: e.target.value })
    };

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.onSubmit(this.state.inputValue)
        //this.resetForm();
    };

    resetForm = () => {
        this.setState({ inputValue: '' })
    };

    render() {
        return (
            <header className={css.searchbar}>
                <form className={css.searchform} onSubmit={this.handleFormSubmit}>
                    <button type="submit" className={css.searchform_button} >
                        <span className="button-label">Search</span>
                    </button>

                    <input
                        className={css.searchform_input}
                        value={this.state.inputValue}
                        onChange={this.handleFormInput}
                        type="text"
                        autoComplete="off"
                        name="query"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
    }
}

SearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default SearchBar;