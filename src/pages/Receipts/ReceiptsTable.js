import {
  FlexWrapper,
  TextAccentThin,
  TextBlackThin,
} from 'base/styled';
import { useTranslation } from 'react-i18next';
import { array } from 'prop-types';
import { ReactComponent as Download } from 'assets/images/download.svg';
import styled from 'styled-components';

const FlexWrapperBorder = styled(FlexWrapper)`
  border-bottom: ${props => props.theme.borders.textInput};
  padding: 10px 30px 10px 20px;
`;

const Date = styled.div`
width: 100px;
`;

const Amount = styled.div`
  padding-left: 50px;
`;

const Fluid = styled.div`
  width: 100%;
`;

const File = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

export default function ReceiptsTable({list}) {

  const { t: rootT } = useTranslation();

  return (
    <Fluid>
      {list.map((lead, idx) => (
        <FlexWrapperBorder key={idx}>
          <Date>
            <TextBlackThin> {lead.date}</TextBlackThin>
          </Date>
          <Amount>
            <TextBlackThin>$ {lead.amount}</TextBlackThin>
          </Amount>
          <File>
            <Download />
            <TextAccentThin>{rootT('download')}</TextAccentThin>
          </File>
        </FlexWrapperBorder>
      ))}
    </Fluid>
  );
}

ReceiptsTable.propTypes = {
  list: array,
};
