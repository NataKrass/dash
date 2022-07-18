import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  BlockMargin,
  FlexWrapperStart,
  FlexWrapperStartMiddle,
  StyledSelect,
  TextAccentThin,
  TextLight,
} from 'base/styled';
import { ReactComponent as Plus } from 'assets/images/plus.svg';
import FormTextField from 'base/components/FormTextField';

const BlockMarginRelative = styled(BlockMargin)`
  position: relative;
`;

const TextLightAbsolute = styled(TextLight)`
  position: absolute;
  top: 47px;
`;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: '#000000',
    fontSize: '12px',
    background: state.isSelected ? '#FFF9F9' : 'inherit',
    padding: 10,
  }),
};

const AddButton = styled.div`
 display: flex;
 padding-top: 30px;
 cursor: pointer;
 svg {
  margin: 7px 10px 0 0;
 }
`;

export default function FilterCriteria() {
  const { t: homeT } = useTranslation('home');
  const [filterValue, setFilterValue] = useState('');

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ];

  const equalsOptions = [
    { value: 'equals', label: 'equals' },
    { value: 'not equal to', label: 'not equal to' },
    { value: 'contains', label: 'contains' },
    { value: 'does not contain', label: 'does not contain' }
  ];
  
  function filterValueHandler(e) {
    setFilterValue(e.target.value);
  }

  function filterTypeHandler(e) {
    setFilterType(e.value);
  }

  function filterEqualHandler(e) {
    setFilterEqual(e.value);
  }

  return (
    <>
      <FlexWrapperStartMiddle>
        <BlockMargin>
          {
            <StyledSelect
              placeholder={homeT('filterType')}
              options={options}
              onChange={filterTypeHandler}
              styles={customStyles}
              menuPlacement="bottom"
            />
          }
        </BlockMargin>
        <BlockMargin>
          {
            <StyledSelect
              placeholder={homeT('equals')}
              options={equalsOptions}
              onChange={filterEqualHandler}
              styles={customStyles}
            />
          }
        </BlockMargin>
        <BlockMarginRelative>
          <FormTextField
            type="text"
            onChange={filterValueHandler}
            value={filterValue}
            label={homeT('value')}
          />
          <TextLightAbsolute>{homeT('useCommas')}</TextLightAbsolute>
        </BlockMarginRelative>
      </FlexWrapperStartMiddle>
      <FlexWrapperStart>
        <AddButton>
          <Plus />
          <TextAccentThin>Add filter criteria</TextAccentThin>
        </AddButton>
      </FlexWrapperStart>
    </>
  );
}
