import styled from 'styled-components';

const MenuItem = styled.li`
  height: 52px;
  border-top-right-radius: 26px;
  border-bottom-right-radius: 26px;
  background-color: transparent;
  display: flex;
  align-items: center;
  padding-left: 15px;
  font-weight: ${ props => props.$active ? '600' : '400'};
  font-size: 12px; 
  transition: 0.2s all;
`;

export default MenuItem;
