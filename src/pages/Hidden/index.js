import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllHidingRules } from 'store/slices/hidingRules';
import { useTranslation } from 'react-i18next';
import { Search } from 'base/components/Leads';
import {
  FlexWrapper,
  TitleSmallBlack,
  AccentButton,
  Modal,
  Overflow,
  Block,
  Page,
  Loader,
  SearchForm
} from 'base/styled';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from 'assets/images/search.svg';
import HiddenForm from './HiddenForm';
import HiddenTable from './HiddenTable';
import TooltipDark from 'base/components/TooltipDark';
import Success from 'base/components/Success';
import Responsive from 'context/responsive';

const Form = styled(Block)`
  margin: 0 auto;
`;

const Flex = styled(FlexWrapper)`
  padding: 10px 0 30px;
  @media (max-width: 768px) {
    flex-direction: row-reverse;
    align-items: center;
  }
  h1 {
    @media (max-width: 768px) {
      padding-right: 18px;
    }
  }
`;

const Tooltip = styled(TooltipDark)`
  top: -20px;
  right: -110%;
  left: auto;
  span {
    max-width: 500px;
  }
  @media (max-width: 768px) {
    right: -100%;
  }
`;

const HiddenPage = styled(Page)`
  margin-left: 94px;
  width:75%;
`;

export default function Index() {
  const { t: hiddenT } = useTranslation('hidden');
  const { t: rootT } = useTranslation();
  const [show, setShow] = useState();
  const [success, setSuccess] = useState();
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState();
  const [text, setText] = useState();
  const dispatch = useDispatch();
  const { page, hidingRules, status } = useSelector(
    (state) => state.hidingRulesReducer
  );

  useEffect(() => {
    dispatch(fetchAllHidingRules({ page, hidingRules }));
    setSearchResults(hidingRules);
    /* eslint-disable */
  }, [dispatch, hidingRules.length]);
  /* eslint-enable */

  useEffect(() => {
    setSearchResults(hidingRules);
    /* eslint-disable */
  }, [search]);
  /* eslint-enable */

  function handleText(e) {
    setText(e.target.value);
    setSearchResults(hidingRules.filter((el) => {
      return el.keyword.toLowerCase().includes(text.toLowerCase());
    }));
  }

  function handleSubmit() {
    if(text) {
      setSearchResults(hidingRules.filter((el) => {
        return el.keyword.toLowerCase().includes(text?.toLowerCase());
      }));
    } else {
      setSearchResults(hidingRules);
    }
    setSearch(true);
  }
  
  const [setUserList] = useState([]);

  function AddRuleHandler(data) {
    setUserList((prevList) => {
      return [
        ...prevList,
        {
          website: data.website,
          keyword: data.keyword,
          file: data.file,
        },
      ];
    });
  }

  function showHandler() {
    setShow(true);
  }

  function setShowOff() {
    setShow();
    setSuccess();
  }

  const list = text ? searchResults : hidingRules;

  const ctx = useContext(Responsive);

  return (
    <HiddenPage>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <Flex>
            <TitleSmallBlack>
              {hiddenT('hidden')}
              <Tooltip text={hiddenT('tooltip')} />
            </TitleSmallBlack>
            {!ctx.isMobile && (
              <SearchForm>
                <SearchIcon onClick={handleSubmit} />
                <input
                  type="search"
                  placeholder="Search"
                  onChange={handleText}
                />
              </SearchForm>
            )}
            <AccentButton onClick={showHandler}>
              {rootT('addNewRule')}
            </AccentButton>
          </Flex>
          {ctx.isMobile && <Search />}
          {show && (
            <>
              <Modal>
                <Overflow onClick={setShowOff}></Overflow>
                {!success && (
                  <Form>
                    <HiddenForm
                      onAddRule={AddRuleHandler}
                      setShowOff={setShowOff}
                      setSuccess={setSuccess}
                      hidingRules={hidingRules}
                    />
                  </Form>
                )}
                {success && <Success />}
              </Modal>
            </>
          )}
          <HiddenTable list={list} />
        </>
      )}
    </HiddenPage>
  );
}
