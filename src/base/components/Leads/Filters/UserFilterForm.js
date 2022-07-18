import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bool, func, node } from 'prop-types';
import { makeAsOptions } from 'base/utils';
import { fetchUsers } from 'store/slices/users';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';
import {
  BlockMargin,
  FilledButton,
  FlexWrapperStart,
  FlexWrapperStartMiddle,
  OutlinedButton,
  StyledSelect,
  StyledSelectSmall,
  TextAccentSmall,
  TextAccentThin
} from 'base/styled';
import FormTextField from 'base/components/FormTextField';
import { ReactComponent as Plus } from 'assets/images/plus.svg';
import { ReactComponent as Delete } from 'assets/images/delete.svg';
import Cascad from './Cascad';
import { postUF, putUF } from 'store/slices/userFilters';

const FlexWrapperStartMiddlePadding = styled(FlexWrapperStartMiddle)`
  padding-top: 40px;
`;

const Wrapper = styled(FlexWrapperStartMiddle)`
  height: 55px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    height: auto;
    margin: 10px 0;
    .bsfINW {
      width: 100%;
      min-width: auto;
    }
  }
`;

const Button = styled.div`
  position: absolute;
  right: -25px;
  bottom: 0;
  cursor: pointer;
  width: 30px;
  height: 28px;
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

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: '#000000',
    fontSize: '14px',
    background: state.isSelected ? '#FFF9F9' : 'inherit',
    padding: 10,
  }),
};

const FlexWrap = styled(FlexWrapperStart)`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Form = styled.form`
@media (max-width: 768px) {
  width: 100%;
  .equal {
    margin: 10px 0
  }
  .value {
    margin-bottom: 10px;
  }
}
.cascad:nth-child(2) .operator,
.cascad:nth-child(2) .delete {
  display: none;
}
`;

const DEFAULT_EMPTY_CRITERIA = {
  key: '',
  operator: '',
  value: '',
  join_operator: 'AND',
  _id: uuidv4()
};

export default function UserFilterForm({ handle,
  filterUserEdit,
  edit
}) {
  const { t: homeT } = useTranslation('home');
  const { users } = useSelector((state) => state.usersReducer);
  const [filterName, setFilterName] = useState(
    filterUserEdit ? filterUserEdit.name : ''
  );
  const [criteria, setCriteria] = useState(
    edit ? filterUserEdit?.lead_filters_attributes : [DEFAULT_EMPTY_CRITERIA]
  );

  const [filterValue, setFilterValue] = useState('');
  const [filterType, setFilterType] = useState([]);
  const [filterEqual, setFilterEqual] = useState('');
  
  const [error, setError] = useState('');
   
  const { selectedId, ids } = useSelector((state) => state.gaViewIdReducer);

  const dispatch = useDispatch();
  
  const websitesOptions = makeAsOptions(ids, 'id', 'pretty_name');

  const [selectedWebsite, setSelectedWebsite] = useState(
    filterUserEdit
      ? websitesOptions.find((el) => el.value === filterUserEdit?.ga_view?.id)
      : selectedId
  );
  const [defaultUsers, setDefaultUsers] = useState();

  useEffect(() => {
    dispatch(fetchUsers({ users }));
    if(filterUserEdit) {
      setDefaultUsers(filterUserEdit?.users?.map(u => {
        return {
          label: u.full_name,
          value: u.id
        };
      }));
    } else {
      setDefaultUsers(users?.map(u => {
        return {
          label: u.full_name,
          value: u.id
        };
      }));
    }
  /* eslint-disable */
  }, [dispatch]);
  /* eslint-enable */

  const usersOptions = makeAsOptions(users, 'id', 'full_name');
  const [filterUser, setFilterUser] = useState('');

  const operatorOptions = [
    {value: 'OR', label: 'or'},
    {value: 'AND', label: 'and'},
  ];

  function handleWebsite(item) {
    setSelectedWebsite(item);
  }

  function filterNameHandler(e) {
    setFilterName(e.target.value);
  }

  function filterUserHandler(e) {
    setFilterUser(Array.isArray(e) ? e.map(x => x.value) : []);
  }

  function filterValueHandler(e, item) {
    const newCriteria = [...criteria];
    const currentItemIndex = newCriteria.indexOf(item);
    newCriteria[currentItemIndex] = {
      ...newCriteria[currentItemIndex],
      value: e.target.value
    };
    setCriteria(newCriteria);
    setFilterValue(e.target.value);
  }

  function filterTypeHandler(e, item) {
    const newCriteria = [...criteria];
    const currentItemIndex = newCriteria.indexOf(item);
    newCriteria[currentItemIndex] = {
      ...newCriteria[currentItemIndex],
      key: e.value
    };
    setCriteria(newCriteria);
    setFilterType(e.value);
  }

  function filterEqualHandler(e, item) {
    const newCriteria = [...criteria];
    const currentItemIndex = newCriteria.indexOf(item);
    newCriteria[currentItemIndex] = {
      ...newCriteria[currentItemIndex],
      operator: e.value
    };
    setCriteria(newCriteria);
    setFilterEqual(e.value);
  }

  function filterOperatorHandler(e, item) {
    const newCriteria = [...criteria];
    const currentItemIndex = newCriteria.indexOf(item);
    newCriteria[currentItemIndex] = {
      ...newCriteria[currentItemIndex],
      join_operator: e.value
    };
    setCriteria(newCriteria);
  }

  function filterSubmit(e) {
    e.preventDefault();

    switch (true) {
    case filterName.length <= 0:
      setError('Please enter name');
      break;
    case !selectedId.value:
      setError('Please choose website');
      break;
    case filterUser === '':
      setError('Please choose users');
      break;
    case !filterType:
      setError('Please choose filter type');
      break;
    case !filterEqual:
      setError('Please choose filter equal');
      break;
    case filterValue.length <= 0:
      setError('Please enter value');
      break;
    }
    
    if (!edit && validateForm()) { 
      const filterUserData = {
        name: filterName,
        google_analytics_view_id_id: selectedId.value,
        user_ids: filterUser,
        lead_filters_attributes: criteria
      };
      console.log(filterUserData);
      dispatch(postUF({...filterUserData}));
      handle();
    }
    if (edit && validateForm()) {
      
      const filterUserData = {
        name: filterName,
        google_analytics_view_id_id: selectedId.value,
        user_ids: filterUser,
        lead_filters_attributes: criteria
      };
      console.log(filterUserData);
      const Id = filterUserEdit.id;
      dispatch(putUF({id: Id,  body:filterUserData}));
      handle();
    }

  }

  function validateForm() {
    return (
      filterName.length > 0 &&
      selectedId.label &&
      filterUser !== '' &&
      filterType &&
      filterEqual &&
      filterValue !== ''
    );
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
              width="300px"
            />
          }
        </BlockMargin>
        <BlockMargin>
          <label>{homeT('users')}</label>
          {
            <StyledSelect
              isMulti
              defaultValue={ defaultUsers?.map(ele => ele) }
              options={usersOptions}
              onChange={filterUserHandler}
              styles={customStyles}
              menuPlacement="bottom"
            />
          }
        </BlockMargin>
      </FlexWrap>

      {criteria.map((item, index) => (
        <CascadWrapper key={index} className="cascad">
          <Wrapper className="operator">
            {
              <StyledSelectSmall
                placeholder={homeT('or')}
                options={operatorOptions}
                defaultValue={ operatorOptions.find((el) => el.value === item.join_operator) }
                onChange={(e) => filterOperatorHandler(e, item)}
                styles={customStyles}
              />
            }
          </Wrapper>
          <Cascad
            handlerType={filterTypeHandler}
            handlerEqual={filterEqualHandler}
            handlerValue={filterValueHandler}
            filterValue={filterValue}
            styles={customStyles}
            index={index}
            item={item}
            edit={edit}
            users={defaultUsers}
          />
          <Button className="delete" onClick={handleDelete(index)}>
            <Delete />
          </Button>
        </CascadWrapper>
      ))}
      <FlexWrapperStart>
        <TextAccentSmall>{error}</TextAccentSmall>
        <AddButton onClick={addFilterCriteria}>
          <Plus />
          <TextAccentThin>{homeT('addFilterCriteria')}</TextAccentThin>
        </AddButton>
      </FlexWrapperStart>
      <FlexWrapperStartMiddlePadding>
        <BlockMargin>
          <FilledButton type="submit">{homeT('saveFilter')}</FilledButton>
        </BlockMargin>
        <BlockMargin>
          <OutlinedButton type="reset" onClick={handle}>
            {homeT('cancel')}
          </OutlinedButton>
        </BlockMargin>
      </FlexWrapperStartMiddlePadding>
    </Form>
  );
}

UserFilterForm.propTypes = {
  filterUserEdit: node,
  edit: bool,
  handle: func
};
