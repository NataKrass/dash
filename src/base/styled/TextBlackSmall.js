import styled from 'styled-components';

const TextBlackSmall = styled.p`
  font-size: .75rem;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0rem;
  color: ${props => props.theme.colors.black};
`;

export default TextBlackSmall;
