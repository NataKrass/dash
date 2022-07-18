import { useState, useContext } from 'react';
import {
  Manage,
  ManageBox,
  Table,
  TableTitle,
  Text,
  StyledSelect,
  TextBlack,
  TextGreyBold,
  Modal,
  Confirm,
  Overflow,
  OutlinedButton,
  FilledButton,
  FlexEnd, 
  Block
} from 'base/styled';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { deleteUser } from 'store/slices/users';
import styled from 'styled-components';
import { makeAsOptions } from 'base/utils';
import { func, array, any } from 'prop-types';
import { ReactComponent as Edit } from 'assets/images/edit.svg';
import { ReactComponent as Delete } from 'assets/images/trash.svg';
import { ReactComponent as User } from 'assets/images/user.svg';
import { ReactComponent as Nav } from 'assets/images/navigation.svg';
import Success from 'base/components/Success';
import Responsive from 'context/responsive';
import FormUser from './FormUser';

const ManageRight = styled(Manage)`
  right: 15px;
  cursor: pointer;
  @media (max-width: 768px) {
    right: 0;
  }
`;

const TableNew = styled(Table)`
  box-shadow: none;
  th:nth-child(2) {
      padding-left: 20px;
  }
  th:first-of-type {
    width: 5px;
  }
  td {
      z-index: auto;
  }
  td:last-of-type {
    position: static;
  }
  @media (max-width: 768px) {
    th:first-of-type {
      padding-left: 12px;
    }
    p {
      margin: 0 0 10px;
    }
    .dhZMDH {
      min-width: 120px;
      width: 90%;
  }
`;

const ManageBoxRight = styled(ManageBox)`
  right: 15px;
  padding: 0;
  a {
    padding: 8px 19px;
    &:hover {
      border-radius: 0;
    }
    span {
      font-size: 14px;
      font-weight: 400;
    }
  }
`;

const UserCell = styled.td`
  padding: 10px;
  p {
    font-weight: 500;
    margin-left: 10px;
  }
  svg {
    float: left;
    margin: 5px 10px;
  }
`;

const Detected = styled(TextGreyBold)`
  padding: 5px 10px;
  width: fit-content;
  border-radius: 11.5px;
  background: #afffa2;
  font-size: 0.75rem;
`;

const Notdetected = styled(TextGreyBold)`
  padding: 5px 10px;
  width: fit-content;
  border-radius: 11.5px;
  background: #fdeaea;
  font-size: 0.75rem;
`;

const Select = styled(StyledSelect)`
  min-width: auto;
  .css-b8ldur-Input,
  .css-1uccc91-singleValue {
    input {
      font-size: 14px;
      font-weight: 400;
      color: #626262;
      font-family: 'Montserrat';
    }
  }
  @media (max-width: 768px) {
    width: 240px !important;
    .blRjmP .dhZMDH {
      width: 150px !important;
    }
  }
`;

const Td = styled.td`
  width: 30%;
  @media (max-width: 968px) {
    width: auto;
    .css-16pkpmb-SelectContainer {
      width: 150px;
    }
  }
`;

const Popup = styled(Block)`
  margin: -2% auto 0;
  padding: 20px 0;
  @media (max-width: 768px) {
    p {
      margin: 2px 0;
    }
  }
`;

export default function TableUsers({
  usersList,
  customStyles,
  handleFetchAll
}) {
  const { t: homeT } = useTranslation('home');
  const { t: usersT } = useTranslation('users');
  const [filter, setFilterUser] = useState('');
  const [show, setShow] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [usersWithCheck, setUsersWithCheck] = useState([]);
  const [success, setSuccess] = useState(false);
  const [edit] = useState(true);
  const dispatch = useDispatch();

  // function handleCheckedAll(e) {
  //   let checked = e.target.checked;
  //   setUsersWithCheck(
  //     usersList.map(function (d) {
  //       d.select = checked;
  //       return d;
  //     })
  //   );
  // }

  const handleShow = (idx) => () => {
    setShow((state) => ({
      ...state,
      [idx]: !show[idx],
    }));
  };

  const handleShowModal = (idx) => () => {
    //dispatch(fetchHidingRuleById(129));
    setShowModal((state) => ({
      ...state,
      [idx]: true,
    }));
  };

  const handleShowDelete = (idx) => () => {
    setShowModal((state) => ({
      ...state,
      [idx]: true,
    }));
    setConfirm(true);
  };

  function handleShowOff() {
    setShowModal(false);
    setShow(false);
    setSuccess(false);
    setConfirm(false);
  }

  function handleDelete(id) {
    dispatch(deleteUser(id));
  }

  function filterUserHandler(e) {
    setFilterUser(Array.isArray(e) ? e.map((x) => x.value) : []);
    console.log(filter);
  }
  //const options = makeAsOptions(user.websites_list, 'id', 'website_name');

  const ctx = useContext(Responsive);

  return (
    <TableNew>
      <tbody>
        <tr>
          <th>
            {/* <Check></Check>
            <span></span> */}
          </th>
          <th>
            <TableTitle>{usersT('user')}</TableTitle>
          </th>
          {!ctx.isMobile && (
            <>
              <th>
                <TableTitle>{usersT('status')}</TableTitle>
              </th>
              <th>
                <TableTitle>{usersT('access')}</TableTitle>
              </th>

              <th>
                <TableTitle>{usersT('availableWebsites')}</TableTitle>
              </th>
            </>
          )}
        </tr>

        {usersList &&
          usersList.map((user, idx) => (
            <tr key={user.id}>
              <td>
                
                {/* <Check
                  onChange={function handleChecked(event) {
                    let checked = event.target.checked;
                    console.log(checked)
                    let arr = usersList.map((item) => {
                      if (user.id === item.id) {
                        //Object.assign(item, {key3: "value3"});
                        var pair = {key3: "value3"};
                        //item.select = checked;
                        console.log(...item, ...pair);
                      }
                      return item;
                    }
                    )
                    console.log(arr)
                    setUsersWithCheck();
                    console.log(usersWithCheck);
                  }}
                  type="checkbox"
                  checked={user.select}
                /> */}
           
                <span></span>
              </td>
              <UserCell>
                {!ctx.isMobile && <User />}
                <TextBlack> {user.full_name || user.first_name + ' ' + user.last_name}</TextBlack>
                {ctx.isMobile && (
                  <>
                    <Text> {user.pretty_role}</Text>
                    {!user.status ? (
                      <Detected>{usersT('active')}</Detected>
                    ) : (
                      <Notdetected>{usersT('notActive')}</Notdetected>
                    )}
                    <Select
                      options={makeAsOptions(user.websites_list, 'id', 'name')}
                      onChange={filterUserHandler}
                      // styles={customStyles}
                      menuPlacement="bottom"
                      defaultInputValue={user.websites_list[0].name}
                    />
                  </>
                )}
              </UserCell>
              {!ctx.isMobile && (
                <>
                  <td>
                    {!user.status ? (
                      <Detected>{usersT('active')}</Detected>
                    ) : (
                      <Notdetected>{usersT('notActive')}</Notdetected>
                    )}
                    <TextBlack> {}</TextBlack>
                  </td>
                  <td>
                    <Text> {user.pretty_role || user.role}</Text>
                  </td>
                </>
              )}
              {!ctx.isMobile && user.websites_list && (
                <Td>
                  <Select
                    options={makeAsOptions(
                      user.websites_list,
                      'id',
                      'website_name'
                    )}
                    onChange={filterUserHandler}
                    styles={customStyles}
                    menuPlacement="bottom"
                    defaultInputValue={user.websites_list[0].name}
                  />
                </Td>
              )}
              <td>
                <ManageRight onClick={handleShow(idx)}>
                  <Nav />
                  {show[idx] && (
                    <ManageBoxRight>
                      <a onClick={handleShowModal(idx)}>
                        <Edit />
                        <span>{homeT('edit')}</span>
                      </a>
                      <a onClick={handleShowDelete(idx)}>
                        <Delete />
                        <span>{homeT('delete')}</span>
                      </a>
                    </ManageBoxRight>
                  )}
                </ManageRight>
              </td>
              {showModal[idx] && (
                <>
                  <Modal>
                    <Overflow onClick={handleShowOff}></Overflow>
                    {!success && !confirm && (
                      <Popup>
                        <FormUser
                          handleFetchAll={handleFetchAll}
                          edit={edit}
                          user={user}
                          handleShowOff={handleShowOff}
                          setUsersWithCheck
                        />
                      </Popup>
                    )}
                    {success && <Success />}
                    {confirm && (
                      <Confirm>
                        <TextBlack>{usersT('delete')}</TextBlack>
                        <FlexEnd>
                          <OutlinedButton onClick={handleShowOff}>
                            {homeT('cancel')}
                          </OutlinedButton>
                          <FilledButton
                          /* eslint-disable */
                          onClick={() => handleDelete(user.id)}
                          /* eslint-disable */
                          >
                            {homeT('delete')}
                          </FilledButton>
                        </FlexEnd>
                      </Confirm>
                    )}
                  </Modal>
                </>
              )}
            </tr>
          ))}
      </tbody>
    </TableNew>
  );
}

TableUsers.propTypes = {
  usersList: array,
  usersWithCheck: array,
  customStyles: any,
  handleFetchAll: func
};
