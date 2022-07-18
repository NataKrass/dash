import styled from 'styled-components';

const ModalFull = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 100%;
  background: #fff;
  overflow-y: scroll;
  @media (max-width: 768px) {
    padding: 30px 30px 50px;
  }
`;
export default ModalFull;
