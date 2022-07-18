import { useState } from 'react';
import { TextBlack, TextLightBold } from 'base/styled';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const SwitchBox = styled.div`
   display: flex;
   .react-switch-checkbox {
    height: 0;
    width: 0;
    visibility: hidden;
  }
  
  .react-switch-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 124px;
    height: 26px;
    background: #EEF5F9;
    border-radius: 100px;
    position: relative;
    transition: background-color .2s;
    padding-left: 11%;
  }
  .right {
    text-align: right;
    padding-left: 63%;
  }
  
  .react-switch-label .react-switch-button {
    content: '';
    position: absolute;
    top: 0px;
    left: 0px;
    padding: 0 10px;
    width: fit-content;
    height: 26px;
    transition: 0.2s;
    background: #fff;
    box-shadow: 0 2px 12px rgb(0 0 0 / 13%);
    border-radius: 13.5px;
    p {
      margin: 4px 0;
    }
  }
  
  .react-switch-checkbox:checked + .react-switch-label .react-switch-button {
    left: calc(100%);
    transform: translateX(-100%);
  }
  
  .react-switch-label:active .react-switch-button {
    width: 60px;
  }
`;

export default function Switcher() {

  const { t: header } = useTranslation('header');
  const [rise, setRise] = useState(true);

  const handleToggle = () => {
    setRise(!rise);
    const url = process.env.REACT_APP_API_PATH;
    window.open(url, '_self');
  };

  return (
    <SwitchBox>
      <input
        className="react-switch-checkbox"
        id={`react-switch-new`}
        type="checkbox"
        checked={rise}
        onChange={handleToggle}
      />
      <label
        className={rise ? "react-switch-label" : "react-switch-label right"}
        htmlFor={`react-switch-new`}
      >
        <TextLightBold> {header( rise ? 'classic' : 'rise' )}</TextLightBold>
        <div className={`react-switch-button`}><TextBlack>{header(rise ? 'rise' : 'classic')}</TextBlack></div>
      </label>
    </SwitchBox>
  );
}
  