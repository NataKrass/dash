import styled from 'styled-components';

const TextBlackBig = styled.p`
  font-size: 2.25rem;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0rem;
  color: ${props => props.theme.colors.black};
  line-height: 0;
  margin: 0;
  @media (max-width: 768px) {
    line-height: 1.5;
  }
`;

export default TextBlackBig;
