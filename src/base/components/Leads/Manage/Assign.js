import { useState, useEffect } from 'react';
import { any, func } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from 'store/slices/users';
import { makeAsOptions } from 'base/utils';
import {
  AccentButton,
  ButtonsWrap,
  OutlinedButton,
  StyledSelect,
  TextAccentSmall,
  TextBlackBig,
  TextBlackThin,
} from 'base/styled';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import network from 'base/network';

const Content = styled.div`
  padding: 20px 10px 10px 20px;
`;

const Select = styled(StyledSelect)`
  margin: 20px 20px 40px 0;
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

export default function Assign({handleShowModalOff, handleSuccess, leadsMarked}) {
  const { t: popupT } = useTranslation('popup');
  const { t: rootT } = useTranslation('');
  const { users } = useSelector((state) => state.usersReducer);
  const [user, setUser] = useState();
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  function userHandler(e) {
    setUser(e.value);
  }
  
  useEffect(() => {
    dispatch(fetchUsers({ users }));
  /* eslint-disable */
  }, [dispatch]);
  /* eslint-enable */

  const usersOptions = makeAsOptions(users, 'id', 'full_name');

  function handleSubmit() {
    if(user) {
      network.post('/api/leads/assign', {
        user_id: user,
        selected_ids: leadsMarked.join(),
      });
      handleSuccess();
    } else {
      setText("Please choose a user");
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextBlackBig style={{textAlign: "center"}}>{rootT('assign')}</TextBlackBig>
      <Content>
        <TextBlackThin>{popupT('assignTo')}</TextBlackThin>
        <TextAccentSmall>{text}</TextAccentSmall>
        <Select
          options={usersOptions}
          onChange={userHandler}
          styles={customStyles}
          menuPlacement="bottom"
        />

        <ButtonsWrap>
          <OutlinedButton onClick={handleShowModalOff}>
            {rootT('cancel')}
          </OutlinedButton>
          <AccentButton onClick={handleSubmit}>{rootT('assign')}</AccentButton>
        </ButtonsWrap>
      </Content>
    </form>
  );
}

Assign.propTypes = {
  handleShowModalOff: func,
  handleSuccess: func,
  leadsMarked: any
};
