import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from 'store/slices/users';
import { fetchGAViewIds, setSelectedId } from 'store/slices/gaViewId';
import { useTranslation } from 'react-i18next';
import {
  Block,
  AccentButton,
  PageFluid,
  TitleSmallBlack,
  Modal,
  Overflow,
  FlexWrapper,
  Loader,
  SearchForm
} from 'base/styled';
import { fetchDashboardQueues } from 'store/slices/dashboardQueues';
import { makeAsOptions } from 'base/utils';
import styled from 'styled-components';
import { ReactComponent as Plus } from 'assets/images/plus_white.svg';
import { ReactComponent as SearchIcon } from 'assets/images/search.svg';
import TableUsers from './TableUsers';
import FormUser from './FormUser';
import Success from 'base/components/Success';
import Responsive from 'context/responsive';

const Page = styled(PageFluid)`
  @media (max-width: 768px) {
    padding: 0;
    h1 {
      text-align: right;
    }
  }
`;

const Button = styled(AccentButton)`
  margin-top: 5px;
  svg {
    margin-right: 8px;
  }
`;

const UsersPage = styled(Page)`
width: 95%;
padding-left: 106px;
`;

const FlexFluid = styled(FlexWrapper)`
  width: 100%;
  padding: 0 20px 20px 20px;
  button {
    margin: 0 10px;
    height: 37px;
  }
`;

const Popup = styled(Block)`
  margin: -2% auto 0;
  padding: 20px 0;
  @media (max-width: 768px) {
    p {
      margin: 2px 0;
    }
  }
`;

const Title = styled(TitleSmallBlack)`
  margin-bottom: 20px;
  text-align: left;
`;

const BlockColumn = styled(Block)`
  flex-direction: column;
  padding: 20px 0 0 0;
  @media (max-width: 768px) {
    padding: 0;
  }
`;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: '#000000',
    fontSize: '12px',
    background: state.isSelected ? `white` : 'inherit',
    borderBottom: state.isSelected ? '1px solid #EDEDED' : '0',
    '&:hover': {
      background: `#FFF9F9`,
    },
    padding: '10px 5px 10px 30px',
  }),
  control: () => ({
    display: 'flex',
    borderRadius: '5px',
    border: '1px solid #d1d1d1',
    fontSize: '14px',
    color: '#626262'
  }),
  container: () => ({
    width: '80%',
    fontSize: '14px',
    color: '#626262',
    '@media only screen and (max-width: 768px)' : {
      minWidth: '90px',
      width: '50%'
    }
  }),
  menu: (provided, state) => ({
    ...provided,
    color: state.selectProps.menuColor,
    padding: 0,
    zIndex: 99,
    background: '#fff',
    overflowX: 'hidden',
    display: 'inline-block',
    '@media only screen and (max-width: 1200px)': {
      padding: 0,
    },
  }),
};

const FlexWrap = styled(FlexWrapper)`
  @media (max-width: 768px) {
    padding: 20px 0;
    justify-content: start;
    align-items: center;
    button {
      height: 45px;
      margin: 0 15px 0 0;
    }
  }
`;

export default function Index() {
  const { t: usersT } = useTranslation('users');
  const dispatch = useDispatch();
  const { selectedId, ids } = useSelector((state) => state.gaViewIdReducer);
  const [show, setShow] = useState();
  const [form, setForm] = useState();
  const [sucess, setSuccess] = useState();
  const { users, status } = useSelector((state) => state.usersReducer);
  const [usersList, setUsersList] = useState([]);
  const [text, setText] = useState('');
  const [search, setSearch] = useState(false);
  
  function handleText(e) {
    setText(e.target.value);
  }

  function handleSubmit() {
    console.log(text);
    setSearch(true);
  }

  function handleShow() {
    setShow(true);
    setForm(true);
  }

  function handleShowOff() {
    setShow();
    setForm();
    setSuccess();
  }

  function handleFetchAll( users, status, query){
    dispatch(fetchUsers({ users, status, query }));
    console.log(usersList);
  }

  useEffect(() => {
    handleFetchAll( users, status, text);
    return () => {
      status === 'succeed';
    };
    
    /* eslint-disable */
  }, [ users.length, search]);
  /* eslint-enable */

  // useEffect(() => {
  //   if(users){
  //     setUsersList(
  //       users.map((d) => {
  //         return {
  //           select: false,
  //           id: d.id,
  //           full_name: d.full_name,
  //           first_name: d.first_name,
  //           last_name: d.last_name,
  //           role: d.role,
  //           pretty_role: d.pretty_role,
  //           websites_list: d.websites_list,
  //           email: d.email
  //         };
  //       })
  //     );
  //   }
  // }, [users, usersList]);
  

  useEffect(() => {
    if (ids.length)
      dispatch(setSelectedId({ value: ids[0].id, label: ids[0].pretty_name }));
    if (!ids.length) {
      dispatch(fetchGAViewIds());
    }
  }, [dispatch, ids]);

  useEffect(() => {
    if (selectedId) dispatch(fetchDashboardQueues(selectedId.value));
  }, [dispatch, selectedId]);

  const options = makeAsOptions(ids, 'website_id', 'pretty_name');

  function handleSelectChange(payload) {
    dispatch(setSelectedId(payload));
  }

  const ctx = useContext(Responsive);

  return (
    <UsersPage>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          <Title>{usersT('allUsers')}</Title>
          {ctx.isMobile && (
            <>
              <SearchForm>
                <SearchIcon onClick={handleSubmit} />
                <input type="search" placeholder="Search" onChange={handleText} />
              </SearchForm>
              <FlexWrap>
                {/* <DarkButton>{homeT('delete')}</DarkButton> */}
                <Button onClick={handleShow}>
                  <Plus />
                  {usersT('addUser')}
                </Button>
              </FlexWrap>
            </>
          )}
          <BlockColumn>
            {!ctx.isMobile && (
              <FlexFluid>
                <FlexWrapper>
                  {/* <DarkButton>{homeT('delete')}</DarkButton> */}
                  <Button onClick={handleShow}>
                    <Plus />
                    {usersT('addUser')}
                  </Button>
                </FlexWrapper>
                <SearchForm>
                  <SearchIcon onClick={handleSubmit} />
                  <input
                    type="text"
                    placeholder="Search"
                    onChange={handleText}
                  />
                </SearchForm>
              </FlexFluid>
            )}
            {show && (
              <>
                <Modal>
                  <Overflow onClick={handleShowOff}></Overflow>
                  {form && !sucess && (
                    <Popup>
                      <FormUser
                        handleShowOff={handleShowOff}
                        styles={customStyles}
                        options={options}
                        handleSelectChange={handleSelectChange}
                        setSuccess={setSuccess}
                        setForm={setForm}
                      />
                    </Popup>
                  )}
                  {!form && sucess && <Success />}
                </Modal>
              </>
            )}
            <TableUsers
              usersList={users}
              customStyles={customStyles}
              setUsersList={setUsersList}
              handleFetchAll={handleFetchAll}
            />
          </BlockColumn>
        </>
      )}
    </UsersPage>
  );
}
