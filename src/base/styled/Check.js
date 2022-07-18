import styled from 'styled-components';

const Check = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0; 
  cursor: pointer;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;

  & + span {
  display: inline-block;
  position: relative;
  top: -1px;
  width: 20px;
  height: 20px;
  margin: -1px 0px 0 0;
  vertical-align: middle;
  border: ${props => props.theme.borders.checkbox};
  border-radius: 3px;
  cursor: pointer;
}
&:checked + span {
  
  border: ${props => props.theme.borders.checkboxChecked};
}

&:checked + span:after {
  position: absolute;
  content: '';
  width: 12px;
  height: 12px;
  top: 3px;
  left: 3px;
  background: ${props => props.theme.colors.accentRed};
  border-radius: 3px;
}
& + span {
  margin-right: 4px;
}
`;

export default Check;
