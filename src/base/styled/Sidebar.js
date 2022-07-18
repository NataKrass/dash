import styled from 'styled-components';

const Sidebar = styled.aside`
  max-width: 136px;  
  position: fixed;
  left: 0;
  padding-top: 90px;
  z-index: 8;
  display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 88%;
  @media (max-width: 768px) {
    max-width: fit-content;  
    width: 100%;
    right: 82px;
    left: auto;
    top: 60px;
    padding-top: 0px;
    z-index: 4;
  }
`;

export default Sidebar;
