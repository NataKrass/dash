import { useTranslation } from 'react-i18next';
import { bool, func } from 'prop-types';
import { ReactComponent as Filters } from 'assets/images/filters.svg';
import FilterList from 'base/components/Leads/Filters/FilterList';
import { TextAccentThin } from 'base/styled';

export default function Filter({setOpen, open, filter, setFilter}) {
  const { t: homeT } = useTranslation('home');

  function handleFilter() {
    setFilter(!filter);
    setOpen(!open);
  }

  return (
    <div className="with-modal">
      <a onClick={handleFilter}>
        <Filters />
        <TextAccentThin> {homeT('filters')} </TextAccentThin>
      </a>
      <div className={filter ? 'filtered' : 'd-none'}>
        <FilterList handleFilter={handleFilter}/>
      </div>
    </div>
  );
}

Filter.propTypes = {
  setOpen: func, 
  open: bool.isRequired,
  filter: bool,
  setFilter: func
};