import { useState } from 'react';
import { any, func, number } from 'prop-types';
import {
  AccentButton,
  ButtonsWrap,
  OutlinedButton,
  RadioListCircle,
  TextBlackBig,
  TextBlackThin,
} from 'base/styled';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import network from 'base/network';

const Radio = styled(RadioListCircle)`
  padding: 20px;
  label {
    font-size: 0.875rem;
    font-weight: 600;
  }
  div {
      padding: 5px 0;
  }
`;

const Content = styled.div`
  padding: 20px 10px 10px 20px;
`;

export default function Export({handleShowModalOff, handleSuccess, leadsMarked, checkAll, gaViewId}) {
  const { t: popupT } = useTranslation('popup');
  const { t: rootT } = useTranslation('');
  const [radio, setRadio] = useState('company_info');

  function handleSubmit() {
    console.log(leadsMarked.join(), radio, gaViewId);
    handleSuccess();
    const getFiles = async () => {
      let res = await network
        .post(
          `/api/leads/export`,
          { responseType: 'blob' },
          {
            params: {
              ga_view_id: gaViewId,
              selected_ids: leadsMarked.join(),
              export_type: radio,
            },
          }
        )
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'export.csv');
          document.body.appendChild(link);
          link.click();
        })
        .catch((error) => console.log(error));
      console.log(res);
    };
    getFiles();

    if(checkAll) {
      console.log(checkAll);
    }
  }


  function handleChange(e) {
    setRadio(e.target.value);
  }
  return (
    <div>
      <TextBlackBig style={{textAlign: "center"}}>{rootT('export')}</TextBlackBig>
      <Content>
        <TextBlackThin>{popupT('chooseExport')}</TextBlackThin>
        <Radio>
          {/* eslint-disable */}
          <div>
            <input
              type="radio"
              checked={radio === "company_info"}
              id="company"
              value="company_info"
              onChange={handleChange}
              
            />
            <label className="radio" htmlFor="company">
              {popupT('companyInfo')}
            </label>
          </div>
          <div>
            <input
              type="radio"
              value="contact_info"
              checked={radio ==="contact_info"}
              id="contact"
              onChange={handleChange}
              
            />
            <label className="radio" htmlFor="contact">
              {popupT('contactInfo')}
            </label>
          </div>
          {/*eslint-enable */}
        </Radio>
        <ButtonsWrap>
          <OutlinedButton onClick={handleShowModalOff}>{rootT('cancel')}</OutlinedButton>
          <AccentButton onClick={handleSubmit}>{rootT('export')}</AccentButton>
        </ButtonsWrap>
      </Content>
    </div>
  );
}

Export.propTypes = {
  handleShowModalOff: func,
  handleSuccess: func,
  leadsMarked: any,
  checkAll: func, 
  gaViewId: number
};
