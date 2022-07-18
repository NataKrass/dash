import styled from 'styled-components';

const Header = styled.header`
  background-color: ${ ({ theme }) => theme.colors.bgLight };
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.13);
  padding: 15px;
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  .center {
    display: flex;
    align-items: center;
  }
`;

export default Header;
