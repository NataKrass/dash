import { useTranslation } from 'react-i18next';
import { func, string } from 'prop-types';
import { OutlinedButton, TextBlack } from 'base/styled';

export default function Conversion({link, handleCloseCampaign}) {
  const { t: conversionsT } = useTranslation('conversions');
  return (
    <>
      <TextBlack>Conversion:</TextBlack>
      <a href={link} rel="noreferrer" target="_blank">
        edit
      </a>
      <div>
        <OutlinedButton onClick={handleCloseCampaign}>
          {conversionsT('back')}
        </OutlinedButton>
      </div>
    </>
  );
}

Conversion.propTypes = {
  link: string, 
  handleCloseCampaign: func
};
