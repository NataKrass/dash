import styled from 'styled-components';

const FilledButton = styled.button`
  padding: 10px 16px;
  height: 37px;
  border-radius: 8px;
  font-family: ${props => props.theme.fonts.main};
  background-color: ${props => props.theme.colors.accentRed};
  border: none;
  color: ${props => props.theme.colors.bgLight};
  cursor: pointer;
`;

export default FilledButton;
