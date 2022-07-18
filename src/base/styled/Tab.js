import styled from 'styled-components';

const Tab = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  padding: 10px;
  margin-right: 0.1rem;
  font-size: 0.875rem;
  height: 37px;
  font-family: ${props => props.theme.fonts.main};
  border: 1px solid red;
  border-radius: 23px;
  background-color: ${(props) => (props.active ? props => props.theme.colors.accentRed : 'white')};
  color: ${(props) => (props.active ? 'white' : props => props.theme.colors.accentRed)};
  transition: background-color 0.5s ease-in-out;
  @media (max-width: 768px) {
    margin: 0 0 10px 10px;
  }
`;

export default Tab;