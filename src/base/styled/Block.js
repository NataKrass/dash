import styled from 'styled-components';

const Block = styled.div`
  background: ${props => props.theme.colors.bgLight};
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.13);
  border-radius: 15px;
  padding: 13px 20px;
  display: flex;
  position: relative;
  z-index: auto;
`;

export default Block;
