import { useState, useRef, useContext } from 'react';
import { useDispatch } from 'react-redux';
import {
  Manage,
  ManageBox,
  TableFilters,
  TableTitle,
  Modal,
  Overflow,
  TextBlackSmall,
  TextGreyBold,
  AccentButton,
  OutlinedButton,
  TextBlackdark,
  TextBlack,
  Confirm,
  FlexEnd,
  Block,
  FilledButton
} from 'base/styled';
import { useTranslation } from 'react-i18next';
import { array } from 'prop-types';
import { ReactComponent as Nav } from 'assets/images/navigation.svg';
import { ReactComponent as Edit } from 'assets/images/edit.svg';
import { ReactComponent as Delete } from 'assets/images/trash.svg';
import styled from 'styled-components';
import FormEmail from './FormEmail';
import Responsive from 'context/responsive';
import AddWebsite from 'base/components/Leads/Header/AddWebsite';
import { deleteWebsite, putWebsite } from 'store/slices/websites';

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  p {
    font-size: 0.75rem;
    margin: 0 0 10px;
  }
  .title {
    width: 100%;
    .name {
      width: 55%;
    }
  }
  .value {
    display: flex;
    width: 100%;
    justify-content: space-between;
    p {
      padding: 5px 0;
    }
  }
`;

const Popup = styled(Block)`
  margin: -2% auto 0;
  padding: 20px 0;
  @media (max-width: 480px) {
    width: 96%;
    .success {
      margin: 0 auto;
    }
  }
`;

const ManageBoxRight = styled(ManageBox)`
  right: 18px;
`;

const Detected = styled(TextGreyBold)`
  padding: 5px 10px!important;
  width: fit-content;
  border-radius: 11.5px;
  background: #E4FECF;
  font-size: 0.75rem;
  margin-left: 10px!important;
  height: 25px;
`;

const Notdetected = styled(TextGreyBold)`
  padding: 5px 10px!important;
  width: fit-content;
  border-radius: 11.5px;
  background: #fdeaea;
  font-size: 0.75rem;
  margin-left: 10px!important;
  height: 25px;
`;

const Table = styled(TableFilters)`
  box-shadow: none;
  th:first-of-type {
    width: 15%;
  }
  td {
    vertical-align: top;
  }
  td:first-of-type,
  td:nth-child(2) {
    padding-top: 30px;
  }
`;

const Textarea = styled.textarea`
  border: 1px solid#73CCFE;
  color: #85929b;
  border-radius: 8px;
  height: 80px;
  width: 64%;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Buttons = styled.div`
  padding-top: 15px;
  button {
    padding: 10px 16px;
    height: auto;
    margin-right: 20px;
  }
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    button {
      height: 45px;
      white-space: nowrap;
    }
  }
`;

const TableNew = styled(Table)`
  td {
    z-index: auto;
  }
`;

const BoxBordered = styled.div`
  border-radius: 10px;
  border: ${(props) => props.theme.borders.tableBorder};
  padding: 18px;
  width: 100%;
`;

export default function WebsitesTable({ list }) {
  const [show, setShow] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formEmail, setFormEmail] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [edit] = useState(true);
  const { t: homeT } = useTranslation('home');
  const { t: websiteT } = useTranslation('website');

  const textAreaRef = useRef(null);

  const dispatch = useDispatch();

  const handleFormEmail = (idx) => () => {
    setFormEmail((state) => ({
      ...state,
      [idx]: !formEmail[idx],
    }));
  };

  function handleFormEmailOff() {
    setFormEmail(false);
  }

  const handleShow = (idx) => () => {
    setShow((state) => ({
      ...state,
      [idx]: !show[idx],
    }));
  };

  function handleTextarea() {
    return;
  }

  const copyToClipboard = (idx, text) => () => {
    const ta = document.createElement('textarea');
    ta.innerText = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    setCopied((state) => ({
      ...state,
      [idx]: !copied[idx],
    }));
  };

  const handleShowModal = (idx) => () => {
    //dispatch(fetchHidingRuleById(129));
    setShowModal((state) => ({
      ...state,
      [idx]: true
    }));
  };

  function handleShowOff() {
    setShowModal(false);
    setShow(false);
    setConfirm(false);
  }

  const handleShowDelete = (idx) => () => {
    setShowModal((state) => ({
      ...state,
      [idx]: true
    }));
    setConfirm(true);
  };

  const handleUpdate = (id, name) => () => {
    const data = {
      name: name
    };
    dispatch(putWebsite({id: id, body:data}));
    setShowModal(false);
    setShow(false);
    setConfirm(false);
  };

  function handleDelete(id) {
    dispatch(deleteWebsite(id)); 
  }

  const ctx = useContext(Responsive);

  return (
    <>
      {ctx.isMobile ? (
        <>
          {list &&
            list.map((lead, idx) => (
              <BoxBordered key={idx}>
                <Row>
                  <div className="title">
                    <TextBlack>{homeT('name')}</TextBlack>
                    <div className="value">
                      <TextBlackdark className="name">
                        {lead.name}
                      </TextBlackdark>
                      {lead.script_detected ? (
                        <Detected>{websiteT('detected')}</Detected>
                      ) : (
                        <Notdetected>{websiteT('notDetected')}</Notdetected>
                      )}
                    </div>
                  </div>
                  <Manage onClick={handleShow(idx)}>
                    <Nav />
                    {show[idx] && (
                      <ManageBoxRight>
                        <a>
                          <Edit />
                          <span>{homeT('edit')}</span>
                        </a>
                        <a>
                          <Delete />
                          <span>{homeT('delete')}</span>
                        </a>
                      </ManageBoxRight>
                    )}
                  </Manage>
                </Row>
                <Row>
                  <div className="title">
                    <TextBlack>{homeT('tracking')}</TextBlack>
                    <form>
                      <Textarea
                        ref={textAreaRef}
                        value={lead.tracking_script}
                        onChange={handleTextarea}
                      />
                    </form>
                    <Buttons>
                      <AccentButton
                        onClick={copyToClipboard(idx, lead.tracking_script)}
                        disabled={copied[idx]}
                      >
                        {!copied[idx] ? 'Copy script' : 'Copied!'}
                      </AccentButton>
                      <OutlinedButton onClick={handleFormEmail(idx)}>
                        {homeT('sendEmail')}
                      </OutlinedButton>
                      {formEmail[idx] && (
                        <Modal>
                          <Overflow onClick={handleFormEmailOff}></Overflow>
                          <FormEmail
                            handleFormEmailOff={handleFormEmailOff}
                            code={lead.tracking_script}
                          />
                        </Modal>
                      )}
                    </Buttons>
                  </div>
                </Row>
              </BoxBordered>
            ))}
        </>
      ) : (
        <TableNew>
          <tbody>
            <tr>
              <th>
                <TableTitle>{homeT('name')}</TableTitle>
              </th>
              <th>
                <TableTitle>{homeT('status')}</TableTitle>
              </th>
              <th>
                <TableTitle>{homeT('tracking')}</TableTitle>
              </th>
              <th>
                <TableTitle>{homeT('manage')}</TableTitle>
              </th>
            </tr>

            {list &&
              list.map((lead, idx) => (
                <tr key={lead.name}>
                  <td>
                    <TextBlackSmall> {lead.name}</TextBlackSmall>
                  </td>
                  <td>
                    {lead.script_detected ? (
                      <Detected>{websiteT('detected')}</Detected>
                    ) : (
                      <Notdetected>{websiteT('notDetected')}</Notdetected>
                    )}
                  </td>
                  <td>
                    <form>
                      <Textarea
                        ref={textAreaRef}
                        value={lead.tracking_script}
                        onChange={handleTextarea}
                      />
                    </form>
                    <Buttons>
                      <AccentButton
                        onClick={copyToClipboard(idx, lead.tracking_script)}
                        disabled={copied[idx]}
                      >
                        {!copied[idx] ? 'Copy script' : 'Copied!'}
                      </AccentButton>
                      <OutlinedButton onClick={handleFormEmail(idx)}>
                        {homeT('sendEmail')}
                      </OutlinedButton>
                      {formEmail[idx] && (
                        <Modal>
                          <Overflow onClick={handleFormEmailOff}></Overflow>
                          <FormEmail
                            handleFormEmailOff={handleFormEmailOff}
                            code={lead.tracking_script}
                          />
                        </Modal>
                      )}
                    </Buttons>
                  </td>
                  <td>
                    <Manage onClick={handleShow(idx)}>
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
                    </Manage>
                  </td>
                  {showModal[idx] && (
                    <>
                      <Modal>
                        <Overflow onClick={handleShowOff}></Overflow>
                        {!confirm && (
                          <Popup>
                            <AddWebsite
                              item={lead}
                              handleOpenAddOff={handleShowOff}
                              edit={edit}
                              handleUpdate={handleUpdate}
                            />
                          </Popup>
                        )}
                        {confirm && (
                          <Confirm>
                            <TextBlack>{websiteT('delete')}</TextBlack>
                            <FlexEnd>
                              <OutlinedButton onClick={handleShowOff}>
                                {homeT('cancel')}
                              </OutlinedButton>
                              <FilledButton
                              /* eslint-disable */
                                onClick={() => handleDelete(lead.id)}
                              /* eslint-enable */
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
      )}
    </>
  );
}

WebsitesTable.propTypes = {
  list: array,
};
