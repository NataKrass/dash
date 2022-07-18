import { useState, useEffect } from 'react';
import {
  Block,
  Flex,
  TextAccentSmall,
  TextGreySmallBold,
  TextLightSmall,
  TextLightSmallBold,
  TitleTwo,
  BlockMargin,
  FilledButton,
  OutlinedButton,
} from 'base/styled';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { func, object, bool, node, string, number } from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import { ReactComponent as Default } from 'assets/images/default.svg';
import { ReactComponent as Submited } from 'assets/images/default.svg';
import FormTextField from 'base/components/FormTextField';
import {
  CountryDropdown,
  RegionDropdown
} from 'react-country-region-selector';
import network from 'base/network';

const FormBox = styled(Block)`
  margin: 0 auto;
  padding: 20px 0;
  display: block;
  h2,
  svg {
    text-align: center;
    margin: 0 auto;
  }
  @media (max-width: 768px) {
    margin: 0 4px;
    h2 {
      text-align: center;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  input {
    height: 31px;
    margin: 8px 0;
  }
  .right {
    margin-right: 10px;
  }
  .light {
    background: ${(props) => props.theme.colors.greyLight};
    color: transparent;
    height: 1px;
    border: none;
    width: 100%;
  }
  p {
    white-space: nowrap;
  }
`;

const CardInfo = styled.div`
  width: 55%;
  display: flex;
  padding: 20px;
  flex-direction: column;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const BillInfo = styled.div`
  width: 40%;
  background: #fff9f9;
  padding: 5px 15px;
  border-radius: 15px;
  margin: 10px;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const BillRow = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  .after {
    border-bottom: 1px dotted 1px #626262;
    background-image: linear-gradient(
      to right,
      #626262 33%,
      rgba(255, 255, 255, 0) 0%
    );
    background-position: bottom;
    background-size: 6px 1.5px;
    background-repeat: repeat-x;
    width: 100%;
    height: 24px;
    bottom: 0;
    left: 0;
  }
  .bold {
    font-weight: 600;
    white-space: nowrap;
  }
  .relative {
    position: relative;
    margin-bottom: 10px;
  }
  .absolute {
    position: absolute;
    top: 15px;
  }
`;

const Buttons = styled.div`
  display: flex;
  padding: 0 20px;
  margin-left: auto;
`;

const styles = {
  fontSize: '13px',
  fontFamily: 'Montserrat',
  padding: '0 6px',
  border: '1px solid #C6D5DD',
  borderRadius: '8px',
  height: '31px',
  color: '#85929B',
  transition: 'all 0.2s',
  width: '50%',
};

const FlexWrap = styled(Flex)`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Promo = styled.div`
  position: relative;
  svg {
   fill: #C6D5DD;
  }

  div {
    position: absolute;
    top: -13px;
    right: 4.5px;
    background: inherit;
    border: none;
    width: 25px;
    height: 25px;
    margin-top: 24px!important;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    &.active {
      svg {
        fill: #F96652;
      }
      &:hover {
        background: #FDEAEA;
      }
    }
  }
  input {
    &:focus-visible {
      outline: none;
    }
  }
`;

export default function Subscribe({
  handleSubscribeOff,
  choosedMonth,
  setSuccess,
  choosedAnnual,
  subscription,
  details,
  active
}) {
  const { t: companyT } = useTranslation('company');
  const { t: homeT } = useTranslation('home');
  const [accountName, setAccountName] = useState('Nick account');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [cvc, setCvc] = useState('');
  const [date, setDate] = useState('');
  const [number, setNumber] = useState('');
  const [promo, setPromo] = useState('');
  const [error, setError] = useState('');
  const [taxes, setTaxes] = useState('0');
  const [activeBtn, setActiveBtn] = useState(false);
  const [total, setTotal] = useState(choosedMonth?.priceCad);
  const [message, setMessage] = useState('');
  const [discount, setDiscount] = useState();
  const [amount, setAmount] = useState();
  const [currencyPlan, setCurrencyPlan] = useState(
    (active === 1 && 'CAD') || 
    (active === 1 && 'CAD') || 
    (active === 1 && 'CAD') || 
    (active === 1 && 'CAD'));

  const { apply } = useSelector((state) => state.accountReducer);
  console.log('details: ', details);
  console.log('currencyPlan: ', currencyPlan, ' active:', active)
  console.log('choosedMonth: ', choosedMonth)
  function handleAccountName(e) {
    setAccountName(e.target.value);
  }

  function handleAddress(e) {
    setAddress(e.target.value);
  }

  function handleCity(e) {
    setCity(e.target.value);
  }

  function handlePromo(e) {
    setPromo(e.target.value);
    setActiveBtn(true);
  }

  function handleCvc(e) {
    setCvc(e.target.value);
  }

  function handleNumber(e) {
    setNumber(e.target.value);
  }

  function handleDate(e) {
    setDate(e.target.value);
  }

  function handleRegion(val) {
    setRegion(val);
    console.log(val);
  }

  function handleCountry(val) {
    setCountry(val);
    console.log(val);
  }

  // useEffect(() => {
  //   setCurrencyPlan(details?.payment_card_currency)
  //   console.log('useEfect')
  //   if(details?.payment_card_currency) {
  //     console.log(currencyPlan);
  //     switch(currencyPlan) 
  //     {
  //     case 'CAD':
  //       setAmount(choosedMonth?.priceCad);
  //       setCurrencyPlan('CAD');
  //       break;
  //     case 'EUR':
  //       setAmount(choosedMonth?.priceEur);
  //       setCurrencyPlan('EUR');
  //       break;
  //     case 'USD':
  //       setAmount(choosedMonth?.priceUsd);
  //       setCurrencyPlan('USD');
  //       break;
  //     case 'GBP':
  //       setAmount(choosedMonth?.priceGbp);
  //       setCurrencyPlan('GBP');
  //       break;    
  //     }  
  //   } else if (active) {
  //     console.log(active);
  //     switch(active) 
  //     {
  //     case 1:
  //       setAmount(choosedMonth?.priceCad);
  //       setCurrencyPlan('CAD');
  //       break;
  //     case 2:
  //       setAmount(choosedMonth?.priceEur);
  //       setCurrencyPlan('EUR');
  //       break;
  //     case 3:
  //       setAmount(choosedMonth?.priceUsd);
  //       setCurrencyPlan('USD');
  //       break;
  //     case 4:
  //       setAmount(choosedMonth?.priceGbp);
  //       setCurrencyPlan('GBP');
  //       break;    
  //     }  
  //   }
  // }, [details, active, choosedMonth]);

  useEffect(() => {
    if (country === 'Canada') {
      switch (region) {
      case 'Alberta':
        setTaxes('5');
        setTotal(
          '$' + (+choosedMonth?.priceCad - choosedMonth?.priceCad * 0.05)
        );
        break;
      case 'British Columbia':
        setTaxes('12');
        setTotal(
          '$' + (+choosedMonth?.priceCad - choosedMonth?.priceCad * 0.12)
        );
        break;
      case 'Manitoba':
        setTaxes('5');
        setTotal(
          '$' + (+choosedMonth?.priceCad - choosedMonth?.priceCad * 0.05)
        );
        break;
      case 'New Brunswick':
        setTaxes('15');
        setTotal(
          '$' + (+choosedMonth?.priceCad - choosedMonth?.priceCad * 0.15)
        );
        break;
      case 'Newfoundland and Labrador':
        setTaxes('15');
        setTotal(
          '$' + (+choosedMonth?.priceCad - choosedMonth?.priceCad * 0.15)
        );
        break;
      case 'Northwest Territories':
        setTaxes('15');
        setTotal(
          '$' + (+choosedMonth?.priceCad - choosedMonth?.priceCad * 0.15)
        );
        break;
      case 'Nova Scotia':
        setTaxes('15');
        setTotal(
          '$' + (+choosedMonth?.priceCad - choosedMonth?.priceCad * 0.15)
        );
        break;
      case 'Nunavut':
        setTaxes('5');
        setTotal(
          '$' + (+choosedMonth?.priceCad - choosedMonth?.priceCad * 0.05)
        );
        break;
      case 'Ontario':
        setTaxes('13');
        setTotal(
          '$' + (+choosedMonth?.priceCad - choosedMonth?.priceCad * 0.13)
        );
        break;
      case 'Prince Edward Island':
        setTaxes('15');
        setTotal(
          '$' + (+choosedMonth?.priceCad - choosedMonth?.priceCad * 0.15)
        );
        break;
      case 'Quebec':
        setTaxes('5');
        setTotal(
          '$' + (+choosedMonth?.priceCad - choosedMonth?.priceCad * 0.05)
        );
        break;
      case 'Saskatchewan':
        setTaxes('5');
        setTotal(
          '$' + (+choosedMonth?.priceCad - choosedMonth?.priceCad * 0.05)
        );
        break;
      case 'Yukon':
        setTaxes('5');
        setTotal(
          '$' + (+choosedMonth?.priceCad - choosedMonth?.priceCad * 0.05)
        );
        break;
      default:
        setTaxes('0');
        setTotal(choosedMonth?.priceCad);
      }
    } else {
      setTaxes('0');
    }
  }, [region, country, choosedMonth?.priceCad, active, details]);

  const postPromo = async () => {
    setMessage();
    setDiscount();
    const formData = {
      subscription_id: choosedMonth.id,
      coupon_code: promo,
    };
    let res = await network
      .post('/api/account/subscription/apply_coupon', formData)
      .then(({ data }) => data)
      .catch((error) => console.log(error));
    if (res.results === 'Invalid Coupon') {
      setMessage(res.results);
    } else {
      setDiscount(res.results);
      setTotal(res.results.total);
    }
  };

  function handlePromoSubmit(e) {
    e.preventDefault();
    postPromo();
    console.log('string', apply);
  }

  function formSubmit(e) {
    e.preventDefault();

    switch (true) {
    case address.length <= 0:
      setError('Please enter address');
      break;
    case country.length <= 0:
      setError('Please choose country');
      break;
    case number.length <= 0:
      setError('Please enter card number');
      break;
    }

    if (validateForm()) {
      const formData = {
        company_name: accountName,
        subscription: {
          id: subscription.id,
          address: address,
          city: city,
          country: country,
          province_or_state_or_region: region,
          coupon_code: promo,
          stripe_token: 'string',
          // cardNumber: number,
          // cardDate: date,
          // cvc: cvc,
          // plan: choosedMonth.amount,
          // price: choosedMonth.price
        },
      };

      console.log(formData);
      network.post('/api/account/subscription', formData);
      setSuccess(true);
    }
  }

  function validateForm() {
    return address.length > 0 && number.length > 0;
  }

  console.log('choosedMonth: ', choosedMonth);

  return (
    <FormBox>
      <TitleTwo>{companyT('subscribtionPayment')}</TitleTwo>
      <Form onSubmit={formSubmit}>
        <FlexWrap>
          <CardInfo>
            <Logo />
            <TextLightSmallBold>{companyT('cardInfo')}</TextLightSmallBold>
            <FormTextField value={accountName} onChange={handleAccountName} />
            <Flex>
              <FormTextField
                value={address}
                onChange={handleAddress}
                className="right"
                placeholder="Address"
              />
              <FormTextField
                value={city}
                onChange={handleCity}
                placeholder="City"
              />
            </Flex>
            <Flex>
              <CountryDropdown
                value={country}
                onChange={handleCountry}
                defaultOptionLabel="Country"
                style={styles}
                className="right"
              />
              <RegionDropdown
                country={country}
                value={region}
                onChange={handleRegion}
                defaultOptionLabel="Region"
                blankOptionLabel="Region"
                style={styles}
              />
            </Flex>

            <FormTextField
              value={number}
              onChange={handleNumber}
              placeholder="Enter Card Number"
              type="tel"
            />
            <Flex>
              <FormTextField
                value={date}
                onChange={handleDate}
                className="right"
                placeholder="MM/YY"
              />
              <FormTextField
                value={cvc}
                onChange={handleCvc}
                className="right"
                placeholder="CVC"
              />
            </Flex>
          </CardInfo>
          <BillInfo>
            <TextLightSmallBold>{companyT('billInfo')}</TextLightSmallBold>
            <BillRow>
              <div className="relative">
                <TextGreySmallBold>{companyT('newPlan')}</TextGreySmallBold>
                <TextLightSmall className="absolute">
                  {companyT('billed')}
                  {!choosedAnnual ? 'annually' : 'monthly'}
                </TextLightSmall>
              </div>
              <div className="after"></div>
              <TextAccentSmall className="bold">
                {choosedMonth?.amount} {currencyPlan}
              </TextAccentSmall>
            </BillRow>
            <BillRow>
              <TextGreySmallBold>{companyT('amount')}</TextGreySmallBold>
              <div className="after"></div>
              <TextAccentSmall className="bold">
                {amount} {currencyPlan}
              </TextAccentSmall>
            </BillRow>
            <BillRow>
              <TextGreySmallBold>{companyT('taxes')}</TextGreySmallBold>
              <div className="after"></div>
              <TextAccentSmall className="bold">{taxes} %</TextAccentSmall>
            </BillRow>
            <TextGreySmallBold>{companyT('promo')}</TextGreySmallBold>
            <Promo>
              <div
                className={activeBtn ? 'active' : ''}
                onClick={handlePromoSubmit}
              >
                <Default />
              </div>
              <FormTextField
                value={promo}
                onChange={handlePromo}
                placeholder={companyT('promoCode')}
              />
              <TextGreySmallBold>{message}</TextGreySmallBold>
              {discount && (
                <TextGreySmallBold>
                  discount: {discount.discount}{' '}
                </TextGreySmallBold>
              )}
            </Promo>
            <hr className="light" />
            <BillRow>
              <TextGreySmallBold>{companyT('total')}</TextGreySmallBold>
              <TextAccentSmall className="bold">
                {total} {currencyPlan}
              </TextAccentSmall>
            </BillRow>
          </BillInfo>
        </FlexWrap>
        <hr className="light" />
        <Buttons>
          <TextAccentSmall>{error}</TextAccentSmall>
          <BlockMargin>
            <OutlinedButton type="reset" onClick={handleSubscribeOff}>
              {homeT('cancel')}
            </OutlinedButton>
          </BlockMargin>
          <BlockMargin>
            <FilledButton type="submit">{homeT('confirm')}</FilledButton>
          </BlockMargin>
        </Buttons>
      </Form>
    </FormBox>
  );
}

Subscribe.propTypes = {
  handleSubscribeOff: func,
  choosedMonth: object,
  setSuccess: func,
  choosedAnnual: bool,
  subscription: node,
  details: node, 
  active: number
};