import { any, func } from 'prop-types';
import {
  AccentButton,
  ButtonsWrap,
  OutlinedButton,
  TextBlackBig,
  TextBlackThin,
} from 'base/styled';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import network from 'base/network';

const Content = styled.div`
  padding: 10px 10px 10px 20px;
  button {
    margin-top: 20px;
  }
  @media (max-width: 768px) {
    p {
      max-width: fit-content;
    } 
  }
`;

export default function Hide({handleSuccess, leadsMarked}) {
  const { t: popupT } = useTranslation('popup');
  const { t: rootT } = useTranslation('');
   
  function handleSubmit() {
    network.post('/api/leads/hide', {
      isp: false,
      selected_ids: leadsMarked.join(),
    });
    handleSuccess();
  }

  function handleSubmitIsp() {
    network.post('/api/leads/hide', {
      isp: true,
      selected_ids: leadsMarked.join(),
    });
    handleSuccess();
  }

  return (
    <form>
      <TextBlackBig style={{textAlign: "center"}}>{rootT('hide')}</TextBlackBig>
      <Content>
        <TextBlackThin>{popupT('hideTo')}</TextBlackThin>
        <ButtonsWrap>
          <OutlinedButton onClick={handleSubmitIsp}>
            {popupT('hideCancel')}
          </OutlinedButton>
          <AccentButton onClick={handleSubmit}>{popupT('hideConfirm')}</AccentButton>
        </ButtonsWrap>
      </Content>
    </form>
  );
}

Hide.propTypes = {
  handleShowModalOff: func,
  handleSuccess: func,
  leadsMarked: any
};
