import { TextField } from 'base/styled';
import { string, func, oneOf, any, oneOfType, bool } from 'prop-types';
import styled from 'styled-components';

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.accentRed};
`;

const TextFieldTime = styled(TextField)`
  width: 70px;
  margin-right: 3px;
`;

export default function FormTextFieldTime ({
  label,
  onChange,
  value = '',
  type = 'number',
  disabled = false,
  errorMsg
}) {
  const joinedError = errorMsg && errorMsg.join(' ');
  return (
    <>
      <TextFieldTime
        type={type}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      {label && <span>{label}</span>}
      {errorMsg && <ErrorMessage>{joinedError}</ErrorMessage>}
    </>
  );
}


FormTextFieldTime.propTypes = {
  label: string,
  onChange: func,
  value: oneOfType([string, any ]),
  type: oneOf(['text', 'email', 'tel', 'number']),
  disabled: bool,
  errorMsg: any,
};
