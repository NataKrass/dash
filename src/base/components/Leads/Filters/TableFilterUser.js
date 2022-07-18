import { useState, useEffect } from 'react';
import {
  Manage,
  ManageBox,
  TableFilters,
  TableTitle,
  TextBlackdark,
  TextGreyThin
} from 'base/styled';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { func } from 'prop-types';
import { ReactComponent as Nav } from 'assets/images/navigation.svg';
import { ReactComponent as Edit } from 'assets/images/edit.svg';
import { ReactComponent as Delete } from 'assets/images/trash.svg';
import styled from 'styled-components';
import { deleteUF } from 'store/slices/userFilters';


const Box = styled.div`
  padding-top: 80px;
  p {
    text-align: center;
  }
`;

const ManageBoxRight = styled(ManageBox)`
  right: 18px;
`;

const Span = styled.span`
  font-size: .75rem;
  font-style: normal;
  font-weight: 600;
  -webkit-letter-spacing: 0rem;
  -moz-letter-spacing: 0rem;
  -ms-letter-spacing: 0rem;
  letter-spacing: 0rem;
  color: #2C2C2C;
`;

const Text = styled.span`
  display: block;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0rem;
  text-align: left;
  color: ${props => props.theme.colors.white};
  background: rgba(50, 49, 49, 0.7);
  border-radius: 11.5px;
  padding: 3px 8px;
  margin-top: 5px!important;
  width: fit-content;
`;

export default function TableFilterUser({
  handleFilterUser,
  setEdit,
  setFilterUserEdit,
}) {

  const [show, setShow] = useState(false);
  const [noFilters, setNoFilters] = useState(false);
  const { t: homeT } = useTranslation('home');
  const dispatch = useDispatch();

  const {userFilters: list} = useSelector((state) => state.userFReducer);

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
    dispatch(deleteUF(id));
  };

  useEffect(() => {
    setNoFilters(list.length === 0);
  }, [list]);

  return (
    <>
      <TableFilters>
        <tbody>
          <tr>
            <th>
              <TableTitle>{homeT('name')}</TableTitle>
            </th>
            <th>
              <TableTitle>{homeT('website')}</TableTitle>
            </th>
            <th>
              <TableTitle>{homeT('filters')}</TableTitle>
            </th>
            <th>
              <TableTitle>{homeT('appliedTo')}</TableTitle>
            </th>
            <th>
              <TableTitle>{homeT('manage')}</TableTitle>
            </th>
          </tr>

          {list &&
            list.map((lead, idx) => (
              <tr key={idx}>
                <td>
                  <TextBlackdark> {lead?.name}</TextBlackdark>
                </td>
                <td>
                  <TextBlackdark>
                    {lead?.ga_view?.website_name}
                    {lead?.ga_view?.sunsetted && <Text>{homeT('sunsetted')}</Text> }  
                  </TextBlackdark>
                </td>
                <td>
                  {lead.lead_filters_attributes && lead.lead_filters_attributes.map((filter, idx) => (
                    <div key={idx}>
                      <TextBlackdark>
                        {filter.key}:{' '}
                        <Span> {filter.value} </Span>
                      </TextBlackdark>
                      
                    </div>
                  ))}
                </td>
                <td>
                  {lead.users && lead.users.map((filter, idx) => (
                    <div key={idx}>
                      <TextBlackdark>
                        {filter.first_name}{' '}{filter.last_name}
                      </TextBlackdark> 
                    </div>
                  ))}
                  <TextBlackdark> {lead.user} </TextBlackdark>
                </td>
                <td>
                  <Manage onClick={handleShow(idx)}>
                    <Nav />
                    {show[idx] && (
                      <ManageBoxRight>
                        <a onClick={handleShowForm(lead)}>
                          <Edit />
                          <span>{homeT('edit')}</span>
                        </a>
                        <a onClick={handleDelete(lead.id)}>
                          <Delete />
                          <span>{homeT('delete')}</span>
                        </a>
                      </ManageBoxRight>
                    )}
                  </Manage>
                </td>
              </tr>
            ))}
        </tbody>
      </TableFilters>
      {noFilters && 
        <Box>
          <TextGreyThin>
            {homeT('noFilters')}
          </TextGreyThin>
        </Box>
      }
    </>
  );
}

TableFilterUser.propTypes = {
  handleFilterUser: func,
  setEdit: func,
  setFilterUserEdit: func,
};
