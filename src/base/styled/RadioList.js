import styled from 'styled-components';
import img from 'assets/images/checked.svg';

const RadioList = styled.div`
  display: flex;
  flex-direction: column;
  input {
    position: absolute;
    appearance: none;
    &:checked {
      opacity: 1;
    }
    &:checked:before {
      content: '';
      position: absolute;
      width: 15px;
      height: 15px;
      background: orange;
      border-radius: 100%;
      left: -25px;
      top: -1px;
      background: url(${img}) 0 0 no-repeat;
    }
  }
  label {
    display: inline-block;
    cursor: pointer;
    font-size: 0.75rem;
    position: relative;
    padding: 15px 25px 12px 32px;
    margin-right: 0;
    line-height: 18px;
    user-select: none;
    &:first-child {
      border-bottom: 1px solid #ededed;
    }
  }
`;

export default RadioList;
