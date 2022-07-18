import FormTextField from 'base/components/FormTextField';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { func } from 'prop-types';
import { FilledButton, TextAccentThin } from 'base/styled';
import styled from 'styled-components';

const FormFooter = styled.div`
  padding: 20px 20px 0;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #C6D5DD;
`;

const Form = styled.form`
  padding: 0!important;
`;

const FormField = styled.div`
  width: 100%;
  padding: 10px 20px;
  @media (max-width: 768px) {
    padding: 2px;
  }
`;

export default function PasswordForm({setSuccess}) {
  const { t: profileT } = useTranslation('profileForm');
  const { t: generalT } = useTranslation();
  const password = '888';
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState();
  const [error, setError] = useState();

  function setCurrentPasswordHandler(event) {
    setCurrentPassword(event.target.value);
  }
  function setNewPasswordHandler(event) {
    setNewPassword(event.target.value);
  }

  function setConfirmHandler(event) {
    setConfirm(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    switch(true) {
    case currentPassword.length <= 0 : setError('Please enter current password');
      break;
    case newPassword.length <= 0 : setError('Please enter new password');
      break;
    case newPassword !== confirm  : setError('Password is not the same');
      break;
    case currentPassword !== password  : setError(' Current password is  not correct');
      break;
    }
    
    if(validateForm()) {
      console.log(confirm);
      setError();
      setSuccess(true);
      setConfirm();
      setNewPassword();
      setCurrentPassword();
    } else {
      console.log('error');
    }
  }

  function validateForm() {

    return (
      currentPassword.length > 0 &&
      newPassword.length > 0 &&
      currentPassword === password &&
      newPassword === confirm 
    );
  }

  return (
    <Form onSubmit={submitHandler}>
      <FormField>
        <FormTextField
          value={currentPassword}
          label={profileT('currentPassword')}
          onChange={setCurrentPasswordHandler}
          type='password'
        />
      </FormField>
      <FormField>
        <FormTextField
          value={newPassword}
          label={profileT('newPassword')}
          onChange={setNewPasswordHandler}
          type='password'
        />
      </FormField>
      <FormField>
        <FormTextField
          value={confirm}
          label={profileT('confirmPassword')}
          onChange={setConfirmHandler}
          type='password'
        />
      </FormField>
      <TextAccentThin>{error}</TextAccentThin> <FormField>
        <FilledButton   type={'submit'}>{generalT('saveChanges')}</FilledButton>
      </FormField>

    </Form>
  );
}

PasswordForm.propTypes = {
  setSuccess: func
};
