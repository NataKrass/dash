import styled from 'styled-components';

const LeadAvaWrapper = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
  border: ${props => props.theme.borders.avaBorder};
  margin: 0 auto;
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
  }
`;

export default LeadAvaWrapper;
