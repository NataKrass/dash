import styled from 'styled-components';

const BlockMargin = styled.div`
  margin-right: 15px;
  max-width: 240px;
  label {
    font-size: .875rem;
    font-style: normal;
    font-weight: 400;
    letter-spacing: 0rem;
    line-height: 25px;
    color: ${props => props.theme.colors.lightGrey};
  }
  @media (max-width: 768px) {
    max-width: 100%;
    width: 100%;
    margin: 5px 0;
  }
`;

export default BlockMargin;
