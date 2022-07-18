import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deletePersonalization,
  fetchAllPersonalizations
} from 'store/slices/personalizations';
import { useTranslation } from 'react-i18next';
import {
  AccentButton,
  Block,
  Page,
  TextBlack,
  Manage,
  ManageBox,
  TextBlackThin,
  TextGreyBold,
  TextWhite,
  TitleBlack,
  TitleTwo,
  Overlay,
  Loader,
  OutlinedButton,
  Modal,
  Confirm,
  Overflow,
  FilledButton,
  FlexEnd,
  SearchForm
} from 'base/styled';
import { ReactComponent as Running } from 'assets/images/running.svg';
import { ReactComponent as Paused } from 'assets/images/paused.svg';
import { ReactComponent as Plus } from 'assets/images/plus_white.svg';
import { ReactComponent as Nav } from 'assets/images/nav_dark.svg';
import { ReactComponent as Delete } from 'assets/images/delete.svg';
import { ReactComponent as Edit } from 'assets/images/edit.svg';
import { ReactComponent as SearchIcon } from 'assets/images/search.svg';
import styled from 'styled-components';
import NewForm from './NewForm';
import Responsive from 'context/responsive';
import Success from 'base/components/Success';
import network from 'base/network';

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -11px;
  @media (max-width: 768px) {
    flex-direction: column;
    button {
      height: 45px;
    }
  }
`;

const PersonalizePage = styled(Page)`
  width: 101%;
  margin-left: 11px;
  `;

const Subheader = styled(TextBlackThin)`
  margin-bottom: 40px;
`;

const SearchBox = styled.div`
  margin-right: 17px;
  padding: 20px 0 20px;
  form {
    min-width: 290px;
  }
`;

const Title = styled(TitleBlack)`
  text-align: left;
`;

const Box = styled(Block)`
  margin: 5px 0 5px 0;
  padding: 10px 25px;
  justify-content: space-between;
  align-items: center;
  position: static;
`;

const BoxHead = styled.div`
  padding: 0px 22px;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.div`
  width: 48%;
  cursor: pointer;
`;

const User = styled.div`
  margin-right: auto;
`;

const Button = styled.div`
  background: ${(props) => props.theme.colors.green};
  padding: 20px 20px 0px;
  cursor: pointer;
  text-align: center;
  border-radius: 8px;
  width: 95px;
  p {
    margin-top: 5px;
  }
`;

const Campaign = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  background: ${(props) => props.theme.colors.bgMain};
  padding: 40px 0 0 100px;
  margin-left: -43px;
  z-index: 5;
  overflow-y: scroll;
  .url {
    color: #73ccfe;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
  }
  button {
    margin-top: 35px;
  }
  @media (max-width: 768px) {
    padding: 70px 0 0 18px;
    margin-left: 0;
  }
  &.edit {
    position: absolute;
    top: 0;
    overflow-y: scroll;
  }
`;

const ManageBoxRight = styled(ManageBox)`
  right: -5px;
  top: 27px;
`;

const ManageWrap = styled(Manage)`
  width: 38px;
  svg {
    margin-top: 4px;
  }
`;

const Over = styled(Overlay)`
  z-index: 0;
  background: #f9f9f9;
`;

export default function Index() {
  const { t: rootT } = useTranslation('');
  const { t: personalizationT } = useTranslation('personalization');
  const dispatch = useDispatch();
  const [run, setRun] = useState([]);
  const [campaign, setCampaign] = useState(null);
  const [showCampaign, setShowCampaign] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [manage, setManage] = useState(false);
  const [stat, setStat] = useState();
  const [url, setUrl] = useState();
  const [confirm, setConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState();
  const [text, setText] = useState('');

  const { page, filters, personalizations, status } = useSelector(
    (state) => state.personalizationsReducer
  );

  const getUrl = async (id) => {
    setStat('loading');
    let res = await network
      .get(`/api/personalization_campaigns/${id}/set_editor_uuid`)
      .then(({ data }) => data)
      .catch((error) => console.log(error));
    setUrl(res.results);
 
  };
  /* eslint-disable */
  useEffect(() => {
    if (url) {
      window.open(url, '_blank');
      setStat('succeed');
      setUrl();
    }
  });

  useEffect(() => {
    dispatch(fetchAllPersonalizations({ page, filters, personalizations }));
    setSearchResults(personalizations)
  }, [dispatch, run]);

  useEffect(() => {
    setSearchResults(personalizations)
    setStat(status);
  }, [status]);
  /* eslint-enable */
  const handleShowCampaign = (idx) => () => {
    const campaign = personalizations.find((el) => el.id === idx);
    setCampaign(campaign);
    if (showCampaign) {
      setCampaign(campaign);
      return;
    } else {
      setShowCampaign(true);
    }
  };

  function handleCloseCampaign() {
    setShowCampaign(false);
  }

  const handleRun = (idx) => {
    setRun((state) => ({
      ...state,
      [idx]: !run[idx],
    }));
  };

  const handleStatus = (id, stat, idx) => () => {
    //dispatch(putPersonalizationRun({id, status: status === "started" ? false : true }));
    network.put(`/api/personalization_campaigns/${id}/set_status`, {status: stat === "started" ? false : true });
    setRun((state) => ({
      ...state,
      [idx]: !run[idx],
    }));
    handleRun(idx);
    //dispatch(fetchAllPersonalizations({ page, filters, personalizations }));
  };

  function handleShowForm() {
    setShowForm(true);
  }

  function handleShowFormOff() {
    setShowForm(false);
    setEdit(false);
  }

  const handleUpdate = (idx) => () => {
    setEdit((state) => ({
      ...state,
      [idx]: true
    }));
  };

  const handleManage = (idx) => () => {
    setManage((state) => ({
      ...state,
      [idx]: !manage[idx],
    }));
  };

  const handleShowDelete = (idx) => () => {
    setShowModal((state) => ({
      ...state,
      [idx]: true
    }));
    setConfirm(true);
  };

  function handleDelete(id) {
    dispatch(deletePersonalization(id)); 
    handleShowOff();
  }
  
  function handleShowOff() {
    setShowModal(false);
    setSuccess(false);
    setConfirm(false);
    setEdit(false);
  }

  useEffect(() => {
    setSearchResults(personalizations);
    /* eslint-disable */
  }, [search]);
  /* eslint-enable */

  function handleText(e) {
    setText(e.target.value);
    setSearchResults(personalizations.filter((el) => {
      return el.name.toLowerCase().includes(text.toLowerCase());
    }));
  }

  function handleSubmit() {
    if(text) {
      setSearchResults(personalizations.filter((el) => {
        return el.name.toLowerCase().includes(text?.toLowerCase());
      }));
    } else {
      setSearchResults(personalizations);
    }
    setSearch(true);
  }

  const ctx = useContext(Responsive);

  return (
    <PersonalizePage>
      {stat === 'loading' ? (
        <Loader />
      ) : (
        <>
          <Flex>
            {ctx.isMobile ? (
              <TitleTwo>{personalizationT('title')}</TitleTwo>
            ) : (
              <Title>{personalizationT('title')}</Title>
            )}
            <AccentButton onClick={handleShowForm}>
              <Plus />
              {personalizationT('new')}
            </AccentButton>
            
          </Flex>
          <Subheader>{personalizationT('subtitle')}</Subheader>
          
          <SearchBox>
            <SearchForm>
              <SearchIcon onClick={handleSubmit} />
              <input type="search" placeholder="Search" onChange={handleText} />
            </SearchForm>
          </SearchBox>

          <BoxHead>
            <Name>
              <TextGreyBold>{personalizationT('experience')}</TextGreyBold>
            </Name>
            <User>
              {' '}
              <TextGreyBold>{personalizationT('assignTo')}</TextGreyBold>
            </User>
            <div></div>
          </BoxHead>
          {stat === 'failure' && <TextBlack>please, reload a page</TextBlack>}
          {searchResults ? (
            searchResults.map((item, idx) => (
              <Box key={item.id}>
                <Name>
                  <TextBlack onClick={handleShowCampaign(item?.id)}>
                    {item.name}
                  </TextBlack>
                  {ctx.isMobile && (
                    <TextBlack>{item?.user?.full_name}</TextBlack>
                  )}
                </Name>
                <User>
                  {!ctx.isMobile && (
                    <TextBlack>{item?.user?.full_name}</TextBlack>
                  )}
                </User>
                <Button onClick={handleStatus(item.id, item.status, idx)}>
                  {item.status === 'started' ? (
                    <>
                      {/* {run[idx] ? <Running /> : <Paused />} */}
                      <Running />
                      <TextWhite>{personalizationT('running')}</TextWhite>
                    </>
                  ) : (
                    <>
                      <Paused />
                      <TextWhite>{personalizationT('paused')}</TextWhite>
                    </>
                  )}
                </Button>
                <ManageWrap onClick={handleManage(idx)}>
                  <Nav />
                  {manage[idx] && (
                    <ManageBoxRight>
                      <a onClick={handleUpdate(idx)}>
                        <Edit />
                        <span>{rootT('edit')}</span>
                      </a>
                      <a onClick={handleShowDelete(idx)}>
                        <Delete />
                        <span>{rootT('delete')}</span>
                      </a>
                    </ManageBoxRight>
                  )}
                </ManageWrap>
                {showModal[idx] && (
                  <>
                    <Modal>
                      <Overflow onClick={handleShowOff}></Overflow>
                      {success && <Success />}
                      {confirm && (
                        <Confirm>
                          <TextBlack>{personalizationT('delete')}</TextBlack>
                          <FlexEnd>
                            <OutlinedButton onClick={handleShowOff}>
                              {rootT('cancel')}
                            </OutlinedButton>
                            <FilledButton
                              /* eslint-disable */
                              onClick={() => handleDelete(item.id)}
                              /* eslint-enable */
                            >
                              {rootT('delete')}
                            </FilledButton>
                          </FlexEnd>
                        </Confirm>
                      )}
                    </Modal>
                  </>
                )}
                {edit[idx] && (
                  <>
                    <Over></Over>
                    <Campaign className="edit">
                      {ctx.isMobile ? (
                        <TitleTwo>{personalizationT('edit')}</TitleTwo>
                      ) : (
                        <Title>{personalizationT('edit')}</Title>
                      )}
                      <NewForm
                        handleShowFormOff={handleShowFormOff}
                        edit={true}
                        item={item}
                      />
                    </Campaign>
                  </>
                )}
              </Box>
            ))
          ) : (
            <AccentButton onClick={handleShowForm}>
              <Plus />
              {personalizationT('new')}
            </AccentButton>
          )}
          {showCampaign && (
            <>
              <Over></Over>
              <Campaign>
                {ctx.isMobile ? (
                  <TitleTwo>{campaign.name}</TitleTwo>
                ) : (
                  <Title>{campaign.name}</Title>
                )}
                <>
                  <TextBlack>{personalizationT('url')}:</TextBlack>
                  <p
                    className="url"
                    /* eslint-disable */
                    onClick={() => {
                      getUrl(campaign.id);
                    }}
                    /* eslint-enable */
                  >
                    {personalizationT('pageEditor')}
                  </p>
                  <div>
                    <OutlinedButton onClick={handleCloseCampaign}>
                      {personalizationT('back')}
                    </OutlinedButton>
                  </div>
                </>
              </Campaign>
            </>
          )}
          {showForm && (
            <>
              <Over></Over>
              <Campaign>
                {ctx.isMobile ? (
                  <TitleTwo>{personalizationT('new')}</TitleTwo>
                ) : (
                  <Title>{personalizationT('new')}</Title>
                )}
                <NewForm handleShowFormOff={handleShowFormOff} edit={edit} />
              </Campaign>
            </>
          )}
        </>
      )}
    </PersonalizePage>
  );
}
