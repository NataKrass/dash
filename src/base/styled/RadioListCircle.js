import styled from 'styled-components';
import img from 'assets/images/radio_circle.svg';
import active from 'assets/images/active_circle.svg';

const RadioListCircle = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  input {
    position: absolute;
    appearance: none;
    &:before {
      content: '';
      position: absolute;
      width: 17px;
      height: 17px;
      background: orange;
      border-radius: 100%;
      left: -25px;
      top: -1px;
      background: url(${img}) 0 0 no-repeat;
    }
    &:checked {
      opacity: 1;
    }
    &:checked:before {
      content: '';
      position: absolute;
      width: 17px;
      height: 17px;
      background: orange;
      border-radius: 100%;
      left: -25px;
      top: -1px;
      background: url(${active}) 0 0 no-repeat;
    }
  }
  label {
    display: flex;
    cursor: pointer;
    font-size: 0.75rem;
    position: relative;
    padding: 2px 20px;
    margin-right: 0;
    line-height: 18px;
    user-select: none;
  }
`;

export default RadioListCircle;
