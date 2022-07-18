import styled from 'styled-components';
import UserDropdown from './UserDropdown';
import { Link } from 'react-router-dom';
import Notification from './Notification';
import { func, bool, object } from 'prop-types';
import { FlexWrapper, Modal } from 'base/styled';
import { ReactComponent as UserIcon } from 'assets/images/user.svg';
import { ReactComponent as More } from 'assets/images/more.svg';
import { ReactComponent as Setting } from 'assets/images/setting.svg';
import { ReactComponent as Notificate } from 'assets/images/notification.svg';
import { ReactComponent as CloseIcon } from 'assets/images/close.svg';
import Switcher from './Switcher';

const Flex = styled(FlexWrapper)`
  width: 70%;
  margin-left: auto;
  @media only screen and (max-width: 1000px){
    width: auto;
    .settings {
      a {
        margin-left: 18px;
      }
    }
  }
  @media only screen and (max-width: 990px){
    width: auto;
    .settings {
      padding-right: 0px;
    }
  }
  @media only screen and (max-width: 768px){
    width: auto;
    justify-content: flex-end;
    .settings {
      width: 70%;
    }
    .user {
      width: 30%;
    }
  }
`;

const HeaderBox = styled.div`
 
  display: flex;
  justify-content: space-around;
  margin-left: 10px;
  align-items: center;
  position: relative;
  a {
    cursor: pointer;
    margin-left: 18px;
  }
  .before {
    position: relative;
    .indicator {
      dispaly: block;
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      left: 5px;
    }
    .active {
      background: red;
    }
  }
  @media only screen and (max-width: 990px){
    margin-left: 0;
    a {
      margin-left: 0;
    }
  }
  @media (max-width: 830px) {
    margin-left: 15px;
    a {
      margin: 0 3px;
    }
  }
`;

const User = styled.div`
  position: relative;
  cursor: pointer;
  padding: 0 20px;
`;

const Close = styled.div`
  margin-right: 40px;
`;

export default function HeaderNav({
  handleOpenNotification,
  handleOpenUserOff,
  handleOpenUser,
  notification,
  openNotification,
  handleOpenNotificationOff,
  handleNavbarOff,
  isMobile,
  openUser,
  user
}) {
  return (
    <Flex>
      <HeaderBox> 
        {!isMobile && <Switcher />}
      </HeaderBox>
      <HeaderBox className="settings">
        {isMobile && <Close onClick={handleNavbarOff}><CloseIcon /></Close>}
       
        <a
          href="https://resources.visitorqueue.com"
          target="_blank"
          rel="noreferrer"
        >
          <More />
        </a>
        <Link to="/profile">
          <Setting />
        </Link>
     
        {notification && (
          <>
            <a onClick={handleOpenNotification} className="before">
              <div className="active indicator"></div>
              <Notificate />
            </a>
            {openNotification && (
              <>
                <Modal onClick={handleOpenNotificationOff}> </Modal>
                <Notification array={notificationArr} />
              </>
            )}
          </>
        )}
        <User onClick={handleOpenUser}>
          <UserIcon />
        </User>
        {(
          <>
            {openUser && (
              <>
                <Modal onClick={handleOpenUserOff}> </Modal>
                <UserDropdown user={user} />
              </>
            )}
          </>
        )}
      </HeaderBox>
    </Flex>
  );
}

HeaderNav.propTypes = {
  user: object,
  handleOpenNotification: func,
  handleOpenUserOff: func,
  handleOpenUser: func,
  notification: bool,
  openNotification: bool,
  handleOpenNotificationOff: func,
  handleNavbarOff: func,
  openUser: bool,
  isMobile: bool
};