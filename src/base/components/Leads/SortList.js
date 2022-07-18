import { useState } from 'react';
import { func } from 'prop-types';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import img from 'assets/images/checked.svg';

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  input {
    position: absolute;
    appearance: none;
    &:checked {
      opacity: 1;
    }
    &:checked:before {
      content: '';
      position: absolute;
      width: 15px;
      height: 15px;
      background: orange;
      border-radius: 100%;
      left: -25px;
      top: -1px;
      background: url(${img}) 0 0 no-repeat;
    }
  }
  label {
    display: inline-block;
    cursor: pointer;
    font-size: 0.75rem;
    position: relative;
    padding: 15px 25px 12px 32px;
    margin-right: 0;
    line-height: 18px;
    user-select: none;
    &:first-child {
      border-bottom: 1px solid #ededed;
    }
  }
`;

export default function SortList({setSortType, handleSortOff}) {
  const [radio, setRadio] = useState('last_visited_at_desc');
  const { t: homeT } = useTranslation('home');

  function handleChange(e) {
    setRadio(e.target.value);
    setSortType(e.target.value);
    handleSortOff(false);
  }

  return (
    <Modal>
      <label>
        <input
          type="radio"
          value="last_visited_at_desc"
          name="sort"
          checked={radio === 'last_visited_at_desc'}
          onChange={handleChange}
        />
        {homeT('none')}
      </label>
      <label>
        <input
          type="radio"
          value="last_visited_at_desc"
          name="sort"
          checked={radio === 'last_visited_at_desc'}
          onChange={handleChange}
        />
        {homeT('mostRecent')}
      </label>
      <label>
        <input
          type="radio"
          value="last_visit_page_views_count_desc"
          name="sort"
          checked={radio === 'last_visit_page_views_count_desc'}
          onChange={handleChange}
        />
        {homeT('pageViews')}
      </label>
      <label>
        <input
          type="radio"
          value="last_visit_time_on_page_desc"
          name="sort"
          checked={radio === 'last_visit_time_on_page_desc'}
          onChange={handleChange}
        />
        {homeT('timeSpent')}
      </label>
    </Modal>
  );
}

SortList.propTypes = {
  setSortType: func,
  handleSortOff: func
};