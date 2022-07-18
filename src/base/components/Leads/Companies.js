import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { object, string } from 'prop-types';
import { Block, AccentButton } from 'base/styled';
import styled from 'styled-components';
import TooltipDark from 'base/components/TooltipDark';

const Box = styled(Block)`
padding: 13px 12px;
min-width: 18%;
button {
  margin-top: 13px;
}
`;

const Number = styled.p`
  font-size: 3.6rem;
  font-weight: 500;
  text-align: left;
  line-height: 6rem;
  color: ${props => props.theme.colors.accentGrey};
  margin: 5px 0;
`;

const Text = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 29px;
  letter-spacing: 0rem;
  color: ${props => props.theme.colors.lightText};
  margin: 0 10px;
`;

const TextLight = styled.p`
  font-size: .75rem;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: 0rem;
  color: ${props => props.theme.colors.lightText};
  margin: 0 10px;
`;

const TextCompanies = styled.p`
  font-size: .875rem;
  font-weight: 600;
  line-height: 23px;
  color: ${props => props.theme.colors.accentGrey};
  letter-spacing: 0rem;
  text-align: left;
  width: 95px;
  margin: 10px 0 10px 8px;
`;

const NewBox = styled.div`
  .opacity {
    opacity: 0;
    transition: .7s
  }
  .scale {
    transition: .3s
    transform: scale3d(1.1, 1.1, 1.1);
  }
  @-webkit-keyframes bounce {
    from {
        -webkit-transform: translate3d(0, 0, 0);
        transform: translate3d(0, 0, 0);
    }
    to {
        -webkit-transform: translate3d(0, 200px, 0);
        transform: translate3d(0, 200px, 0);
    }
}
`;

const New = styled.div`
  background: ${props => props.theme.colors.yellow};
  color: #000;
  padding: 2px 8px;
  width: 48px;
  border-radius: 10px;
  margin-left: auto;
  margin-top: 8px;
  p {
    margin: 0;
    font-size: .75rem;
    white-space: nowrap;
    font-weight: 500;
  }
`;

const Tooltip = styled(TooltipDark)`
  left: -3px;
`; 

const TextHuge = styled(Text)`
  font-size: 3.5rem;
`;

export default function Companies ({summ, status}) {

  const { t: homeT } = useTranslation('home');
  const [show, setShow] = useState(false);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    setShow(false);
    setFade(true);
  }, [status]);
 
  useEffect(() => {
    const timerIn = setTimeout(() => {
      setShow(true);
    }, 3000);
    const fade =  setTimeout(() => {
      setFade(false);
    }, 3400); 
    const timerOut = setTimeout(() => {
      setShow(false);
    }, 13000);
    return () => clearTimeout(timerIn, timerOut, fade);
  }, [status, summ]);
  return (
    <Box>
      <Tooltip text={homeT('tooltipSummary')} />
      <>
        <div>
          <Number>{summ?.unique_leads}</Number>

          {summ?.available_leads_count > 99990 ? (
            <TextHuge>∞</TextHuge>
          ) : (
            <Text>{summ?.available_leads_count}</Text>
          )}

          <TextLight>{homeT('remain')}</TextLight>
        </div>
        <div>
          <NewBox>
            <New className={show ? (fade ? 'scale' : '') : 'opacity'}>
              <p>+ {summ.new_leads}</p>
            </New>
          </NewBox>
          <TextCompanies>{homeT('uniqueCompanies')}</TextCompanies>
          <a href="/company/account">
            <AccentButton>{homeT('addMore')}</AccentButton>
          </a>
        </div>
      </>
    </Box>
  );
}

Companies.propTypes = {
  summ: object, 
  status: string
};


