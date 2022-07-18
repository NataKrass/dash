import { func } from 'prop-types';
import { ModalFull } from 'base/styled';
import TabsFilter from './TabsFilter';

export default function FilterList({handleFilter}) {

  return (
    <ModalFull>
      <TabsFilter handleFilter={handleFilter}  />
    </ModalFull>
  );
}

FilterList.propTypes = {
  handleFilter: func
};
