import { TextLightExtraSmall } from 'base/styled';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const BlockMargin = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px 26px;
`;

const Link = styled.a`
  color: grey;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const TermsText = styled (TextLightExtraSmall)`
  width: 101px;
  text-align: center;
`;

export default function Terms() {
  const { t: generalT } = useTranslation();
  return (
    <BlockMargin>
      <TermsText>
        <Link href="https://www.visitorqueue.com/privacy" target="_blank">{generalT('terms')} </Link>
      </TermsText>
    </BlockMargin>
    
    
  );
}
