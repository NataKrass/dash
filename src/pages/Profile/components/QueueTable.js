import FormTextField from 'base/components/FormTextField';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { func } from 'prop-types';
import { FilledButton, OutlinedButton, TextAccentThin } from 'base/styled';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const FormFooter = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled(OutlinedButton)`
  margin-right: 10px;
`;

const FormField = styled.div`
  width: 100%;
  padding: 10px;
`;

export default function PasswordForm({setSuccess}) {
  const history = useHistory();
  const { t: profileT } = useTranslation('profileForm');
  const { t: generalT } = useTranslation();
  const password = '888';
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState();
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

  function cancelHandler(event) {
    event.preventDefault();
    history.goBack();
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
    <form onSubmit={submitHandler}>
      <FormField>
        <FormTextField
          value={currentPassword}
          label={profileT('currentPassword')}
          onChange={setCurrentPasswordHandler}
        />
      </FormField>
      <FormField>
        <FormTextField
          value={newPassword}
          label={profileT('newPassword')}
          onChange={setNewPasswordHandler}
        />
      </FormField>

      <FormField>
        <FormTextField
          value={confirm}
          label={profileT('confirmPassword')}
          onChange={setConfirmHandler}
        />
      </FormField>
      <TextAccentThin>{error}</TextAccentThin> 
      <FormFooter>
        <CancelButton onClick={cancelHandler}>
          {generalT('cancel')}
        </CancelButton>
        <FilledButton   type={'submit'}>{generalT('save')}</FilledButton>
      </FormFooter>
    </form>
  );
}

PasswordForm.propTypes = {
  setSuccess: func
};
