import { useState } from 'react';
import { any, func } from 'prop-types';
import CreatableSelect from 'react-select/creatable';
import {
  AccentButton,
  ButtonsWrap,
  OutlinedButton,
  TextBlackBig,
  TextBlackThin,
} from 'base/styled';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import network from 'base/network';

const Content = styled.div`
  padding: 10px 10px 10px 20px;
  button {
    margin-top: 20px;
  }
`;

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: '#000000',
    fontSize: '.75em',
    padding: 10,
  }),
  control: () => ({
    borderRadius: '8px',
    fontSize: '.75em',
    border: '1px solid #d1d1d1',
    display: 'flex',
    maxWidth: '240px'
  }),
  menu: () => ({
    fontSize: '.75em',
    fontWeight: '600'
  })
};

export default function Tags({handleShowModalOff, handleSuccess, leadsMarked}) {
  const { t: popupT } = useTranslation('popup');
  const { t: rootT } = useTranslation('');

  const [tags, setTag] = useState();

  const tag = [
    { value: 'lead', label: 'lead' },
    { value: 'newlead', label: 'new lead' }
  ];
  
  function tagHandler(e) {
    setTag(Array.isArray(e) ? e.map(x => x.value) : []);
  }
   
  function handleSubmit() {
    network.post('/api/leads/lead_tags', {
      tags: tags.join(),
      selected_ids: leadsMarked.join(),
    });
    handleSuccess();
  }

  return (
    <form>
      <TextBlackBig style={{textAlign: "center"}}>{rootT('tags')}</TextBlackBig>
      <Content>
        <TextBlackThin>{popupT('tagTo')}</TextBlackThin>
        <CreatableSelect
          isMulti
          options={tag}
          onChange={tagHandler}
          styles={customStyles}
        />
        <ButtonsWrap>
          <OutlinedButton onClick={handleShowModalOff}>
            {rootT('cancel')}
          </OutlinedButton>
          <AccentButton onClick={handleSubmit}>{rootT('save')}</AccentButton>
        </ButtonsWrap>
      </Content>
    </form>
  );
}

Tags.propTypes = {
  handleShowModalOff: func,
  handleSuccess: func,
  leadsMarked: any
};
