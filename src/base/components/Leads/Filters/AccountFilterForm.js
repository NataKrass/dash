import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bool, func, node } from 'prop-types';
import { makeAsOptions } from 'base/utils';
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
  TextAccent,
  TextAccentThin,
  TextLight,
} from 'base/styled';
import FormTextField from 'base/components/FormTextField';
import { ReactComponent as Plus } from 'assets/images/plus.svg';
import { ReactComponent as Delete } from 'assets/images/delete.svg';
import { putAFilter, postAFs } from 'store/slices/accFilters';

const Button = styled.div`
  position: absolute;
  right: -25px;
  bottom: 0;
  cursor: pointer;
  width: 30px;
  height: 28px;
`;

const BlockMarginRelative = styled(BlockMargin)`
  position: relative;
`;

const TextLightAbsolute = styled(TextLight)`
  position: absolute;
  top: 47px;
`;

const FlexWrapperStartMiddlePadding = styled(FlexWrapperStartMiddle)`
  padding-top: 40px;
`;

const Wrapper = styled(FlexWrapperStartMiddle)`
  height: 65px;
  position: relative;
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

const AddButton = styled.div`
  display: flex;
  padding-top: 30px;
  cursor: pointer;
  svg {
    margin: 7px 10px 0 0;
  }
`;

const FlexWrap = styled(FlexWrapperStart)`
  @media (max-width: 768px) {
    flex-direction: column;
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

const Form = styled.form`
  @media (max-width: 768px) {
    width: 100%;
    .equal {
      margin: 10px 0;
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

export default function AccountFilter({ handle, edit, filterAccountEdit }) {
  const { t: homeT } = useTranslation('home');
  const [filterName, setFilterName] = useState(
    filterAccountEdit ? filterAccountEdit.name : ''
  );

  const [criteria, setCriteria] = useState(
    edit ? filterAccountEdit?.lead_filters_attributes : [DEFAULT_EMPTY_CRITERIA]
  );
  const [error, setError] = useState('');
  const { selectedId, ids } = useSelector((state) => state.gaViewIdReducer);
  const dispatch = useDispatch();

  const websitesOptions = makeAsOptions(ids, 'id', 'pretty_name');
  
  const options = [
    { value: 'page_path', label: 'Page Path' },
    { value: 'query', label: 'Query String' },
    { value: 'country', label: 'Visitor Location Country' },
    { value: 'region', label: 'Visitor Location State/Province' },
  ];

  const [filterType, setFilterType] = useState(
    filterAccountEdit
      ? options.find((el) =>
        el.value === filterAccountEdit?.lead_filters_attributes[0]?.key
      )
      : ''
  );

  const equalsOptions = [
    { value: '=', label: 'equals' },
    { value: '!=', label: 'not equal to' },
    { value: 'contains', label: 'contains' },
    { value: 'does not containt', label: 'does not contain' },
  ];

  const [filterEqual, setFilterEqual] = useState(
    filterAccountEdit
      ? equalsOptions.find((el) =>
        el.value === filterAccountEdit?.lead_filters_attributes[0].operator
      )
      : ''
  );

  const [filterValue, setFilterValue] = useState(
    filterAccountEdit ? filterAccountEdit?.lead_filters_attributes[0].value : ''
  );
  const operatorOptions = [
    { value: 'OR', label: 'or' },
    { value: 'AND', label: 'and' },
  ];

  const [selectedWebsite, setSelectedWebsite] = useState(
    filterAccountEdit
      ? websitesOptions.find((el) => el.value === filterAccountEdit?.ga_view?.id)
      : selectedId
  );

  function handleWebsite(item) {
    setSelectedWebsite(item);
  }

  function filterNameHandler(e) {
    setFilterName(e.target.value);
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
      const filterAccountData = {
        name: filterName,
        google_analytics_view_id_id: selectedId.value,
        lead_filters_attributes: criteria
      };
      dispatch(postAFs({...filterAccountData}));
      handle();
    }

    if (edit && validateForm()) {
      const filterAccountData = {
        name: filterName,
        google_analytics_view_id_id: selectedId.value,
        lead_filters_attributes: criteria
      };
      //console.log(filterAccountData);
      const Id = filterAccountEdit.id;
      dispatch(putAFilter({ id: Id, body: filterAccountData }));
      setFilterName('');
      setFilterType('');
      setFilterEqual('');
      setFilterValue('');
      handle();
    }
  }

  function validateForm() {
    return (
      filterName.length > 0 &&
      selectedId.label &&
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
    setCriteria(criteria.concat({...DEFAULT_EMPTY_CRITERIA, _id: uuidv4()}));
  }

  return (
    /* eslint-disable */
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
      </FlexWrap>
      {criteria.map((item, index) => (
        <div className="cascad" key={index}>
          <Wrapper className="operator">
            {
              <StyledSelectSmall
                placeholder={homeT('and')}
                options={operatorOptions}
                defaultValue={ operatorOptions.find((el) => el.value === item.join_operator) }
                onChange={(e) => filterOperatorHandler(e, item)}
                styles={customStyles}
              />
            }
          </Wrapper>
          <Wrapper>
            <BlockMargin>
              {
                <StyledSelect
                  placeholder={homeT('filterType')}
                  options={options}
                  onChange={(e) => filterTypeHandler(e, item)}
                  styles={customStyles}
                  menuPlacement="bottom"
                  defaultValue={ options.find((el) => el.value === item.key) }
                />
              }
            </BlockMargin>
            <BlockMargin>
              {
                <StyledSelect
                  options={equalsOptions}
                  onChange={(e) => filterEqualHandler(e, item)}
                  styles={customStyles}
                  defaultValue={ equalsOptions.find((el) => el.value === item.operator) }
                  className="equal"
                />
              }
            </BlockMargin>
            <BlockMarginRelative>
              <FormTextField
                type="text"
                onChange={(e) => filterValueHandler(e, item)}
                value={item.value}
                label={homeT('value')}
                defaultValue={ item.value }
              />
              <TextLightAbsolute>{homeT('useCommas')}</TextLightAbsolute>
            </BlockMarginRelative>
            <Button className="delete" onClick={handleDelete(index)}>
              <Delete />
            </Button>
          </Wrapper>
        </div>
      ))}
      <FlexWrapperStart>
        <AddButton
          onClick={addFilterCriteria}
        >
          <Plus />
          <TextAccentThin>{homeT('addFilterCriteria')}</TextAccentThin>
        </AddButton>
      </FlexWrapperStart>
      <TextAccent>{error}</TextAccent>
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

AccountFilter.propTypes = {
  handle: func,
  edit: bool,
  filterAccountEdit: node
};
