import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  FlexWrapper,
  TitleSmallBlack,
  Block,
  Page,
  TableTitle,
} from 'base/styled';
import styled from 'styled-components';
import ReceiptsTable from './ReceiptsTable';
import ReceiptsForm from './ReceiptsForm';
import { fetchAllDetails } from 'store/slices/account';

const Form = styled.div`
  width: 40%;
  h3 {
    padding-left: 20px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Table = styled.div`
  width: 60%;
  margin-right: 20px;
  h3 {
    padding-left: 20px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Flex = styled(FlexWrapper)`
  padding: 0;
`;

const FlexWrap = styled(FlexWrapper)`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Box = styled(Block)`
  height: 100%;
  padding: 0;
`;

const PageReceipts = styled(Page)`
  body {
    background: inherit;
  }
  iframe {
    border: none;
    height: 150vh;
    overflow-y: scroll;
    body {
      background: inherit;
    }
    .container,
    .app {
      padding: 0 table {
        border: none;
        background: rgb(254, 253, 253);
        box-shadow: rgb(0 0 0 / 13%) 0px 2px 12px;
        border-radius: 15px;
      }
      .panel {
        border: none;
        background: rgb(254, 253, 253);
        box-shadow: rgb(0 0 0 / 13%) 0px 2px 12px;
        border-radius: 15px;
      }
      .table-striped > tbody > tr:nth-of-type(2n) {
        background-color: inherit;
      }
      .table > tbody > tr > td,
      .table > tbody > tr > th,
      .table > tfoot > tr > td,
      .table > tfoot > tr > th,
      .table > thead > tr > td,
      .table > thead > tr > th {
        border-color: #e6ecef;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        -webkit-letter-spacing: 0rem;
        -moz-letter-spacing: 0rem;
        -ms-letter-spacing: 0rem;
        letter-spacing: 0rem;
        color: #2c2c2c;
        line-height: 1;
        padding: 17px;
      }
      .panel
        > .table:first-child
        > thead:first-child
        > tr:first-child
        th:first-child {
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        -webkit-letter-spacing: 0rem;
        -moz-letter-spacing: 0rem;
        -ms-letter-spacing: 0rem;
        letter-spacing: 0rem;
        color: #85929b;
      }
      .panel > .table:last-child,
      .table-striped > tbody > tr:nth-of-type(2n + 1) {
        background-color: #fefdfd;
      }
    }
  }
`;

const style = {
  marginRight: '20px',
  html: {
    background: '#999',
    body: {
      background: '#999'
    }
  }
 
};
export default function Index() {
  const { t: receiptsT } = useTranslation('receipts');
  const { t: rootT } = useTranslation();
  const [success, setSuccess] = useState();
  const dispatch = useDispatch();
  const { details } = useSelector(
    (state) => state.accountReducer
  );

  useEffect(() => {
    dispatch(fetchAllDetails({ details }));
    /* eslint-disable */
  }, [dispatch]);
  /* eslint-enable */

  const token = details.ramp_receipts_token;
  const customer = details.stripe_customer_id;

  const [list] = useState([
    {
      date: 'January 21',
      amount: '0.00',
      file: null,
    },
    {
      date: 'February 21',
      amount: '0.00',
      file: null,
    },
  ]);
 
  const url=`https://embed.rampreceipts.com/?token=${token}&customer=${customer}&background=inherit&text-color=333333&border-color=dddddd&focus-border-color=66afe9&button-text-color=ffffff&button-background-color=e53738&link-color=e53738&panel-header-color=f5f5f5&alternate-background-color=f3f3f3`;

  return (
    <PageReceipts>
      <Flex>
        <TitleSmallBlack>{rootT('Receipts')}</TitleSmallBlack>
      </Flex>
      <iframe
        scrolling="no"
        style={style}
        src={url}
      >
        <p>Your browser does not support iframes.</p>
      </iframe>
      {success && <FlexWrap>
        {
          <Table>
            <Flex>
              <TableTitle>{receiptsT('month')}</TableTitle>
              <TableTitle>{receiptsT('amount')}</TableTitle>
              <TableTitle></TableTitle>
            </Flex>
            <Box>
              <ReceiptsTable list={list} />
            </Box>
          </Table>
        }
        <Form>
          <TableTitle>{receiptsT('information')}</TableTitle>
          <Box>
            <ReceiptsForm setSuccess={setSuccess} />
          </Box>
        </Form>
      </FlexWrap> 
      }
    </PageReceipts>
  );
}
