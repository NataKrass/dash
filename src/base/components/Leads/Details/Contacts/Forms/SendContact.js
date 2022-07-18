import { useState } from 'react';
import { func, string } from 'prop-types';
import styled from 'styled-components';
import {
  AccentButton,
  FlexWrapper,
  OutlinedButton,
  TextField,
  TextLight,
  TitleSmallBlack,
  ModalContent,
} from 'base/styled';
import { useTranslation } from 'react-i18next';

const BtnWrap = styled.div`
  padding: 30px 0 0;
  text-align: right;
`;

const Form = styled.form`
  input {
    margin-bottom: 10px;
  }
`;

const Flex = styled(FlexWrapper)`
  h1 {
    text-align: center;
    margin: 0 auto;
  }
`;

export default function SendContact({ handleOpenAddOff, name, mail, number, job,
  contact,
  lead,
  hubspot}) {

  const { t: homeT } = useTranslation('home');
  const [userName, setUserName] = useState(name);
  const [title, setTitle] = useState(job);
  const [email, setEmail] = useState(mail);
  const [phone, setPhone] = useState(number);
  const [company, setCompany] = useState('');

  function handleUserName(e) {
    setUserName(e.value);
  }
  function handleTitle(e) {
    setTitle(e.value);
  }
  function handleEmail(e) {
    setEmail(e.value);
  }
  function handlePhone(e) {
    setPhone(e.value);
  }
  function handleCompany(e) {
    setCompany(e.value);
  }

  return (
    <>
      <ModalContent>
        <Flex>
          {contact && (
            <TitleSmallBlack>{homeT('createContact')}</TitleSmallBlack>
          )}
          {lead && <TitleSmallBlack>{homeT('createLead')}</TitleSmallBlack>}
          {hubspot && (
            <TitleSmallBlack>{homeT('createHubspot')}</TitleSmallBlack>
          )}
        </Flex>
        <Form>
          <label>
            <TextLight>{homeT('title')}</TextLight>
          </label>
          <TextField value={title} onChange={handleTitle} />
          <label>
            <TextLight>{homeT('name')}</TextLight>
          </label>
          <TextField value={userName} onChange={handleUserName} />
          <label>
            <TextLight>{homeT('email')}</TextLight>
          </label>
          <TextField value={email} onChange={handleEmail} />
          <label>
            <TextLight>{homeT('phone')}</TextLight>
          </label>
          <TextField value={phone} onChange={handlePhone} />
          {hubspot && (
            <>
              <TitleSmallBlack>{homeT('association')}</TitleSmallBlack>
              <label>
                <TextLight>{homeT('company')}</TextLight>
              </label>
              <TextField value={company} onChange={handleCompany} />
            </>
          )}
          <BtnWrap>
            <OutlinedButton onClick={handleOpenAddOff}>
              {homeT('cancel')}
            </OutlinedButton>
            <AccentButton>{homeT('send')}</AccentButton>
          </BtnWrap>
        </Form>
      </ModalContent>
    </>
  );
}

SendContact.propTypes = {
  handleOpenAddOff: func,
  name: string, 
  mail: string, 
  number: string, 
  job: string,
  contact: string,
  lead: string,
  hubspot: string
};
