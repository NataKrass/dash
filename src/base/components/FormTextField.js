import { TextField, TextLabel } from 'base/styled';
import { string, func, oneOf, any, oneOfType, bool } from 'prop-types';
import styled from 'styled-components';

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.accentRed};
`;

export default function FormTextField ({
  label,
  onChange,
  value = '',
  type = 'text',
  disabled = false,
  className,
  placeholder,
  errorMsg
}) {
  const joinedError = errorMsg && errorMsg.join(' ');
  return (
    <>
      {label && <TextLabel>{label}</TextLabel>}
      <TextField
        type={type}
        onChange={onChange}
        value={value}
        disabled={disabled}
        className={className}
        placeholder={placeholder}
      />
      {errorMsg && <ErrorMessage>{joinedError}</ErrorMessage>}
    </>
  );
}


FormTextField.propTypes = {
  label: string,
  onChange: func,
  value: oneOfType([string, any ]),
  type: oneOf(['text', 'email', 'tel', 'number']),
  disabled: bool,
  errorMsg: any,
  className: string,
  placeholder: string
};
