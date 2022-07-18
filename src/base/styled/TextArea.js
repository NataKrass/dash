import styled from 'styled-components';

const TextArea = styled.textarea.attrs('type="text"')`
  border: ${props => props.theme.borders.textInput};
  font-family: 'Montserrat', sans-serif;
  border-radius: 8px;
  height: 38px;
  width: 100%;
  padding: 0 10px;
  color: ${props => props.theme.colors.lightGrey};
  transition: all 0.2s;
  &:focus-visible {
    outline: none;
  }
  &::-webkit-input-placeholder  {
    color: ${props => props.theme.colors.lightGrey};
  }
`;

export default TextArea;
