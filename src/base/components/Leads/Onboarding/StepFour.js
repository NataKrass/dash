import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import styled from 'styled-components';
import { AccentButton, Tip, OutlinedButton, TextBlackBig, TitleTwo } from "base/styled";
import img from 'assets/images/tips1.svg';

const Box = styled(Tip)`
  background: #fff url(${img}) no-repeat right 86% / contain;
`; 

const Content = styled.div`
  h2 {
    text-align: left;
    padding-top: 20px;
    width: 210px;
  }
  p {
      width: 210px;
      line-height: 20px;
      font-size: 14px; 
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    height: 37px;
  }
`;

const List = styled.ul`
  margin: 0;
  padding: 0 30px 40px;
  p {
    font-weight: 600;
  }
`;

export default function StepFour({nextSlide, handleOnboardOff}) {
  const { t: onboardingT } = useTranslation('onboarding');
  const { t: rootT } = useTranslation();

  return (
    <div>
      <Box>
        <Content>
          <TitleTwo>{onboardingT('quickInfo')}</TitleTwo>
          <TextBlackBig>{onboardingT('fromDash')}</TextBlackBig>
          <List>
            <li>
              <TextBlackBig>{onboardingT('currentPlan')}</TextBlackBig>
            </li>
            <li>
              <TextBlackBig>{onboardingT('numberVisitors')}</TextBlackBig>
            </li>
            <li>
              <TextBlackBig>{onboardingT('visitorLocations')}</TextBlackBig>
            </li>
          </List>
        </Content>
        <Button>
          <AccentButton onClick={nextSlide}>{rootT('next')}</AccentButton>
          <OutlinedButton onClick={handleOnboardOff}>{onboardingT('skip')}</OutlinedButton>
        </Button>
        
      </Box>
    </div>
  );
}

StepFour.propTypes = {
  nextSlide: func,
  handleOnboardOff: func
};