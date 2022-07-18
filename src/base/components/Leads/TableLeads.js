import { useState, useContext } from 'react';
import {
  LeadAvaWrapper,
  ImageFluid,
  LeadTitle,
  Table,
  TableTitle,
  Text,
  TextLight,
  TextBlack,
  Check,
  Modal,
  Overlay,
  Block,
} from 'base/styled';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { func, array, bool, number } from 'prop-types';
import { ReactComponent as Batch } from 'assets/images/batch.svg';
import { ReactComponent as Active } from 'assets/images/batch_active.svg';
import { ReactComponent as HideIcon } from 'assets/images/hide.svg';
import { ReactComponent as Nav } from 'assets/images/navigation.svg';
import BatchBox from './BatchBox';
import Export from './Manage/Export';
import Done from './Manage/Done';
import Assign from './Manage/Assign';
// import Move from './Manage/Move';
import Archive from './Manage/Archive';
import Hide from './Manage/Hide';
import Tags from './Manage/Tags';
import Responsive from 'context/responsive';

const TextLocation = styled(Text)`
  height: 21px;
`;

const BatchWrapper = styled.div`
position: relative;
  a {
    margin-left: 10px;
    cursor: pointer;
  }
  .active {
    a {
      margin-left: 0;
    }
    z-index: 30;
  }
  .disabled {
    a {
      cursor: not-allowed;
      &:hover {
        background: transparent;
        border-radius: 9px;
      }
      span {
        color: ${(props) => props.theme.colors.lightGrey};
      }
    }
`;

const ManageRight = styled.p`
  text-align: center;
  cursor: pointer;
`;

const ManageBox = styled.div`
  position: absolute;
  top: 23px;
  left: 40px;
  .hYkmDi {
    left: -152px;
    width: 110px;
  }
  .iyCZfd {
    z-index: 34;
    right: 59px;
    top: 43px;
  }
  @media (max-width: 768px) {
    right: 25px;
    top: 15px;
    .iyCZfd {
      right: 30px;
      top: 18px;
    }
  }
  &.tabled {
    .active {
      right: 33px;
    }
  }
`;

const Popup = styled(Block)`
  margin: -2% auto 0;
  z-index: 35;
`;

const ModalOver = styled(Modal)`
  z-index: 35;
`;

const TableMain = styled(Table)`
  td:nth-child(3) {
    width: 50%;
  }
`;

const Hidden = styled.div`
  width: 50px;
  cursor: pointer;
`;

export default function TableLeads({
  leadsWithCheck,
  handleShowDetails,
  gaViewId,
  success,
  setSuccess,
  showDetails,
  leadsMarked, 
  setLeadsMarked,
  checkAll, 
  setCheckAll,
  handleCheckedAll,
  setListChecked
}) {
  const { t: homeT } = useTranslation('home');

  const [show, setShow] = useState(false);

  const [batch, setBatch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [exp, setExport] = useState(false);
  const [asign, setAsign] = useState(false);
  const [archive, setArchive] = useState(false);
  const [hide, setHide] = useState(false);
  const [tags, setTags] = useState(false);
  const [over, setOver] = useState(false);

  function handleBatch() {
    setBatch(true);
  }

  function handleBatchOff() {
    setBatch();
  }

  const handleShowOff = (idx) => () => {
    setShow((state) => ({
      ...state,
      [idx]: false,
    }));
    setBatch();
  };

  const handleOverOff = () => {
    setShow(false);
    setOver(false);
  };

  const handleShow = (idx) => () => {
    setShow((state) => ({
      ...state,
      [idx]: !state[idx],
    }));
    setOver(true);
  };

  function handleShowModal() {
    setShowModal(true);
  }

  const handleHide = (lead) => () => {
    setHide(true);
    setLeadsMarked([lead.id]);
    console.log(leadsMarked);
    setShowModal(true);
  };

  function handleShowModalOff() {
    setShowModal(false);
    setBatch(false);
    setExport(false);
    setAsign(false);
    setArchive(false);
    setHide(false);
    setTags(false);
    setSuccess(false);
    setShow(false);
    setLeadsMarked([]);
    setCheckAll(!checkAll);
    setListChecked(
      leadsWithCheck.map(function (d) {
        d.select = false;
        return d;
      })
    );
    handleOff();
  }

  function handleSuccess() {
    setSuccess(true);
    setBatch(false);
    setExport(false);
    setAsign(false);
    setArchive(false);
    setHide(false);
    setTags(false);
    setLeadsMarked([]);
    setListChecked(
      leadsWithCheck.map(function (d) {
        d.select = false;
        return d;
      })
    );
    setCheckAll(false);
    handleOff();
  }

  const ctx = useContext(Responsive);

  function handleOff() {
    setCheckAll(false);
    setLeadsMarked([]);
    leadsWithCheck.map(function (d) {
      d.select = false;
      return d;
    });
  }

  return (
    <TableMain>
      {batch && <Modal onClick={handleBatchOff}></Modal>}
      {over && <Modal onClick={handleOverOff}></Modal>}
      {showModal && (
        <ModalOver>
          <Overlay onClick={handleShowModalOff}></Overlay>
          <Popup>
            {exp && (
              <Export
                handleShowModalOff={handleShowModalOff}
                handleSuccess={handleSuccess}
                leadsMarked={leadsMarked}
                checkAll={checkAll}
                gaViewId={gaViewId}
              />
            )}
            {asign && (
              <Assign
                handleShowModalOff={handleShowModalOff}
                handleSuccess={handleSuccess}
                leadsMarked={leadsMarked}
              />
            )}
            {/* {move && (
              <Move
                handleShowModalOff={handleShowModalOff}
                handleSuccess={handleSuccess}
              />
            )} */}
            {archive && (
              <Archive
                handleShowModalOff={handleShowModalOff}
                handleSuccess={handleSuccess}
                leadsMarked={leadsMarked}
              />
            )}
            {hide && (
              <Hide
                handleShowModalOff={handleShowModalOff}
                handleSuccess={handleSuccess}
                leadsMarked={leadsMarked}
              />
            )}
            {tags && (
              <Tags
                handleShowModalOff={handleShowModalOff}
                handleSuccess={handleSuccess}
                leadsMarked={leadsMarked}
              />
            )}
            {success && <Done />}
          </Popup>
        </ModalOver>
      )}
      <tbody>
        {!ctx.isMobile && (
          <tr>
            <th>
              <Check onChange={handleCheckedAll} checked={checkAll}></Check>
              <span></span>
            </th>
            <th>
              <BatchWrapper>
                {leadsMarked?.length > 0 ? (
                  <a onClick={handleBatch}>
                    <Active />
                  </a>
                ) : (
                  <a className="disactive">
                    <Batch />
                  </a>
                )}
                {batch && (
                  <>
                    <BatchBox
                      leadsMarked={leadsMarked}
                      setShowModal={setShowModal}
                      handleShowModal={handleShowModal}
                      handleShowModalOff={handleShowModalOff}
                      setExport={setExport}
                      setBatch={setBatch}
                      setAsign={setAsign}
                      setArchive={setArchive}
                      setHide={setHide}
                      setTags={setTags}
                    />
                  </>
                )}
              </BatchWrapper>
            </th>
            <th>
              <TableTitle>{homeT('name')}</TableTitle>
            </th>
            <th>
              <TableTitle>{homeT('views')}</TableTitle>
            </th>
            <th>
              <TableTitle>{homeT('timeSpent')}</TableTitle>
            </th>
            <th>
              <TableTitle>{homeT('source')}</TableTitle>
            </th>
          </tr>
        )}
        {leadsWithCheck.map((lead, idx) => (
          <tr key={lead.id}>
            {!ctx.isMobile && (
              <td>
                {/* eslint-disable */}
                <Check
                  onChange={function handleChecked(event) {
                    let checked = event.target.checked;
                    setListChecked(
                      leadsWithCheck.map(function (item) {
                        if (lead.id === item.id) {
                          item.select = checked;
                        }
                        return item;
                      })
                    );
                    const leadMarked = leadsWithCheck.filter(
                      (el) => el.select === true
                    );
                    setLeadsMarked(leadMarked.map((e) => e.id));
                  }}
                  /*eslint-enable */
                  type="checkbox"
                  checked={lead.select}
                />
                <span></span>
              </td>
            )}
            <td>
              <LeadAvaWrapper>
                <ImageFluid src={lead.logo} />
              </LeadAvaWrapper>
            </td>
            <td onClick={handleShowDetails(lead.id)}>
              <LeadTitle>{lead.name}</LeadTitle>
              <TextLocation> {lead.location}</TextLocation>
              <TextLight> {lead.visit}</TextLight>
            </td>
            {!ctx.isMobile && (
              <>
                <td>
                  <TextBlack> {lead.count}</TextBlack>
                </td>
                <td>
                  <TextBlack> {lead.time}</TextBlack>
                </td>
                <td>
                  <TextBlack> {lead.source} </TextBlack>
                </td>
                <td>
                  <Hidden onClick={handleHide(lead)}>
                    <HideIcon />
                  </Hidden>
                </td>
              </>
            )}
            {ctx.isMobile && (
              <td className="info">
                <TextBlack> {homeT('views')}</TextBlack>
                <TextLight> {lead.count}</TextLight>
                <TextBlack> {homeT('timeSpent')}</TextBlack>
                <TextLight> {lead.time}</TextLight>
                <TextBlack> {homeT('source')} </TextBlack>
                <TextLight> {lead.source}</TextLight>
              </td>
            )}
            <td className={showDetails ? 'last' : 'last'}>
              <ManageRight onClick={handleShow(idx)}>
                <Nav />
              </ManageRight>
              {show[idx] && (
                <>
                  <ManageBox className="tabled">
                    <BatchBox
                      leadsMarked={[lead.id]}
                      setShowModal={setShowModal}
                      setExport={setExport}
                      setBatch={setBatch}
                      setAsign={setAsign}
                      setArchive={setArchive}
                      setHide={setHide}
                      setTags={setTags}
                      /* eslint-disable */
                      handleShowOff={handleShowOff}
                      /* eslint-enable */
                    />
                  </ManageBox>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </TableMain>
  );
}

TableLeads.propTypes = {
  leadsWithCheck: array,
  gaViewId: number,
  showDetails: bool,
  success: bool,
  setSuccess: func,
  handleShowDetails: func,
  leadsMarked: array, 
  setLeadsMarked: func,
  checkAll: bool, 
  setCheckAll: func,
  handleCheckedAll: func,
  setListChecked: func
};
