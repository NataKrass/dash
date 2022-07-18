import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isStatusSucceed, makeAsOptions } from 'base/utils';
import { fetchAllLeads, fetchLeadsPerPage } from 'store/slices/leads';
import styled from 'styled-components';
import {
  AddQueue,
  Sorting,
  TableLeads,
  Countries,
  Calendar,
  Search,
  Charts,
  Companies,
  Filter,
} from 'base/components/Leads';
import { Main, OutlinedButton, FlexWrapper, StyledSelect, Overflow } from 'base/styled';
import img from 'assets/images/check.svg';
import DetailInfo from 'base/components/Leads/Details/DetailInfo';
import Onboarding from 'base/components/Leads/Onboarding/Onboarding';
import NoData from 'base/components/Leads/NoData';

const ButtonRow = styled.div`
  padding: 20px 0;
  text-align: center;
`;

const FlexWrapperJustify = styled(FlexWrapper)`
  &&& {
    justify-content: space-between;
    padding: 10px 20px 0;
    .with-modal-sm {
      position: relative;
    }
    .with-modal {
      padding-top: 3px;
      a {
        display: flex;
        align-items: center;
        cursor: pointer;
        svg {
          margin-right: 5px;
        }
        &:last-child {
          position: static;
        }
      }
      .sorted,
      .filtered {
        box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.13);
        border-radius: 6px;
        background: #fff;
        z-index: 1;
      }
      .sorted {
        position: absolute;
        top: 45px;
        right: -59px;
        width: 135px;
        z-index: 10;
      }
      .filtered {
        position: fixed;
        right: 0;
        top: 0;
        height: 100%;
        border-radius: 32px 0px 0px 0px;
        width: 60%;
        overflow-y: auto;
        z-index: 10;
      }
      .d-none {
        display: none;
      }
    }
  }
`;

const MainLead = styled.div`
  background: inherit;
  width: ${(props) => (props.details ? '70%' : '100%')};
`;

const Over = styled(Overflow)`
  left: 0;
  top: -20px;
  z-index: 9;
`;

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: '#000000',
    fontSize: '12px',
    background: state.isSelected
      ? `url(${img}) no-repeat 4% center`
      : 'inherit',
    borderBottom: state.isSelected ? '1px solid #EDEDED' : '0',
    padding: '10px 5px 10px 30px',
    margin: 0,
  }),
};

export default function Leads() {
  const { t: homeT } = useTranslation('home');
  const { t: rootT } = useTranslation();
  const {
    page,
    filters,
    leads,
    status: leadsStatus,
  } = useSelector((state) => state.leadsReducer);
  const gaViewId = useSelector(
    (state) => state.gaViewIdReducer.selectedId?.value
  );
  const [data] = useState(true);
  const dispatch = useDispatch();
  const { queues } = useSelector((state) => state.dashboardQueuesReducer);
  const options = makeAsOptions(queues, 'id', 'name');
  const [leadsWithCheck, setLeadsWithCheck] = useState([]);
  const [listChecked, setListChecked] = useState([]);
  const [leadsMarked, setLeadsMarked] = useState([]);
  const [queue, setQueue] = useState(null);
  const [value, setValue] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [leadToShow, setLeadsToShow] = useState(null);
  const [onboard, setOnboard] = useState();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (gaViewId) {
      dispatch(fetchAllLeads({ gaViewId, ...filters }));
    }
  }, [dispatch, gaViewId, filters]);

  useEffect(() => {
    setLeadsWithCheck(
      leads.map((d) => {
        return {
          select: false,
          id: d.id,
          name: d.name,
          logo: d.logo,
          location: d.location_with_region,
          visit: d.last_visit_for_dashboard,
          count: d.page_visit_count,
          time: d.total_time_spent,
          source: d.source_for_dashboard,
        };
      })
    );
  }, [leads]);

  function handleCheckedAll(e) {
    let checked = e.target.checked;
    setListChecked(
      leadsWithCheck.map(function (d) {
        d.select = checked;
        return d;
      })
    );
    setLeadsMarked(listChecked);
  }

  const handleShowDetails = (idx) => () => {
    const leadToShow = leads.find((el) => el.id === idx);
    setLeadsToShow(leadToShow);
    if (showDetails) {
      setLeadsToShow(leadToShow);
      return;
    } else {
      setShowDetails(true);
    }

  };

  function handleShowDetailsOff() {
    setShowDetails(false);
  }
  function handleOnboardOff() {
    setOnboard(false);
  }

  // const filtered = leads.filter((lead) => {
  //   return lead.toLowerCase().includes(value.toLowerCase());
  // });

  function showResult() {
    if (value.length > 0) console.log(value);
  }

  let handleSearchResults = (ev) => setValue(ev.target.value);

  function loadMore() {
    dispatch(fetchLeadsPerPage({ gaViewId, page: page + 1 }));
  }

  async function handleSelectChange(payload) {
    await setQueue(payload);
  }

  return (
    <Main>
      {!data && <NoData />}
      {data && (
        <MainLead details={showDetails}>
          {open && <Over></Over>}
          {onboard && <Onboarding handleOnboardOff={handleOnboardOff} />}
          <FlexWrapper>
            <Companies />
            <Charts details={showDetails} />
            {!showDetails && <Countries />}
          </FlexWrapper>
          <FlexWrapperJustify>
            <Search
              showResult={showResult}
              handleSearchResults={handleSearchResults}
            />
            <Calendar />
          </FlexWrapperJustify>

          {!leads && <p>{homeT('nothing')}</p>}
          {leads && (
            <div>
              <FlexWrapperJustify>
                <Sorting />
                <FlexWrapper>
                  <StyledSelect
                    options={options}
                    placeholder={homeT('selectQueuePlaceholder')}
                    onChange={handleSelectChange}
                    value={queue}
                    styles={customStyles}
                  />
                  <AddQueue setOpen={setOpen} open={open} />
                </FlexWrapper>
                <Filter setOpen={setOpen} open={open} />
              </FlexWrapperJustify>

              <TableLeads
                handleCheckedAll={handleCheckedAll}
                leadsWithCheck={leadsWithCheck}
                setListChecked={setListChecked}
                setLeadsMarked={setLeadsMarked}
                leadsMarked={leadsMarked}
                /* eslint-disable */
                handleShowDetails={handleShowDetails}
                /* eslint-enable */
              />
              {showDetails && (
                <DetailInfo
                  leadToShow={leadToShow}
                  leadName={leadToShow.name}
                  leadLogo={leadToShow.logo}
                  leadLocation={leadToShow.location_with_region}
                  leadTime={leadToShow.total_time_spent}
                  leadCount={leadToShow.page_visit_count}
                  date={leadToShow.last_visit_for_dashboard}
                  leadSource={leadToShow.source_for_dashboard}
                  handleShowDetailsOff={handleShowDetailsOff}
                />
              )}
              <ButtonRow>
                <OutlinedButton
                  onClick={loadMore}
                  disabled={!isStatusSucceed(leadsStatus)}
                >
                  {rootT('loadMore')}
                </OutlinedButton>
              </ButtonRow>
            </div>
          )}
        </MainLead>
      )}
    </Main>
  );
}
