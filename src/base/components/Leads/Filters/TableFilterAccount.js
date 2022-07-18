import { useEffect, useState } from 'react';
import {
  Manage,
  ManageBox,
  TableFilters,
  TableTitle,
  TextBlackSmall,
  TextBlackdark,
  TextGreyThin
} from 'base/styled';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { any, array, func } from 'prop-types';
import { ReactComponent as Nav } from 'assets/images/navigation.svg';
import { ReactComponent as Edit } from 'assets/images/edit.svg';
import { ReactComponent as Delete } from 'assets/images/trash.svg';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { deleteAF } from 'store/slices/accFilters';

const Text = styled.span`
  display: block;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0rem;
  text-align: left;
  color: ${(props) => props.theme.colors.white};
  background: rgba(50, 49, 49, 0.7);
  border-radius: 11.5px;
  padding: 3px 8px;
  margin-top: 5px !important;
  width: fit-content;
`;

const ManageRight = styled(Manage)`
  text-align: center;
`;

const ManageBoxRight = styled(ManageBox)`
  right: 40px;
`;

const Box = styled.div`
  padding-top: 80px;
  p {
    text-align: center;
  }
`;

export default function TableFilterAccount({
  handleFilterAccount,
  setEdit,
  setFilterAccountEdit,
}) {
  const [show, setShow] = useState(false);
  const [noFilters, setNoFilters] = useState(false);
  const { t: homeT } = useTranslation('home');
  const dispatch = useDispatch();
  const { accFilters: list } = useSelector((state) => state.accFReducer);

  const handleShow = (idx) => () => {
    setShow((state) => ({
      ...state,
      [idx]: !show[idx],
    }));
  };

  const handleShowForm = (lead) => () => {
    handleFilterAccount(lead);
    setFilterAccountEdit(lead);
    setEdit(true);
  };

  const handleDelete = (id) => () => {
    dispatch(deleteAF(id));
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
              <TableTitle>{homeT('manage')}</TableTitle>
            </th>
          </tr>

          {list &&
            list.map((lead, idx) => (
              <tr key={lead.id}>
                <td>
                  <TextBlackdark> {lead.name}</TextBlackdark>
                </td>
                <td>
                  <TextBlackdark>
                    {lead?.ga_view?.website_name}
                    {lead?.ga_view?.sunsetted && (
                      <Text>{homeT('sunsetted')}</Text>
                    )}
                  </TextBlackdark>
                </td>
                <td>
                  {lead?.lead_filters_attributes?.map((filter, idx) => (
                    <div key={idx}>
                      <TextBlackdark>{filter.key}: </TextBlackdark>
                      <TextBlackSmall> {filter.value} </TextBlackSmall>
                    </div>
                  ))}
                </td>
                <td>
                  <ManageRight onClick={handleShow(idx)}>
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
                  </ManageRight>
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

TableFilterAccount.propTypes = {
  list: array,
  handleFilterAccount: func,
  setEdit: func,
  filterAccountEdit: any,
  setFilterAccountEdit: func,
};
