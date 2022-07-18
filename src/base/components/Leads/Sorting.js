import { useState } from 'react';
import { func } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Sort } from 'assets/images/sort.svg';
import SortList from 'base/components/Leads/SortList';
import { Modal, TextBlackThin } from 'base/styled';

export default function Sorting({setSortType}) {
  const { t: homeT } = useTranslation('home');
  const [sort, setSort] = useState();

  function handleSort() {
    setSort(true);
  }

  function handleSortOff() {
    setSort(false);
  }
 
  return (
    <div className="with-modal-sm with-modal sort-btn">
      {sort && (<Modal onClick={handleSortOff}></Modal>)}
      <a onClick={handleSort}>
        <Sort />
        <TextBlackThin>{homeT('sortBy')}</TextBlackThin>
      </a>
      <div className={sort ? 'sorted' : 'd-none'}>
        <SortList setSortType={setSortType} handleSortOff={handleSortOff} />
      </div>
    </div>
  );
}

Sorting.propTypes = {
  setSortType: func
};