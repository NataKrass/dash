import styled from 'styled-components';
import Block from './Block';

const Confirm = styled(Block)`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  p {
    padding: 50px 0;
  }
  @media (max-width: 768px) {
    width: 93vw;
    text-align: center;
    p {
      margin: 0 auto;
    }
  }
`;

export default Confirm;