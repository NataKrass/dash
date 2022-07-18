import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  TableFilters,
  TableTitle,
  TextBlackSmall,
  TextGreyBold,
  AccentButton,
  TextBlackdark,
  TextBlack,
  TextBlackThin
} from 'base/styled';
import { useTranslation } from 'react-i18next';
import { array } from 'prop-types';
import styled from 'styled-components';
import Responsive from 'context/responsive';
import { recoverWebsite } from 'store/slices/websites';

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  p {
    font-size: 0.75rem;
    margin: 0 0 10px;
  }
  .title {
    width: 100%;
    .name {
      width: 55%;
    }
  }
  .value {
    display: flex;
    width: 100%;
    justify-content: space-between;
    p {
      padding: 5px 0;
    }
  }
`;

const Detected = styled(TextGreyBold)`
  padding: 5px 10px!important;
  width: fit-content;
  border-radius: 11.5px;
  background: #EDEDED;
  font-size: 0.75rem;
  margin-left: 10px!important;
  height: 25px;
`;

const Table = styled(TableFilters)`
  box-shadow: none;
  th:first-of-type {
    width: 15%;
  }
  td {
    vertical-align: middle;
  }
  td:first-of-type,
  td:nth-child(2) {
    padding-top: 10px;
  }
`;

const TableNew = styled(Table)`
  td {
    z-index: auto;
  }
`;

const BoxBordered = styled.div`
  border-radius: 10px;
  border: ${(props) => props.theme.borders.tableBorder};
  padding: 18px;
  width: 100%;
`;

export default function DeletedTable({ list }) {
  const { t: homeT } = useTranslation('home');
  const { t: websiteT } = useTranslation('website');
  const dispatch = useDispatch();

  const ctx = useContext(Responsive);

  const handleActivate = (id) => () => {
    dispatch(recoverWebsite({id}));
  };

  return (
    <>
      {ctx.isMobile ? (
        <>
          {list &&
            list.map((item, idx) => (
              <BoxBordered key={idx}>
                <Row>
                  <div className="title">
                    <TextBlack>{homeT('name')}</TextBlack>
                    <div className="value">
                      <TextBlackdark className="name">
                        {item.name}
                      </TextBlackdark>
                      <Detected>{websiteT('deactivated')}</Detected>
                    </div>
                  </div>
                  <AccentButton>{websiteT('activate')}</AccentButton>
                </Row>
                <Row>
                  <div className="title">
                    <TextBlack>{homeT('tracking')}</TextBlack>
                    {websiteT('websiteNote')}{item.deleted_in_days ? item.deleted_in_days : '6'}{websiteT('days')}
                  </div>
                </Row>
              </BoxBordered>
            ))}
        </>
      ) : (
        <TableNew>
          <tbody>
            <tr>
              <th>
                <TableTitle>{homeT('name')}</TableTitle>
              </th>
              <th>
                <TableTitle>{homeT('status')}</TableTitle>
              </th>
              <th>
                <TableTitle>{homeT('notes')}</TableTitle>
              </th>
              <th></th>
            </tr>

            {list &&
              list.map((item) => (
                <tr key={item.name}>
                  <td>
                    <TextBlackSmall> {item.name}</TextBlackSmall>
                  </td>
                  <td>
                    <Detected>{websiteT('deactivated')}</Detected>
                  </td>
                  <td>
                    <TextBlackThin>
                      {websiteT('websiteNote')}{item.deleted_in_days}{websiteT('days')}
                    </TextBlackThin>
                  </td>
                  <td>
                    <AccentButton onClick={handleActivate(item.id)}>{websiteT('activate')}</AccentButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </TableNew>
      )}
    </>
  );
}

DeletedTable.propTypes = {
  list: array,
};
