import styled from 'styled-components';

const AccentButton = styled.button.attrs(props => ({
  type: props.type || 'button'
}))`
font-family: inherit;
  padding: 6px 14px;
  font-size: .875rem;
  height: 37px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.accentRed};
  color: ${props => props.theme.colors.white};
  cursor: pointer;
  background: ${props => props.theme.colors.accentRed};
  white-space: nowrap;
  svg {
    margin-right: 8px;
  }
  @media (max-width: 830px) {
    svg {
      margin-right: 4px;
    }
  }
`;

export default AccentButton;
