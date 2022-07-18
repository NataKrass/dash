import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCustom, fetchAllSummary } from 'store/slices/notifications';
import { useTranslation } from 'react-i18next';
import { fetchUserEdit, updateUser } from 'store/slices/user';
import { isStatusLoading } from 'base/utils';
import styled from 'styled-components';
import {
  Main,
  Loader,
  Tab,
  FlexWrapper,
  TitleSmallBlack,
  Block,
  FlexWrapperStart,
  Modal,
  Overflow,
  ModalContent,
  TitlePage
} from 'base/styled';
import PasswordForm from './components/PasswordForm';
import ProfileForm from './components/ProfileForm';
import { ReactComponent as Success } from 'assets/images/saved.svg';

const MainProfile = styled(Main)`
  padding-top: 40px;
  flex-direction: column;
  .profile_form {
    margin-right: auto;
    padding: 13px 0;
    margin-left: 50px;
  }
  form {
    width: 100%;
    padding: 10px;
    p {
      padding-left: 10px;
    }
  }
  @media (max-width: 768px) {
    .profile_form {
      margin: 0;
    }
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 50px 0 0;
  @media (max-width: 768px) {
   padding: 10px 0 10px 50px;
  }
`;

const ProfileTab = styled(Tab)`
  cursor: pointer;
  padding-left: 20px;
  text-align: left;
  border: none;
  background: transparent;
  position: relative;
  color: ${(props) => (props.active ? 
    props => props.theme.colors.accentRed 
    : props => props.theme.colors.grey)};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  .after {
  display: block;
  position: absolute;
  content: '';
  width: 7px;
  height: 16px;
  background: ${props => props.theme.colors.accentRed };
  border-radius: 4px;
  top: 9px;
  left: 0;
  }
`;

const Content = styled.div`
  ${(props) => (props.active ? '' : 'display:none')};
  padding-top: 50px;
  width: 40%;
  @media (max-width: 768px) {
    width: 100%;
    padding-top: 0;
  }
`;

const SaveBlock = styled(Block)`
  margin: 0 auto;
  padding: 20px 50px;
  .success_icon {
    width: 78%;
  }
`;

const Flex = styled(FlexWrapperStart)`
@media (max-width: 768px) {
  flex-direction: column;
}
`;

export default function Index() {
  const dispatch = useDispatch();
  const { user, status, errors } = useSelector((state) => state.userReducer);
  const { page, customs, summaries } = useSelector(
    (state) => state.notificationsReducer
  );
  const { t } = useTranslation('profileForm');
  const { t: rootT } = useTranslation();
  const [active, setActive] = useState(0);
  const [success, setSuccess] = useState();

  useEffect(() => {
    dispatch(fetchAllCustom({ page, customs }));
    dispatch(fetchAllSummary({ page, summaries }));
    dispatch(fetchUserEdit());
    // if (!user) {
    //   dispatch(fetchUserEdit());
    // }
    /* eslint-disable */
  }, [dispatch]);
    /* eslint-enable */
  
  function submitHandler(event, formFields) {
    dispatch(updateUser(formFields));
  }

  function handleTab(e) {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  }

  function handleSuccessOff() {
    setSuccess();
  }

  return isStatusLoading(status) ? (
    <Loader />
  ) : (
    <MainProfile>
      <FlexWrapper>
        <TitleSmallBlack>{t('settings')}</TitleSmallBlack>
      </FlexWrapper>

      <Flex>
        <Column>
          <ProfileTab onClick={handleTab} active={active === 0} id={0}>
            {active === 0 && <div className="after"></div>}
            {t('profile')}
          </ProfileTab>
          <ProfileTab onClick={handleTab} active={active === 2} id={2}>
            {active === 2 && <div className="after"></div>}
            {t('password')}
          </ProfileTab>
        </Column>
        <>
          <Content active={active === 0}>
            <Block className="profile_form">
              <ProfileForm
                onSubmit={submitHandler}
                user={user}
                errors={errors}
              />
            </Block>
          </Content>
          <Content active={active === 2}>
            <TitlePage>{t('resetPassword')}</TitlePage>
            <Block className="profile_form">
              <PasswordForm setSuccess={setSuccess} />
            </Block>
          </Content>
        </>
      </Flex>
      {success && (
        <Modal>
          <Overflow onClick={handleSuccessOff}></Overflow>
          <SaveBlock>
            <ModalContent className="success">
              <FlexWrapper className="success_icon">
                <Success />
              </FlexWrapper>
              <TitleSmallBlack>{rootT('saved')}</TitleSmallBlack>
            </ModalContent>
          </SaveBlock>
        </Modal>
      )}
    </MainProfile>
  );
}
