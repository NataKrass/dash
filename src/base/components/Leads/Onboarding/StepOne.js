import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import styled from 'styled-components';
import { AccentButton, Tip, TextBlackBig, TitleBlack } from "base/styled";
import img from 'assets/images/onboarding_bg.svg';

const Box = styled(Tip)`
  background: url(${img}) no-repeat center / cover;
`; 

const Content = styled.div`
  padding: 40px 70px;
  p {
      width: 260px;
      line-height: 30px;
  }
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Button = styled.div`
  margin-right: auto;
`;

export default function StepOne({nextSlide}) {
  const { t: onboardingT } = useTranslation('onboarding');
  const { t: rootT } = useTranslation();

  return (
    <div>
      <Box>
        <Content>
          <TitleBlack>{onboardingT('welcome')}</TitleBlack>
          <TextBlackBig>{onboardingT('addScript')}</TextBlackBig>
        </Content>
        <Button>
          <AccentButton onClick={nextSlide}>{rootT('next')}</AccentButton>
        </Button>
      </Box>
    </div>
  );
}

StepOne.propTypes = {
  nextSlide: func
};