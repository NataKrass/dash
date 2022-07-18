import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCustom, fetchAllSummary } from 'store/slices/notifications';
import { useTranslation } from 'react-i18next';
import { fetchUserEdit } from 'store/slices/user';
import { isStatusLoading } from 'base/utils';
import styled from 'styled-components';
import {
  Main,
  Loader,
  FlexWrapper,
  TitleSmallBlack,
  Block,
  FlexWrapperStart,
  Modal,
  Overflow,
  ModalContent,
  TitlePage,
  AccentButton
} from 'base/styled';
import EmailsTable from './components/EmailsTable';
import { ReactComponent as Success } from 'assets/images/saved.svg';
import { ReactComponent as Plus } from 'assets/images/plus_white.svg';
import { ReactComponent as CloseIcon } from 'assets/images/close.svg';
import LeadQueue from 'base/components/Leads/NewQueue/LeadQueue';
import Responsive from 'context/responsive';

const MainProfile = styled(Main)`
  padding: 40px 0 0 40px;
  flex-direction: column;
  h1 {
  padding: 0 0 50px 0;
  }
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

const Close = styled.div`
  position: fixed;
  bottom: 4%;
  left: 40%;
  background: #fff;
  border-radius: 50%;
  width: 47px;
  height: 47px;
  padding: 16px;
`;

const Over = styled(Overflow)`
  left: 0px;
  top: 0px;
  z-index: 1;
  height: 100vh;
  @media (max-width: 768px) {
    left: -2px;
  }
`;

const ContentEmail = styled.div`
  padding-top: 50px;
  width: 80%;
  h2 {
    margin: 0 0 30px 0;
  }
  table {
    margin-bottom: 90px;
  }
  button {
    margin-left: 20px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SaveBlock = styled(Block)`
  margin: 0 auto;
  padding: 20px 50px;
  .success_icon {
    width: 78%;
  }
`;

const Summary = styled.div`
  margin-top: -50px;
`;

const AddBlock = styled(Block)`
    position: fixed;
    width: 60%;
    top: 0;
    right: 0;
    height: 100%;
    padding: 0;
    overflow: hidden;
    z-index: 10;
    .fluid {
      width: 100;
    }
    @media (max-width: 768px) {
      width: 100%;
      height: 80%;
      border-radius: 0 0 15px 15px;
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
  const { queues } = useSelector((state) => state.dashboardQueuesReducer);
  const { t } = useTranslation('profileForm');
  const { t: rootT } = useTranslation();
  // const [active, setActive] = useState(1);
  const [success, setSuccess] = useState();
  const [openAdd, setOpenAdd] = useState();
  const [ custom ] = useState(true);

  useEffect(() => {
    dispatch(fetchAllCustom({ page, customs }));
    dispatch(fetchAllSummary({ page, summaries }));
    dispatch(fetchUserEdit());
    // if (!user) {
    //   dispatch(fetchUserEdit());
    // }
    /* eslint-disable */
    console.log(user, errors)
  }, [dispatch]);
    /* eslint-enable */

  function handleSuccessOff() {
    setSuccess();
  }

  function handleOpenAdd() {
    setOpenAdd(true);
  }

  function handleOpenAddOff() {
    setOpenAdd();
  }

  const ctx = useContext(Responsive);

  return isStatusLoading(status) ? (
    <Loader />
  ) : (
    <MainProfile>
      <FlexWrapper>
        <TitleSmallBlack>{t('mails')}</TitleSmallBlack>
      </FlexWrapper>

      <Flex>
        <>
          <ContentEmail>
            <Summary>
              <TitlePage>{t('emails')}</TitlePage>
              <EmailsTable list={summaries.results} />
            </Summary>
            <FlexWrapperStart>
              <TitlePage>{t('customQueue')}</TitlePage>
              <AccentButton onClick={handleOpenAdd}>
                <Plus />
                {rootT('add')}
              </AccentButton>
            </FlexWrapperStart>
            {openAdd &&  (
              <Modal>
                <Over>
                  {ctx.isMobile && (
                    <>
                      <Close onClick={handleOpenAddOff}>
                        <CloseIcon />
                      </Close>
                    </>
                  )}
                </Over>
                <AddBlock>
                  <LeadQueue handleOpen={handleOpenAddOff} queues={queues} />
                </AddBlock>
               
              </Modal>
            )}
            <div className="queue">
              <EmailsTable list={customs.results} custom={custom} />
            </div>
          </ContentEmail>
        
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
