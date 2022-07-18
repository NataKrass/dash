import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bool, func, object } from 'prop-types';
import { makeAsOptions } from 'base/utils';
import { setSelectedId } from 'store/slices/gaViewId';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  BlockMargin,
  FilledButton,
  FlexWrapperStart,
  FlexWrapperStartMiddle,
  OutlinedButton,
  StyledSelect,
  TextAccentExtraSmall,
  TextAccentThin,
  TextBlack,
  TextField,
} from 'base/styled';
import { ReactComponent as Plus } from 'assets/images/plus.svg';
import { ReactComponent as Delete } from 'assets/images/delete.svg';
import Cascad from './Cascad';
import { postPersonalization, putPersonalization } from 'store/slices/personalizations';


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
  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Wrapper = styled(FlexWrapperStartMiddle)`
  height: 55px;
  @media (max-width: 768px) {
    height: 90px;
    .small {
      width: 60px;
      margin-bottom: 10px;
    }
  }
`;

const Button = styled.div`
  position: absolute;
  right: 0;
  bottom: 16px;
  cursor: pointer;
  width: 30px;
  height: 28px;
  @media (max-width: 768px) {
    right: -45px;
  }
`;

const AddButton = styled.div`
  display: flex;
  padding-top: 30px;
  cursor: pointer;
  svg {
    margin: 7px 10px 0 0;
  }
`;

const CascadWrapper = styled.div`
  position: relative;
`;

const Field = styled(TextField)`
  margin: 10px 0;
  font-family: 'Montserrat', sans-serif;
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const Select = styled(StyledSelect)`
  margin-right: 0;
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

export default function NewForm({ handleShowFormOff, edit, item}) {
  const { t: rootT } = useTranslation('');
  const { t: homeT } = useTranslation('home');
  const { t: personalizationT } = useTranslation('personalization');
  const [name, setName] = useState(edit ? item.name : '');
  const [url, setUrl] = useState(edit ? item.page_path : '');
  const [filterValue, setFilterValue] = useState(edit ? item.lead_filters_attributes[0].value : '');
  const [filterType, setFilterType] = useState(edit ? item.lead_filters_attributes[0].key : '');
  const [filterEqual, setFilterEqual] = useState(edit ? item.lead_filters_attributes[0].operator : 'eq');
  const [setFilterOperator] = useState('');
  const [criteria, setCriteria] = useState([]);
  const { selectedId, ids } = useSelector((state) => state.gaViewIdReducer);
  const filterNameOptions = makeAsOptions(ids, 'id', 'pretty_name');
  const [error, setError] = useState();
  const dispatch = useDispatch();
 
  const operatorOptions = [
    { value: 'or', label: 'or' },
    { value: 'and', label: 'and' },
  ];

  function handleSubmit(formFields) {
    dispatch(postPersonalization(formFields));  
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleUrl(e) {
    setUrl(e.target.value);
  }

  function handleSelectChange(payload) {
    dispatch(setSelectedId(payload));
  }

  function filterValueHandler(e) {
    setFilterValue(e.target.value);
  }

  function filterTypeHandler(e) {
    setFilterType(e.value);
  }

  function filterEqualHandler(e) {
    setFilterEqual(e.value);
  }

  function filterOperatorHandler(e) {
    setFilterOperator(e.value);
  }

  function formSubmit(e) {
    e.preventDefault();

    switch (true) {
    case name.length <= 0:
      setError('Please enter name');
      break;
    case url.length <= 0:
      setError('Please enter URL of the page');
      break;
    case url.substring(0, 4) !== 'http':
      setError('Please enter correct URL start from "http//www"');
      break;
    case filterType.length <= 0:
      setError('Please choose filter type');
      break;
    case filterValue.length <= 0:
      setError('Please choose value');
      break;
    }
  
    if(!edit && validateForm()) {
      const formData = {
        name: name,
        page_path: url,
        google_analytics_view_id_id: selectedId.value,
        lead_filters_attributes: [
          {
            key: filterType,
            operator: filterEqual,
            value: filterValue,
            _destroy: false,
            join_operator: "string"
          }
        ]
      };
      handleSubmit(formData);
      handleShowFormOff();
    }
    if (edit && validateForm()) {
      const formData = {
        name: name,
        page_path: url,
        google_analytics_view_id_id: selectedId.value,
        lead_filters_attributes: [
          {
            id: item.lead_filters_attributes[0].id,
            key: filterType,
            operator: filterEqual,
            value: filterValue,
            join_operator: "AND",
            _destroy: false
          }
        ]
      };
      dispatch(putPersonalization({id: item.id, body:formData}));       
      handleShowFormOff();
    }
  }

  function validateForm() {
    return name.length > 0 && url && filterType.length && filterValue.length;
  }

  const handleDelete = (i) => (e) => {
    e.preventDefault();
    setCriteria(criteria.slice(0, i));
  };

  function addFilterCriteria(e) {
    e.preventDefault();
    setCriteria(criteria.concat(['']));
  }

  return (
    <Form onSubmit={formSubmit}>
      <TextBlack>{personalizationT('typeName')}</TextBlack> 
      <Field value={name} onChange={handleName} />
      <Select
        value={edit ? filterNameOptions.find((el) => el.value === item.ga_view.id) : selectedId}
        options={filterNameOptions}
        onChange={handleSelectChange}
        styles={customStyles}
      />
      <TextBlack>{personalizationT('enterUrl')}</TextBlack>
      <TextField type='url' placeholder="https://example.com" value={url} onChange={handleUrl} />
      <TextBlack>{personalizationT('criteria')}</TextBlack>
      <Cascad
        handlerType={filterTypeHandler}
        handlerEqual={filterEqualHandler}
        handlerValueInput={filterValueHandler}
        filterValue={filterValue}
        styles={customStyles}
        filterType={filterType}
        filterEqual={filterEqual}
        edit={edit}
      />
      {criteria.map((item, index) => (
        <CascadWrapper key={index}>
          <Wrapper>
            {
              <StyledSelect
                placeholder={homeT('or')}
                options={operatorOptions}
                onChange={filterOperatorHandler}
                styles={customStyles}
                className='small'
              />
            }
          </Wrapper>
          <Cascad
            handlerType={filterTypeHandler}
            handlerEqual={filterEqualHandler}
            handlerValueInput={filterValueHandler}
            filterValue={filterValue}
            styles={customStyles}
            index={index}
          />
          <Button onClick={handleDelete(index)}>
            <Delete />
          </Button>
        </CascadWrapper>
      ))}
      <FlexWrapperStart>
        <AddButton onClick={addFilterCriteria}>
          <Plus />
          <TextAccentThin>{rootT('addCriteria')}</TextAccentThin>
        </AddButton>
      </FlexWrapperStart>
      <TextAccentExtraSmall> {error}</TextAccentExtraSmall>
      <FlexWrapperStartMiddle>
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
  handleFetchAll: func, 
  edit: bool, 
  item: object
};
