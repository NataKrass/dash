import { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { array, func, node } from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as Close } from 'assets/images/close.svg';
import { ReactComponent as Plus } from 'assets/images/plus.svg';
import { ReactComponent as Edit } from 'assets/images/edit.svg';
import { ReactComponent as Delete } from 'assets/images/delete_dark.svg';
import {
  Block,
  Tab,
  Tabs,
  FlexWrapper,
  OutlinedButton,
  TextBlackBig,
  Flex,
  TextLight
} from 'base/styled';
import AccountFilterForm from './AccountFilterForm';
import ContactFilter from './ContactFilter';
import TableFilterUser from './TableFilterUser';
import TooltipDark from 'base/components/TooltipDark';
import TableFilterAccount from './TableFilterAccount';
import UserFilterForm from './UserFilterForm';
import Responsive from 'context/responsive';
import network from 'base/network';

const Button = styled.a`
  cursor: pointer;
`;

const ContactButton = styled.a`
  cursor: pointer;
  font-size: .875rem;
  font-weight: 500;
  margin-left: 20px
`;

const Title = styled.h2`
  position: relative;
  .tooltip {
    position: absolute;
    left: auto;
    right: -10px;
    top: 0;
    span {
      top: -28px;
    }
  }
`;

const BlockFilter = styled(Block)`
  margin: 20px 0;
  padding: 20px;
`;

const BlockFilterContact = styled(BlockFilter)`
  justify-content: space-between;
`;

const FlexWrapperTop = styled(FlexWrapper)`
  padding-top: 40px;
  @media (max-width: 768px) {
    padding-top: 15px;
    justify-content: center;
    button {
      width: 100%;
    }
  }
`;

const Content = styled.div`
  ${(props) => (props.active ? '' : 'display:none')}
`;

export default function TabsFilter({ handleFilter }) {
  const { t: homeT } = useTranslation('home');
  const [active, setActive] = useState(0);
  const [filterAccount, setFilterAccount] = useState(false);
  const [filterUser, setFilterUser] = useState(false);
  const [filterContact, setFilterContact] = useState(false);
  const [contactArray, setContactArray] = useState();
  const [filterAccountEdit, setFilterAccountEdit] = useState();
  const [filterUserEdit, setFilterUserEdit] = useState();
  const [edit, setEdit] = useState(false);
  const [allContact, setAllContact] = useState([]);

  function handleTab(e) {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  }

  function handleFilterAccount(id) {
    if (edit) {
      setFilterAccountEdit(id);
      setFilterAccount(true);
      setEdit(true);
      console.log(filterAccountEdit);
    } else {
      setFilterAccount(true);
      setFilterAccountEdit();
      setEdit();
    }
    console.log('edit: ', edit);
  }

  function handleFilterUser(id) {
    if (edit) {
      setFilterUserEdit(id);
      setFilterUser(true);
      setEdit(true);
      console.log(filterUserEdit);
    } else {
      setFilterUser(true);
      setFilterUserEdit();
      setEdit();
    }
    console.log('edit: ', edit);
  }

  function handleFilterContact() {
    setFilterContact(true);
  }

  function handleFilterContactDelete() {
    const formdata = {
      contact_filters_attributes: allContact.map((el) => ({
        id: el.id,
        key: el.key,
        value: false,
      })),
    };
    console.log(formdata);
    network.put('/api/contact_filters', formdata);

    setContactArray();
  }

  const handleFilterAccountOff = () => {
    setFilterAccount(false);
    setFilterAccountEdit(false);
    setEdit(false);
  };

  function handleFilterUserOff() {
    setFilterUser(false);
    setFilterUserEdit(false);
  }

  function handleFilterContactOff() {
    setFilterContact(false);
  }

  const ctx = useContext(Responsive);
  const getCFilters = async () => {
    let res = await network
      .get(`/api/contact_filters`, { params: {} })
      .then(({ data }) => data)
      .catch((error) => console.log(error));
    const results = res.results.filter((item) => {
      return item.value === true;
    });
    setContactArray(results);
    setAllContact(res.results);
  };

  useEffect(() => {
    getCFilters();
    /* eslint-disable */
  }, [filterContact]);
  /* eslint-enable */

  return (
    <>
      <FlexWrapper>
        {!ctx.isMobile ? (
          <Button>
            <Close onClick={handleFilter} />
          </Button>
        ) : (
          <TextBlackBig>{homeT('filters')}</TextBlackBig>
        )}
        <Tabs>
          <Tab onClick={handleTab} active={active === 0} id={0}>
            {homeT('accountFilters')}
          </Tab>

          <Tab onClick={handleTab} active={active === 1} id={1}>
            {homeT('userFilters')}
          </Tab>

          <Tab onClick={handleTab} active={active === 2} id={2}>
            {homeT('contactFilters')}
          </Tab>
        </Tabs>
      </FlexWrapper>
      <>
        <Content active={active === 0}>
          {!filterAccount && (
            <FlexWrapperTop>
              {!ctx.isMobile && (
                <Title>
                  {homeT('accountFilters')}
                  <TooltipDark
                    text={homeT('accountFilterTooltip')}
                    className="tooltip"
                  />
                </Title>
              )}
              <OutlinedButton onClick={handleFilterAccount}>
                <Plus />
                {homeT('addAccountFilters')}
              </OutlinedButton>
            </FlexWrapperTop>
          )}
          {filterAccount && (
            <BlockFilter>
              <AccountFilterForm
                handle={handleFilterAccountOff}
                filterAccountEdit={filterAccountEdit}
                edit={edit}
              />
            </BlockFilter>
          )}
          <TableFilterAccount
            handleFilterAccount={handleFilterAccount}
            setEdit={setEdit}
            setFilterAccountEdit={setFilterAccountEdit}
          />
        </Content>
        <Content active={active === 1}>
          {!filterUser && (
            <FlexWrapperTop>
              {!ctx.isMobile && (
                <Title>
                  {homeT('userFilters')}
                  <TooltipDark text={homeT('userFiltersTooltip')} className="tooltip" />
                </Title>
              )}
              <OutlinedButton onClick={handleFilterUser}>
                <Plus />
                {homeT('addUserFilters')}
              </OutlinedButton>
            </FlexWrapperTop>
          )}
          {filterUser && (
            <BlockFilter>
              <UserFilterForm
                handle={handleFilterUserOff}
                filterUserEdit={filterUserEdit}
                edit={edit}
              />
            </BlockFilter>
          )}
          <TableFilterUser
            handleFilterUser={handleFilterUser}
            setEdit={setEdit}
            setFilterUserEdit={setFilterUserEdit}
          />
        </Content>
        <Content active={active === 2}>
          {!filterContact && (
            <BlockFilterContact>
              <div>
                {contactArray &&
                  contactArray.map((item) => (
                    <TextLight key={item.id}>
                      Has{' '}
                      {item.key === 'phone_number'
                        ? 'Phone Number'
                        : item.key.charAt(0).toUpperCase() + item.key.slice(1)}
                    </TextLight>
                  ))}
              </div>
              <Flex>
                <ContactButton onClick={handleFilterContact}>
                  <Edit />
                  {homeT('edit')}
                </ContactButton>
                <ContactButton onClick={handleFilterContactDelete}>
                  <Delete />
                  {homeT('delete')}
                </ContactButton>
              </Flex>
            </BlockFilterContact>
          )}
          {filterContact && (
            <BlockFilter>
              <ContactFilter
                allContact={allContact}
                array={contactArray}
                handle={handleFilterContactOff}
              />
            </BlockFilter>
          )}
        </Content>
      </>
    </>
  );
}

TabsFilter.propTypes = {
  handleFilter: func,
  accountFilters: array,
  usersFilters: array,
  filterAccountEdit: node
};
