import { Block, List, TextBlackExtraSmall, TextLightExtraSmall } from 'base/styled';
import styled from 'styled-components';
import { arrayOf } from 'prop-types';

const NotificationBox = styled(Block)`
  display: block;
  position: absolute;
  top: 50px;
  right: 52px;
  width: max-content;
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
  }
`;

const Item = styled.li`
  padding: 0;
  margin: 13px 0;
  p {
    margin: 3px 0;
  }
`;

function renderNotifications(item, idx){
  return (
    <Item key={idx}>
      <TextBlackExtraSmall>{item.title}</TextBlackExtraSmall>
      <TextLightExtraSmall>{item.value}</TextLightExtraSmall>
    </Item>
  );
}


export default function Notification({array}) {

  return (
    <>
      <NotificationBox>
        <List>
          {array.map(renderNotifications)}
        </List>
      </NotificationBox>
    </>
  );
}

Notification.propTypes = {
  array: arrayOf
};



  