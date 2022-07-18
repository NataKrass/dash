import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bool, func, node } from 'prop-types';
import { makeAsOptions } from 'base/utils';
import { setSelectedId } from 'store/slices/gaViewId';
import { useTranslation } from 'react-i18next';
import {
  postConversion,
  putConversion
} from 'store/slices/conversions';
import styled from 'styled-components';
import {
  BlockMargin,
  FilledButton,
  FlexWrapperStartMiddle,
  OutlinedButton,
  StyledSelect,
  TextBlack,
  TextField,
  TextAccentSmall,
  TextBlackSmall
} from 'base/styled';

const Form = styled.form`
  width: 80%;
  .gNivYh {
    align-items: center;
  }
  .dBqIOv {
    position: absolute;
    top: -25px;
  }
  .buYAXv {
    top: 31px;
  }
  .cSqraV {
    margin: 15px 0;
  }
  .jrbpue {
    height: auto;
  }
`;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: '#000000',
    fontSize: '14px',
    background: state.isSelected ? '#FFF9F9' : 'inherit',
    padding: 10,
  }),
};

const Input = styled(TextField)`
  margin-bottom: 10px;
`;

const Select = styled(StyledSelect)`
  margin-right: 0;
`;

const Link = styled.a`
margin-top: 15px;
  display: flex;
  p {
    font-style: italic;
    margin: 0 0 0 5px;
  }
`;

export default function NewForm({ handleDispatch, handleShowFormOff, handleSuccess, setSuccessText, edit, item }) {
  const { t: rootT } = useTranslation('');
  const { t: conversionsT } = useTranslation('conversions');
  const [name, setName] = useState(edit ? item.name : '');
  const [url, setUrl] = useState(edit ? item.page_path : '');
  const [track, setTrack] = useState(false);
  const [element, setElement] = useState(edit ? item.selector : '');
  const types = [
    { value: 'url', label: 'Page Visited' },
    { value: 'selector', label: 'Track Element Clicks' }
  ];
  const [goal, setGoal] = useState( edit
    ? types.find((el) => el.value === item.type)
    : '');
  const [error, setError] = useState(false);
  const { selectedId, ids } = useSelector((state) => state.gaViewIdReducer);
  const filterNameOptions = makeAsOptions(ids, 'id', 'pretty_name');
  const dispatch = useDispatch();

  function handleName(e) {
    setName(e.target.value);
  }

  function handleUrl(e) {
    setUrl(e.target.value);
  }

  function handleElement(e) {
    setElement(e.target.value);
  }

  function handleGoal(e) {
    setGoal(e.value);

    if(e.value === 'selector') {
      setTrack(true);
    } else {
      setTrack(false);
    }
  }

  function handleSelectChange(payload) {
    dispatch(setSelectedId(payload));
  }

  function formSubmit(e) {
    e.preventDefault();

    if (name.length === 0) {
      setError('you have to enter name');
      return;
    }

    if (goal.length === 0) {
      setError('you have to select goal');
      return;
    }
    if (!edit){
      const formData = {
        name: name,
        page_path: url,
        google_analytics_view_id_id: selectedId.value,
        type: goal,
        selector: element
      };
      dispatch(postConversion(formData));
      handleSuccess();
      handleShowFormOff();
      setSuccessText(conversionsT('added'));
    }

    if(edit){
      const formData = {
        name: name,
        page_path: url,
        google_analytics_view_id_id: selectedId.value,
        type: goal.value,
        selector: element
      };
   
      dispatch(putConversion({id:item.id, body:formData}));
      handleDispatch();
      handleShowFormOff();
      //setSuccessText(conversionsT('added'));
    } 
  }

  return (
    <Form onSubmit={formSubmit}>
      <TextBlack>{conversionsT('typeName')}</TextBlack>
      <Input value={name} onChange={handleName} />
      <Select
        value={
          edit
            ? filterNameOptions.find((el) => el.value === item.ga_view?.id)
            : selectedId
        }
        options={filterNameOptions}
        onChange={handleSelectChange}
        styles={customStyles}
      />
      <TextBlack>{conversionsT('goal')}</TextBlack>
      <Select
        value={types.find((el) => el.value === goal)}
        options={types}
        onChange={handleGoal}
        styles={customStyles}
      />

      <TextBlack>{conversionsT('enterUrl')}</TextBlack>
      <Input
        type="url"
        value={url}
        onChange={handleUrl}
        placeholder={conversionsT('urlPlaceholer')}
      />
      {track && (
        <>
          <TextField
            value={element}
            onChange={handleElement}
            placeholder={conversionsT('selectorPlaceholder')}
          />
          <Link href="https://resources.visitorqueue.com/hc/en-us/articles/4408728286861">
            <TextBlackSmall></TextBlackSmall>
            <TextAccentSmall>{conversionsT('howTo')}</TextAccentSmall>
          </Link>
        </>
      )}
      <FlexWrapperStartMiddle>
        <TextAccentSmall>{error}</TextAccentSmall>
        <BlockMargin>
          <FilledButton type="submit">{rootT('save')}</FilledButton>
        </BlockMargin>
        <BlockMargin>
          <OutlinedButton type="reset" onClick={handleShowFormOff}>
            {rootT('cancel')}
          </OutlinedButton>
        </BlockMargin>
      </FlexWrapperStartMiddle>
    </Form>
  );
}

NewForm.propTypes = {
  handleShowFormOff: func,
  handleSuccess: func,
  setSuccessText: func,
  handleDispatch: func,
  edit: bool, 
  item: node
};
