import styled from 'styled-components';

const Text = styled.p`
  font-size: .875rem;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0rem;
  color: ${props => props.theme.colors.grey};
`;

export default Text;
