import Select from 'react-select';
import styled from 'styled-components';

const StyledSelectSmall = styled(Select)`
  min-width: 85px;
  margin: 20px 15px 0 0;
  .css-1pahdxg-control,
  .css-yk16xz-control {
    border: ${props => props.theme.borders.selectBorder};
    box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.06);
    border-radius: 8px;
    color: ${props => props.theme.colors.darkGrey};
    font-size: 12px;
  }
  .css-1uccc91-singleValue,
  .css-1wa3eu0-placeholder {
    font-size: 14px;
    color: ${props => props.theme.colors.darkGrey};
  }
  @media (max-width: 768px) {
    width: 40px;
  }
`;

export default StyledSelectSmall;