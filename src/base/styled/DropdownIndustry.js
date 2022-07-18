import styled from 'styled-components';

const DropdownIndustry = styled.div`
  display: block;
  .react-dropdown-tree-select .dropdown .dropdown-trigger {
    border: ${props => props.theme.borders.selectBorder};
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    color: ${props => props.theme.colors.darkGrey};
    font-size: 12px;
  }
  .mdl .checkbox-item {
    position: relative;
    width: 1rrem;
    height: 1rrem;
    margin-right: 0.75rrem;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: 0;
    vertical-align: middle;
    height: 18px;
    padding-left: 22px;
  }
  
  .mdl .checkbox-item:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 18px;
    height: 17px;
    border: 1px solid #D8D8D8;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
  }
  
  .mdl .checkbox-item:checked:before {
    border-color: red;
  }

  .mdl .checkbox-item:checked:after {
    content: "";
    position: absolute;
    width: 13px;
    height: 12px;
    top: 3px;
    left: 3px;
    background: #F96652;
    border-radius: 3px;
    transition: all 0.3s ease-in-out;
    display: block;
  }
`;

export default DropdownIndustry;