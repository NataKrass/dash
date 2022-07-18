import styled from 'styled-components';

const OutlinedButton = styled.button.attrs(props => ({
  type: props.type || 'button'
}))`
  padding: 10px 16px;
  height: 37px;
  border-radius: 8px;
  font-family: ${props => props.theme.fonts.main};
  border: 1px solid ${props => props.theme.colors.accentRed};
  color: ${props => props.theme.colors.accentRed};
  cursor: pointer;
  background-color: transparent;
  svg {
    margin-right: 10px;
  }
`;

export default OutlinedButton;
