import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { func, any, node, bool } from 'prop-types';
import styled from 'styled-components';
import FormTextField from 'base/components/FormTextField';
import { ReactComponent as Close } from 'assets/images/close.svg';
import {
  AccentButton,
  FlexWrapper,
  OutlinedButton,
  RadioListCircle,
  StyledSelect,
  TextAccentExtraSmall,
  TextLabel,
  TitleTwo,
} from 'base/styled';
import { makeAsOptions } from 'base/utils';
import { postUser, putUser} from 'store/slices/users';

const Popup = styled.div`
  margin: 0 auto;
  padding: 0 20px;
  max-width: 530px;
  button {
    height: 37px;
    margin-right: 10px;
  }
  .css-16pkpmb-SelectContainer {
    position: relative;
  }
`;

const CloseBtn = styled.div`
  margin: auto 0;
`;

const TextRadio = styled.div`
  padding-left: 5px;
  p {
    font-size: 12px;
    font-weight: 400;
    letter-spacing: 0rem;
    color: ${(props) => props.theme.colors.black};
    line-height: 0;
    white-space: nowrap;
    width: 100px;
    @media (max-width: 768px) {
      line-height: 1.5;
    }
  }
`;

export default function FormUser({
  handleShowOff,
  options,
  styles,
  edit,
  user
}) {
  const { t: homeT } = useTranslation('home');
  const { t: usersT } = useTranslation('users');
  const [name, setName] = useState(edit ? user.first_name : '');
  const [lastName, setLastName] = useState(edit ? user.last_name : '');
  const [email, setEmail] = useState(edit ? user.email : '');
  const [radio, setRadio] = useState(edit ? user.role : 'user');
  const [website, setWebsite] = useState();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleChange({ target }) {
    setRadio(target.value);
    console.log(radio);
  }

  function handleWebsites(e) {
    setWebsite(Array.isArray(e) ? e.map((x) => x.value) : []);
  }

  function newUserSubmit(e) {
    e.preventDefault();

    if (name.length === 0) {
      setError('you have to enter name');
      return;
    }

    if (lastName.length === 0) {
      setError('you have to enter last name');
      return;
    }

    if (email.length === 0) {
      setError('you have to enter email');
      return;
    }

    if (!website) {
      setError('you have to choose at least one website');
      return;
    }
    console.log(website);

    if(!edit) {
      const newUserData = {
        first_name: name,
        last_name: lastName,
        email: email,
        role: radio,
        delegated_website_ids: website
      };
      console.log(newUserData);
      dispatch(postUser(newUserData));
    }

    if(edit){
      const formData = {
        first_name: name,
        last_name: lastName,
        email: email,
        role: radio,
        delegated_website_ids: website
      };
      console.log(formData);
      dispatch(putUser({id: user.id, body:formData}));
      //setSuccess(true);
    }

    setName('');
    setLastName('');
    setEmail('');
    handleShowOff();
  }

  return (
    <Popup>
      <FlexWrapper>
        <TitleTwo>{usersT('invite')}</TitleTwo>
        <CloseBtn onClick={handleShowOff}>
          <Close />
        </CloseBtn>
      </FlexWrapper>

      <form onSubmit={newUserSubmit}>
        <FormTextField
          type="text"
          label="First name"
          value={name}
          onChange={handleName}
        />
        <FormTextField
          type="text"
          label="Last name"
          value={lastName}
          onChange={handleLastName}
        />
        <FormTextField
          type="email"
          label="Email"
          value={email}
          onChange={handleEmail}
        />
        <TextLabel>{usersT('websitesAccess')}</TextLabel>
        <StyledSelect
          //value={selectedId}
          options={edit ? makeAsOptions(
            user.websites_list,
            'id',
            'website_name'
          ) : options}
          onChange={handleWebsites}
          styles={styles}
          isMulti
        />
        <RadioListCircle>
          <TextLabel>
            <input
              type="radio"
              value="admin"
              name="admin"
              checked={radio === 'admin'}
              onChange={handleChange}
            />
            <TextRadio>
              <p>{usersT('admin')}</p>
            </TextRadio>
            {usersT('adminPart')}
          </TextLabel>
          <TextLabel>
            <input
              type="radio"
              value="manager"
              name="manager"
              checked={radio === 'manager'}
              onChange={handleChange}
            />
            <TextRadio>
              <p> {usersT('advanced')}</p>
            </TextRadio>
            {usersT('advancedPart')}
          </TextLabel>
          <TextLabel>
            <input
              type="radio"
              value="user"
              name="user"
              checked={radio === 'user'}
              onChange={handleChange}
            />
            <TextRadio>
              {' '}
              <p>{usersT('regular')}</p>
            </TextRadio>
            {usersT('regularPart')}
          </TextLabel>
        </RadioListCircle>
        <TextAccentExtraSmall> {error}</TextAccentExtraSmall>
        <div>
          <OutlinedButton onClick={handleShowOff}>
            {homeT('cancel')}
          </OutlinedButton>
          <AccentButton type="submit">{homeT('Save')}</AccentButton>
        </div>
      </form>
    </Popup>
  );
}

FormUser.propTypes = {
  handleShowOff: func,
  options: any,
  handleSelectChange: func,
  styles: any,
  setForm: func,
  setSuccess: func,
  setUsersList: func,
  edit: bool,
  user: node
};
