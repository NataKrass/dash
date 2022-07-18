import { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchAllConversions,
  deleteConversion
} from 'store/slices/conversions';
import { node } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  AccentButton,
  Block,
  FlexWrapper,
  FlexWrapperStartMiddle,
  Page,
  Manage,
  ManageBox,
  TextBlack,
  TextBlackThin,
  TextBlackHuge,
  TextLightBold,
  TitleBlack,
  TextLight,
  Overlay,
  Loader,
  Modal,
  Confirm,
  Overflow,
  FlexEnd,
  OutlinedButton,
  FilledButton,
  TitleTwo,
  SearchForm,
} from 'base/styled';
import { ReactComponent as ManageIcon } from 'assets/images/manage.svg';
import { ReactComponent as Success } from 'assets/images/compl.svg';
import { ReactComponent as Plus } from 'assets/images/plus_white.svg';
import { ReactComponent as Edit } from 'assets/images/edit.svg';
import { ReactComponent as Delete } from 'assets/images/trash.svg';
import { ReactComponent as Empty } from 'assets/images/empty.svg';
import { ReactComponent as SearchIcon } from 'assets/images/search.svg';
import { Row, Col } from '@bootstrap-styled/v4';
import Responsive from 'context/responsive';
import styled from 'styled-components';
import NewForm from './NewForm';
import Conversion from './Conversion';

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .col-static {
    position: static;
  }
`;

const ConversionsPage = styled(Page)`
  margin-left: 54px;
  width:83%;
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
  margin: 25px 0;
  padding: 10px 25px;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  .fluid {
    width: 100%;
  }
  .text {
    margin: 13px 2px 6px;
    @media (max-width: 768px) {
      margin: 1px 2px 6px;
    }
  }
  .number {
    padding: 10px 0 50px;
  }
  .name {
    padding-bottom: 30px;
  }
  .completions {
    padding-bottom: 15px;
  }
`;

const Date = styled.div`
  display: flex;
  align-items: end;
`;

const Campaign = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.bgMain};
  padding: 70px 0 0 100px;
  margin-left: -13px;
  a {
    color: #73ccfe;
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
  }
  button {
    margin-top: 35px;
  }
  @media (max-width: 768px) {
    padding: 70px 0 0 30px;
    margin-left: 0;
  }
  &.edit {
    position: fixed;
    top: 80px;
    overflow-y: scroll;
    z-index: 9;
    left: 10%;
    width: 85vw;
  }
`;

const ManageBoxRight = styled(ManageBox)`
  right: -5px;
  top: 27px;
`;

const Add = styled.div`
  background: #e4fecf;
  border-radius: 17px;
  padding: 0 115px;
  position: fixed;
  top: 140px;
  left: 30%;
  z-index: 99;
`;

const Margin = styled.div`
  margin: 0 auto;
  text-align: center;
  .empty {
    margin: 60px 0 40px;
  }
  button {
    margin-top: 20px;
  }
`;

const TitleNew = styled(Title)`
@media (max-width: 768px) {
  font-size: 1.02rem
}
`;

const Over = styled(Overlay)`
  z-index: 0;
  background: #F9F9F9;
`;

export default function Index() {
  const { t: rootT } = useTranslation('');
  const { t: homeT } = useTranslation('home');
  const { t: conversionsT } = useTranslation('conversions');
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [campaign, setCampaign] = useState(null);
  const [showCampaign, setShowCampaign] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [manage, setManage] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [successText, setSuccessText] = useState('');
  const [edit, setEdit] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState('');
  const [text, setText] = useState();

  const { page, conversions, status } = useSelector(
    (state) => state.conversionsReducer
  );

  const handleManage = (idx) => () => {
    setManage((state) => ({
      ...state,
      [idx]: !manage[idx],
    }));
  };

  const handleShowCampaign = (idx) => () => {
    const campaignId = conversions.results.find((el) => el.id === idx);
    setCampaign(campaignId);
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

  function handleSuccess() {
    setSuccess(true);
  }

  function handleShowForm() {
    setShowForm(true);
  }

  function handleShowFormOff() {
    setShowForm(false);
    setEdit(false);
  }

  function handleShowOff() {
    setSuccess(false);
    setConfirm(false);
  }

  const handleShowModal = (idx) => () => {
    setConfirm((state) => ({
      ...state,
      [idx]: true
    }));
  };

  function handleDelete(id) {
    dispatch(deleteConversion(id)); 
    dispatch(fetchAllConversions);
    setConfirm(false);
    setSuccess(true);
    setSuccessText(conversionsT('deleted'));
  }

  const handleUpdate = (idx) => () => {
    setEdit((state) => ({
      ...state,
      [idx]: true
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showForm, confirm]);
 
  useEffect(() => {
    dispatch(fetchAllConversions({ page, conversions }));
    console.log(conversions);
    setSearchResults(conversions);
    
    /* eslint-disable */
  }, [dispatch]);
  /* eslint-enable */
  const ctx = useContext(Responsive);

  useEffect(() => {
    setSearchResults(conversions);
    
    /* eslint-disable */
  }, [search]);
  /* eslint-enable */

  function handleText(e) {
    setText(e.target.value);
    setSearchResults(conversions.filter((el) => {
      return el.name.toLowerCase().includes(text.toLowerCase());
    }));
  }

  function handleSubmit() {
    if(text) {
      setSearchResults(conversions.filter((el) => {
        return el.name.toLowerCase().includes(text?.toLowerCase());
      }));
    } else {
      setSearchResults(conversions);
    }
    setSearch(true);
  }

  const list = text ? searchResults : conversions;

  return (
    <ConversionsPage>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          {success && (
            <Add>
              <TextBlack>{successText}</TextBlack>
            </Add>
          )}
          <Flex>
            <TitleNew>{conversionsT('title')}</TitleNew>
            {conversions && (
              <AccentButton onClick={handleShowForm}>
                <Plus />
                {conversionsT('new')}
              </AccentButton>
            )}
          </Flex>
          <TextBlackThin>{conversionsT('subtitle')}</TextBlackThin>
          {conversions && (
            <>
              <SearchBox>
                <SearchForm>
                  <SearchIcon onClick={handleSubmit} />
                  <input
                    type="search"
                    placeholder="Search"
                    onChange={handleText}
                  />
                </SearchForm>
              </SearchBox>

              <Row>
                {list.map((item, idx) => (
                  <Col md="6" key={idx} className="col-static">
                    <Box>
                      <FlexWrapper className="fluid name">
                        <TextLightBold onClick={handleShowCampaign(item.id)}>
                          {item.name}
                        </TextLightBold>
                        <Manage onClick={handleManage(idx)}>
                          <ManageIcon />

                          {manage[idx] && (
                            <ManageBoxRight>
                              <a onClick={handleUpdate(idx)}>
                                <Edit />
                                <span>{rootT('edit')}</span>
                              </a>
                              <a onClick={handleShowModal(idx)}>
                                <Delete />
                                <span>{rootT('delete')}</span>
                              </a>
                            </ManageBoxRight>
                          )}
                        </Manage>
                      </FlexWrapper>
                      <FlexWrapper className="completions">
                        <Success />
                        <TextBlackThin className="text">
                          {conversionsT('completions')}
                        </TextBlackThin>
                      </FlexWrapper>
                      <FlexWrapperStartMiddle className="number">
                        <TextBlackHuge>{item.completions_count}</TextBlackHuge>
                      </FlexWrapperStartMiddle>
                      <FlexWrapper className="fluid">
                        <div>
                          <TextBlackThin>
                            {conversionsT('createdBy')}
                          </TextBlackThin>
                          <TextBlack>
                            {item.user?.first_name} {item.user?.last_name}{' '}
                          </TextBlack>
                        </div>
                        <Date>
                          <TextLight>{item.updated_at}</TextLight>
                        </Date>
                      </FlexWrapper>
                    </Box>
                    {confirm[idx] && (
                      <Modal>
                        <Overflow onClick={handleShowOff}></Overflow>
                        <Confirm>
                          <TextBlack>{conversionsT('delete')}</TextBlack>
                          <FlexEnd>
                            <OutlinedButton onClick={handleShowOff}>
                              {homeT('cancel')}
                            </OutlinedButton>
                            <FilledButton
                              /* eslint-disable */
                              onClick={() => handleDelete(item.id)}
                              /* eslint-disable */
                            >
                              {homeT('delete')}
                            </FilledButton>
                          </FlexEnd>
                        </Confirm>
                      </Modal>
                    )}
                    {edit[idx] && (
                      <>
                        <Over></Over>
                        <Campaign className="edit">
                          {ctx.isMobile ? (
                            <TitleTwo>{conversionsT('edit')}</TitleTwo>
                          ) : (
                            <Title>{conversionsT('edit')}</Title>
                          )}
                          <NewForm
                            handleShowFormOff={handleShowFormOff}
                            edit={true}
                            item={item}
                            handleDispatch={handleDispatch}
                          />
                        </Campaign>
                      </>
                    )}
                  </Col>
                ))}
              </Row>
              {showCampaign && (
                <>
                  <Over></Over>
                  <Campaign>
                    <Title>id: {campaign.id}</Title>
                    <Conversion
                      link="/"
                      handleCloseCampaign={handleCloseCampaign}
                    />
                  </Campaign>
                </>
              )}
              {showForm && (
                <>
                  <Over></Over>
                  <Campaign>
                    <Title>{conversionsT('new')}</Title>
                    <NewForm
                      handleShowFormOff={handleShowFormOff}
                      handleSuccess={handleSuccess}
                      setSuccessText={setSuccessText}
                    />
                  </Campaign>
                </>
              )}
            </>
          )}
          {!conversions ||
            (conversions.length === 0 && (
              <Margin>
                <Empty className="empty" />
                <TextBlackThin>{conversionsT('notFound')}</TextBlackThin>
                <AccentButton onClick={handleShowForm}>
                  <Plus />
                  {conversionsT('new')}
                </AccentButton>
              </Margin>
            ))}
        </>
      )}
    </ConversionsPage>
  );
}

Index.propTypes = {
  leadToShow: node
};
