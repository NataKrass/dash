import { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { node } from 'prop-types';
import {
  fetchAllDetails, 
  fetchAS
} from 'store/slices/account';
import {
  AccentButton,
  Block,
  Flex,
  FlexColumn,
  FlexWrapper,
  Modal,
  OutlinedButton,
  Overflow,
  Tab,
  TextAccent,
  TextAccentSmall,
  TextAccentThin,
  TextBlack,
  TextBlackBig,
  TextBlackThin,
  TextLight,
  TitleBlack,
  TitleTwo,
  Loader
} from 'base/styled';
import styled from 'styled-components';
import radio from 'assets/images/radio.svg';
import visa from 'assets/images/visa.svg';
import radioactive from 'assets/images/radio_active.svg';
import { ReactComponent as Rocket } from 'assets/images/rocket.svg';
import Subscribe from './SubscribeForm';
import Success from 'base/components/Success';
import Payment from './PaymentForm';
import Deactivate from './Deactivate';
import Responsive from 'context/responsive';

const Company = styled.div`
  padding: 30px 60px 30px 70px;
  width: 90%;
  h1 {
    text-align: left;
  }
  .button {
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
  }
  @media (max-width: 768px) {
    padding: 0;
    width: 100%;
    .left {
      text-align: left;
    }
  }
`;

const FlexWrap = styled(Flex)`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Switcher = styled(FlexWrapper)`
  width: 27%;
  margin-right: 15px;
  padding-bottom: 25px;
  @media (max-width: 768px) {
    width: 100%;
    margin-right: 0; 
    padding-bottom: 0; 
    align-items: end;
    justify-content: end;
}
  }
`;

const TabCurrency = styled(Tab)`
  border-radius: 8px;
  padding: 10px 15px;
`;

const TabTerm = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 32px;
  color: ${(props) => (props.active ? '#000' : '#626262')};
  background: ${(props) =>
    props.active
      ? `url(${radioactive}) no-repeat 4% center`
      : `url(${radio}) no-repeat 4% center`};
  transition: background-color 0.5s ease-in-out;
  padding: 14px 15px 14px 30px;
  margin-left: 25px;
  cursor: pointer;
  span {
    color: ${(props) => props.theme.colors.accentRed};
    font-weight: 400;
    margin-left: 8px;
  }
`;

const Tabchoose = styled.div`
  color: ${(props) => (props.active ? '#000' : '#626262')};
  background: ${(props) =>
    props.active
      ? `url(${radioactive}) no-repeat 0% center`
      : `url(${radio}) no-repeat 0% center`};
  width: 200px;
  height: 43px;
  cursor: pointer;
  position: absolute;
`;

const FlexBox = styled.div`
  width: 55%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: auto;
    padding: 0;
  }
`;

const Card = styled.div`
  background: ${(props) => props.theme.colors.accentRed} 6% 86% / 63px  no-repeat url(${visa});
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.13);
  border-radius: 8px;
  width: 300px;
  height: 150px;
  @media (max-width: 768px) {
    width: 340px;
  }
  @media (max-width: 380px) {
    width: 250px;
  }
`;

const Cardtitle = styled(TextLight)`
  background: #fff;
  width: 100%;
  text-align: center;
  padding: 5px;
`;

const Cardnumber = styled(TextBlack)`
  font-weight: 400;
  background: #fff;
  width: fit-content;
  text-align: center;
  margin: 0 auto;
  padding: 5px;
  width: 100%;
`;

const Carddate = styled.div`
  display: flex;
  width: 93%;
  justify-content: end;
  p {
    background: #fff;
    padding: 5px;
    margin-top: 25px;
    border-radius: 5px;
    font-weight: 400;
  }
`;

const CardButton = styled.div`
  width: 55%;
  margin-top: auto;
  text-align: end;
`;

const Plan = styled(Block)`
  margin: ${(props) => (props.popular ? '6px 0 6px 25px' : '6px 15px')};
  padding: 20px 20px 10px 20px;
  border: ${(props) => (props.popular ? '1px solid red' : null)};
  background: ${(props) => (props.current ? `#FFFFFF` : '' )};
  &:hover{
    background-color: #FFF9F9;
  }
  .card-subtitle {
    font-size: 0.75rem;
    font-weight: 400;
  }
  .card {
    margin-left: auto;
    padding-left: 15px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    card-price {
      font-size: 0.875rem;
      font-weight: 400;
    }
  }
  .card-info {
    padding-left: 30px;
  }
  p {
    margin: 0 0 10px;
    line-height: 1;
    svg {
      margin: 0 0 -3px 6px;
    }
  }
  @media (max-width: 768px) {
    margin: ${(props) => (props.popular ? '6px 0 6px 0' : '6px 0')};
  }
`;

const FlexColumnCard = styled(FlexColumn)`
  width: 35%;
  margin-left: auto;
  ${(props) => (props.active ? '' : 'display:none')};
  button {
    margin-top: 30px;
    width: fit-content;
    margin-left: auto;
  }
  @media (max-width: 768px) {
    width: auto;
    margin-left: 0;
    margin-bottom: 15px;
    button {
      margin: 10px 0 20px auto;
      height: 46px;
    }
  }
`;

const BottomText = styled.div`
  display: flex;
  a {
    text-decoration: none;
     p {
       margin-left: 5px;
     }
  }
  @media (max-width: 768px) {
    align-items: center;
    a {
      margin: 0 0 4px 10px;
    }
  }
`;

export default function Index() {
  const { t: companyT } = useTranslation('company');
  
  const dispatch = useDispatch();

  const { details, subscription, payment, status, subscriptions } = useSelector(
    (state) => state.accountReducer
  );

  const [term, setTerm] = useState();
  const [active, setActive] = useState(1);
  const [choose, setChoose] = useState(4);
  const [modal, setModal] = useState();
  const [paymentForm, setPaymentForm] = useState();
  const [subscribeForm, setSubscribeForm] = useState();
  let [choosedMonth, setChoosedMonth] = useState();
  let [choosedAnnual, setChoosedAnnual] = useState();
  const [success, setSuccess] = useState();
  const [deactivate, setDeactivate] = useState();
  const [monthListUsd, setMonthListUsd] = useState();
  const [annualListUsd, setAnnualListUsd] = useState();

  useEffect(() => {
    dispatch(fetchAllDetails({ details, payment, subscription }));
    setTerm(subscription.frequency === 'annual' ? 1 : 0);
    /* eslint-disable */
  }, [dispatch, subscription.frequency, subscription.lead_limit ]);
    /* eslint-enable */
  console.log(choosedMonth, active);
  useEffect(() => {
    dispatch(fetchAS({ subscriptions }));

    if(subscriptions && details.payment_card_currency) {
      switch(details.payment_card_currency) 
      {
      case 'CAD':
        setMonthListUsd([
          {
            id: subscriptions?.monthly.CAD[0].id,
            amount: '100',
            priceCad: subscriptions?.monthly.CAD[0].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 100,
            popular: false,
          },
          {
            id: subscriptions?.monthly.CAD[1].id,
            amount: '300',
            priceCad: subscriptions?.monthly.CAD[1].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 300,
            popular: false,
          },
          {
            id: subscriptions?.monthly.CAD[2].id,
            amount: '500',
            priceCad: subscriptions?.monthly.CAD[2].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 500,
            popular: true,
          },
          {
            id: subscriptions?.monthly.CAD[3].id,
            amount: '1000',
            priceCad: subscriptions?.monthly.CAD[3].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 1000,
            popular: false,
          },
          {
            id: subscriptions?.monthly.CAD[4].id,
            amount: '2000',
            priceCad: subscriptions?.monthly.CAD[4].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 2000,
            popular: false,
          },
        ]);
        setAnnualListUsd([
          {
            id: subscriptions?.annual.CAD[0].id,
            amount: '100',
            priceCad: subscriptions?.annual.CAD[0].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 100,
            popular: false,
          },
          {
            id: subscriptions?.annual.CAD[1].id,
            amount: '300',
            priceCad: subscriptions?.annual.CAD[1].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 300,
            popular: false,
          },
          {
            id: subscriptions?.annual.CAD[2].id,
            amount: '500',
            priceCad: subscriptions?.annual.CAD[2].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 500,
            popular: true,
          },
          {
            id: subscriptions?.annual.CAD[3].id,
            amount: '1000',
            priceCad: subscriptions?.annual.CAD[3].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 1000,
            popular: false,
          },
          {
            id: subscriptions?.annual.CAD[4].id,
            amount: '2000',
            priceCad: Math.floor(subscriptions?.annual.CAD[4].stripe_payment_amount),
            choosed: false,
            current: subscription.lead_limit === 2000,
            popular: false,
          },
        ]);
        setActive(1);
        break;
      case 'USD':
        setMonthListUsd([
          {
            id: subscriptions?.monthly.USD[0].id,
            amount: '100',
            priceCad: subscriptions?.monthly.USD[0].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 100,
            popular: false,
          },
          {
            id: subscriptions?.monthly.USD[1].id,
            amount: '300',
            priceCad: subscriptions?.monthly.USD[1].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 300,
            popular: false,
          },
          {
            id: subscriptions?.monthly.USD[2].id,
            amount: '500',
            priceCad: subscriptions?.monthly.USD[2].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 500,
            popular: true,
          },
          {
            id: subscriptions?.monthly.USD[3].id,
            amount: '1000',
            priceCad: subscriptions?.monthly.USD[3].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 1000,
            popular: false,
          },
          {
            id: subscriptions?.monthly.USD[4].id,
            amount: '2000',
            priceCad: subscriptions?.monthly.USD[4].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 2000,
            popular: false,
          },
        ]);
        setAnnualListUsd([
          {
            id: subscriptions?.annual.USD[0].id,
            amount: '100',
            priceCad: subscriptions?.annual.USD[0].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 100,
            popular: false,
          },
          {
            id: subscriptions?.annual.USD[1].id,
            amount: '300',
            priceCad: subscriptions?.annual.USD[1].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 300,
            popular: false,
          },
          {
            id: subscriptions?.annual.USD[2].id,
            amount: '500',
            priceCad: subscriptions?.annual.USD[2].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 500,
            popular: true,
          },
          {
            id: subscriptions?.annual.USD[3].id,
            amount: '1000',
            priceCad: subscriptions?.annual.USD[3].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 1000,
            popular: false,
          },
          {
            id: subscriptions?.annual.USD[4].id,
            amount: '2000',
            priceCad: Math.floor(subscriptions?.annual.USD[4].stripe_payment_amount),
            choosed: false,
            current: subscription.lead_limit === 2000,
            popular: false,
          },
        ]);
        setActive(2);
        break;
      case 'EUR':
        setMonthListUsd([
          {
            id: subscriptions?.monthly.EUR[0].id,
            amount: '100',
            priceCad: subscriptions?.monthly.EUR[0].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 100,
            popular: false,
          },
          {
            id: subscriptions?.monthly.EUR[1].id,
            amount: '300',
            priceCad: subscriptions?.monthly.EUR[1].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 300,
            popular: false,
          },
          {
            id: subscriptions?.monthly.EUR[2].id,
            amount: '500',
            priceCad: subscriptions?.monthly.EUR[2].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 500,
            popular: true,
          },
          {
            id: subscriptions?.monthly.EUR[3].id,
            amount: '1000',
            priceCad: subscriptions?.monthly.EUR[3].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 1000,
            popular: false,
          },
          {
            id: subscriptions?.monthly.EUR[4].id,
            amount: '2000',
            priceCad: subscriptions?.monthly.EUR[4].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 2000,
            popular: false,
          },
        ]);
        setAnnualListUsd([
          {
            id: subscriptions?.annual.EUR[0].id,
            amount: '100',
            priceCad: subscriptions?.annual.EUR[0].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 100,
            popular: false,
          },
          {
            id: subscriptions?.annual.EUR[1].id,
            amount: '300',
            priceCad: subscriptions?.annual.EUR[1].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 300,
            popular: false,
          },
          {
            id: subscriptions?.annual.EUR[2].id,
            amount: '500',
            priceCad: subscriptions?.annual.EUR[2].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 500,
            popular: true,
          },
          {
            id: subscriptions?.annual.EUR[3].id,
            amount: '1000',
            priceCad: subscriptions?.annual.EUR[3].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 1000,
            popular: false,
          },
          {
            id: subscriptions?.annual.EUR[4].id,
            amount: '2000',
            priceCad: Math.floor(subscriptions?.annual.EUR[4].stripe_payment_amount),
            choosed: false,
            current: subscription.lead_limit === 2000,
            popular: false,
          },
        ]);
        setActive(3);
        break;
      case 'GBP':
        setMonthListUsd([
          {
            id: subscriptions?.monthly.GBP[0].id,
            amount: '100',
            priceCad: subscriptions?.monthly.GBP[0].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 100,
            popular: false,
          },
          {
            id: subscriptions?.monthly.GBP[1].id,
            amount: '300',
            priceCad: subscriptions?.monthly.GBP[1].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 300,
            popular: false,
          },
          {
            id: subscriptions?.monthly.GBP[2].id,
            amount: '500',
            priceCad: subscriptions?.monthly.GBP[2].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 500,
            popular: true,
          },
          {
            id: subscriptions?.monthly.GBP[3].id,
            amount: '1000',
            priceCad: subscriptions?.monthly.GBP[3].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 1000,
            popular: false,
          },
          {
            id: subscriptions?.monthly.GBP[4].id,
            amount: '2000',
            priceCad: subscriptions?.monthly.GBP[4].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 2000,
            popular: false,
          },
        ]);
        setAnnualListUsd([
          {
            id: subscriptions?.annual.GBP[0].id,
            amount: '100',
            priceCad: subscriptions?.annual.GBP[0].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 100,
            popular: false,
          },
          {
            id: subscriptions?.annual.GBP[1].id,
            amount: '300',
            priceCad: subscriptions?.annual.GBP[1].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 300,
            popular: false,
          },
          {
            id: subscriptions?.annual.GBP[2].id,
            amount: '500',
            priceCad: subscriptions?.annual.GBP[2].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 500,
            popular: true,
          },
          {
            id: subscriptions?.annual.GBP[3].id,
            amount: '1000',
            priceCad: subscriptions?.annual.GBP[3].stripe_payment_amount,
            choosed: false,
            current: subscription.lead_limit === 1000,
            popular: false,
          },
          {
            id: subscriptions?.annual.GBP[4].id,
            amount: '2000',
            priceCad: Math.floor(subscriptions?.annual.GBP[4].stripe_payment_amount),
            choosed: false,
            current: subscription.lead_limit === 2000,
            popular: false,
          },
        ]);
        setActive(4);
        break;
      }
    } else if(subscriptions && !details.payment_card_currency) {
      setMonthListUsd([
        {
          id: 0,
          amount: '100',
          priceCad: subscriptions?.monthly.CAD[0].stripe_payment_amount,
          priceUsd: subscriptions?.monthly.USD[0].stripe_payment_amount,
          priceEur: subscriptions?.monthly.EUR[0].stripe_payment_amount,
          priceGbp: subscriptions?.monthly.GBP[0].stripe_payment_amount,
          choosed: false,
          current: subscription.lead_limit === 100,
          popular: false,
        },
        {
          id: 1,
          amount: '300',
          priceUsd: subscriptions?.monthly.USD[1].stripe_payment_amount,
          priceCad: subscriptions?.monthly.CAD[1].stripe_payment_amount,
          priceEur: subscriptions?.monthly.EUR[1].stripe_payment_amount,
          priceGbp: subscriptions?.monthly.GBP[1].stripe_payment_amount,
          choosed: false,
          current: subscription.lead_limit === 300,
          popular: false,
        },
        {
          id: 2,
          amount: '500',
          priceUsd: subscriptions?.monthly.USD[2].stripe_payment_amount,
          priceCad: subscriptions?.monthly.CAD[2].stripe_payment_amount,
          priceEur: subscriptions?.monthly.EUR[2].stripe_payment_amount,
          priceGbp: subscriptions?.monthly.GBP[2].stripe_payment_amount,
          choosed: false,
          current: subscription.lead_limit === 500,
          popular: true,
        },
        {
          id: 3,
          amount: '1000',
          priceUsd: subscriptions?.monthly.USD[3].stripe_payment_amount,
          priceCad: subscriptions?.monthly.CAD[3].stripe_payment_amount,
          priceEur: subscriptions?.monthly.EUR[3].stripe_payment_amount,
          priceGbp: subscriptions?.monthly.GBP[3].stripe_payment_amount,
          choosed: false,
          current: subscription.lead_limit === 1000,
          popular: false,
        },
        {
          id: 4,
          amount: '2000',
          priceUsd: subscriptions?.monthly.USD[4].stripe_payment_amount,
          priceCad: subscriptions?.monthly.CAD[4].stripe_payment_amount,
          priceEur: subscriptions?.monthly.EUR[4].stripe_payment_amount,
          priceGbp: subscriptions?.monthly.GBP[4].stripe_payment_amount,
          choosed: false,
          current: subscription.lead_limit === 2000,
          popular: false,
        },
      ]);
      setAnnualListUsd([
        {
          id: 0,
          amount: '100',
          priceUsd: subscriptions?.annual.USD[0].stripe_payment_amount,
          priceCad: subscriptions?.annual.CAD[0].stripe_payment_amount,
          priceEur: subscriptions?.annual.EUR[0].stripe_payment_amount,
          priceGbp: subscriptions?.annual.GBP[0].stripe_payment_amount,
          choosed: false,
          current: subscription.lead_limit === 100,
          popular: false,
        },
        {
          id: 1,
          amount: '300',
          priceUsd: subscriptions?.annual.USD[1].stripe_payment_amount,
          priceCad: subscriptions?.annual.CAD[1].stripe_payment_amount,
          priceEur: subscriptions?.annual.EUR[1].stripe_payment_amount,
          priceGbp: subscriptions?.annual.GBP[1].stripe_payment_amount,
          choosed: false,
          current: subscription.lead_limit === 300,
          popular: false,
        },
        {
          id: 2,
          amount: '500',
          priceUsd: subscriptions?.annual.USD[2].stripe_payment_amount,
          priceCad: subscriptions?.annual.CAD[2].stripe_payment_amount,
          priceEur: subscriptions?.annual.EUR[2].stripe_payment_amount,
          priceGbp: subscriptions?.annual.GBP[2].stripe_payment_amount,
          choosed: false,
          current: subscription.lead_limit === 500,
          popular: true,
        },
        {
          id: 3,
          amount: '1000',
          priceUsd: subscriptions?.annual.USD[3].stripe_payment_amount,
          priceCad: subscriptions?.annual.CAD[3].stripe_payment_amount,
          priceEur: subscriptions?.annual.EUR[3].stripe_payment_amount,
          priceGbp: subscriptions?.annual.GBP[3].stripe_payment_amount,
          choosed: false,
          current: subscription.lead_limit === 1000,
          popular: false,
        },
        {
          id: 4,
          amount: '2000',
          priceUsd: subscriptions?.annual.USD[4].stripe_payment_amount,
          priceCad: subscriptions?.annual.CAD[4].stripe_payment_amount,
          priceEur: subscriptions?.annual.EUR[4].stripe_payment_amount,
          priceGbp: subscriptions?.annual.GBP[4].stripe_payment_amount,
          choosed: false,
          current: subscription.lead_limit === 2000,
          popular: false,
        },
      ]);
    }
    /* eslint-disable */
  }, [dispatch, subscription.frequency]);
    /* eslint-enable */

  const ctx = useContext(Responsive);

  function renderPlan(item) {
    return (
      <Plan key={item.id} current={item.current} popular={item.popular}>
        <Tabchoose
          onClick={handleChoose}
          active={choose === item.id}
          id={item.id}
        ></Tabchoose>
        <div className="card-info">
          {item.current ? (
            <TextAccent>
              {item.amount} {companyT('companies')}
            </TextAccent>
          ) : (
            <TextBlack>
              {item.amount} {companyT('companies')}
            </TextBlack>
          )}
          <p className="card-subtitle">{companyT('save')}</p>
        </div>
        <div className="card">
          {item.current ? (
            <TextAccentSmall>{companyT('current')}</TextAccentSmall>
          ) : null}
          {item.popular ? (
            <TextAccentSmall>
              {' '}
              {companyT('popular')}
              <Rocket />
            </TextAccentSmall>
          ) : null}
          <p className="card-price">
            {term === 1
              ? (active === 0 && '$' + Math.floor(item.priceUsd/12) ) ||
                (active === 1 && '$' + Math.floor(item.priceCad/12) ) ||
                (active === 2 && '€' + Math.floor(item.priceEur/12) ) ||
                (active === 3 && '£' + Math.floor(item.priceGbp/12) )
              : (active === 0 && '$' + Math.floor(item.priceUsd)) ||
                (active === 1 && '$' + Math.floor(item.priceCad)) ||
                (active === 2 && '€' + Math.floor(item.priceEur)) ||
                (active === 3 && '£' + Math.floor(item.priceGbp))}{' '}
            / {companyT('month')}
          </p>
        </div>
      </Plan>
    );
  }

  function handleTabTerm(e) {
    const index = parseInt(e.target.id, 0);
    if (index !== term) {
      setTerm(() => index);
    }
  }

  function handleTab(e) {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  }

  function handleSubscribeAnnual() {
    setModal(true);
    setChoosedAnnual(true);
    setSubscribeForm(true);
  }

  function handleSubscribeMonthly() {
    setModal(true);
    setChoosedAnnual();
    setSubscribeForm(true);
  }

  function handleSubscribeOff() {
    setModal(false);
    setPaymentForm(false);
    setSubscribeForm(false);
    setSuccess(false);
    setDeactivate(false);
  }

  function handlePaymentForm() {
    setModal(true);
    setPaymentForm(true);
  }

  function handleDeactivate() {
    setModal(true);
    setDeactivate(true);
  }

  function handleChoose(e) {
    const index = parseInt(e.target.id, 0);
    if (index !== choose) {
      setChoose(index);
    }
    if (term === 0) {
      setChoosedMonth(() => monthListUsd.find((x) => x.id === index));
    }
    if (term === 1) {
      setChoosedMonth(() => annualListUsd.find((x) => x.id === index));
    }   
    //choosedMonth = monthListUsd.find(x => x.id === index);
    console.log(choosedMonth);
  }

  return status === 'loading' ? (
    <Loader />
  ) : (
    <Company>
      {ctx.isMobile ? (
        <TitleTwo className="left">{companyT('title')}</TitleTwo>
      ) : (
        <>
          <TitleBlack>{companyT('title')}</TitleBlack>
          <TextBlackBig>{companyT('subtitle')}</TextBlackBig>
        </>
      )}

      <FlexWrapper>
        {!ctx.isMobile && (
          <FlexWrapper>
            <TabTerm onClick={handleTabTerm} active={term === 0} id={0}>
              {companyT('monthly')}
            </TabTerm>
            <TabTerm onClick={handleTabTerm} active={term === 1} id={1}>
              {companyT('annually')}
              <span> {companyT('save20')}</span>
            </TabTerm>
          </FlexWrapper>
        )}
        {!details.payment_card_currency && 
        <Switcher>
          <TabCurrency onClick={handleTab} active={active === 0} id={0}>
            {companyT('usd')}
          </TabCurrency>
          <TabCurrency onClick={handleTab} active={active === 1} id={1}>
            {companyT('cad')}
          </TabCurrency>
          <TabCurrency onClick={handleTab} active={active === 2} id={2}>
            {companyT('eur')}
          </TabCurrency>
          <TabCurrency onClick={handleTab} active={active === 3} id={3}>
            {companyT('gbp')}
          </TabCurrency>
        </Switcher>
        }
      </FlexWrapper>
      <FlexWrap>
        <FlexBox>
          {ctx.isMobile ? (
            <FlexWrapper>
              <TabTerm onClick={handleTabTerm} active={term === 0} id={0}>
                {companyT('monthly')}
              </TabTerm>
              <TabTerm onClick={handleTabTerm} active={term === 1} id={1}>
                {companyT('annually')}
                <span> {companyT('save20')}</span>
              </TabTerm>
            </FlexWrapper>
          ) : (
            <>
              <Block>
                <Card>
                  <Cardtitle>{companyT('activeCard')}</Cardtitle>
                  <Cardnumber>xxxx-xxxx-xxxx-{payment[0]?.last4}</Cardnumber>
                  <Carddate>
                    <TextBlack>{payment[0]?.exp_month}{'/'}{payment[0]?.exp_year}</TextBlack>
                  </Carddate>
                </Card>
                <CardButton>
                  <OutlinedButton onClick={handlePaymentForm}>
                    {companyT('update')}
                  </OutlinedButton>
                  {modal && paymentForm && (
                    <Modal>
                      <Overflow onClick={handleSubscribeOff}></Overflow>
                      {!success && (
                        <Payment
                          handleSubscribeOff={handleSubscribeOff}
                          choosedMonth={choosedMonth}
                          setSuccess={setSuccess}
                          payment={payment}
                          details={details}
                        />
                      )}
                      {success && <Success />}
                    </Modal>
                  )}
                </CardButton>
              </Block>
              <BottomText>
                <TextBlackThin>{companyT('textBottom')}</TextBlackThin>
                <a href="https://www.visitorqueue.com/contact">
                  <TextAccentThin>{companyT('contact')}</TextAccentThin>
                </a>
              </BottomText>
            </>
          )}
        </FlexBox>
        <FlexColumnCard active={term === 0}>
          {monthListUsd?.map(renderPlan)}
          <AccentButton onClick={handleSubscribeAnnual}>
            {companyT('plan')}
          </AccentButton>
          {modal && subscribeForm && (
            <Modal>
              <Overflow onClick={handleSubscribeOff}></Overflow>
              {!success && (
                <Subscribe
                  handleSubscribeOff={handleSubscribeOff}
                  choosedMonth={choosedMonth}
                  setSuccess={setSuccess}
                  choosedAnnual={choosedAnnual}
                  subscription={subscription}
                />
              )}
              {success && <Success />}
            </Modal>
          )}
        </FlexColumnCard>

        <FlexColumnCard active={term === 1}>
          {annualListUsd?.map(renderPlan)}
          <AccentButton onClick={handleSubscribeMonthly}>
            {companyT('plan')}
          </AccentButton>
          {modal && subscribeForm && (
            <Modal>
              <Overflow onClick={handleSubscribeOff}></Overflow>
              {!success && (
                <Subscribe
                  handleSubscribeOff={handleSubscribeOff}
                  choosedMonth={choosedMonth}
                  setSuccess={setSuccess}
                  choosedAnnual={choosedAnnual}
                  subscription={subscription}
                  details={details}
                  active={active}
                />
              )}
              {success && <Success />}
            </Modal>
          )}
        </FlexColumnCard>
      </FlexWrap>
      {ctx.isMobile && (
        <>
          <Block>
            <Card>
              <Cardtitle>{companyT('activeCard')}</Cardtitle>
              <Cardnumber>xxxx-xxxx-xxxx-{cardLast}</Cardnumber>
              <Carddate>
                <TextBlack>{card.term}</TextBlack>
              </Carddate>
            </Card>
            <CardButton>
              <OutlinedButton onClick={handlePaymentForm}>
                {companyT('update')}
              </OutlinedButton>
              {modal && paymentForm && (
                <Modal>
                  <Overflow onClick={handleSubscribeOff}></Overflow>
                  {!success && (
                    <Payment
                      handleSubscribeOff={handleSubscribeOff}
                      choosedMonth={choosedMonth}
                      setSuccess={setSuccess}
                    />
                  )}
                  {success && <Success />}
                </Modal>
              )}
            </CardButton>
          </Block>
          <BottomText>
            <TextBlackThin>{companyT('textBottom')}</TextBlackThin>
            <a href="https://www.visitorqueue.com/contact" className="contact">
              <TextAccentThin>{companyT('contact')}</TextAccentThin>
            </a>
          </BottomText>
        </>
      )}
      <TextAccentSmall className="button" onClick={handleDeactivate}>
        {companyT('deactivateAccount')}
      </TextAccentSmall>
      {modal && deactivate && (
        <Modal>
          <Overflow onClick={handleSubscribeOff}></Overflow>
          {!success && <Deactivate handleSubscribeOff={handleSubscribeOff} />}
          {success && <Success />}
        </Modal>
      )}
    </Company>
  );
}

Index.propTypes = {
  payment: node,
  details: node
};
