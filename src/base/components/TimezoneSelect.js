import { useEffect, useState } from 'react';
import img from 'assets/images/check.svg';
import { StyledSelect } from 'base/styled';
import network from 'base/network';
import { array, node } from 'prop-types';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: '#000000',
    fontSize: '12px',
    background: state.isSelected
      ? `url(${img}) no-repeat 4% center`
      : 'inherit',
    borderBottom: state.isSelected ? '1px solid #EDEDED' : '0',
    '&:hover': {
      background: `#FFF9F9`,
    },
    padding: '10px 5px 10px 30px',
    width: 300,
  }),
  control: () => ({
    display: 'flex',
    borderRadius: '20px',
    border: '1px solid #d1d1d1',
    width: 300,
  }),
  menu: (provided, state) => ({
    ...provided,
    width: 320,
    color: state.selectProps.menuColor,
    padding: 0,
    overflowX: 'hidden',
    display: 'inline-block',
    '@media only screen and (max-width: 1200px)': {
      padding: 0,
    },
  }),
};

export default function TimeSelect({timezone, details}) {

  const [timez, setTimez] = useState();
  const [choosedTimez, setChoodesTimez] = useState();
  
  useEffect(() => {
    setTimez(timezone?.map((d) => {
      return {
        value: d[1],
        label: d[0]
      };
    }));
    setChoodesTimez(timez?.find(el => el.value === details?.settings?.time_zone));
    /* eslint-disable */
  }, [timezone, details]);
    /* eslint-enable */

  function handleSelectChange(e) {
    setChoodesTimez(timez?.find(el => el.value === e.value));
    network.put('/api/account/timezone', {time_zone: e.value});
  }

  return (
    <>
      <StyledSelect
        options={timez}
        onChange={handleSelectChange}
        value={choosedTimez}
        defaultInputValue={ choosedTimez ? choosedTimez : details?.settings?.time_zone }
        styles={customStyles}
      />
    </>
  );
}

TimeSelect.propTypes = {
  timezone: array, 
  details:node
};