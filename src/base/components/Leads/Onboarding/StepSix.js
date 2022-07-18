import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import styled from 'styled-components';
import { AccentButton, Block, TextBlackBig, TitleTwo } from "base/styled";
import img from 'assets/images/tips3.svg';

const Box = styled(Block)`
  background: #fff url(${img}) no-repeat right 86% / contain;
  padding: 30px;
  flex-direction: column;
  justify-content: space-between;
  width: 650px;
  height: 400px;
  @media (max-width: 768px) {
    margin: 0 auto;
    width: auto;
  }
`; 

const Content = styled.div`
  h2 {
    text-align: left;
    padding-top: 60px;
    width: 210px;
  }
  p {
      width: 210px;
      line-height: 20px;
      font-size: 14px;
      height: 150px;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    height: 37px;
  }
`;

export default function StepSix({handleOnboardOff}) {
  
  const { t: onboardingT } = useTranslation('onboarding');

  return (
    <div>
      <Box>
        <Content>
          <TitleTwo>{onboardingT('applyQueue')}</TitleTwo>
          <TextBlackBig>{onboardingT('addNew')}</TextBlackBig>
        </Content>
        <Button>
          <AccentButton onClick={handleOnboardOff}>{onboardingT('seeLeads')}</AccentButton>
        </Button>
        
      </Box>
    </div>
  );
}

StepSix.propTypes = {
  handleOnboardOff: func
};