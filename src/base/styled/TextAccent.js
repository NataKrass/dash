import styled from 'styled-components';

const TextAccent = styled.p`
  font-size: .875rem;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0rem;
  color: ${props => props.theme.colors.accentRed};
  line-height: 0;
  @media (max-width: 768px) {
    line-height: 1.5;
  }
`;

export default TextAccent;
