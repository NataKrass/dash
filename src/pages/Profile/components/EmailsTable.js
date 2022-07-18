import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { array } from 'prop-types';
import { Table, TableTitle, StyledSelect, TextBlackSmallThin } from 'base/styled';
import styled from 'styled-components';
import network from 'base/network';

const TableNew = styled(Table)`
  th:first-of-type {
    width: auto;
  }
  td, td:nth-child(2),
  td:last-of-type {
    width: 25%;
    position: static;
    padding-right: 15px;
  }
  .cSqraV {
    min-width: 50px;
    width: 105px;
  }
  .css-1okebmr-indicatorSeparator {
    display: none;
  }
  .cSqraV .css-1pahdxg-control, .cSqraV .css-yk16xz-control {
    border: none;
    box-shadow: 0px 1px 5px rgba(87, 85, 85, 0.24);
  }
  @media (max-width: 768px) {
    .css-2b097c-container {
      min-width: 55px;
    }
    td:nth-child(2) {
      width: 20%;
    }
  }
`;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: '#000000',
    fontSize: '12px',
    background: state.isSelected ? '#FFF9F9' : 'inherit',
    padding: 5,
  })
};

const Select = styled(StyledSelect)`
   min-width: 120px;
   width: 120px;
   padding: 5px 0;
   .css-yk16xz-control {
    box-shadow: 0px 1px 5px rgba(87, 85, 85, 0.24);
    border: 1px solid transparent;
   }
   @media (max-width: 768px) {
    min-width: 55px;
    width: 100%;
   }
  
`;

export default function EmailsTable({list, custom}) {
  const { t: profileT } = useTranslation('profileForm');
  const { t: homeT } = useTranslation('home');
  const [frequency, setFrequency] = useState();
  const [include, setInclude] = useState();

  const freqList = [
    { value: 'never', label: 'never' },
    { value: 'monthly', label: 'monthly' },
    { value: 'weekly', label: 'weekly' },
    { value: 'daily', label: 'daily' },
    { value: 'hourly', label: 'hourly' },
    { value: 'instant', label: 'instant' }
  ];

  const includeList = [
    { value: true, label: 'yes' },
    { value: false, label: 'no' }
  ];

  const handleFrequency = (item) => (e) => {
    setFrequency(e.value);
    const data = {
      csv_on: include ? include : item.csv_on,
      frequency: e.value
    };
    console.log(item.id, data);
    custom ? network.put(`/api/notifications/custom/${item.id}`, data) :
      network.put(`/api/notifications/summary/${item.id}`, data) ;
  };

  const handleInclude = (item) => (e) => {
    setInclude(e.value);
    const data = {
      csv_on: e.value,
      frequency: frequency ? frequency : item.frequency
    };
    console.log(item.id, data);
    custom ? network.put(`/api/notifications/custom/${item.id}`, data) :
      network.put(`/api/notifications/summary/${item.id}`, data) ;
  };

  return (
    <TableNew>
      <tbody>
        <tr>
          <th>
            <TableTitle>{homeT('name')}</TableTitle>
          </th>
          <th>
            <TableTitle>{homeT('website')}</TableTitle>
          </th>
          <th>
            <TableTitle>{profileT('frequency')}</TableTitle>
          </th>
          <th>
            <TableTitle>{profileT('include')}</TableTitle>
          </th>
        </tr>
        {list && list.map((item, idx) => (
          <tr key={idx}>
            <td>
              <TextBlackSmallThin>{item.name}</TextBlackSmallThin>
            </td>
            <td>
              <TextBlackSmallThin>{item.website_name}</TextBlackSmallThin>
            </td>
            <td>
              <Select
                options={freqList}
                onChange={handleFrequency(item)}
                styles={customStyles}
                menuPlacement="bottom"
                defaultValue={{ label: item.frequency, value: item.frequency }}
              />
            </td>
            <td>
              <Select
                options={includeList}
                onChange={handleInclude(item)}
                styles={customStyles}
                menuPlacement="bottom"
                defaultValue={{ label: item.csv_on ? 'yes' : 'no', value: item.csv_on ? 'yes' : 'no' }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </TableNew>
  );
}

EmailsTable.propTypes = {
  list: array,
  custom: array
};
