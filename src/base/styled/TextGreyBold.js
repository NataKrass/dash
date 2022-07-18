import styled from 'styled-components';

const TextGreyBold = styled.p`
  font-size: .875rem;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0rem;
  color: ${props => props.theme.colors.grey};
`;

export default TextGreyBold;
