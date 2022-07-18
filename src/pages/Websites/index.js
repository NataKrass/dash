import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWebsites, fetchWebsitesdeleted } from 'store/slices/websites';
import { useTranslation } from 'react-i18next';
import {
  Block,
  AccentButton,
  PageFluid,
  TitleSmallBlack,
  Modal,
  Overflow,
  Loader,
  FlexWrapper,
  SearchForm,
} from 'base/styled';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from 'assets/images/search.svg';
import { ReactComponent as Plus } from 'assets/images/plus_white.svg';
import AddWebsite from 'base/components/Leads/Header/AddWebsite';
import TimeSelect from 'base/components/TimezoneSelect';
import WebsitesTable from './WebsitesTable';
import Responsive from 'context/responsive';
import DeletedTable from './DeletedTable';
import { fetchAllDetails, fetchTZ } from 'store/slices/account';

const Button = styled(AccentButton)`
  margin-top: 5px;
  svg {
    margin-right: 8px;
  }
`;

const FlexFluid = styled(FlexWrapper)`
  width: 100%;
  @media (max-width: 768px) {
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    button {
      height: 46px;
    }
    h1 {
      margin: 0;
    }
  }
`;

const Flex = styled(FlexWrapper)`
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    padding: 0 10px 10px;
    .css-aqbxid-Control {
      width: 100%;
    }
  }
`;

const Popup = styled(Block)`
  margin: -2% auto 0;
  padding: 20px 0;
  @media (max-width: 480px) {
    width: 96%;
    .success {
      margin: 0 auto;
    }
  }
`;

const Title = styled(TitleSmallBlack)`
  margin: 0 0 20px 20px;
  text-align: left;
`;

const BlockColumn = styled(Block)`
  flex-direction: column;
  margin-bottom: 50px;
  @media (max-width: 768px) {
    padding: 15px 0;
  }
`;

const FlexTop = styled(Flex)`
  width: 70%;
`;
export default function Index() {
  const { t: homeT } = useTranslation('home');
  const [show, setShow] = useState();
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState();
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const { page, websites, deleted, status, site } = useSelector(
    (state) => state.websitesReducer
  );

  const { details, timezone } = useSelector(
    (state) => state.accountReducer
  );

  function handleShow() {
    setShow(true);
  }

  function handleShowOff() {
    setShow();
  }

  useEffect(() => {
    dispatch(fetchWebsites({ page, websites }));
    dispatch(fetchWebsitesdeleted({ deleted }));
    dispatch(fetchTZ({timezone}));
    dispatch(fetchAllDetails({ details }));
    /* eslint-disable */
  }, [dispatch]);
  /* eslint-enable */

  useEffect(() => {
    setSearchResults(websites);
    /* eslint-disable */
  }, [search]);
  /* eslint-enable */

  function handleText(e) {
    setText(e.target.value);
    setSearchResults(websites.filter((el) => {
      return el.name.toLowerCase().includes(text.toLowerCase());
    }));
  }

  function handleSubmit() {
    if(text) {
      setSearchResults(websites.filter((el) => {
        return el.name.toLowerCase().includes(text?.toLowerCase());
      }));
    } else {
      setSearchResults(websites);
    }
    setSearch(true);
  }

  const ctx = useContext(Responsive);

  return (
    <PageFluid>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          {!ctx.isMobile ? (
            <Title>{homeT('allWebsites')}</Title>
          ) : (
            <FlexFluid>
              <Title>{homeT('allWebsites')}</Title>
              <Button onClick={handleShow}>
                <Plus />
                {homeT('addWebsite')}
              </Button>
            </FlexFluid>
          )}
          <BlockColumn>
            <Flex>
              <FlexTop>
                <TimeSelect timezone={timezone} details={details} />
                <SearchForm>
                  <SearchIcon onClick={handleSubmit} />
                  <input
                    type="search"
                    placeholder="Search"
                    onChange={handleText}
                  />
                </SearchForm>
              </FlexTop>
              {!ctx.isMobile && (
                <Button onClick={handleShow}>
                  <Plus />
                  {homeT('addWebsite')}
                </Button>
              )}
            </Flex>
            {show && (
              <>
                <Modal>
                  <Overflow onClick={handleShowOff}></Overflow>
                  <Popup>
                    <AddWebsite handleOpenAddOff={handleShowOff} site={site} />
                  </Popup>
                </Modal>
              </>
            )}
            <WebsitesTable list={text ? searchResults : websites} />
          </BlockColumn>
          <Title>{homeT('deletedWebsites')}</Title>
          <BlockColumn>
            <DeletedTable list={deleted} />
          </BlockColumn>
        </>
      )}
    </PageFluid>
  );
}
