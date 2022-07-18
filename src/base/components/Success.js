import { Block, TitleSmallBlack } from 'base/styled';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as Icon } from 'assets/images/saved.svg';

const BlockMargin = styled(Block)`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 70px;
`;

export default function Success() {
  const { t: generalT } = useTranslation();
  return (
    <BlockMargin>
      <Icon />
      <TitleSmallBlack>
        {generalT('saved')}
      </TitleSmallBlack>
    </BlockMargin>
  );
}
