import styled from 'styled-components';

const TextLightSmallBold = styled.p`
  font-size: .75rem;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0rem;
  color: ${props => props.theme.colors.lightGrey};
`;

export default TextLightSmallBold;
