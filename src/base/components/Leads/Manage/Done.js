import {
  TitleTwo
} from 'base/styled';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Success } from 'assets/images/success.svg';

const Content = styled.div`
  margin: 0 auto;
  text-align: center;
  padding: 10px 50px;
`;

export default function Done() {
  const { t: rootT } = useTranslation('');

  return (
    <Content>
      <Success />
      <TitleTwo>{rootT('done')}</TitleTwo>
    </Content>
  );
}

