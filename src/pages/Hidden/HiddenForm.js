import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { array, bool, func, node, string } from 'prop-types';
import { makeAsOptions } from 'base/utils';
import { putHidingRule, fetchAllHidingRules } from 'store/slices/hidingRules';
import { setSelectedId } from 'store/slices/gaViewId';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import {
  BlockMargin,
  FilledButton,
  FlexWrapperStart,
  FlexWrapper,
  OutlinedButton,
  StyledSelect,
  TitleSmallBlack,
  TextAccentExtraSmall
} from 'base/styled';
import network from 'base/network';

const FlexWrapperStartMiddlePadding = styled(FlexWrapper)`
  padding: 40px 0 10px;
  justify-content: end;
`;

const Textarea = styled.textarea`
  border: 1px solid ${props => props.theme.colors.lightText};
  border-radius: 8px;
  display: block;
  padding: 5px 15px;
  color: ${props => props.theme.colors.grey}!important;
  ::focus {
    border: 1px solid ${props => props.theme.colors.lightText};
  }
`;

const Label = styled.label`
line-height: 5px!important;
`;

const Upload = styled.label`
  border: 1px solid ${props => props.theme.colors.accentRed};
  border-radius: 8px;
  display: block;
  padding: 5px 15px;
  color: ${props => props.theme.colors.accentRed}!important;
`;

const UploadInput = styled.input`
  display: none;
`;

const Title = styled(TitleSmallBlack)`
  text-align: left;
`;

const Flex = styled(FlexWrapperStart)`
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

export default function HiddenForm({setShowOff, setSuccess, name, edit, keyword, lead, hidingRules}) {
  const { t: homeT } = useTranslation('home');
  const { t: hideT } = useTranslation('hidden');
  const [filterKey, setFilterKey] = useState(edit ? keyword : '');
  const [file] = useState();
  const [ga_id] = useState(lead?.ga_view.id);
  const [selectedFile, setSelectedFile] = useState();
  const [error, setError] = useState();
  const { selectedId, ids } = useSelector((state) => state.gaViewIdReducer);
  const dispatch = useDispatch();
  const { page, allhidingRules, status } = useSelector(
    (state) => state.hidingRulesReducer
  );
  
  const filterNameOptions = makeAsOptions(ids, 'id', 'pretty_name');

  function handleSelectChange (payload) {
    dispatch(setSelectedId(payload));
  }

  function filterKeyHandler(e) {
    setFilterKey(e.target.value);
  }

  function selectedFileHandler(event) {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  }
  // function handleSubmit({id, google_analytics_view_id_id, keywords}) {
  //   dispatch(putHidingRule({id, google_analytics_view_id_id, keywords}));
  // }

  function filterSubmit(e) {
    e.preventDefault();
    
    if(edit) {
      if (filterKey.length <= 0) { 
        setError('Please enter at least one keyword');
        return;
      } else { 
        dispatch(putHidingRule({status, id: lead.id, google_analytics_view_id_id: ga_id, keywords: filterKey}));
        setFilterKey('');
        //dispatch(fetchAllHidingRules({ page, allhidingRules }));   
        setSuccess(true);
      }
    } 

    if(!edit) {
      if (filterKey.length <= 0) { 
        setError('Please enter at least one keyword');
        return;
      } else {
        const datas = {
          keyword: filterKey,
          website: selectedId.label,
          file: selectedFile,
          id: selectedId.value
        };  
        console.log(datas, hidingRules);

        const post = async () => {
          let res = await network
            .post(`/api/hiding_rules`, {google_analytics_view_id_id: selectedId.value, keywords: filterKey} )
            .then(({ data }) => data)
            .catch((error) => console.log(error));
          console.log(res.results);
        };
        post();
        //dispatch(postHidingRule({google_analytics_view_id_id: selectedId.value, keywords: filterKey}))
        setFilterKey('');
        dispatch(fetchAllHidingRules({ page, allhidingRules }));
        setSuccess(true);
      }
    } 
  }

  return (
    <form onSubmit={filterSubmit}>
      <Title>{homeT('hiddenCompanies')}</Title>
      <Flex>
        <BlockMargin>
          <label>{homeT('appliedTo')}</label>
          {
            <StyledSelect
              value={edit ? filterNameOptions.find((el) => el.label === name) : selectedId}
              options={filterNameOptions}
              onChange={handleSelectChange}
              styles={customStyles}
              label={homeT('filterName')}
            />
          }
        </BlockMargin>
        <BlockMargin>
          <label>{hideT('keyword')}</label>
          <Textarea
            type="text"
            onChange={filterKeyHandler}
            value={filterKey} 
          />
          <Label>{hideT('newLine')}</Label>
        </BlockMargin>
      
        <BlockMargin>
          <label>{hideT('keyword')}</label>
          <Upload htmlFor="file" className="custom-file-upload">
            {hideT('choose')}
          </Upload>
          <UploadInput
            id="file"
            type="file"
            value={file}
            onChange={selectedFileHandler}
            accept=".csv"
          />
          <label>{hideT('bulkUpload')}</label>
        </BlockMargin>
      </Flex>
      <FlexWrapperStartMiddlePadding>
        <TextAccentExtraSmall>{error}</TextAccentExtraSmall>
        <BlockMargin>
          <OutlinedButton type="reset" onClick={setShowOff} >
            {homeT('cancel')}
          </OutlinedButton>
        </BlockMargin>
        <BlockMargin>
          <FilledButton type="submit">{hideT('saveRule')}</FilledButton>
        </BlockMargin>
      </FlexWrapperStartMiddlePadding>
    </form>
  );
}

HiddenForm.propTypes = {
  setSuccess: func,
  onAddRule: func,
  setShowOff: func,
  name: string, 
  edit: bool, 
  keyword: string,
  hidingRules: array,
  lead: node
};
