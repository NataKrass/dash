import { useState, useEffect } from 'react';
import { func, object, string } from 'prop-types';
import {
  BlockMargin,
  FlexWrapperStartMiddle,
  StyledSelect,
  TextLight
} from 'base/styled';
import styled from 'styled-components';
import FormTextField from 'base/components/FormTextField';
import { useTranslation } from 'react-i18next';
import FormTextFieldTime from 'base/components/FormTextFieldTime';
import Industry from 'base/components/Leads/Filters/Industry';

const Wrapper = styled(FlexWrapperStartMiddle)`
  position: relative;
  height: 40px;
  align-items: center;
`;

const BlockMarginRelative = styled(BlockMargin)`
  position: relative;
`;

const TextLightAbsolute = styled(TextLight)`
  position: absolute;
  top: 33px;
`;

function Cascad({handlerType, handlerEqual, handlerValueInput, filterValue, styles}) {
  const { t: homeT } = useTranslation('home');
  const [selected, setSelected] = useState('');
  const [input, setInput] = useState(false); 
  const [multi, setMulti] = useState(false); 
  const [time, setTime] = useState(false); 
  const [tree, setTree] = useState(false);

  function changeSelectOptionHandler(event){
    setSelected(event.value);
    handlerType(event);
  }
  
  const data = [
    { value: 'industry', label: 'Industry' },
    { value: 'company_name', label: 'Company Name' },
    { value: 'domain', label: 'Domain' },
    { value: 'employees', label: 'Approximate Employees' },
    { value: 'tag', label: 'tag' },
    { value: 'full_contact_city', label: 'Headquarters City' },
    { value: 'full_contact_region', label: 'Headquarters Region' },
    { value: 'full_contact_country', label: 'Headquarters Country' }, 
    { value: 'city', label: 'Visitor Location City' },
    { value: 'region', label: 'Visitor Location State/Province' },
    { value: 'country', label: 'Visitor Location Country' },
    { value: 'source', label: 'Source/Medium' },


    { value: 'visits', label: 'Number Visits' },
    { value: 'page_path', label: 'Page Path' },
    { value: 'query_string', label: 'Query String' },
   
    

  ];

  const equalsOptions = [
    { value: 'eq', label: 'equals' },
    { value: 'not_eq', label: 'not equal to' },
    { value: 'cont', label: 'contains' },
    { value: 'not_cont', label: 'does not contain' }
  ];
  
  const equalsOptionsGr = [
    { value: 'eq', label: 'equals' },
    { value: 'not_eq', label: 'not equal to' },
    { value: 'gt', label: 'greater than' },
    { value: 'gteq', label: 'greater than or equal to' },
    { value: 'lt', label: 'less than' },
    { value: 'lteq', label: 'less than or equal to' }
  ];

  const equal = [
    { value: 'eq', label: 'equals' },
    { value: 'not_eq', label: 'not equal to' }
  ];

  const industry = [
    { value: '1', label: '1' },
    { value: 'Language', label: 'Language' },
    { value: 'Data Structure', label: 'Data Structure'}
  ];

  let type = null;
  let value = null;
  
  if (selected === 'employees') {
    type = equalsOptionsGr;
  } else if (selected === 'industry') {
    type = equal;
    value = industry;
  } else if (selected === 'company_name' 
  || selected === 'domain' 
  || selected === 'full_contact_city' 
  || selected === 'source'
  || selected === 'full_contact_city' 
  || selected === 'full_contact_country' 
  || selected === 'full_contact_region'
  || selected === 'city' 
  || selected === 'country' 
  || selected === 'region'
  || selected === 'tag') {
    type = equalsOptions;
    // value = data6;
  }

  useEffect(() =>{
    if (selected === 'employees' 
    || selected === 'company_name' 
    || selected === 'domain' 
    || selected === 'full_contact_city' 
    || selected === 'full_contact_country' 
    || selected === 'full_contact_region' 
    || selected === 'source'
    || selected === 'city' 
    || selected === 'country' 
    || selected === 'region'
    || selected === 'tag') {
      setInput(true);
      setTime(false);
    } else if (selected === 'industry') {
      setTime(false);
      setInput(false);
      setTree(true);
    } else {
      setInput(false);
      setMulti(false);
      setTree(false);
    }
  }, [selected] );
  
  return (
    <Wrapper>
      <BlockMargin>
        <StyledSelect
          placeholder='Filter Type'
          options={data}
          onChange={changeSelectOptionHandler}
          styles={styles}
        />
      </BlockMargin>
      <BlockMargin>
        {
          <StyledSelect
            placeholder={homeT('equals')}
            options={type}
            onChange={handlerEqual}
            styles={styles}
          />
        }
      </BlockMargin>
      <BlockMarginRelative>
        {input ? (
          <>
            {time ? (
              <>
                <FormTextFieldTime
                  label={homeT('min')}
                />
                <FormTextFieldTime
                  label={homeT('sec')}
                />
              </>
            ) : (
              <FormTextField
                type='text'
                onChange={handlerValueInput}
                value={filterValue}
                label={homeT('value')}
               
              />
            )}
            {!time && <TextLightAbsolute>{homeT('useCommas')}</TextLightAbsolute>}
          </>
        ) : (
          <>
            {tree ? (<Industry />)
              : (<StyledSelect options={value} isMulti={multi} styles={styles} />)
            }
          </>
        )}
      </BlockMarginRelative>
    </Wrapper>
  );
}
  
export default Cascad;

Cascad.propTypes = {
  handlerType: func, 
  handlerEqual: func,
  handlerValueInput: func, 
  filterValue: string,
  styles: object
};