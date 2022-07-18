import styled from 'styled-components';
import { func } from 'prop-types';
import { Modal, Overflow } from "base/styled";
import Slider from './Slider';

const Block = styled.div`
  margin: 0 auto;
`;

export default function Onboarding({handleOnboardOff}) {
  return (
    <Modal>
      <Overflow></Overflow>
      <Block>
        <Slider handleOnboardOff={handleOnboardOff} />
      </Block>
    </Modal>
   
  );
}

Onboarding.propTypes = {
  handleOnboardOff: func,
};
