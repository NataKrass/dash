import { useState, useEffect } from 'react';
import { any, array, bool, func, object } from 'prop-types';
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
import Industry from './../Filters/Industry';
import network from 'base/network';

const Wrapper = styled(FlexWrapperStartMiddle)`
  position: relative;
  height: 65px;
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

const BlockMarginRelative = styled(BlockMargin)`
  position: relative;
`;

const TextLightAbsolute = styled(TextLight)`
  position: absolute;
  top: 47px;
`;

const Block = styled(BlockMargin)`
  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

function Cascad({
  handlerType,
  handlerEqual,
  handlerValue,
  edit,
  styles,
  item,
  users,
  filterValueSelectHandler,
  filterEqual,
  setFilterEqual,
  filterValue,
  setFilterValue,
  setSelectUser
}) {
  const { t: homeT } = useTranslation('home');
  const [selected, setSelected] = useState(edit ? item.key : '');
  const [input, setInput] = useState(true);
  const [multi, setMulti] = useState(false);
  const [time, setTime] = useState(false);
  const [tree, setTree] = useState(false);
  const [gic, setGic] = useState([]);
  
  function changeSelectOptionHandler(event, item) {
    setSelected(event.value);
    handlerType(event, item);
    console.log(item);
  }

  const getInd = async () => {
    let res = await network
      .get('/api/industries/gic', { params: {} })
      .then(({ data }) => data)
      .catch((error) => console.log(error));

    setGic(
      res.results.map((d) => {
        return {
          value: d[0],
          label: d[1],
        };
      })
    );
  };

  useEffect(() => {
    getInd();
  }, []);

  const data = [
    { value: "employees", label: "Approximate Employees" },
    { value: 'assigned', label: 'Assigned' },
    { value: "company_name", label: "Company Name" },
    { value: 'full_contact_city', label: 'Headquarters City' },
    { value: 'full_contact_region', label: 'Headquarters Region' },
    { value: 'full_contact_country', label: 'Headquarters Country' },
    { value: "keyword", label: "Keyword" },
    { value: 'visits', label: 'Number of Page Views' },
    { value: "page_path", label: "Page Path" },
    { value: "source", label: "Source" },
    { value: 'time_on_page', label: 'Time on Website' },
    { value: 'country', label: 'Visitor Location Country' },
    { value: 'region', label: 'Visitor Location State/Province' },
    { value: 'city', label: 'Visitor Location City' },
    { value: "tag", label: "Tag" },
    { value: "domain", label: "Domain" },
    { value: "naics", label: "NAICS Industry" },
    { value: 'gic', label: 'GIC Industry' },
  ];

  const equalsOptions = [
    { value: 'eq', label: 'equals' },
    { value: 'not_eq', label: 'not equal to' },
    { value: 'contains', label: 'contains' },
    { value: 'not_cont', label: 'does not contain' },
  ];

  const equalsOptionsAlt = [
    { value: '=', label: 'equals' },
    { value: '!=', label: 'not equal to' },
    { value: 'contains', label: 'contains' },
    { value: 'does not contain', label: 'does not contain' },
  ];

  const equalsOptionsGr = [
    { value: 'eq', label: 'equals' },
    { value: 'not_eq', label: 'not equal to' },
    { value: 'gt', label: 'greater than' },
    { value: 'gteq', label: 'greater than or equal to' },
    { value: 'lt', label: 'less than' },
    { value: 'lteq', label: 'less than or equal to' },
  ];

  const equal = [
    { value: 'eq', label: 'equals' },
    { value: 'not_eq', label: 'not equal to' },
  ];

  const boolOptions = [
    { value: 'yes', label: 'yes' },
    { value: 'no', label: 'no' },
  ];

  useEffect(() => {
    if (
      selected === 'company_name' ||
      selected === 'full_contact_city' ||
      selected === 'full_contact_country' ||
      selected === 'full_contact_region' ||
      selected === 'keyword' ||
      selected === 'page_path' ||
      selected === 'city' ||
      selected === 'country' ||
      selected === 'region' ||
      selected === 'tag' ||
      selected === 'domain'
    ) {
      setInput(true);
      setTime(false);
      setSelectUser(false);
      setFilterEqual(equalsOptions);
    } else if (selected === 'source') {
      setInput(true);
      setSelectUser(false);
      setTime(false);
      setFilterEqual(equalsOptionsAlt);
    } else if (selected === 'assigned') {
      setMulti(true);
      setInput(false);
      setFilterValue(users);
      setSelectUser(true);
      console.log( item.value.split(',')[0]);
      setFilterEqual(boolOptions);    
    } else if (selected === 'time_on_page') {
      setTime(true); 
      setInput(true);
      setSelectUser(false);
      setFilterEqual(equalsOptionsGr);
    } else if (selected === 'visits') {
      setFilterEqual(equalsOptionsGr);
      setTime(false);
      setSelectUser(false);
      setInput(true);
    } else if (selected === 'employees') {
      setFilterEqual(equalsOptionsGr);
      setTime(false);
      setInput(true);
      setSelectUser(false);
    } else if (selected === 'gic') {
      setTime(false);
      setInput(false);
      setTree(false);
      setSelectUser(false);
      setFilterEqual(equal);
      setFilterValue(gic);
    } else if (selected === 'naics') {
      setTime(false);
      setInput(false);
      setTree(true);
      setSelectUser(false);
      setFilterEqual(equal);
      setFilterValue(gic);
    } else {
      setInput(false);
      setMulti(false);
      setSelectUser(false);
      setTree(false);
      setFilterEqual(equalsOptionsGr);
      console.log(multi);
    }
    /* eslint-disable */
  }, [item, selected]);
    /* eslint-enable */

  return (
    <Wrapper>
      <Block>
        <StyledSelect
          placeholder="Filter Type"
          options={data}
          onChange={(e) => changeSelectOptionHandler(e, item)}
          styles={styles}
          defaultValue={data.find((el) => el.value === item.key)}
        />
      </Block>
      <Block>
        {
          <StyledSelect
            options={filterEqual}
            onChange={(e) => handlerEqual(e, item)}
            styles={styles}
            defaultValue={
              edit
                ? filterEqual?.find((el) => el.value === item.operator)
                : null
            }
            placeholder={
              edit
                ? typeof filterEqual === 'object'
                  ? filterEqual.find((el) => el.value === item.operator)?.label
                  : filterEqual.value
                : 'Select'
            }
          />
        }
      </Block>
      <BlockMarginRelative>
        {input ? (
          <>
            {time ? (
              <>
                <FormTextFieldTime label={homeT('min')} />
                <FormTextFieldTime label={homeT('sec')} />
              </>
            ) : (
              <FormTextField
                type="text"
                onChange={(e) => handlerValue(e, item)}
                value={item.value}
                label={homeT('value')}
                defaultValue={item.value}
              />
            )}
            {!time && (
              <TextLightAbsolute>{homeT('useCommas')}</TextLightAbsolute>
            )}
          </>
        ) : (
          <>
            {tree ? (
              <Industry />
            ) : (
              <StyledSelect
                options={filterValue}
                isMulti
                styles={styles}
                defaultValue={!edit ? item.value : users.filter((el) => el.value == item.value.split(',')[0])}
                onChange={(e) => filterValueSelectHandler(e, item)}
              />
            )}
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
  filterValue: any,
  styles: object,
  handlerValue: func,
  edit: bool,
  item: any,
  users: array,
  filterEqual: any,
  setFilterEqual: func,
  setFilterValue: func,
  filterValueSelectHandler: func,
  setSelectUser: func
};