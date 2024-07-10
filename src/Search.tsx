import React, { Component } from 'react';

interface SearchProps {
  onSearch: (term: string) => void;
}

interface State {
  term: string;
}

class Search extends Component<SearchProps, State> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      term: '',
    };
  }

  componentDidMount() {
    const savedTerm = localStorage.getItem('searchTerm');
    if (savedTerm) {
      this.setState({ term: savedTerm });
    }
  }

  handleSearch = () => {
    const trimmedTerm = this.state.term.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    this.props.onSearch(trimmedTerm);
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ term: e.target.value });
  };

  render() {
    return (
      <div className="search">
        <input
          type="text"
          value={this.state.term}
          onChange={this.handleChange}
          placeholder="Search Pokemon"
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default Search;
