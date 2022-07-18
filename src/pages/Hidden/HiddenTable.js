import { useState } from 'react';
import {
  Manage,
  ManageBox,
  TableFilters,
  TableTitle,
  TextBlackdark,
  Modal,
  Overflow, 
  Block,
  Confirm,
  TextBlack,
  FlexEnd,
  OutlinedButton,
  FilledButton
} from 'base/styled';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { array } from 'prop-types';
import { ReactComponent as Nav } from 'assets/images/navigation.svg';
import { ReactComponent as Edit } from 'assets/images/edit.svg';
import { ReactComponent as Delete } from 'assets/images/trash.svg';
import styled from 'styled-components';
import Success from 'base/components/Success';
import HiddenForm from './HiddenForm';
import { deleteHidingRuleById } from 'store/slices/hidingRules';

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

const TableRow = styled.tr`
  &:nth-child(even) {
  background-color: #F9F9F9;
  }
  height: 65px;
`;

const Form = styled(Block)`
  margin: 0 auto;
`;

export default function HiddenTable({list}) {
  const { t: homeT } = useTranslation('home');
  const { t: hideT } = useTranslation('hidden');
  const [success, setSuccess] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [show, setShow] = useState(false);
  const [edit] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

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

  function handleShowOff() {
    setShowModal(false);
    setShow(false);
    setSuccess(false);
    setConfirm(false);
  }

  const handleShowDelete = (idx) => () => {
    setShowModal((state) => ({
      ...state,
      [idx]: true
    }));
    setConfirm(true);
  };

  function handleDelete(id) {
    dispatch(deleteHidingRuleById(id)); 
    //dispatch(fetchAllHidingRules({ page, allhidingRules }));
  }

  return (
    <TableFilters>
      <tbody>
        <TableRow>
          <th>
            <TableTitle>{homeT('website')}</TableTitle>
          </th>
          <th>
            <TableTitle>{hideT('keyword')}</TableTitle>
          </th>
          <th>
            <TableTitle></TableTitle>
          </th>
        </TableRow>
        {list &&
          list.map((lead, idx) => (
            <TableRow key={idx}>
              <td>
                <TextBlackdark>{lead.ga_view?.website_name}</TextBlackdark>
                {lead.ga_view?.sunsetted && <Text>{homeT('sunsetted')}</Text>}
              </td>
              <td>
                <TextBlackdark>{lead.keyword}</TextBlackdark>
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
                          <HiddenForm
                            setShowOff={handleShowOff}
                            edit={edit}
                            name={lead.ga_view.website_name}
                            keyword={lead.keyword}
                            setSuccess={setSuccess}
                            lead={lead}
                          />
                        </Form>
                      </>
                    )}
                    {success && <Success />}
                    {confirm && (
                      <Confirm>
                        <TextBlack>{hideT('delete')}</TextBlack>
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
            </TableRow>
          ))}
      </tbody>
    </TableFilters>
  );
}

HiddenTable.propTypes = {
  list: array,
};
