import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { makeAsOptions, isStatusSucceed } from 'base/utils';
import { fetchDashboardQueues } from 'store/slices/dashboardQueues';
import { fetchGAViewIds, setSelectedId } from 'store/slices/gaViewId';
import { fetchUserEdit } from 'store/slices/user';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import {
  AccentButton,
  FlexWrapper,
  Header,
  Block,
  StyledSelect,
  Modal,
  Overflow,
} from 'base/styled';
import AddWebsite from './Leads/Header/AddWebsite';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { ReactComponent as LogoMobile } from 'assets/images/logo_mobile.svg';
import { ReactComponent as Plus } from 'assets/images/plus_white.svg';
import img from 'assets/images/check.svg';
import Responsive from 'context/responsive';
import Burger from './Burger/Burger';
import HeaderNav from './Leads/Header/HeaderNav';
import { Container, Row, Col } from '@bootstrap-styled/v4';
import Switcher from './Leads/Header/Switcher';

const Flex = styled(FlexWrapper)`
  @media (max-width: 768px) {
    justify-content: center;
  }
  justify-content: flex-start;
`;

const Button = styled(AccentButton)`
  margin-top: 5px;
  svg {
    margin-right: 5px;
  }
`;

const BurgerBox = styled.div`
  position: relative;
`;

const Popup = styled(Block)`
  margin: -2% auto 0;
  padding: 20px 0;
`;

const BurgerIcon = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  span {
    background: #2c2c2c;
    border-radius: 2px;
    height: 4px;
    width: 38px;
    margin: 4px;
  }
`;

const Select = styled(StyledSelect)`
  padding-left: 15px;
  @media (max-width: 1300px) {
    .css-aqbxid-Control {
      width: auto
    }
  }
`;

export default function HeadContent() {
  const { t: homeT } = useTranslation('home');
  const dispatch = useDispatch();
  const [openAdd, setOpenAdd] = useState();
  const [openUser, setOpenUser] = useState();
  const [openNotification, setOpenNotification] = useState();
  const [notification] = useState(false);

  function handleOpenAdd() {
    setOpenAdd(true);
  }

  function handleOpenAddOff() {
    setOpenAdd();
  }

  function handleOpenNotification() {
    setOpenNotification(true);
  }

  function handleOpenNotificationOff() {
    setOpenNotification();
  }

  function handleOpenUser() {
    setOpenUser(true);
  }

  function handleOpenUserOff() {
    setOpenUser();
  }

  function handleSelectChange(payload) {
    dispatch(setSelectedId(payload));
  }

  const { user, status } = useSelector((state) => state.userReducer);

  const { selectedId, ids } = useSelector((state) => state.gaViewIdReducer);

  const { site } = useSelector(
    (state) => state.websitesReducer
  );

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserEdit());
    }
  }, [dispatch, user]);

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

  const options = makeAsOptions(ids, 'id', 'pretty_name');
  // console.log(useSelector((st) => st.userReducer))
  const notificationArr = [
    {
      title: 'Serhii Lukovenkov',
      value: 'assigned you new lead',
    },
    {
      title: 'Serhii Nadolinskyi',
      value: 'assigned you new lead',
    },
  ];

  const ctx = useContext(Responsive);

  function handleNavbar() {
    ctx.setNavbar(true);
  }

  function handleNavbarOff() {
    ctx.setNavbar(false);
  }

  let location = useLocation();
  const home = location.pathname === '/dashboard' || location.pathname === '/';

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: '#000000',
      fontSize: '12px',
      background: state.isSelected
        ? `url(${img}) no-repeat 4% center`
        : 'inherit',
      borderBottom: state.isSelected ? '1px solid #EDEDED' : '0',
      '&:hover': {
        background: `#FFF9F9`,
      },
      padding: '10px 5px 10px 30px',
      width: ctx.isMobile ? 200 : 300,
    }),
    control: () => ({
      display: 'flex',
      borderRadius: '20px',
      border: '1px solid #d1d1d1',
      width: ctx.isMobile ? 180 : 300,
    }),
    menu: (provided, state) => ({
      ...provided,
      width: ctx.isMobile ? 240 : 300,
      color: state.selectProps.menuColor,
      padding: 0,
      overflowX: 'hidden',
      display: 'inline-block',
      '@media only screen and (max-width: 1200px)': {
        padding: 0,
      },
    }),
  };

  return (
    <Header>
      <Container fluid>
        <Row>
          <Col xs="2" md="2" lg="4" className="center">
            <a href="/">{ctx.isMobile ? <LogoMobile /> : <Logo />}</a>
          </Col>
          <Col xs="10" md="10" lg="8">
            <Row>
              <Col xs="9" md="6" lg="6">
                <Flex>
                  {home && (
                    <Select
                      value={selectedId}
                      options={options}
                      /* eslint-disable */
                      onChange={handleSelectChange}
                      styles={customStyles}
                    />
                  )}
                  {home && !ctx.isMobile && (
                    <Button onClick={handleOpenAdd}>
                      <Plus />
                      {homeT('add')}
                    </Button>
                  )}
                  {openAdd && (
                    <>
                      <Modal>
                        <Overflow onClick={handleOpenAddOff}></Overflow>
                        <Popup>
                          <AddWebsite handleOpenAddOff={handleOpenAddOff} site={site} />
                        </Popup>
                      </Modal>
                    </>
                  )}
                {ctx.isMobile && <Switcher />}
                </Flex>
              </Col>
              <Col xs="3" md="6" lg="6" offset="2">
                {!ctx.isMobile && isStatusSucceed(status) && (
                  <HeaderNav
                    handleNavbarOff={handleNavbarOff}
                    handleOpenNotification={handleOpenNotification}
                    notification={notification}
                    openNotification={openNotification}
                    handleOpenNotificationOff={handleOpenNotificationOff}
                    notificationArr={notificationArr}
                    handleOpenUser={handleOpenUser}
                    handleOpenUserOff={handleOpenUserOff}
                    openUser={openUser}
                    user={user}
                  />
                )}
                {ctx.isMobile && (
                  <BurgerBox>
                    {ctx.navbar ? (
                      <Burger
                        handleNavbarOff={handleNavbarOff}
                        handleOpenNotification={handleOpenNotification}
                        notification={notification}
                        openNotification={openNotification}
                        handleOpenNotificationOff={handleOpenNotificationOff}
                        notificationArr={notificationArr}
                        handleOpenUser={handleOpenUser}
                        handleOpenUserOff={handleOpenUserOff}
                        openUser={openUser}
                        user={user}
                      />
                    ) : (
                      <BurgerIcon
                        onClick={handleNavbar}
                        /* eslint-enable */
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </BurgerIcon>
                    )}
                  </BurgerBox>
                )}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Header>
  );
}