import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import styled from 'styled-components';
import { AccentButton, Tip, OutlinedButton, TextBlackBig, TitleBlack, TitleTwo } from "base/styled";
import img from 'assets/images/tips_bg.svg';

const Box = styled(Tip)`
  background: #fff url(${img}) no-repeat right / contain;
`; 

const Content = styled.div`
  h2 {
    text-align: left;
    padding-top: 80px;
  }
  p {
      width: 210px;
      line-height: 20px;
      font-size: 14px;
      padding-bottom: 40px;
  }
`;

const Title = styled.div`
  width: 30%;
  h1 {
    text-align: left;
    margin: 0;
  }
`;

const Button = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    height: 37px;
  }
`;

export default function StepThree({nextSlide, handleOnboardOff}) {
  const { t: onboardingT } = useTranslation('onboarding');
  const { t: rootT } = useTranslation();

  return (
    <div>
      <Box>
        <Content>
          <Title>
            <TitleBlack>{onboardingT('tips')}</TitleBlack>
          </Title>
          <TitleTwo>{onboardingT('click')}</TitleTwo>
          <TextBlackBig>{onboardingT('getDetail')}</TextBlackBig>
        </Content>
        <Button>
          <AccentButton onClick={nextSlide}>{rootT('next')}</AccentButton>
          <OutlinedButton onClick={handleOnboardOff}>{onboardingT('skip')}</OutlinedButton>
        </Button>
        
      </Box>
    </div>
  );
}

StepThree.propTypes = {
  nextSlide: func,
  handleOnboardOff: func
};