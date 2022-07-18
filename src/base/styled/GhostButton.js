import styled from 'styled-components';

const GhostButton = styled.a`
  font-family: inherit;
  padding: 6px 14px;
  font-size: .875rem;
  text-decoration: none;
  height: 30px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.colors.accentRed};
  color: ${props => props.theme.colors.accentRed};
  cursor: pointer;
  background: ${props => props.theme.colors.white};
  svg {
    margin: 0 8px -4px 0;
  }
`;

export default GhostButton;

