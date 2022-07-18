import React, { useState, useContext } from 'react';
import { deleteAssignRuleById } from 'store/slices/assignRules';
import { useDispatch } from 'react-redux';
import {
  Block,
  Manage,
  ManageBox,
  TableFilters,
  TableTitle,
  TextBlack,
  TextBlackdark,
  Modal,
  Confirm,
  Overflow,
  OutlinedButton,
  FilledButton,
  FlexEnd
} from 'base/styled';
import { useTranslation } from 'react-i18next';
import { array } from 'prop-types';
import { ReactComponent as Nav } from 'assets/images/navigation.svg';
import { ReactComponent as Edit } from 'assets/images/edit.svg';
import { ReactComponent as Delete } from 'assets/images/trash.svg';
import styled from 'styled-components';
import Responsive from 'context/responsive';
import { Search } from 'base/components/Leads';
import Success from 'base/components/Success';
import AutoAssignForm from './AutoAssignForm';

const ManageBoxRight = styled(ManageBox)`
  right: 18px;
`;

const Text = styled.span`
  display: block;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0rem;
  text-align: left;
  color: ${(props) => props.theme.colors.white};
  background: rgba(50, 49, 49, 0.7);
  border-radius: 11.5px;
  padding: 3px 8px;
  margin-top: 5px !important;
  width: fit-content;
`;

const Box = styled(Block)`
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const BoxBordered = styled.div`
  border-radius: 10px;
  border: ${(props) => props.theme.borders.tableBorder};
  padding: 18px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  p {
    font-size: 0.75rem;
  }
  .title {
    p {
      width: 120px;
    }
  }
  .value {
    width: 100%;
  }
`;

const Tr = styled.tr`
  height: 70px;
`;

const Form = styled(Block)`
  margin: 0 auto;
  @media (max-width: 768px) {
    width: 95vw;
  }
`;

export default function AutoAssignTable({ list, users }) {
  const { t: homeT } = useTranslation('home');
  const { t: ruleT } = useTranslation('autoassign');
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [edit] = useState(true);

  const dispatch = useDispatch();

  function handleDelete(id) {
    dispatch(deleteAssignRuleById(id)); 
  }

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
      [idx]: true
    }));
  };

  const handleShowDelete = (idx) => () => {
    setShowModal((state) => ({
      ...state,
      [idx]: true
    }));
    setConfirm(true);
  };

  function handleShowOff() {
    setShowModal(false);
    setShow(false);
    setSuccess(false);
    setConfirm(false);
  }

  const ctx = useContext(Responsive);

  return (
    <>
      {ctx.isMobile ? (
        <>
          <Search />
          <Box>
            {list &&
              list.map((lead, idx) => (
                <BoxBordered key={idx}>
                  <Row>
                    <div className="title">
                      <TextBlack>{homeT('name')}</TextBlack>
                    </div>
                    <div className="value">
                      <TextBlackdark>{lead.name}</TextBlackdark>
                    </div>

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
                  </Row>
                  <Row>
                    <div className="title">
                      <TextBlack>{homeT('appliedTo')}</TextBlack>
                    </div>
                    <div className="value">
                      <TextBlackdark>
                        {' '}
                        {lead.ga_view.website_name}
                      </TextBlackdark>
                    </div>
                  </Row>
                  <Row>
                    <div className="title">
                      <TextBlack>{homeT('filters')}</TextBlack>
                    </div>
                    <div className="value">
                      <TextBlackdark>
                        {lead.lead_filters_attributes.map((filter, idx) => (
                          <React.Fragment key={idx}>
                            <TextBlackdark>
                              {filter.key === 'company_name'
                                ? 'Company name'
                                : filter.key}{' '}
                              {filter.operator === '='
                                ? 'equals'
                                : filter.operator}
                            </TextBlackdark>
                            <TextBlack> {filter.value} </TextBlack>
                          </React.Fragment>
                        ))}
                      </TextBlackdark>
                    </div>
                  </Row>
                  <Row>
                    <div className="title">
                      <TextBlack>{homeT('assignTo')}</TextBlack>
                    </div>
                    <div className="value">
                      <TextBlackdark>
                        {' '}
                        {lead.user.first_name} {lead.user.last_name}{' '}
                      </TextBlackdark>
                    </div>
                  </Row>
                  {showModal[idx] && (
                    <>
                      <Modal>
                        <Overflow onClick={handleShowOff}></Overflow>
                        {!success && !confirm && (
                          <>
                            <Form>
                              <AutoAssignForm
                                name={lead.name}
                                website={lead.ga_view.website_name}
                                user={lead.user.full_name}
                                edit={edit}
                                setShowOff={handleShowOff}
                                setSuccess={setSuccess}
                                users={users}
                                filters={lead.lead_filters_attributes}
                                id={lead.id}
                                lead={lead}
                              />
                            </Form>
                          </>
                        )}
                        {success && <Success />}
                        {confirm && (
                          <Confirm>
                            <TextBlack>{ruleT('delete')}</TextBlack>
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
                </BoxBordered>
              ))}
          </Box>
        </>
      ) : (
        <TableFilters>
          <tbody>
            <tr>
              <th>
                <TableTitle>{homeT('name')}</TableTitle>
              </th>
              <th>
                <TableTitle>{homeT('appliedTo')}</TableTitle>
              </th>
              <th>
                <TableTitle>{homeT('filters')}</TableTitle>
              </th>
              <th>
                <TableTitle>{homeT('assignTo')}</TableTitle>
              </th>
              <th>
                <TableTitle></TableTitle>
              </th>
            </tr>

            {list &&
              list.map((lead, idx) => (
                <Tr key={idx}>
                  <td>
                    <TextBlackdark> {lead.name}</TextBlackdark>
                  </td>
                  <td>
                    <TextBlackdark>
                      {lead.ga_view.website_name}
                      {lead.ga_view.sunsetted && (
                        <Text>{homeT('sunsetted')}</Text>
                      )}
                    </TextBlackdark>
                  </td>
                  <td>
                    {lead.lead_filters_attributes.map((filter, idx) => (
                      <React.Fragment key={idx}>
                        <TextBlackdark>
                          {filter.key === 'company_name'
                            ? 'Company name'
                            : filter.key}{' '}
                          {filter.operator === '=' ? 'equals' : filter.operator}
                        </TextBlackdark>
                        <TextBlack> {filter.value} </TextBlack>
                      </React.Fragment>
                    ))}
                  </td>
                  <td>
                    <TextBlackdark>
                      {' '}
                      {lead.user.first_name} {lead.user.last_name}{' '}
                    </TextBlackdark>
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
                        {!success && !confirm && (
                          <>
                            <Form>
                              <AutoAssignForm
                                name={lead.name}
                                website={lead.ga_view.website_name}
                                user={lead.user.full_name}
                                edit={edit}
                                setShowOff={handleShowOff}
                                setSuccess={setSuccess}
                                users={users}
                                filters={lead.lead_filters_attributes}
                                id={lead.id}
                                lead={lead}
                              />
                            </Form>
                          </>
                        )}
                        {success && <Success />}
                        {confirm && (
                          <Confirm>
                            <TextBlack>{ruleT('delete')}</TextBlack>
                            <FlexEnd>
                              <OutlinedButton onClick={handleShowOff}>
                                {homeT('cancel')}
                              </OutlinedButton>
                              <FilledButton
                                /* eslint-disable */
                                onClick={() => handleDelete(lead.id)}
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
                </Tr>
              ))}
          </tbody>
        </TableFilters>
      )}
    </>
  );
}

AutoAssignTable.propTypes = {
  list: array,
  users: array
};
