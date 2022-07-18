import { useState } from 'react';
import {
  Block,
  Flex,
  TextAccentSmall,
  TitleTwo,
  BlockMargin,
  FilledButton,
  OutlinedButton,
} from 'base/styled';
import { useTranslation } from 'react-i18next';
import { func, bool, node } from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as Logo } from 'assets/images/logo.svg';
import img from 'assets/images/card.png';
import FormTextField from 'base/components/FormTextField';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

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

const Title = styled(TitleTwo)`
  @media (max-width: 768px) {
    text-align: center;
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
  .number {
    width: 52%; 

    input {
      background-image: url(${img});
      background-repeat: no-repeat;
      text-indent: 28px;
      background-position: 12px 7px
     }
     .input:focus{
      background-image:none;
     }
    
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
  .small {
    width: 25%;
  }
`;

const CardInfo = styled.div`
  display: flex;
  padding: 20px;
  flex-direction: column;
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

export default function Payment({
  handleSubscribeOff,
  setSuccess,
  payment,
  details
}) {
  const { t: companyT } = useTranslation('company');
  const { t: homeT } = useTranslation('home');
  const [accountName, setAccountName] = useState(details?.name);
  const [address, setAddress] = useState(payment[0].address_line1 ? payment[0].address_line1 : '' );
  const [city, setCity] = useState(payment[0].address_city ? payment[0].address_city : '');
  const [country, setCountry] = useState(payment[0].country);
  const [region, setRegion] = useState('');
  const [cvc, setCvc] = useState('');
  const [date, setDate] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  function handleAccountName(e) {
    setAccountName(e.target.value);
  }

  function handleAddress(e) {
    setAddress(e.target.value);
  }

  function handleCity(e) {
    setCity(e.target.value);
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
  }

  function handleCountry(val) {
    setCountry(val);
  }

  function formSubmit(e) {
    e.preventDefault();

    switch (true) {
    case !address:
      setError('Please enter address');
      break;
    case !country:
      setError('Please choose country');
      break;
    case number.length <= 0:
      setError('Please enter card number');
      break;
    }

    if (validateForm()) {
      const formData = {
        name: accountName,
        address: address,
        city: city,
        country: country,
        region: region,
        cardNumber: number,
        cardDate: date,
        cvc: cvc
      };

      console.log(formData);

      setSuccess(true);
    }
  }

  function validateForm() {
    return address.length > 0 && number.length > 0;
  }

  return (
    <FormBox>
      <Title>{companyT('updatePayment')} </Title>
      <Form onSubmit={formSubmit}>
        <CardInfo>
          <Logo />
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
              defaultOptionLabel={country}
              blankoptionlabel="Country"
              style={styles}
              className="right"
            />
            <RegionDropdown
              country={country}
              value={region}
              onChange={handleRegion}
              defaultOptionLabel="Region"
              blankoptionlabel="Region"
              style={styles}

            />
          </Flex>
          <Flex>
            <div className="number right">
              <FormTextField
                value={number}
                onChange={handleNumber}
                placeholder="Enter Card Number"
                className="right card"
                type="tel"
              />
            </div>

            <FormTextField
              value={date}
              onChange={handleDate}
              className="right small"
              placeholder="MM/YY"
            />
            <FormTextField
              value={cvc}
              onChange={handleCvc}
              className="small"
              placeholder="CVC"
            />
          </Flex>
        </CardInfo>

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

Payment.propTypes = {
  handleSubscribeOff: func,
  setSuccess: func,
  choosedAnnual: bool,
  payment: node,
  details: node
};
