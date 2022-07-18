import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllAssignRules } from 'store/slices/assignRules';
import { fetchUsers } from 'store/slices/users';
import { useTranslation } from 'react-i18next';
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
import AutoAssignForm from './AutoAssignForm';
import AutoAssignTable from './AutoAssignTable';
import Success from 'base/components/Success';
import Responsive from 'context/responsive';

const Form = styled(Block)`
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 99vw;
  }
`;

const Flex = styled(FlexWrapper)`
  padding: 10px 0 30px;
  @media (max-width: 768px) {
    flex-direction: row-reverse;
    align-items: center;
  }
`;

export default function Index() {
  const { t: rootT } = useTranslation();
  const { t: autoT } = useTranslation('autoassign');
  const dispatch = useDispatch();
  const [show, setShow] = useState();
  const [success, setSuccess] = useState();
  const { assignRules, status } = useSelector(
    (state) => state.assignRulesReducer
  );
  const { users } = useSelector((state) => state.usersReducer);

  const [ setUserList] = useState([]);
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState();
  const [text, setText] = useState();

  function handleText(e) {
    setText(e.target.value);
    setSearchResults(assignRules.filter((el) => {
      return el.name.toLowerCase().includes(text.toLowerCase());
    }));
    setSearch(true);
  }

  function AddRuleHandler(data) {
    setUserList((prevList) => {
      return [
        ...prevList,
        {
          name: data.name,
          website: data.website,
          user: data.user,
          filtersType: data.filterType,
          equals: data.equals,
          filtersValue: data.value,
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

  const ctx = useContext(Responsive);

  useEffect(() => {
    dispatch(fetchUsers({users}));
    //dispatch(fetchAssignRuleById(5));
    setSearchResults(assignRules);
    /* eslint-disable */
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllAssignRules({ assignRules }));
    //dispatch(fetchAssignRuleById(5));
    setSearchResults(assignRules);
    /* eslint-disable */
  }, [dispatch]);
  /* eslint-enable */

  useEffect(() => {
    //dispatch(fetchAssignRuleById(5));
    setSearchResults(assignRules);
    /* eslint-disable */
  }, [search]);
  /* eslint-enable */

  function handleSubmit() {
    setSearchResults(assignRules.filter((el) => {
      return el.name.toLowerCase().includes(text.toLowerCase());
    }));
    setSearch(true);
  }

  return (
    <Page>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <Flex>
            <TitleSmallBlack>{autoT('rule')}</TitleSmallBlack>
            {!ctx.isMobile && (
              <SearchForm>
                <SearchIcon onClick={handleSubmit} />
                <input type="search" placeholder="Search" onChange={handleText} />
              </SearchForm>
            )}
            <AccentButton onClick={showHandler}>
              {rootT('addNewRule')}
            </AccentButton>
          </Flex>

          {show && (
            <>
              <Modal>
                <Overflow onClick={setShowOff}></Overflow>
                {!success && (
                  <Form>
                    <AutoAssignForm
                      onAddRule={AddRuleHandler}
                      setShowOff={setShowOff}
                      setSuccess={setSuccess}
                      users={users}
                    />
                  </Form>
                )}
                {success && <Success />}
              </Modal>
            </>
          )}
          <AutoAssignTable list={text ? searchResults : assignRules} users={users} />
        </>
      )}
    </Page>
  );
}
