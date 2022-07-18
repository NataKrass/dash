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
`;

export default function Archive({handleShowModalOff, handleSuccess, leadsMarked}) {
  const { t: popupT } = useTranslation('popup');
  const { t: rootT } = useTranslation('');
   
  function handleSubmit() {
    network.post('/api/leads/archive', {
      archived: true,
      selected_ids: leadsMarked.join(),
    });
    handleSuccess();
  }

  return (
    <form>
      <TextBlackBig style={{textAlign: "center"}}>{rootT('archive')}</TextBlackBig>
      <Content>
        <TextBlackThin>{popupT('archiveTo')}</TextBlackThin>
        <ButtonsWrap>
          <OutlinedButton onClick={handleShowModalOff}>
            {rootT('cancel')}
          </OutlinedButton>
          <AccentButton onClick={handleSubmit}>{rootT('archive')}</AccentButton>
        </ButtonsWrap>
      </Content>
    </form>
  );
}

Archive.propTypes = {
  handleShowModalOff: func,
  handleSuccess: func,
  leadsMarked: any
};
