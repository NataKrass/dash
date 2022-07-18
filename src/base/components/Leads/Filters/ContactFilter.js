import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { array, func } from 'prop-types';
import styled from 'styled-components';
import {
  BlockMargin,
  FilledButton,
  FlexWrapperStart,
  FlexWrapperStartMiddle,
  OutlinedButton,
  Check,
  TextAccentThin
} from 'base/styled';
import { useForm } from "react-hook-form";
import network from 'base/network';

const FlexWrapperStartMiddlePadding = styled(FlexWrapperStartMiddle)`
  padding-top: 40px;
`;

const BlockMarginRelative = styled(BlockMargin)`
  position: relative;
  @media (max-width: 768px) {
    margin: 8px 0
  }
`;

const FlexWrap = styled(FlexWrapperStart)`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default function ContactFilter({handle, allContact}) {
  const { t: homeT } = useTranslation('home');
  const [text, setText] = useState('');
  const {
    register,
    getValues,
    handleSubmit
  } = useForm();
  const atLeastOne = () =>
    getValues("contact").length ? setText('') : setText("errorFormText");
  const [list, setList] = useState();
  

  const options = [
    {name:'name', label:'Name' },
    {name:'position', label:'Position'},
    {name:'phone_number', label:'Phone Number'},
    {name:'linkedin', label: 'Linkedin'},
    {name:'twitter', label: 'Twitter'}
  ];
   
  const onSubmit = data => {
    if (getValues("contact").length) {
      const formdata = {
        contact_filters_attributes: allContact.map((el) => (
          {
            id: el.id,
            key: el.key,
            value: data.contact.includes(el.key)
          }
        ))
      };
      network.put('/api/contact_filters', formdata);
     
      setList(data.contact);
      handle();
    }
    else {
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextAccentThin>{text}</TextAccentThin>
      <FlexWrap>
        {options.map((value) => (
          <>
            <BlockMarginRelative key={value.name}>
              
              <Check
                type="checkbox"
                value={value.name}
                // checked={value.name==='name'}
                {...register('contact', {
                  validate: atLeastOne,
                })}
              />
            
              <span></span>
              <label>Has {value.label}</label>
            </BlockMarginRelative>
          </>
        ))}
      </FlexWrap>
      <FlexWrap>
        {list && list}
      </FlexWrap>
      <FlexWrapperStartMiddlePadding>
        <BlockMargin>
          <FilledButton type="submit">{homeT('saveFilter')}</FilledButton>
        </BlockMargin>
        <BlockMargin>
          <OutlinedButton onClick={handle}>{homeT('cancel')}</OutlinedButton>
        </BlockMargin>
      </FlexWrapperStartMiddlePadding>
    </form>
  );
}

ContactFilter.propTypes = {
  handle: func,
  allContact: array
};
