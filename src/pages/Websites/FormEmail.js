import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { string, func } from 'prop-types';
import styled from 'styled-components';
import FormTextField from 'base/components/FormTextField';
import { AccentButton, Block, OutlinedButton } from 'base/styled';

const Popup = styled(Block)`
  margin: 0 auto;
  button {
    height: 37px;
    margin-right: 5px;
  }
  @media (max-width: 480px) {
    width: 96%;
    .success {
      margin: 0 auto;
    }
  }
`;

const Textarea = styled.textarea`
  border: 1px solid;
  color: ${props => props.theme.colors.lightGrey};
  border-radius: 8px;
  height: 80px;
  width: 100%;
  margin: 20px 0;
`;

export default function FormEmail({handleFormEmailOff, code}) {
  const { t: homeT } = useTranslation('home');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(code);

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleMessage(e) {
    setMessage(e.target.value);
    console.log(message);
  }

  return (
    <Popup>
      <form>
        <FormTextField type="email" label="Email" value={email} onChange={handleEmail} placeholder='Email' />
        <Textarea value={code} onChange={handleMessage} />
        <div>
          <AccentButton>{homeT('send')}</AccentButton>
          <OutlinedButton onClick={handleFormEmailOff}>{homeT('cancel')}</OutlinedButton>
        </div>
      </form>
    </Popup>
  );
}

FormEmail.propTypes = {
  handleFormEmailOff: func,
  code: string
};
