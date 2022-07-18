import styled from 'styled-components';

const TextAccentThin = styled.p`
  font-size: .875rem;
  font-style: normal;
  font-weight: 500;
  letter-spacing: 0rem;
  color: ${props => props.theme.colors.accentRed};
  line-height: 0;
`;

export default TextAccentThin;
