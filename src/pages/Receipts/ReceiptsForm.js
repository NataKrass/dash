import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import styled from 'styled-components';
import FormTextField from 'base/components/FormTextField';
import { AccentButton, Flex } from 'base/styled';

const Popup = styled.div`
  padding: 20px;
  button {
    height: 37px;
    margin-right: 10px;
  }
`;

const Form = styled.form`
  width: 100%;
  .right {
    margin-left: 8px;
  }
  .city {
    width: 110%;
  }
  input {
    margin-bottom: 10px
  }
`;

const Button = styled.div`
  text-align: right;
  padding-top: 20px;
`;

export default function ReceiptsForm({ setSuccess }) {
  const { t: homeT } = useTranslation('home');
  const [name, setName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [zip, setZip] = useState('');
  const [country, setCountry] = useState('');
  const [vat, setVat] = useState();
  const [extra, setExtra] = useState();

  function handleAddress1(e) {
    setAddress1(e.target.value);
  }

  function handleAddress2(e) {
    setAddress2(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleCity(e) {
    setCity(e.target.value);
  }

  function handleState(e) {
    setState(e.target.value);
  }

  function handleZip(e) {
    setZip(e.target.value);
  }

  function handleCountry(e) {
    setCountry(e.target.value);
  }

  function handleVat(e) {
    setVat(e.target.value);
  }

  function handleExtra(e) {
    setExtra(e.target.value);
  }

  function companySubmit(e) {
    e.preventDefault();

    if (name.length === 0) {
      return;
    }

    const companyData = {
      name: name,
      address1: address1,
      address2: address2,
      city: city,
      state: state,
      zip: zip,
      country: country,
      vat: vat,
      extra: extra,
    };

    console.log(companyData);

    setName('');
    setAddress1('');
    setAddress2('');
    setCity('');
    setCountry('');

    setSuccess(true);
  }

  return (
    <Popup>
      <Form onSubmit={companySubmit}>
        <FormTextField
          type="text"
          label="Name"
          value={name}
          onChange={handleName}
        />
        <Flex>
          <div>
            <FormTextField
              type="text"
              label="Address line 1"
              value={address1}
              onChange={handleAddress1}
            />
          </div>
          <div className="right">
            <FormTextField
              type="text"
              label="Address line 2"
              value={address2}
              onChange={handleAddress2}
            />
          </div>
        </Flex>
        <Flex>
          <div className="city">
            <FormTextField
              type="text"
              label="City"
              value={city}
              onChange={handleCity}
            />
          </div>
          <div className="right">
            <FormTextField
              type="text"
              label="State"
              value={state}
              onChange={handleState}
            />
          </div>
          <div className="right">
            <FormTextField
              type="text"
              label="Zip"
              value={zip}
              onChange={handleZip}
            />
          </div>
        </Flex>
        <FormTextField
          type="text"
          label="Country"
          value={country}
          onChange={handleCountry}
        />
        <Flex>
          <div>
            <FormTextField
              type="text"
              label="VAT number"
              value={vat}
              onChange={handleVat}
            />
          </div>
          <div className="right">
            <FormTextField
              type="text"
              label="Extra information"
              value={extra}
              onChange={handleExtra}
            />
          </div>
        </Flex>
        <Button>
          <AccentButton type="submit">{homeT('save')}</AccentButton>
        </Button>
      </Form>
    </Popup>
  );
}

ReceiptsForm.propTypes = {
  setSuccess: func
};
