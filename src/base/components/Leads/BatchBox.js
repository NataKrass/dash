import { ManageBox } from 'base/styled';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { func, array } from 'prop-types';

const ManageBoxTop = styled(ManageBox)`
  right: -44px;
  top: 24px;
  padding: 0;
  a {
    padding: 8px 39px;
    margin: 0;
    &:hover {
      border-radius: 0;
    }
    span {
      font-size: 12px;
      font-weight: 400;
    }
  }
`;

export default function BatchBox({
  leadsMarked,
  setShowModal,
  setExport,
  setAsign,
  setArchive,
  setHide,
  setTags,
}) {
  const { t: homeT } = useTranslation('home');

  function handleShowExport() {
    setShowModal(true);
    setExport(true);
  }

  function handleShowAsign() {
    setShowModal(true);
    setAsign(true);
  }

  // function handleShowMove() {
  //   setShowModal(true);
  //   setMove(true);
  // }
  
  function handleShowArchive() {
    setShowModal(true);
    setArchive(true);
  }
  
  function handleShowHide() {
    setShowModal(true);
    setHide(true);
  }
  
  function handleShowTags() {
    setShowModal(true);
    setTags(true);
  }
  
  return (
    <ManageBoxTop className={leadsMarked.length > 0 ? 'active' : 'disabled'}>
      <a
      /* eslint-disable */
      onClick={handleShowExport}>
        <span>{homeT('export')}</span>
      </a>
      <a onClick={handleShowAsign}>
        <span>{homeT('assign')}</span>
      </a>
      <a onClick={handleShowArchive}>
        <span>{homeT('archive')}</span>
      </a>
      <a onClick={handleShowHide}>
        <span>{homeT('hide')}</span>
      </a>
      <a 
      onClick={handleShowTags}
       /* eslint-enable */
      >
        <span>{homeT('tags')}</span>
      </a>
    </ManageBoxTop>
  );
}

BatchBox.propTypes = {
  leadsMarked: array,
  setShowModal: func,
  setExport: func,
  setAsign: func,
  setMove: func,
  setArchive: func,
  setHide: func,
  setTags: func
};
