import { useTranslation } from 'react-i18next';
import { func } from 'prop-types';
import { OutlinedButton, TextBlack } from 'base/styled';
import styled from 'styled-components';

const Wrap = styled.div`
  cursor: pointer;
`;

export default function Personalization({handleCloseCampaign}) {
  const { t: personalizationT } = useTranslation('personalization');
  return (
    <Wrap>
      <TextBlack>{personalizationT('url')}:</TextBlack>
      <div>
        {personalizationT('pageEditor')}
      </div>
      <div>
        <OutlinedButton onClick={handleCloseCampaign}>
          {personalizationT('back')}
        </OutlinedButton>
      </div>
    </Wrap>
  );
}

Personalization.propTypes = { 
  handleCloseCampaign: func
};
