import {
  Block,
  TitleTwo,
  BlockMargin,
  FilledButton,
  OutlinedButton,
  TextBlackThin,
} from 'base/styled';
import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import alert from 'assets/images/alert.svg';
import styled from 'styled-components';
import network from 'base/network';

const Buttons = styled.div`
  display: flex;
  padding: 20px;
  margin-left: auto;
`;

const Box = styled(Block)`
  margin: 0 auto;
  flex-direction: column;
  padding: 20px 0 0 0;
`;

const Content = styled.div`
  background: #FFF7DA url(${alert}) 8% 26% no-repeat;
  padding: 20px 30px 20px 70px;
  p {
      max-width: 275px;
      line-height: 23px;
  }
`;

export default function Deactivate({ handleSubscribeOff }) {
  const { t: companyT } = useTranslation('company');
  const { t: homeT } = useTranslation('home');

  function handleDeactivate() {
    handleSubscribeOff();
    network.put('/api/account/deactivate');
  }

  return (
    <Box>
      <TitleTwo>{companyT('deactivateAccount')}</TitleTwo>
      <Content>
        <TextBlackThin>{companyT('deactivateContent')}</TextBlackThin>
      </Content>
      <Buttons>
        <BlockMargin>
          <OutlinedButton type="reset" onClick={handleSubscribeOff}>
            {homeT('cancel')}
          </OutlinedButton>
        </BlockMargin>
        <BlockMargin>
          <FilledButton onClick={handleDeactivate}>{companyT('deactivate')}</FilledButton>
        </BlockMargin>
      </Buttons>
    </Box>
  );
}

Deactivate.propTypes = {
  handleSubscribeOff: func
};
  