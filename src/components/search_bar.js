import React, {Component} from 'react';

class SearchBar extends Component{
  constructor(props){
    super(props);

    this.state = {term: ''};
  }

  render(){
    const { search } = this.props;
    const moveContainer = search ? 'move-container' : '';
    const alignImage = search ? 'align-image' : '';
    const alignInput = search ? 'align-input' : '';
    const longInput = search ? 'long-input' : '';
    return (
      <div>
        <div
          className={'search-container ' + moveContainer}
          >
          <img
            src={require('../images/youtubeapplogo.png')}
            alt='youtube logo'
            className={'logo ' + alignImage}
          />
          <form
            onSubmit={this.formSubmitted}
            className={'search-input ' + alignInput}
            >
            <input
              value = {this.state.term}
              onChange={event => this.onInputChange(event.target.value)}
              placeholder="Search"
              className={longInput}
            />
            <button
              onClick={event => this.executeSearch(this.state.term) }
              className="search-button"
              >
            </button>
          </form>
        </div>
      </div>
    );
  }
  formSubmitted(event){
    event.preventDefault();
  }

  executeSearch(term){
    this.props.onSearchTermChange(term);
  }

  onInputChange(term){
    this.setState({term});
  }
}

export default SearchBar;
