import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import styled from 'styled-components';
import { AccentButton, Tip, OutlinedButton, TextBlackBig, TitleTwo } from "base/styled";
import img from 'assets/images/tips2.svg';

const Box = styled(Tip)`
  background: #fff url(${img}) no-repeat right 86% / contain;
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

export default function StepFive({nextSlide, handleOnboardOff}) {
  const { t: onboardingT } = useTranslation('onboarding');
  const { t: rootT } = useTranslation();

  return (
    <div>
      <Box>
        <Content>
          <TitleTwo>{onboardingT('filterLeads')}</TitleTwo>
          <TextBlackBig>{onboardingT('applyFilters')}</TextBlackBig>
        </Content>
        <Button>
          <AccentButton onClick={nextSlide}>{rootT('next')}</AccentButton>
          <OutlinedButton onClick={handleOnboardOff}>{onboardingT('skip')}</OutlinedButton>
        </Button>
        
      </Box>
    </div>
  );
}

StepFive.propTypes = {
  nextSlide: func,
  handleOnboardOff: func
};