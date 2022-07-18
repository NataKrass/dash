import styled from 'styled-components';
import { func, bool, array } from 'prop-types';
import SideNav from "../SideNav";
import routes from '../../../navigation/routes';
import HeaderNav from '../Leads/Header/HeaderNav';

const Wrapper = styled.div`
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.13);
  border-radius: 0px 0px 0px 37px;
  background: #fff;
  top: 0;
  right: 0;
  width: 250px;
  padding: 10px;
  position: fixed;
  height: 420px;
`;

export default function Burger({ handleOpenNotification,
  handleOpenUser,
  handleOpenUserOff,
  notification,
  handleOpenNotificationOff,
  notificationArr,
  handleNavbarOff,
  openNotification,
  openUser,
  user}) {

  return (
    <Wrapper>
      <HeaderNav
        handleOpenNotification={handleOpenNotification}
        notification={notification}
        openNotification={openNotification}
        handleOpenNotificationOff={handleOpenNotificationOff}
        notificationArr={notificationArr}
        handleOpenUser={handleOpenUser}
        handleOpenUserOff={handleOpenUserOff}
        handleNavbarOff={handleNavbarOff}
        isMobile={true}
        openUser={openUser}
        user={user}
      />
      <SideNav
        routes={routes.sideNav}
        leadRoutes={routes.leadNav}
        companyRoutes={routes.companyNav}
      />
    </Wrapper>
  );
}

Burger.propTypes = {
  handleOpenNotification: func,
  isStatusSucceed: func,
  handleOpenUser: func,
  handleOpenUserOff: func,
  notification: bool,
  openNotification: bool,
  handleOpenNotificationOff: func,
  handleNavbarOff: func,
  notificationArr: array,
  openUser: func,
  user: array
};