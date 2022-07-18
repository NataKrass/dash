import { useState } from 'react';
import {
  Manage,
  ManageBox,
  TableFilters,
  TableTitle,
  TextBlackdark,
} from 'base/styled';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { array, func } from 'prop-types';
import { ReactComponent as Nav } from 'assets/images/navigation.svg';
import { ReactComponent as Edit } from 'assets/images/edit.svg';
import { ReactComponent as Delete } from 'assets/images/trash.svg';
import styled from 'styled-components';
import { deleteQD } from 'store/slices/dashboardQueues';

const ManageBoxTop = styled(ManageBox)`
  top: -3px;
  right: 18px;
  &:first-child {
    color: red;
  }
`;

const TableQueue = styled(TableFilters)`
    margin-top: 30px;
    th:last-of-type {
        text-align: right;
        padding-right: 20px;
    }
    tr:nth-child(2) {
      td svg {
        display: none
      }
    }
`;

export default function TableFilterAccount({list,
  handleFilterUser,
  setEdit,
  setFilterUserEdit}) {
  const { t: homeT } = useTranslation('home');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleShow = (idx) => () => {
    setShow(state => ({
      ...state,
      [idx]: !show[idx]
    }));
  };

  const handleShowForm = (lead) => () => {
    handleFilterUser(lead);
    setFilterUserEdit(lead);
    setEdit(true);
  };

  const handleDelete = (id) => () => {
    dispatch(deleteQD(id));
  };

  return (
    <TableQueue>
      <tbody>
        <tr>
          <th>
            <TableTitle>{homeT('name')}</TableTitle>
          </th>
          <th>
            <TableTitle>{homeT('manage')}</TableTitle>
          </th>
        </tr>

        {list && list.map((lead, idx) => (
          <tr key={idx}>
            <td>
              <TextBlackdark> {lead?.name}</TextBlackdark>
            </td>
            <td>
              <Manage onClick={handleShow(idx)}>
                <Nav />
                { show[idx] && 
                <ManageBoxTop>
                  <a onClick={handleShowForm(lead)}>
                    <Edit />
                    <span>{homeT('edit')}</span>
                  </a>
                  <a onClick={handleDelete(lead.id)}>
                    <Delete />
                    <span>{homeT('delete')}</span>
                  </a>
                </ManageBoxTop>
                }
              </Manage>
            </td>
          </tr>
        ))}
      </tbody>
    </TableQueue>
  );
}

TableFilterAccount.propTypes = {
  list: array,
  handleFilterUser: func,
  setEdit: func,
  setFilterUserEdit: func
};
