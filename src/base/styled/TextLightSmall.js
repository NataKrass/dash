import styled from 'styled-components';

const TextLightSmall = styled.p`
  font-size: .75rem;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0rem;
  color: ${props => props.theme.colors.lightGrey};
`;

export default TextLightSmall;
