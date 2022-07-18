import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIntegrations } from 'store/slices/integrations';
import { useTranslation } from 'react-i18next';
import {
  Block,
  Loader,
  Page,
  SearchForm,
  TextAccent,
  TextBlack,
  TextBlackSmall,
  TextLight,
  TitleBlack,
  TitleTwo,
} from 'base/styled';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from 'assets/images/search.svg';
import { Row, Col } from '@bootstrap-styled/v4';
import Responsive from 'context/responsive';

const Box = styled(Block)`
  margin: 17px;
  padding: 25px 20px 20px;
  text-align: center;
  flex-direction: column;
  img {
    margin: auto;
  }
  a {
    text-decoration: none;
    font-weight: 500;
  }
`;

const IntegrationsPage = styled(Page)`
  margin-left: 12px;
  `;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`;

const Api = styled.div`
  text-align: center;
  height: 70px;
  margin-bottom: 20px;
`;

const Text = styled(TextBlackSmall)`
  font-weight: 400;
  height: 30px;
`;

const SearchBox = styled.div`
  margin-left: auto;
  margin-right: 17px;
  padding-bottom: 40px;
  form {
    min-width: 290px;
  }
`;

const Title = styled(TitleBlack)`
  text-align: left;
  padding-left: 18px;
  width: 50%;
`;

const Outlined = styled.a`
  padding: 10px 16px;
  height: 37px;
  border-radius: 8px;
  font-family: Montserrat;
  font-size: 14px;
  border: 1px solid #f96652;
  color: #f96652;
  cursor: pointer;
  background-color: transparent;
  width: fit-content;
  margin: 0 auto;
  margin-bottom: 10px;
`;

const Accent = styled.a`
  font-family: inherit;
  font-size: 14px;
    padding: 6px 14px;
    font-size: .875rem;
    height: 30px;
    border-radius: 8px;
    border: 1px solid #F96652;
    color: #FEFDFD;
    cursor: pointer;
    background: #F96652;
    white-space: nowrap;
    width: fit-content;
    margin: 0 auto;
    margin-bottom: 10px;
}
`;

const Image = styled.div`
  width: 85px;
  height: 85px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  img {
    width: 100%;
  }
`;

export default function Index() {
  const { t: rootT } = useTranslation('');
  const { t: integrationsT } = useTranslation('integrations');
  const [search] = useState(false);
  const [searchResults, setSearchResults] = useState();
  const [text, setText] = useState();
  const dispatch = useDispatch();
  const { page, integrations, status } = useSelector(
    (state) => state.integrationsReducer
  );

  useEffect(() => {
    dispatch(fetchIntegrations({ page, integrations }));
    setSearchResults(integrations);
 
    /* eslint-disable */
  }, [dispatch]);
  /* eslint-enable */

  useEffect(() => {
    setSearchResults(integrations);
    /* eslint-disable */
  }, [search]);
  /* eslint-enable */

  function handleText(e) {
    setText(e.target.value);
    setSearchResults(integrations.filter((el) => {
      return el.title.toLowerCase().includes(text.toLowerCase());
    }));
  }

  function handleSubmit() {
    if(text) {
      setSearchResults(integrations.filter((el) => {
        return el.title.toLowerCase().includes(text?.toLowerCase());
      }));
    } else {
      setSearchResults(integrations);
    }
  }
  const list = text ? searchResults : integrations;

  const ctx = useContext(Responsive);

  return (
    <IntegrationsPage>
      {status === 'loading' ? (
        <Loader />
      ) : (
        <>
          {ctx.isMobile ? (
            <TitleTwo>{integrationsT('title')}</TitleTwo>
          ) : (
            <Title>{integrationsT('title')}</Title>
          )}
          <SearchBox>
            <SearchForm>
              <SearchIcon onClick={handleSubmit} />
              <input type="search" placeholder="Search" onChange={handleText} />
            </SearchForm>
          </SearchBox>

          <Row>
            {list &&
              list.map((item, idx) => (
                <Col xs="12" md="4" key={idx}>
                  <Box>
                    <Image>
                      <img src={item.image} />
                    </Image>
                    <Text>
                      {integrationsT('integrate')} {item.title}{' '}
                      {integrationsT('withVQ')}
                    </Text>
                    <Api>
                      {item.api_key ? (
                        <>
                          <TextBlack>{integrationsT('key')}</TextBlack>
                          <Text>{item.api_key}</Text>
                        </>
                      ) : (
                        <TextLight>{integrationsT('noApi')}</TextLight>
                      )}
                    </Api>
                    <Buttons>
                      {item.connected ? (
                        <Outlined href={item.disconnect_url}>
                          {integrationsT('disconnect')}
                        </Outlined>
                      ) : (
                        <Accent href={item.connect_url}>
                          {integrationsT('connect')}
                        </Accent>
                      )}
                      <a href={item.documentation}>
                        <TextAccent>{rootT('learnMore')}</TextAccent>
                      </a>
                    </Buttons>
                  </Box>
                </Col>
              ))}
          </Row>
        </>
      )}
    </IntegrationsPage>
  );
}
