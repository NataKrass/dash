import styled from 'styled-components';

const ModalContent = styled.div`
min-width: 210px;
  .content {
    padding: 15px 35px;
    align-items: center;
    p {
      margin: 0 0 0 15px;
      max-width: 280px;
    }
    svg {
      cursor: pointer;
    }
  }
  .title {
    width: 75%;
    margin-left: auto;
    align-items: center;
  }
  .info {
    align-items: start;
  }
  form {
    padding: 30px 35px 0;
    input {
      width: 320px;
    }
    p {
      margin: 0 0 5px 0;
    }
  }
  button {
    padding: 10px 16px;
    height: auto;
    margin-left: 10px;
  }
  &:not(.success):after {
    display: block;
    content: '';
    position: absolute;
    left: 0;
    bottom: 85px;
    width: 100%;
    height: 1px;
    background: ${(props) => props.theme.colors.greyLight};
  }
  .success {
    text-align: center;
    &_icon {
      width: 55%;
      margin-left: auto;
      padding: 0 15px 0 0;
    }
    &_text {
      max-width: 190px;
      text-align: center;
      margin: 0 40px;
    }
    &_btn {
      margin: 20px 0 0 0;
      text-align: center;
      button {
        margin: 0;
      }
    }
  }
`;

export default ModalContent;