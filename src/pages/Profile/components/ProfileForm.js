import FormTextField from 'base/components/FormTextField';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { any, func, object, shape, string } from 'prop-types';
import { FilledButton, FlexWrapper, TextAccentThin, TextBlack } from 'base/styled';
import styled from 'styled-components';

const FormFooter = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-start;
`;

const FormField = styled.div`
  width: 50%;
  padding: 10px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 2px;
  }
  &.fluid {
    width: 100%;
  }
`;

const FlexWrap = styled(FlexWrapper)`
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Form = styled.form`
  border-bottom: 1px solid#C6D5DD;
`;

export default function ProfileForm({ onSubmit, user, errors }) {
  const { t: profileT } = useTranslation('profileForm');
  const { t: generalT } = useTranslation();
  const [first_name, setFirstName] = useState(user?.first_name);
  const [last_name, setLastName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email || ' ');
  const [passwordCurrent, setPasswordCurrent] = useState('');
  const [error, setError] = useState();
  const password = '888';

  function setFirstNameHandler(event) {
    setFirstName(event.target.value);
  }
  function setLastNameHandler(event) {
    setLastName(event.target.value);
  }
  function setPasswordHandler(event) {
    setPasswordCurrent(event.target.value);
  }

  function setEmailHandler(event) {
    setEmail(event.target.value);
  }

  function submitHandler(event) {
    event.preventDefault();
    onSubmit(event, {
      first_name,
      last_name
    });
  }

  function submitEmailHandler(event) {
    event.preventDefault();
    if (validateForm()) {
      onSubmit(event, {
        email,
        passwordCurrent,
      });
    } else {
      setError('Enter current password');
    }
  }

  
  function validateForm() {
    return (
      passwordCurrent === password 
    );
  }

  return (
    <div>
      <Form onSubmit={submitHandler}>
        <FlexWrap>
          <FormField>
            <FormTextField
              value={first_name}
              label={profileT('firstName')}
              errorMsg={errors?.first_name}
              onChange={setFirstNameHandler}
            />
          </FormField>
          <FormField>
            <FormTextField
              value={last_name}
              label={profileT('lastName')}
              errorMsg={errors?.last_name}
              onChange={setLastNameHandler}
            />
          </FormField>
        </FlexWrap>
        <FormFooter>
          <FilledButton type={'submit'}>{generalT('save')}</FilledButton>
        </FormFooter>
      </Form>
      <form onSubmit={submitEmailHandler}>
        <TextBlack>{profileT('changeEmail')}</TextBlack>
        <FlexWrap>
          <FormField>
            <FormTextField
              value={email}
              label={profileT('email')}
              errorMsg={errors?.email}
              onChange={setEmailHandler}
              type={'email'}
            />
          </FormField>
          <FormField>
            <FormTextField
              value={passwordCurrent}
              label={profileT('password')}
              errorMsg={errors?.last_name}
              onChange={setPasswordHandler}
              type='password'
            />
          </FormField>
        </FlexWrap>
        <TextAccentThin>{error}</TextAccentThin> 
        <FormFooter>
          <FilledButton type={'submit'}>{generalT('save')}</FilledButton>
        </FormFooter>
      </form>
    </div>
  );
}

ProfileForm.propTypes = {
  onSubmit: func,
  user: shape({
    first_name: string,
    last_name: string,
    email: any,
    phone: any,
  }),
  errors: object,
};
