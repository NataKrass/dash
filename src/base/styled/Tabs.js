import styled from 'styled-components';

const Tabs = styled.div`
  overflow: hidden;
  height: 3rem;
  display: flex;
  width: 80%;
  justify-content: space-evenly;
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: end;
    flex-wrap: wrap;
    height: 5.5rem;
  }
`;

export default Tabs;