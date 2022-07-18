import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import styled from 'styled-components';
import {
  AccentButton,
  Block,
  TextField,
  OutlinedButton,
  Modal,
  Overflow,
  TextBlackSmallThin,
} from 'base/styled';
import help from 'assets/images/help_bg.svg';
import call from 'assets/images/phone_bg.svg';
import FormEmail from 'pages/Websites/FormEmail';
import Responsive from 'context/responsive';

const Box = styled(Block)`
  padding: 0;
  width: 670px;
  overflow: hidden;
  form {
    button {
      padding: 6px 16px;
      height: 30px;
    }
    input {
      height: 30px;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    margin: 0 auto;
    overflow-y: auto;
  }
`;

const Content = styled.div`
  padding: 20px 40px;
  @media (max-width: 768px) {
    padding: 0 15px 0 25px;
  }
`;

const Button = styled.div`
  margin-right: auto;
  padding: 20px;
`;

const List = styled.ol`
  padding: 0;
  margin: 0;
  li {
    padding: 0 0 15px 15px;
  }
  li::marker {
    font-weight: 600;
  }
`;

const FormName = styled.form`
  display: flex;
  input {
    width: 65%;
  }
  button {
    margin-left: 20px;
  }
`;

const FormCopy = styled.form`
  display: block;
  textarea {
    font-size: 10px;
    line-height: 14px;
    padding: 8px 15px;
    height: 96px;
    background: #f3f3f3;
    width: 100%;
    color: #626262;
    border: none;
    border-radius: 13px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: end;
  button {
    margin: 10px 0 0 20px;
  }
`;

const HelpBox = styled.div`
  background: #fddddd;
  padding: 20px 0 20px 15px;
  border-radius: 0 0 0 26px;
  overflow: hidden;
  width: 65%;
  a {
    color: #f96652;
    font-weight: 600;
    text-decoration: none;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Help = styled.div`
  background: url(${help}) no-repeat 11px / 96%;
  padding: 20px 40px;
  margin: 30px 0 0 0;
  p {
    width: 125px;
  }
  @media (max-width: 768px) {
    padding: 0px;
    margin: auto;
    background: none;
    p {
      width: auto;
    }
  }
`;

const Call = styled.div`
  background: url(${call}) no-repeat -1px / 60%;
  padding: 20px 40px;
  margin: 30px 0;
  @media (max-width: 768px) {
    padding: 0px;
    margin: auto;
    background: none;
  }
`;

export default function StepTwo({ nextSlide }) {
  const { t: onboardingT } = useTranslation('onboarding');
  const { t: homeT } = useTranslation('home');
  const { t: rootT } = useTranslation();
  const [formEmail, setFormEmail] = useState(false);
  const [siteName, setSiteName] = useState('');
  const [copied, setCopied] = useState(false);

  function handlerSiteName(e) {
    setSiteName(e.value);
  }

  let text = `<script>function vqTrackId(){return '81325789-3c9e-4b3c-98c7-b08f9d39ecbb';} el.sa = function(an, av... `;

  function copyToClipboard(text) {
    const ta = document.createElement('textarea');
    ta.innerText = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    setCopied(true);
  }

  function Next() {
    copyToClipboard(text);
  }

  function formSubmit(e) {
    e.prevent.default;
  }

  function handleFormEmailOff() {
    setFormEmail(false);
  }

  function handleFormEmail() {
    setFormEmail(true);
  }

  const ctx = useContext(Responsive);

  return (
    <div>
      <Box>
        <div>
          <Content>
            <List>
              <li>
                <TextBlackSmallThin>
                  {onboardingT('typeName')}
                </TextBlackSmallThin>
                <FormName onSubmit={formSubmit}>
                  <TextField value={siteName} onChange={handlerSiteName} />
                  <AccentButton>{rootT('save')}</AccentButton>
                </FormName>
              </li>
              <li>
                <TextBlackSmallThin>
                  {onboardingT('copyPaste')}
                </TextBlackSmallThin>
                <FormCopy>
                  <textarea defaultValue={text} />
                  <Buttons>
                    <OutlinedButton onClick={handleFormEmail}>
                      {homeT('sendEmail')}
                    </OutlinedButton>
                    <AccentButton onClick={Next}>
                      {copied ? homeT('copied') : homeT('copy')}
                    </AccentButton>
                  </Buttons>
                  {formEmail && (
                    <Modal>
                      <Overflow onClick={handleFormEmailOff}></Overflow>
                      <FormEmail
                        handleFormEmailOff={handleFormEmailOff}
                        code={text}
                      />
                    </Modal>
                  )}
                </FormCopy>
              </li>
            </List>
          </Content>
          {!ctx.isMobile && (
            <Button>
              <AccentButton onClick={nextSlide}>{rootT('next')}</AccentButton>
            </Button>
          )}
        </div>
        <HelpBox>
          <Help>
            <TextBlackSmallThin>
              {onboardingT('assistance')}
              <a href="#">{onboardingT('insrtuctions')}</a>
              {onboardingT('or')}
              <a href="#">{onboardingT('contactUs')}</a>
            </TextBlackSmallThin>
          </Help>
          <Call>
            <TextBlackSmallThin>{onboardingT('needHelp')}</TextBlackSmallThin>
            <TextBlackSmallThin>
              <a href="#">{onboardingT('scheduleCall')}</a>
              {onboardingT('today')}
            </TextBlackSmallThin>
          </Call>
        </HelpBox>
        {ctx.isMobile && (
          <Button>
            <AccentButton onClick={nextSlide}>{rootT('next')}</AccentButton>
          </Button>
        )}
      </Box>
    </div>
  );
}

StepTwo.propTypes = {
  nextSlide: func,
};
