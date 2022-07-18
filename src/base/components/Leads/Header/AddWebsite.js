import { useState } from 'react';
import { bool, func, node, object } from 'prop-types';
import styled from 'styled-components';
import {
  AccentButton,
  FlexWrapper,
  FlexWrapperStart,
  OutlinedButton,
  TextBlackSmall,
  TextField,
  TextLight,
  TextLightExtraSmallBold,
  TitleSmallBlack,
  ModalContent,
  TextAccentSmall,
  TextArea
} from 'base/styled';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Warn } from 'assets/images/warn.svg';
import { ReactComponent as Success } from 'assets/images/success.svg';
import { ReactComponent as Close } from 'assets/images/close.svg';
import { ReactComponent as Arrow } from 'assets/images/arrow_left.svg';
import { useDispatch } from 'react-redux';
import { postWebsite } from 'store/slices/websites';


const BtnWrap = styled.div`
  padding: 60px 0 0;
  text-align: right;
`;

const Text = styled(TextArea)`
  border: 1px solid #73CCFE;
  background: #FFF9F9;
  color: #85929B;
  font-weight: 600;
  padding: 9px 20px;
  height: 51px;
  font-size: 12px;
`;

export default function AddWebsite({ handleOpenAddOff, edit, item, handleUpdate, site }) {
  const { t: website } = useTranslation('website');
  const [siteName, setSiteName] = useState(edit ? item.name : site?.name);
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  function handlerSiteName(e) {
    setSiteName(e.target.value);
  }

  function handleStepOne() {
    setStepTwo();
    setStepOne(true);
    setStepThree();
  }

  function handleStepTwo() {
    if (siteName) {
      const data = {
        name: siteName,
      };
      setStepOne(false);
      setStepTwo(true);
      //handleOpenAddOff();
      setStepOne(false);
      setStepTwo(true);
      !site && dispatch(postWebsite(data));
    } else {
      setError('You have to enter a name for the website');
      return;
    }
  }

  function handleStepThree() {
    setStepTwo();
    setStepOne();
    setStepThree(true);
  }

  let text = site?.tracking_script;

  function copyToClipboard(text) {
    const ta = document.createElement('textarea');
    ta.innerText = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    handleStepThree();
  }

  function handleLater() {
    handleStepThree();
    setCopied(false);
  }

  function Next() {
    copyToClipboard(text);
    setCopied(true);
  }

  return (
    <>
      {stepOne && (
        <ModalContent>
          <FlexWrapper className="content title">
            <TitleSmallBlack>{website('newWebsite')}</TitleSmallBlack>
            {!edit && (
              <TextLightExtraSmallBold>
                {website('stepOne')}
              </TextLightExtraSmallBold>
            )}
          </FlexWrapper>
          <FlexWrapperStart className="content">
            <Warn />
            <TextLight>{website('siteName')}</TextLight>
          </FlexWrapperStart>
          <form>
            <label>
              <TextLight>{website('name')}</TextLight>
            </label>
            <TextField value={siteName} onChange={handlerSiteName} />

            <BtnWrap>
              <TextAccentSmall>{error}</TextAccentSmall>
              <OutlinedButton onClick={handleOpenAddOff}>
                {website('cancel')}
              </OutlinedButton>
              {edit ? (
                <AccentButton onClick={handleUpdate(item.id, siteName)}>
                  {website('save')}
                </AccentButton>
              ) : (
                <AccentButton onClick={handleStepTwo}>
                  {website('next')}
                </AccentButton>
              )}
            </BtnWrap>
          </form>
        </ModalContent>
      )}
      {stepTwo && !edit && (
        <ModalContent>
          <FlexWrapper className="content">
            <Arrow onClick={handleStepOne} />
            <TitleSmallBlack>{website('newWebsite')}</TitleSmallBlack>
            <TextLightExtraSmallBold>
              {website('stepTwo')}
            </TextLightExtraSmallBold>
          </FlexWrapper>
          <FlexWrapperStart className="content info">
            <Warn />
            <TextLight>{website('newWebsite2')}</TextLight>
          </FlexWrapperStart>
          <form>
            <Text defaultValue={text} />
            <BtnWrap>
              {edit ? (
                <OutlinedButton onClick={handleOpenAddOff}>
                  {website('cancel')}
                </OutlinedButton>
              ) : (
                <OutlinedButton onClick={handleLater}>
                  {website('later')}
                </OutlinedButton>
              )}
              
              <AccentButton onClick={Next}>{website('copy')}</AccentButton>
            </BtnWrap>
          </form>
        </ModalContent>
      )}
      {stepThree && !edit && (
        <ModalContent className="success">
          <FlexWrapper className="success_icon">
            <Success />
            <Close />
          </FlexWrapper>

          <TitleSmallBlack>{website('success')}</TitleSmallBlack>

          {copied &&  <TextBlackSmall className="success_text">
            {website('copied')}
          </TextBlackSmall>}
          <div className="success_btn">
            <AccentButton onClick={handleOpenAddOff}>
              {website('close')}
            </AccentButton>
          </div>
        </ModalContent>
      )}
    </>
  );
}

AddWebsite.propTypes = {
  handleOpenAddOff: func,
  edit: bool, 
  item: node, 
  handleUpdate: func, 
  site: object
};
