import styled from 'styled-components';

const TooltipBox = styled.div`
   cursor: pointer;
   position: relative;
   top: -8px;
   left: -11px;
   height: 0;
   width: 0;
   span{
    position: absolute;
    top: 0;
    left: 17px;
    z-index: 3;
    font-size: 12px;
    font-weight: 400;
    color: ${props => props.theme.colors.white};
    background: rgba(50, 49, 49, 0.7);
    padding: 7px;
    border-radius: 11.5px;
    width: max-content;
    max-width: 200px;
    display: none;
   }
   &:hover {
     span {
       display: block;
     }
   }
  `;

export default TooltipBox;
