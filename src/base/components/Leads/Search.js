import { func } from 'prop-types';
import { ReactComponent as SearchIcon } from 'assets/images/search.svg';
import { SearchForm } from 'base/styled';


export default function Search ({handleSubmit, handleText}) {

  return (
    <SearchForm> 
      <SearchIcon onClick={handleSubmit}/>
      <input type="text" placeholder="Search" onChange={handleText}/>
    </SearchForm>
  );
}

Search.propTypes = {
  handleSubmit: func,
  handleText: func
};


