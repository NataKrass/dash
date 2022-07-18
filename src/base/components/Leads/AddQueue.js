import { useTranslation } from 'react-i18next';
import { array, bool, func } from 'prop-types';
import { ReactComponent as Add } from 'assets/images/add.svg';
import { TextAccentThin } from 'base/styled';
import LeadQueue from './NewQueue/LeadQueue';
import styled from 'styled-components';

const Text = styled(TextAccentThin)`
  @media (max-width: 768px) {
    white-space: nowrap;
  }
`;

export default function AddQueue({setOpen, open, queues}) {
  const { t: homeT } = useTranslation('home');
  
  function handleOpen() {
    setOpen(!open);
  }
 
  return (
    <div className="with-modal">
      <a
        /* eslint-disable */
        onClick={handleOpen}>
        <Add />
        <Text>{homeT('addQueue')}</Text>
      </a>
      <div className={open ? 'filtered' : 'd-none'}>
        <LeadQueue handleOpen={handleOpen} queues={queues}
         /* eslint-enable */
        />
      </div>
    </div>
  );
}

AddQueue.propTypes = {
  setOpen: func, 
  open: bool,
  queues: array
};