import styled from 'styled-components';
import { Block } from "base/styled";

const Tip = styled(Block)`
  padding: 30px;
  flex-direction: column;
  justify-content: space-between;
  width: 650px;
  height: 400px;
  @media (max-width: 768px) {
    margin: 0 auto;
    width: 90%;
  }
`; 

export default Tip;
