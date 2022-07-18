import { number, object, string, array, any, bool } from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ReactComponent as VisitIcon } from 'assets/images/visit.svg';
import { ReactComponent as CompanyIcon } from 'assets/images/company_detail.svg';
import { ReactComponent as ContactsIcon } from 'assets/images/contact_details.svg';
import { ReactComponent as NotesIcon } from 'assets/images/notes.svg';
import Accordion from './Accordion';
import VisitDetails from './VisitDetails/VisitDetails';
import Company from './CompanyInfo/Company';
import Contacts from './Contacts/Contacts';
import Notes from './Notes/Notes';
import { Loading } from 'base/styled';
import { isStatusSucceed } from 'base/utils';

const AccordionWrap = styled.div`
  padding: 10px 5px;
`;

const tableLoading = {
  height: '100px'
};

export default function DetailAccordion({
  leadName,
  leadLocation,
  leadTime,
  leadCount,
  date,
  leadSource,
  companyInfo,
  visitsInfo,
  contactsInfo,
  notesInfo,
  leadToShow,
  detailsStatus
}) {
  const { t: homeT } = useTranslation('home');

  const details = [
    {
      title: homeT('visitDeatils'),
      icon: <VisitIcon />,
      active: true,
      content:  isStatusSucceed(detailsStatus) ? (
        <VisitDetails
          date={date}
          leadCount={leadCount}
          leadTime={leadTime}
          leadSource={leadSource}
          visitsInfo={visitsInfo}
        />
      ) : <Loading style={tableLoading} />,
    },
    {
      title: homeT('companyInfo'),
      active: false,
      icon: <CompanyIcon />,
      content: companyInfo && (
        <Company
          leadName={leadName}
          leadLocation={leadLocation}
          companyInfo={companyInfo}
        />
      ),
    },
    {
      title: homeT('contacts'),
      icon: <ContactsIcon />,
      active: false,
      content: (
        <Contacts contactsInfo={contactsInfo} companyInfo={companyInfo} />
      ),
    },
    {
      title: homeT('notes'),
      icon: <NotesIcon />,
      active: false,
      content: <Notes notesInfo={notesInfo} leadToShow={leadToShow} />,
    },
  ];

  function renderDetals(item, idx) {
    return (
      <Accordion
        key={idx}
        title={item.title}
        allactive={item.active}
        icon={item.icon}
      >
        { item.content }
      </Accordion>

    );
  }

  return <AccordionWrap>{details.map(renderDetals)}</AccordionWrap>;
}

DetailAccordion.propTypes = {
  leadName: string,
  leadLocation: string,
  leadLogo: string,
  leadTime: string,
  leadCount: number,
  date: string,
  leadSource: string,
  companyInfo: object,
  visitsInfo: array,
  contactsInfo: array,
  notesInfo: array,
  leadToShow: any,
  active: bool,
  detailsStatus: bool
};
