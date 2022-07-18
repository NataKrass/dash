import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  text-align: left;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.13);
  border-radius: 15px;
  border-spacing: 0;
  margin-top: 10px;
  background: #fff;
  td {
    border-top: ${props => props.theme.borders.tableBorder};
    border-bottom: ${props => props.theme.borders.tableBorder};
    position: relative;
    z-index: 0;
  }
  th:first-of-type {
    padding-left: 18px;
    width: 42px;
    position: relative;
  }
  th:not(:first-of-type),
  td:nth-child(2) {
    padding-right: 10px;
  }
  td:nth-child(2),
  td:nth-child(3) {
    cursor: pointer;
  }
  td:first-of-type {
    border-radius: 10px 0 0 10px;
    border-left: ${props => props.theme.borders.tableBorder};
    padding-left: 18px;
  }
  td:last-of-type {
    border-radius: 0 10px 10px 0;
    border-right: ${props => props.theme.borders.tableBorder};
    padding-right: 20px;
    width: 50px;
    position: relative;
    z-index: 0;
  }
  .last {
    z-index: 21!important;
  }
  @media (max-width: 768px) {
    td {
      vertical-align: top;
      padding-top: 10px;
      p {
        font-size: .75rem;
      }
    }
    td:first-of-type {
      padding: 10px;
    }
    td:last-of-type {
      border-radius: 0 10px 10px 0;
      border-right: ${props => props.theme.borders.tableBorder};
      padding: 10px 10px 0 0;
      width: auto;
      position: relative;
      z-index: 0;
      p {
        margin: 0;
      }
    }
    .info {
      position: relative;
      &:after {
        content: '';
        display: block;
        position: absolute;
        height: 82%;
        width: 1px;
        background: ${props => props.theme.colors.greyLight};
        top: 10px;
        left: -10px;
      }
      p {
        margin: 5px 0;
      }
    }
    h2 {
      margin: 0;
    }
    .last {
      z-index: auto!important;
    }
  } 
  @media (max-width: 480px) {
      p {
        max-width: 150px;
      }
    }
  }
`;

export default Table;
