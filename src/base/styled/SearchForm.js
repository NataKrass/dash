import styled from 'styled-components';

const SearchForm = styled.form`
  width: 40%;
  height: 37px;
  position: relative;
  svg {
    position: absolute;
    top: 14px;
    left: 26px;
    background: inherit;
    border: none;
    cursor: pointer;
    font-family: 'Montserrat';
  }
  
  input {
    width: 100%;
    height: 100%;
    padding-left: 60px;
    background: #FFFFFF;
    color: #85929B;
    font-size: 14px;
    border: 1px solid #D1D1D1;
    box-sizing: border-box;
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.06);
    border-radius: 28px;
    font-family: 'Montserrat';
    &:focus-visible {
      outline: none;
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: 10px 0;
  }
`;

export default SearchForm;