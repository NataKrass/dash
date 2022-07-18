import { useState } from 'react';
import { array, func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as Close } from 'assets/images/close.svg';
import { ReactComponent as Plus } from 'assets/images/plus.svg';
import {
  Block,
  FlexWrapper,
  OutlinedButton,
  ModalFull
} from 'base/styled';
import TooltipDark from 'base/components/TooltipDark';
import TableLeadQueue from 'base/components/Leads/NewQueue/TableLeadQueue';
import LeadQueueForm from './LeadQueueForm';

const Button = styled.a`
  cursor: pointer;
`;

const BlockFilter = styled(Block)`
  margin: 20px 0;
  padding: 20px;
`;


const Title = styled.h2`
  position: relative;
  margin: 0;
  margin-right: 360px;
  .tooltip {
    position: absolute;
    left: auto;
    right: -10px;
    top: 0;
    span {
      top: -28px;
    }
  }
`;

const FlexWrapperCenter = styled(FlexWrapper)`
  align-items: center;
`;

export default function LeadQueue({handleOpen, queues}) {

  const { t: homeT } = useTranslation('home');
  const [filterUserEdit, setFilterUserEdit] = useState();
  const [filterUser, setFilterUser] = useState(false);
  const [edit, setEdit] = useState(false);

  function handleLeadForm() {
    setFilterUser(true);
  }
 
  function handleLeadFormOff() {
    setFilterUser();
    setFilterUserEdit();
    setEdit(false);
  }
  
  function handleFilterUser(id) {
    if (edit) {
      setFilterUserEdit(id);
      setFilterUser(true);
      setEdit(true);
      
      console.log(filterUserEdit);
    } else {
      setFilterUser(true);
      setFilterUserEdit();
      setEdit();
    }
    console.log('edit: ', edit);
  }

  return (
    <ModalFull>
      <FlexWrapperCenter>
        <Button>
          <Close onClick={handleOpen} />
        </Button>
        <Title>
          {homeT('leadQueues')}
          <TooltipDark text={homeT('addQueueTooltip')} className="tooltip" />
        </Title>
        <OutlinedButton onClick={handleLeadForm}>
          <Plus />
          {homeT('add')}
        </OutlinedButton>
      </FlexWrapperCenter>
      {filterUser && (
        <BlockFilter>
          <LeadQueueForm
            handle={handleLeadFormOff}
            filterUserEdit={filterUserEdit}
            edit={edit}
          />
        </BlockFilter>
      )}
      <TableLeadQueue
        handleFilterUser={handleFilterUser}
        setEdit={setEdit}
        setFilterUserEdit={setFilterUserEdit}
        list={queues.filter(e => e.id !== -2)}
      />
    </ModalFull>
  );
}

LeadQueue.propTypes = {
  handleOpen: func,
  queues: array
};
