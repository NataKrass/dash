import styled from 'styled-components';
import { Table } from '.';

const TableFilters = styled(Table)`
  tr {
    position: relative;
    td:last-of-type {
      position: static;
    }
  }
  th:first-of-type {
    padding-left: 18px;
    width: auto;
    position: relative;
  } 
  p {
    margin: 0;
  }
  td {
    padding: 12px 0;
  }
`;

export default TableFilters;
