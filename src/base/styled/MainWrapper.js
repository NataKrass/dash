import styled from 'styled-components';

const MainWrapper = styled.main`
  padding-top: 70px;  
  @media (max-width: 768px) {
    padding-left: 0; 
  }
  @media (min-width: 769px) {
    .lefted {
      transition: .5s;
      margin-left: -75px;
    }
  }
  .detailed {
    .leads {
      right: -238px;
    }
    .company {
      top: 42%;
      right: -195px;
    }
  }
`;

export default MainWrapper;
