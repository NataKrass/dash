import { useState } from 'react';
import styled from 'styled-components';
import { any, object } from 'prop-types';
import { useTranslation } from 'react-i18next';
import {
  ManageBox,
  TextAccentExtraSmall,
  TextBlackExtraSmall,
  TextBlackThin,
  TextLightExtraSmall,
  Modal,
  Overflow,
  Block,
} from 'base/styled';
import Batch from './Batch';
import { ReactComponent as Mail } from 'assets/images/mail.svg';
import { ReactComponent as Cell } from 'assets/images/cell.svg';
import { ReactComponent as Twitter } from 'assets/images/twitter_logo.svg';
import { ReactComponent as Linkedin } from 'assets/images/linkedin_logo.svg';
import { ReactComponent as Send } from 'assets/images/send.svg';
import { ReactComponent as ContactIcon } from 'assets/images/export.svg';
import { ReactComponent as Hubspot } from 'assets/images/hubspot.svg';
import Search from '../../Search';
import { useEffect } from 'react';
import SendContact from './Forms/SendContact';

const Wrap = styled.div`
  padding: 10px 0;
  background: ${(props) => props.theme.colors.bgMain};
`;

const Top = styled.div`
  padding: 0 20px 10px;
  display: flex;
  justify-content: space-between;
  form {
    width: 65%;
    input {
      padding-left: 30px;
    }
    svg {
      left: 13px;
    }
  }
`;

const FilterWrap = styled.div`
display: flex;
  p {
    color: #626262;
  }
`;

const Contact = styled.div`
  display: flex;
  background: white;
  border: ${(props) => props.theme.borders.textInput};
  border-radius: 8px;
  padding: 5px 5px 10px 15px;
`;

const Flex = styled.div`
  display: flex;
  svg {
      width: 18px;
      margin-right: 8px;
  }
  p {
    margin-top: 0;  
  }
  .phone {
    padding-top: 3px;
  }
`;

const ContactLeft = styled.div`
  width: 40%;
  padding-right: 15px;
`;

const ContactCenter = styled.div`
  width: 55%;
`;

const ContactRight = styled.div`
  padding-top: 5px;
  position: relative;
`;

const Social = styled.div`
  display: flex;
  svg {
      margin-right: 15px;
  }
`;

const TextBlack = styled(TextBlackExtraSmall)`
  font-weight: 500;
`;

const Manage = styled(ManageBox)`
  right: 25px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0 0px;
  p {
    padding: 7px 10px 9px 5px;
    min-width: 140px;
    cursor: pointer;
  }
`;

const Popup = styled(Block)`
  margin: -2% auto 0;
  padding: 20px 0;
`;

export default function Contacts({contactsInfo, companyInfo}){
  const { t: homeT } = useTranslation('home');
  const [name, setName] = useState();
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [contact, setContact] = useState(false);
  const [lead, setLead] = useState(false);
  const [hubspot, setHubspot] = useState(false);

  const handleShow = (idx) => () => {
    setShow((state) => ({
      ...state,
      [idx]: !state[idx],
    }));
  };
  const handleContact = (idx) => () => {
    setModal((state) => ({
      ...state,
      [idx]: !state[idx],
    }));
    setContact(true);
  };
  const handleLead = (idx) => () => {
    setModal((state) => ({
      ...state,
      [idx]: !state[idx],
    }));
    setLead(true);
  };
  const handleHubspot = (idx) => () => {
    setModal((state) => ({
      ...state,
      [idx]: !state[idx],
    }));
    setHubspot(true);
  };

  function handleModalOff(){
    setModal(false);
    setShow(false);
    setContact(false);
    setLead(false);
    setHubspot(false);
  }

  function renderContacts(item, idx) {
    return (
      <Contact key={idx}>
        <ContactLeft>
          <TextBlack>
            {item.full_contact_person_info?.fullName
              ? item.full_contact_person_info.fullName
              : item.first_name
                ? item.first_name + ' ' + item.last_name
                : homeT('noName')}
          </TextBlack>
          <Social>
            {item.twitter && (
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://twitter.com/` + item.twitter}
              >
                <Twitter />
              </a>
            )}
            {item.linkedin && (
              <a
                target="_blank"
                rel="noreferrer"
                href={`https://www.linkedin.com/` + item.linkedin}
              >
                <Linkedin />
              </a>
            )}
          </Social>
        </ContactLeft>
        <ContactCenter>
          {item.position ? (
            <TextLightExtraSmall>{item.position}</TextLightExtraSmall>
          ) : (
            <TextLightExtraSmall>{homeT('noPosition')}</TextLightExtraSmall>
          )}
          <div>
            <Flex>
              <Mail />
              {item.value ? (
                <TextAccentExtraSmall>{item.value}</TextAccentExtraSmall>
              ) : (
                <TextLightExtraSmall>{homeT('noMail')}</TextLightExtraSmall>
              )}
            </Flex>
            <Flex>
              <Cell />
              {item.phone_number ? (
                <TextAccentExtraSmall>{item.phone_number}</TextAccentExtraSmall>
              ) : (
                <TextLightExtraSmall className="phone">
                  {homeT('noPhone')}
                </TextLightExtraSmall>
              )}
            </Flex>
          </div>
        </ContactCenter>
        <ContactRight onClick={handleShow(idx)}>
          <Send />
          {show[idx] && (
            <Manage>
              <Box>
                <Flex>
                  <TextBlackThin onClick={handleContact(idx)}>
                    {homeT('sendContact')}
                  </TextBlackThin>
                  <ContactIcon />
                </Flex>
                <Flex>
                  <TextBlackThin onClick={handleLead(idx)}>{homeT('sendLead')}</TextBlackThin>
                  <ContactIcon />
                </Flex>
                <Flex>
                  <TextBlackThin onClick={handleHubspot(idx)}>{homeT('sendHubspot')}</TextBlackThin>
                  <Hubspot />
                </Flex>
              </Box>
            </Manage>
          )}
        </ContactRight>
        {modal[idx] && (
          <>
            <Modal>
              <Overflow onClick={handleModalOff}></Overflow>
              <Popup>
                <SendContact handleOpenAddOff={handleModalOff} 
                  name={item.full_contact_person_info?.fullName
                    ? item.full_contact_person_info.fullName
                    : item.first_name
                      ? item.first_name + ' ' + item.last_name
                      : homeT('noName')}
                  mail={item.value}
                  number={item.phone_number}
                  job={item.position}
                  contact={contact}
                  lead={lead}
                  hubspot={hubspot}
                />
              </Popup>
            </Modal>
          </>
        )}
      </Contact>
    );
  }

  useEffect(() => {
    var re = / /g;
    setName(companyInfo?.company_name?.toLowerCase().replace(re, '-'));
    console.log(name);
    /* eslint-disable */
  }, []);
  /* eslint-enable */

  return (
    <Wrap>
      <Top>
        {contactsInfo.results && contactsInfo.results.length > 0 ? (
          <>
            <Search />
            <FilterWrap>
              <TextLightExtraSmall>Filters</TextLightExtraSmall>
              <Batch />
            </FilterWrap>
          </>
        ) : (
          <a
            rel="noreferrer"
            target="_blank"
            href={`https://www.linkedin.com/search/results/people/?company=${companyInfo?.company_name?.toLowerCase().replace(/ /g, '-')}`}
          >
            find contacts on Linkedin
          </a>
        )}
      </Top>
      {contactsInfo.results && contactsInfo.results.map(renderContacts)}
    </Wrap>
  );
}

Contacts.propTypes = {
  contactsInfo: any,
  companyInfo: object
};
