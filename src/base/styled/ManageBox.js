import styled from 'styled-components';

const ManageBox = styled.div`
  position: absolute;
  top: 0;
  right: 48px;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.13);
  border-radius: 6px;
  padding: 5px 10px;
  z-index: 33;
  background: #fff;
  a {
    display: flex;
    padding: 6px 10px;
    font-weight: 400;
    color: $main-dark-color;
    transition: .3s;
    &:hover {
      background: #FFF1EE;
      border-radius: 9px;
    }
    svg {
      max-width: 17px;
      margin-right: 15px!important;
    }
    span {
      padding-top: 2px;
    }
  }
  
  }
`;

export default ManageBox;