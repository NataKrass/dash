import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { array, bool, func, node, number, object, string } from 'prop-types';
import { makeAsOptions } from 'base/utils';
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
} from 'base/styled';
import FormTextField from 'base/components/FormTextField';
import Cascad from './Cascad';
import { postAssignRule, putAssignRule } from 'store/slices/assignRules';

const FlexWrapperStartMiddlePadding = styled(FlexWrapperStartMiddle)`
  padding-top: 40px;
`;

const FlexWrap = styled(FlexWrapperStart)`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Form = styled.form`
  input {
    color: #1D1D1D;
    font-size: .8rem;
    font-family: 'Montserrat', sans-serif;
  }
  @media (max-width: 768px) {
    width: 100%;
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

export default function AutoAssignForm({
  setShowOff,
  setSuccess,
  edit,
  name,
  website,
  user,
  users,
  filters, 
  lead,
}) {
  const { t: homeT } = useTranslation('home');
  const [filterName, setFilterName] = useState(edit ? name : '');

  const [filterValue, setFilterValue] = useState(edit ? filters[0].value : '');
  const [filterType, setFilterType] = useState(edit ? filters && filters[0].key : '');
  const [filterEqual, setFilterEqual] = useState(edit ? filters && filters[0].operator : '');
  //const [filterOperator, setFilterOperator] = useState('');
  const [error, setError] = useState();
  const { selectedId, ids } = useSelector((state) => state.gaViewIdReducer);
  const dispatch = useDispatch();

  const websitesOptions = makeAsOptions(ids, 'id', 'pretty_name');

  const optionsUsers = makeAsOptions(users, 'id', 'full_name');

  const [filterUser, setFilterUser] = useState(
    edit ? optionsUsers.find((el) => el.label === user) : ''
  );
  const [selectedWebsite, setSelectedWebsite] = useState(
    edit ? websitesOptions.find((el) => el.label === website) : selectedId
  );

  function handleSubmit(formFields) {
    dispatch(postAssignRule(formFields));  
  }

  function handleSubmitEdit(id, body) {
    dispatch(putAssignRule({id, body}));  
  }

  function handleWebsite(item) {
    setSelectedWebsite(item);
  }

  function filterNameHandler(e) {
    setFilterName(e.target.value);
  }

  function filterUserHandler(item) {
    setFilterUser(item);
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

  function filterSubmit(e) {
    e.preventDefault();

    switch (true) {
    case filterName.length <= 0:
      setError('Please enter name');
      break;
    case filterUser.length <= 0:
      setError('Please choose user');
      break;
    case filterType.length <= 0:
      setError('Please choose filter type');
      break;
    case filterValue.length <= 0:
      setError('Please choose value');
      break;
    }

    if (!edit && validateForm()) {
      const postUserData = {
        name: filterName,
        google_analytics_view_id_id: selectedId.value,
        website: selectedId.label,
        user_id: filterUser.value,
        lead_filters_attributes: [
          {
            id: 0,
            key: filterType,
            operator: filterEqual,
            value: filterValue,
            _destroy: false,
            join_operator: '',
          },
        ],
      };
      console.log(postUserData);

      handleSubmit(postUserData);
      setFilterName('');
      setFilterType('');
      setFilterEqual('');
      setFilterValue('');
      setFilterUser('');
      setSuccess(true);
    }
    if (edit && validateForm()) {
      const data = {
        name: filterName,
        google_analytics_view_id_id: lead.ga_view.id,
        user_id: filterUser?.value,
        lead_filters_attributes: [
          {
            id: lead.lead_filters_attributes[0].id,
            key:  filterType,
            operator: filterEqual,
            value:  filterValue,
            join_operator:  lead.lead_filters_attributes[0].join_operator,
            _destroy: false
          },
        ],
      };
    
      handleSubmitEdit(lead.id, data);
      
      setSuccess(true);
    }  
  }
  console.log(filterUser, lead?.ga_view.id);

  function validateForm() {
    return filterName.length > 0 && filterUser.value && filterType.length && filterValue.length;
  }

  return (
    <Form onSubmit={filterSubmit}>
      <FlexWrap>
        <BlockMargin>
          <FormTextField
            type="text"
            onChange={filterNameHandler}
            value={filterName}
            label={homeT('filterName')}
          />
        </BlockMargin>
        <BlockMargin>
          <label>{homeT('website')}</label>
          {
            <StyledSelect
              value={selectedWebsite}
              options={websitesOptions}
              onChange={handleWebsite}
              styles={customStyles}
            />
          }
        </BlockMargin>
        <BlockMargin>
          <label>{homeT('users')}</label>
          {
            <StyledSelect
              options={optionsUsers}
              styles={customStyles}
              menuPlacement="bottom"
              value={filterUser}
              onChange={filterUserHandler}
            />
          }
        </BlockMargin>
      </FlexWrap>
      <Cascad
        handlerType={filterTypeHandler}
        handlerEqual={filterEqualHandler}
        handlerValueInput={filterValueHandler}
        filterValue={filterValue}
        styles={customStyles}
        filterType={filterType}
        filterEqual={filterEqual}
        filters={filters}
      />
      <TextAccentExtraSmall>{error}</TextAccentExtraSmall>
      <FlexWrapperStartMiddlePadding>
        <BlockMargin>
          <FilledButton type="submit">{homeT('saveFilter')}</FilledButton>
        </BlockMargin>
        <BlockMargin>
          <OutlinedButton type="reset" onClick={setShowOff}>
            {homeT('cancel')}
          </OutlinedButton>
        </BlockMargin>
      </FlexWrapperStartMiddlePadding>
    </Form>
  );
}

AutoAssignForm.propTypes = {
  setSuccess: func,
  onAddRule: func,
  setShowOff: func,
  edit: bool, 
  name: string, 
  website: string, 
  user: string, 
  users: array,
  id: number,
  ga_view: object,
  lead: node, 
  filters: node
};
