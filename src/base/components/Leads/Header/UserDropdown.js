import { InlineLink, Block, List } from 'base/styled';
import styled from 'styled-components';
import { object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Partner } from 'assets/images/partners.svg';
import { ReactComponent as Video } from 'assets/images/video.svg';
import { ReactComponent as Logout } from 'assets/images/logout.svg';
import network from 'base/network';

const UserMenu = styled(Block)`
display: block;
position: absolute;
bottom: -172px;
right: 1px;
width: max-content;
z-index: 99;
&:after {
  content: '';
  position: absolute;
  right: 21px;
  top: -6px;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid white;
  clear: both;
}
ul {
    list-style: none;
    li:first-child {
        padding-top: 20px;
    }
}
`;

const UserLink = styled(InlineLink)`
    font-size: .75rem;
    font-weight: 600;
   color: ${props => props.theme.colors.accentRed}; 
   letter-spacing: 0.05rem;
   margin-bottom: 10px;
`;

const UserMenuItem = styled.a`
margin: 10px 0;
color: #000;
font-size: .75rem;
text-decoration: none;
svg {
    margin-right: 7px;
    margin-bottom: -2px;
}
`;

const Item = styled.li`
  padding: 7px 0;
`;

export default function UserDropdown({user}) {

  const { t: header } = useTranslation('header');

  const signOut = async () => {   
    let res = await network
      .delete('api/users/sessions/sign_out')
      .then((data) => {
        //this.setState({ isLoading: false, downlines: data.response });
        document.location.reload();
        console.log(data, "DATA STORED");
      })
      .catch((error) => console.log(error));
    console.log(res);
  };

  function handleSignOut() {
    signOut();
    // const url = process.env.REACT_APP_API_PATH + 'sign_in';
    // window.open(url, '_self');
    //document.location.reload();
    console.log('logout');
  }
  return (
    <>
      <UserMenu>
        <UserLink className="user_name" to="/profile">
          {`${user.first_name} ${user.last_name}`}
        </UserLink>
        <List>
          <Item>
            <UserMenuItem href="https://www.visitorqueue.com/affiliate" target="_blank" rel="noreferrer">
              <Partner />
              {header('partnerProgram')}  
            </UserMenuItem>
          </Item>
          <Item>
            <UserMenuItem href="https://resources.visitorqueue.com/hc/en-us/articles/360016288011-Pre-Recorded-Demo" target="_blank" rel="noreferrer">
              <Video />
              {header('tutorial')}  
            </UserMenuItem>
          </Item>
          <Item onClick={handleSignOut}>
            {/* <UserMenuItem href={process.env.REACT_APP_API_PATH + 'users/sign_in'} rel="noreferrer"> */}
            <UserMenuItem>
              <Logout />
              {header('logout')} 
            </UserMenuItem>
          </Item>
        </List>
      </UserMenu>
    </>
  );
}

UserDropdown.propTypes = {
  user: object
};
  