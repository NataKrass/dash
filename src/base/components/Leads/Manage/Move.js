import { useState } from 'react';
import { func } from 'prop-types';
import {
  AccentButton,
  ButtonsWrap,
  Check,
  OutlinedButton,
  TextAccentThin,
  TextBlackBig,
  TextBlackThin,
} from 'base/styled';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { useForm } from "react-hook-form";

const Content = styled.div`
  padding: 20px 10px 10px 20px;
`;

const Wrap = styled.div`
  position: relative;
  display: flex;
  padding: 10px 0;
  p {
    margin: 8px 10px;
  }
  @media (max-width: 768px) {
    .checkbox-text {
      line-height: 0;
    } 
  }
`;

export default function Move({handleShowModalOff, handleSuccess}) {
  const { t: popupT } = useTranslation('popup');
  const { t: rootT } = useTranslation('');
  const [text, setText] = useState('');
  const {
    register,
    getValues,
    handleSubmit
  } = useForm();
  const atLeastOne = () =>
    getValues("text").length ? setText('') : setText("errorFormText");
  
  const options = [
    {name: 'has name'},
    {name: 'has position'},
    {name: 'has phone number'},
    {name: 'has Linkedin'},
    {name: 'has Twitter'}
  ];
   
  const onSubmit = data => {
    if(getValues("text").length) {
      console.log('move:', data, getValues("text"));
      handleSuccess();
    } else {
      setText("check at least one item");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextAccentThin>{text}</TextAccentThin>
      <TextBlackBig>{rootT('move')}</TextBlackBig>
      <Content>
        <TextBlackThin>{popupT('moveTo')}</TextBlackThin>
        {options.map((item) => (
          <Wrap key={item.name}>
            <Check
              type="checkbox"
              value={item.name}
              {...register('text', {
                validate: atLeastOne,
              })}
            />
            <span></span>
            <label>
              <TextBlackThin className='checkbox-text'>{item.name}
              </TextBlackThin>
            </label>
          </Wrap>
        ))}
        <ButtonsWrap>
          <OutlinedButton onClick={handleShowModalOff}>
            {rootT('cancel')}
          </OutlinedButton>
          <AccentButton type="submit">{rootT('move')}</AccentButton>
        </ButtonsWrap>
      </Content>
    </form>
  );
}

Move.propTypes = {
  handleShowModalOff: func,
  handleSuccess: func
};
