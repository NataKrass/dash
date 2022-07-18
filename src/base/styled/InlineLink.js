import { Link } from 'react-router-dom';
import styled from 'styled-components';

const InlineLink = styled(Link)`
  color: ${props => props.theme.colors.black};
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.colors.accentRed}
  }
`;

export default InlineLink;
