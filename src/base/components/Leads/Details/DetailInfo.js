import { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { func, string, number, object, array, any } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { fetchLeadById, fetchLeadVisits, fetchLeadContacts, fetchLeadNotes } from 'store/slices/leads';
import { fetchUsers } from 'store/slices/users';
import { 
  Block, 
  FlexWrapper, 
  GhostButton, 
  ImageFluid, 
  LeadAvaWrapper, 
  FlexWrapperStart,
  TextBlack, 
  TextBlackSmall, 
  TextLight, 
  AccentButton,
  Overlay,
  Modal,
  Loading} from 'base/styled';
import CreatableSelect from 'react-select/creatable';
import { isStatusLoading, makeAsOptions } from 'base/utils';
//import Batch from 'base/components/Leads/Batch';
import { ReactComponent as Active } from 'assets/images/batch_active.svg';
import { ReactComponent as Arrow } from 'assets/images/arrow_right.svg';
import { ReactComponent as Youtube } from 'assets/images/youtube.svg';
import { ReactComponent as Crunch } from 'assets/images/crunch.svg';
import { ReactComponent as Google } from 'assets/images/google_logo.svg';
import { ReactComponent as Twitter } from 'assets/images/twitter_logo.svg';
import { ReactComponent as Linkedin } from 'assets/images/linkedin_logo.svg';
import { ReactComponent as CloseIcon } from 'assets/images/close.svg';
import DetailAccordion from './DetailAccordion';
import Responsive from 'context/responsive';
import network from 'base/network';
import BatchBox from '../BatchBox';
import Export from '../Manage/Export';
import Assign from '../Manage/Assign';
import Done from '../Manage/Done';
import Tags from '../Manage/Tags';
import Hide from '../Manage/Hide';
import Archive from '../Manage/Archive';

const Over = styled(Overlay)`
 z-index: 0;
`;

const Details = styled.div`
  width: 29%;
  padding: 0 0 0 15px;
  margin-right: -15px;
  position: fixed;
  top: 70px;
  overflow-y: auto;
  height: 90%;
  right: 20px;
  z-index: 36;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
    top: 0;
    right: 15px;
    z-index: 9;
    p {
      line-height: 1;
    }
  }
`;

const FlexWrapperFirst = styled.div`
  width: 50%;
  padding: 0 10px;
`;

const Buttons = styled(FlexWrapperFirst)`
  margin-top: 10px;
  @media (max-width: 1180px) {
    margin-top: 40px;
    a {
      white-space: nowrap;
    }
  }
`;

const FlexWrap = styled(FlexWrapper)`
  flex-wrap: wrap;
`;

const DetailsHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 15px;
  border-bottom: 1px solid ${props => props.theme.colors.greyLight};
`;

const CloseBtn = styled.div`
  cursor: pointer;
  position: absolute;
  top: 5px;
  left: 20px;
`;

const BlockDetail = styled(Block)`
  padding: 15px 0;
  flex-direction: column;
`;

const Info = styled.div`
  padding: 0 25px 15px;
  border-bottom: 1px solid ${props => props.theme.colors.greyLight};
`;

const Tag = styled.div`
  padding: 2px 6px;
  text-align: center;
  background: ${props => props.theme.colors.greyLight};
  border-radius: 10px;
  p {
    margin: 0;
    font-weight: 600;
    white-space: nowrap;
  }
`;

const UserWrapper = styled.div`
  padding: 3.5px 6px;
  text-align: center;
  background: ${props => props.theme.colors.themeLight};
  border-radius: 10px;
  white-space: nowrap;
  margin-bottom: 5px;
  p {
    margin: 0;
    font-weight: 600;
    white-space: nowrap;
  }
`;

const InfoBtn = styled.button`
  background: transparent;
  border: 1px dotted #BABABA;
  border-radius: 10px;
  cursor: pointer;
  p {
    margin: 0;
  }
`;

const Margin = styled.div`
  margin: 0 10px 10px 0;
  &.soc_logo {
    width: 18px
  }
`;

const Select = styled.div`
position: absolute;
z-index: 9;
display: flex;
`;

const Close = styled.div`
  position: absolute;
  bottom: 4%;
  left: 40%;
  background: #fff;
  border-radius: 50%;
  width: 47px;
  height: 47px;
  padding: 16px;
`;

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: '#000000',
    fontSize: '.75em',
    padding: 10,
    width: 120,
    background: '#C6D5DD'
  }),
  control: () => ({
    borderRadius: '20px',
    fontSize: '.75em',
    border: '1px solid #d1d1d1',
    width: 120,
    background: '#C6D5DD'
  }),
  menu: () => ({
    background: '#C6D5DD',
    borderRadius: '20px',
    overflow: 'hidden',
    fontSize: '.75em',
    fontWeight: '600'
  })
};

const BatchWrapper = styled.div`
position: relative;
  a {
    cursor: pointer;
    svg {
      margin: 14px 0 0 10px;
    }
  }
`;

const ModalOver = styled(Modal)`
  z-index: 35;
`;

const Popup = styled(Block)`
  margin: -2% auto 0;
  z-index: 35;
`;

const styleLoading = {
  height: '20px',
  width: '100px',
  marginTop: '0'
};

export default function DetailInfo({
  handleShowDetailsOff,
  leadName,
  leadLocation,
  leadTime,
  leadCount,
  date,
  leadSource,
  leadToShow,
  gaViewId
}) {
  const { t: homeT } = useTranslation('home');
  const [tags, setTag] = useState([
    { value: 'lead', label: 'lead' },
    { value: 'newlead', label: 'new lead' }
  ]);
  const {
    company,
    visits,
    contacts,
    notes,
    detailsStatus: detailsStatus,
    status: leadsStatus
  } = useSelector((state) => state.leadsReducer);
  const { users } = useSelector((state) => state.usersReducer);
  const [user, setUser] = useState([]);
  const [addTag, setAddtag] = useState();
  const [addUser, setAddUser] = useState();
  const [batch, setBatch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [exp, setExport] = useState(false);
  const [asign, setAsign] = useState(false);
  const [archive, setArchive] = useState(false);
  const [hide, setHide] = useState(false);
  const [success, setSuccess] = useState(false);
  const [tag, setTags] = useState(false);

  const dispatch = useDispatch();
  const tagOptions = [
    { value: 'tag', label: 'tag' },
    { value: 'new lead', label: 'new lead' },
    { value: 'has contacts', label: 'has contacts' },
    { value: 'assigned', label: 'assigned' },
  ];

  const usersOptions = makeAsOptions(users, 'id', 'full_name');

  useEffect(() => {
    dispatch(fetchUsers({ users }));
    dispatch(fetchLeadById(leadToShow.id));
    /* eslint-disable */
  }, [dispatch, success]);
    /* eslint-enable */

  console.log(leadsStatus);

  function addTagHandlerOff() {
    network.post('/api/leads/lead_tags', {
      tags: tags.join(),
      selected_ids: leadToShow.id,
    });
    dispatch(fetchLeadById(leadToShow.id));
    setAddtag();
  }

  function addUserHandlerOff() {
    network.post('/api/leads/assign', {
      user_id: user,
      selected_ids: leadToShow.id,
    });
    dispatch(fetchLeadById(leadToShow.id));
    setAddUser();
  }

  function handleShowAsign() {
    setShowModal(true);
    setAsign(true);
  }

  function handleShowTag() {
    setShowModal(true);
    setTags(true);
  }

  function tagHandler(e) {
    setTag(Array.isArray(e) ? e.map(x => x.value) : []);
    console.log(tags);
  }

  function userHandler(e) {
    setUser(e.value);
  }

  const ctx = useContext(Responsive);

  function renderTags(item, idx) {
    return (
      <Margin key={idx}>
        <Tag>
          <TextBlackSmall>{item.name}</TextBlackSmall>
        </Tag>
      </Margin>
    );
  }

  useEffect(() => {
    dispatch(fetchLeadById(leadToShow.id));
    dispatch(fetchLeadVisits(leadToShow.id));
    dispatch(fetchLeadContacts(leadToShow.id));
    dispatch(fetchLeadNotes(leadToShow.id));
    /* eslint-disable */
  }, [leadToShow.id, dispatch])
  /* eslint-enable */

  function handleBatch() {
    setBatch(true);
  }

  function handleBatchOff() {
    setBatch();
  }

  function handleShowModal() {
    setShowModal(true);
  }

  function handleShowModalOff() {
    setShowModal(false);
    setBatch(false);
    setExport(false);
    setAsign(false);
    setArchive(false);
    setHide(false);
    setTags(false);
    //setSuccess(false);
    // setShow(false);
  }

  function handleSuccess() {
    setSuccess(true);
    setBatch(false);
    setExport(false);
    setAsign(false);
    setArchive(false);
    setHide(false);
    setTags(false);
    setTimeout(() => {
      setSuccess(false);
      setShowModal(false);
      console.log(2000);
    }, 2000);
  }

  return (
    <>
      {ctx.isMobile && (
        <Over>
          <Close onClick={handleShowDetailsOff}>
            <CloseIcon />
          </Close>
        </Over>
      )}
      <Details>
        {batch && <Modal onClick={handleBatchOff}></Modal>}
        {showModal && (
          <ModalOver>
            <Overlay onClick={handleShowModalOff}></Overlay>
            <Popup>
              {exp && (
                <Export
                  handleShowModalOff={handleShowModalOff}
                  handleSuccess={handleSuccess}
                  leadsMarked={[leadToShow.id]}
                  gaViewId={gaViewId}
                />
              )}
              {asign && (
                <Assign
                  handleShowModalOff={handleShowModalOff}
                  handleSuccess={handleSuccess}
                  leadsMarked={[leadToShow.id]}
                />
              )}
              {archive && (
                <Archive
                  handleShowModalOff={handleShowModalOff}
                  handleSuccess={handleSuccess}
                  leadsMarked={[leadToShow.id]}
                />
              )}
              {hide && (
                <Hide
                  handleShowModalOff={handleShowModalOff}
                  handleSuccess={handleSuccess}
                  leadsMarked={[leadToShow.id]}
                />
              )}
              {tag && (
                <Tags
                  handleShowModalOff={handleShowModalOff}
                  handleSuccess={handleSuccess}
                  leadsMarked={[leadToShow.id]}
                />
              )}
              {success && <Done />}
            </Popup>
          </ModalOver>
        )}
        <BlockDetail>
          <DetailsHeader>
            <CloseBtn onClick={handleShowDetailsOff}>
              <Arrow />
            </CloseBtn>
            <LeadAvaWrapper>
              <ImageFluid src={leadToShow.logo} />
            </LeadAvaWrapper>
            <FlexWrapper>
              <TextBlack>{leadToShow.name}</TextBlack>
              <BatchWrapper>
                <a onClick={handleBatch}>
                  <Active />
                </a>
                {batch && (
                  <>
                    <BatchBox
                      leadsMarked={[leadToShow.id]}
                      setShowModal={setShowModal}
                      handleShowModal={handleShowModal}
                      handleShowModalOff={handleShowModalOff}
                      setExport={setExport}
                      setBatch={setBatch}
                      setAsign={setAsign}
                      setArchive={setArchive}
                      setHide={setHide}
                      setTags={setTags}
                    />
                  </>
                )}
              </BatchWrapper>
            </FlexWrapper>
          </DetailsHeader>
          <Info>
            <FlexWrapper>
              <FlexWrapperFirst>
                <TextLight>{homeT('location')}</TextLight>
                <TextBlackSmall>{leadToShow.location}</TextBlackSmall>
              </FlexWrapperFirst>
              <FlexWrapperFirst>
                <TextLight>{homeT('tags')}</TextLight>
                <FlexWrap>
                  {addTag && (
                    <Select>
                      <CreatableSelect
                        isMulti
                        options={tagOptions}
                        onChange={tagHandler}
                        styles={customStyles}
                      />
                      <AccentButton onClick={addTagHandlerOff}>
                        {homeT('save')}
                      </AccentButton>
                    </Select>
                  )}
                  {company.results?.tags &&
                    company.results.tags.map(renderTags)}
                  <Margin>
                    <InfoBtn 
                      //onClick={addTagHandler}
                      onClick={handleShowTag}
                    >
                      <TextLight>{homeT('add')}</TextLight>
                    </InfoBtn>
                  </Margin>
                </FlexWrap>
              </FlexWrapperFirst>
            </FlexWrapper>
            <FlexWrapper>
              <FlexWrapperFirst>
                <TextLight>{homeT('assignTo')}</TextLight>
                <FlexWrap>
                  {addUser && (
                    <Select>
                      <CreatableSelect
                        //isMulti
                        options={usersOptions}
                        onChange={userHandler}
                        styles={customStyles}
                      />
                      <AccentButton onClick={addUserHandlerOff}>
                        {homeT('save')}
                      </AccentButton>
                    </Select>
                  )}
                  {isStatusLoading(detailsStatus) ? (
                    <Loading style={styleLoading}/>
                  ) : company.results && company.results.assigned_to ? (
                    <UserWrapper>
                      <TextBlackSmall>
                        {company.results.assigned_to}
                      </TextBlackSmall>
                    </UserWrapper>
                  ) : null}
                  <Margin>
                    <InfoBtn
                      //onClick={addUserHandler}
                      onClick={handleShowAsign}
                    >
                      <TextLight>{homeT('add')}</TextLight>
                    </InfoBtn>
                  </Margin>
                </FlexWrap>
              </FlexWrapperFirst>
            </FlexWrapper>
            <FlexWrapper>
              <Buttons className="btn">
                <GhostButton
                  target="_blank"
                  rel="noreferrer"
                  href={
                    `https://www.google.com/search?q=` + leadName + leadLocation
                  }
                >
                  <Google />
                  {homeT('googleLead')}
                </GhostButton>
              </Buttons>
              <FlexWrapperFirst>
                {company.results?.company_info.social_profiles && (
                  <FlexWrapperStart>
                    {company.results?.company_info?.social_profiles && (
                      <Margin>
                        <a
                          href={
                            company.results?.company_info.social_profiles
                              .twitter
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Twitter />
                        </a>
                      </Margin>
                    )}
                    {'linkedin' in
                      company.results.company_info.social_profiles && (
                      <Margin>
                        <a
                          href={
                            company.results.company_info.social_profiles
                              .linkedin
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Linkedin />
                        </a>
                      </Margin>
                    )}
                    {'youtube' in
                      company.results.company_info.social_profiles && (
                      <Margin className="soc_logo">
                        <a
                          href={
                            company.results.company_info.social_profiles.youtube
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Youtube />
                        </a>
                      </Margin>
                    )}
                    {'crunchbase' in
                      company.results.company_info.social_profiles && (
                      <Margin className="soc_logo">
                        <a
                          href={
                            company.results.company_info.social_profiles
                              .crunchbase
                          }
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Crunch />
                        </a>
                      </Margin>
                    )}
                  </FlexWrapperStart>
                )}
              </FlexWrapperFirst>
            </FlexWrapper>
          </Info>
          <DetailAccordion
            leadName={leadName}
            leadLocation={leadLocation}
            leadTime={leadTime}
            leadCount={leadCount}
            date={date}
            leadSource={leadSource}
            companyInfo={company.results}
            visitsInfo={visits.results?.visit_details}
            contactsInfo={contacts}
            notesInfo={notes}
            leadToShow={leadToShow}
            detailsStatus={detailsStatus}
          />
        </BlockDetail>
      </Details>
    </>
  );
}

DetailInfo.propTypes = {
  handleShowDetailsOff: func,
  leadName: string,
  leadLocation: string,
  leadLogo: string,
  leadTime: string,
  leadCount: number,
  date: string,
  leadSource: string,
  companyInfo: object,
  visitsInfo: array,
  contactsInfo: array,
  notesInfo: array,
  leadToShow: any,
  gaViewId: number
};