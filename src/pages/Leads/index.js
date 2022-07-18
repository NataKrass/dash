import { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { isStatusSucceed, makeAsOptions } from 'base/utils';
import { fetchAllLeads, fetchLeadsPerPage } from 'store/slices/leads';
import { fetchAllAFs } from 'store/slices/accFilters';
import { fetchAllUserFs } from 'store/slices/userFilters';
import { fetchAllStats } from 'store/slices/stats';
import { Col } from '@bootstrap-styled/v4';
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
import {
  Main,
  OutlinedButton,
  FlexWrapper,
  StyledSelect,
  Overflow,
  SearchForm,
  Loading,
  TextGreyThin,
  TextBlackSmallThin,
  TextAccentSmall,
  Flex
} from 'base/styled';
import img from 'assets/images/check.svg';
import { ReactComponent as CloseIcon } from 'assets/images/close.svg';
import { ReactComponent as SearchIcon } from 'assets/images/search.svg';
import DetailInfo from 'base/components/Leads/Details/DetailInfo';
import Onboarding from 'base/components/Leads/Onboarding/Onboarding';
import NoData from 'base/components/Leads/NoData';
import Responsive from 'context/responsive';
import Cookies from 'universal-cookie';
import network from 'base/network';

const ButtonRow = styled.div`
  padding: 20px 0;
  text-align: center;
  .d-none {
    display: none;
  }
`;

const FlexWrapperJustify = styled(FlexWrapper)`
  &&& {
    justify-content: space-between;
    padding: 20px 20px 0;
    .with-modal-sm {
      position: relative;
    }
    .sort-btn {
      margin-left: 20px;
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
        .sc-eHgmQL {
          padding: 30px 30px 48px;
        }
      }
      .sorted {
        position: absolute;
        top: 45px;
        right: -59px;
        width: 135px;
        z-index: 21;
      }
      .filtered {
        position: fixed;
        right: 0;
        top: 0;
        height: 100%;
        border-radius: 32px 0px 0px 0px;
        width: 60%;
        overflow-y: auto;
        z-index: 22;
        .sc-hSdWYo {
          padding: 30px 30px 40px;
        }
      }
      .d-none {
        display: none;
      }
    }
    @media (max-width: 768px) {ukij
      padding: 10px 0;
      .with-modal {
        .filtered {
          border-radius: 0px 0px 16px 16px;
          width: 100%;
          height: 85%;
        }
      }
    }
   
  }
`;

const MainLead = styled.div`
  background: inherit;
  width: ${(props) => (props.details ? '70%' : '100%')};
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Over = styled(Overflow)`
  left: -140px;
  top: -80px;
  z-index: 9;
  height: 100%;
  @media (max-width: 768px) {
    left: -2px;
  }
`;

const Close = styled.div`
  position: fixed;
  bottom: 4%;
  left: 40%;
  background: #fff;
  border-radius: 50%;
  width: 47px;
  height: 47px;
  padding: 16px;
`;

const One = styled.div`
  min-width: 18%;
height: 170px;
`;

const Two = styled.div`
  min-width: 56%;
  width: 56%;
  height: 170px;
`;

const Three = styled.div`
  min-width: 24%;
  height: 170px;
`;

const Count = styled.div`
  display: flex;
  flex-direction: column;
  height: 41px;
  width: 115px;
  padding-top: 9px;
  p {
    margin: 1px 0;
  }
`;

const LoadCount = styled.div`
  height: 41px;
  width: 115px;
  padding-top: 7px;
  .blkkJT {
    margin-top: 0
  }
`;

const SelectAll = styled.div`
  cursor: pointer;
  p {
    text-decoration: underline;
    font-weight: 400;
  }
`;

const tableLoading = {
  height: '100vh'
};

export default function Leads() {
  const { t: homeT } = useTranslation('home');
  const { t: rootT } = useTranslation();
  const {
    page,
    filters,
    count,
    leads,
    status: leadsStatus,
    detailsStatus: detailsStatus
  } = useSelector((state) => state.leadsReducer);
  const gaViewId = useSelector(
    (state) => state.gaViewIdReducer.selectedId?.value
  );
  const gaViews = useSelector((state) => state.gaViewIdReducer);
  const [data] = useState(true);
  const dispatch = useDispatch();
  const { queues } = useSelector((state) => state.dashboardQueuesReducer);
  const { summary, chart, countries, statusStat } = useSelector(
    (state) => state.statsReducer
  );
  
  const options = makeAsOptions(queues, 'id', 'name');
  const [leadsWithCheck, setLeadsWithCheck] = useState([]);
  const [sortType, setSortType] = useState(null);
  const [queueId, setQueueId] = useState(null);
  const [startDay, setStartDay] = useState();
  const [endDay, setEndDay] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [success, setSuccess] = useState(false);
  const [queue, setQueue] = useState(null);
  const [value, setValue] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [leadToShow, setLeadsToShow] = useState(null);
  const [onboard, setOnboard] = useState(false);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [leadsLength] = useState(true);
  const [leadsMarked, setLeadsMarked] = useState([]);
  const [search, setSearch] = useState(false);
  const [stats, setStats] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [checkAll, setCheckAll] = useState(false);
  const [listChecked, setListChecked] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (gaViewId) {
      dispatch(
        fetchAllLeads({
          gaViewId,
          leads_order: sortType,
          queue_id: queueId,
          startDate: startDay,
          endDate: endDay,
          q: value,
          per_page: perPage,
          ...filters,
        })
      );
      //dispatch(fetchDashboardQueues(gaViewId));
      dispatch(fetchAllAFs());
      dispatch(fetchAllUserFs());
      const websiteId = gaViews.ids.find((el) => el.id === gaViewId).website_id;
      
      console.log(websiteId, countries, queueId, sortType, chart, summary);
    }
    setValue();
    setCheckAll(false);
    setLeadsMarked([]);
    /* eslint-disable */
  }, [
    dispatch,
    gaViewId,
    filters,
    sortType,
    queueId,
    startDay,
    endDay,
    search,
    gaViews.ids, 
    success
  ]);
   /* eslint-enable */

  useEffect(() => {
    if(gaViewId){
      const websiteId = gaViews.ids.find((el) => el.id === gaViewId).website_id;
      dispatch(fetchAllStats({ websiteId, stats: stats }));
    }
    /* eslint-disable */
  }, [dispatch, gaViewId]);
    /* eslint-enable */

  useEffect(() => {
    const cookies = new Cookies();
    if(summary?.prev_summary_timestamp){
      cookies.set('stats', summary?.prev_summary_timestamp, { path: '/' });    
      setStats(cookies.get('stats'));
    }
  }, [summary, stats]);

  useEffect(() => {
    let date = new Date();
    setStartDay(new Date(new Date().setDate(date.getDate() - 30)).toISOString().substring(0, 10));
    setCheckAll(false);
    setLeadsMarked([]);
    setPerPage(10);
    if(leads) {
      setLeadsWithCheck(
        leads.map((d) => {
          return {
            select: false,
            id: d?.id,
            name: d?.name,
            logo: d?.logo,
            location: d?.location,
            visit: d?.last_visited_at,
            count: d?.page_visit_count,
            time: d?.total_time_spent,
            source: d?.source_for_dashboard,
          };
        })
      );
    } 
    /* eslint-disable */
  }, [leads]);
  /* eslint-enable */
  
  const handleShowDetails = (idx) => () => {
    const leadToShow = leads.find((el) => el.id === idx);
    setLeadsToShow(leadToShow);
    if (showDetails) {
      setLeadsToShow(leadToShow);
      return;
    } else {
      setShowDetails(true);
      ctx.setDetails(true);
    }
  };

  function handleShowDetailsOff() {
    setShowDetails(false);
    ctx.setDetails(false);
  }

  function handleOnboardOff() {
    setOnboard(false);
  }

  function handleOff() {
    handleShowDetailsOff();
    setOpen(false);
    setFilter(false);
  }

  function showResult(e) {
    e.preventDefault();
    setSearch(!search);
   
  }

  let handleSearchResults = (ev) => setValue(ev.target.value);

  function loadMore() {
    dispatch(fetchLeadsPerPage({ 
      gaViewId, 
      leads_order: sortType,
      queue_id: queueId,
      startDate: startDay,
      endDate: endDay,
      q: value, 
      page: page + 1 }));
  }

  async function handleSelectChange(payload) {
    await setQueue(payload);
    setQueueId(payload.value);
  }

  const ctx = useContext(Responsive);

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

  const handleCheckedAll = (e) => {
    setCheckAll(!checkAll);
    console.log(listChecked);
    let checked = e?.target?.checked;
    leadsWithCheck.map(function (d) {
      d.select = checked;
      return d;
    });
    setLeadsMarked(leadsWithCheck.map((e) => e.id));
    if (checkAll) {
      setLeadsMarked([]);
    }
  };

  const fetchAll = async () => {  
    setLoader(true); 
    let res = await network
      .get(`/api/leads?ga_view_id=${gaViewId}&min_date=${startDay}&max_date=${endDay}`)
      .then((data) => {
        setCheckAll(true);
        setLeadsMarked(data.data.results.map(e => e.id));     
        setListChecked(leadsWithCheck.map(function (d) {
          d.select = true;
          return d;
        }));
        setLoader(false);
      })
      .catch((error) => console.log(error));
    console.log(res, leadsMarked);
  };

  const handleSelectAll = () => {
    fetchAll();
  };

  return (
    <Main className={ctx.details ? 'lefted' : null}>
      {!data && <NoData />}
      {data && (
        <MainLead details={showDetails}>
          {open && (
            <Over>
              {ctx.isMobile && (
                <>
                  <Close onClick={handleOff}>
                    <CloseIcon />
                  </Close>
                </>
              )}
            </Over>
          )}
          {onboard && <Onboarding handleOnboardOff={handleOnboardOff} />}
          {!ctx.isTablet ? (
            countries.countries ? (
              <FlexWrapper>
                <Companies summ={summary} status={statusStat} />
                <Charts
                  details={showDetails}
                  results={chart}
                  status={statusStat}
                />
                {!ctx.details && (
                  <Countries
                    status={statusStat}
                    results={countries?.countries?.filter((el) => el[1] > 10)}
                  />
                )}
              </FlexWrapper>
            ) : (
              <FlexWrapper>
                <One>
                  <Loading />
                </One>
                <Two>
                  <Loading />
                </Two>
                <Three>
                  <Loading />
                </Three>
              </FlexWrapper>
            )
          ) : null}

          {!ctx.isMobile && (
            <FlexWrapperJustify>
              <SearchForm onSubmit={showResult}>
                <SearchIcon onClick={showResult} />

                <input
                  type="search"
                  placeholder="Search"
                  onChange={handleSearchResults}
                  value={value}
                />
              </SearchForm>
              <Calendar setStartDay={setStartDay} setEndDay={setEndDay} />
            </FlexWrapperJustify>
          )}
          {leadsLength && leads && (
            <div>
              <FlexWrapperJustify>
                {!ctx.isMobile && (
                  <Flex>
                    {loader ? (
                      <LoadCount>
                        <Loading />
                      </LoadCount>
                    ) : (
                      <Count>
                        {leads &&
                          (leadsMarked.length > 0 ? (
                            <>
                              <TextBlackSmallThin>
                                {leadsMarked.length}
                                {homeT('leadsSelected')}
                              </TextBlackSmallThin>
                              <SelectAll onClick={handleSelectAll}>
                                <TextAccentSmall>
                                  {homeT('selectAll')} {count}
                                </TextAccentSmall>
                              </SelectAll>
                            </>
                          ) : (
                            <TextBlackSmallThin>
                              {' '}
                              {count}
                              {homeT('leads')}
                            </TextBlackSmallThin>
                          ))}
                      </Count>
                    )}
                    <Sorting setSortType={setSortType} />
                  </Flex>
                )}
                <FlexWrapper>
                  <StyledSelect
                    options={options}
                    placeholder={homeT('allLeads')}
                    onChange={handleSelectChange}
                    value={queue}
                    styles={customStyles}
                  />
                  <AddQueue setOpen={setOpen} open={open} queues={queues} />
                </FlexWrapper>
                <Filter
                  setOpen={setOpen}
                  open={open}
                  filter={filter}
                  setFilter={setFilter}
                />
              </FlexWrapperJustify>
              {ctx.isMobile && (
                <Col>
                  <Search
                    showResult={showResult}
                    handleSearchResults={handleSearchResults}
                  />
                </Col>
              )}
              {isStatusSucceed(leadsStatus) ? (
                <TableLeads
                  leadsWithCheck={leadsWithCheck}
                  gaViewId={gaViewId}
                  showDetails={showDetails}
                  success={success}
                  setSuccess={setSuccess}
                  leadsMarked={leadsMarked}
                  setLeadsMarked={setLeadsMarked}
                  checkAll={checkAll}
                  setCheckAll={setCheckAll}
                  handleCheckedAll={handleCheckedAll}
                  setListChecked={setListChecked}
                  /* eslint-disable */
                  handleShowDetails={handleShowDetails}
                  /* eslint-enable */
                />
              ) : (
                <Loading style={tableLoading} />
              )}
              {showDetails && (
                <DetailInfo
                  leadToShow={leadToShow}
                  leadName={leadToShow.name}
                  leadLogo={leadToShow.logo}
                  leadLocation={leadToShow.location}
                  leadTime={leadToShow.total_time_spent}
                  leadCount={leadToShow.page_visit_count}
                  date={leadToShow.last_visit_for_dashboard}
                  leadSource={leadToShow.source_for_dashboard}
                  handleShowDetailsOff={handleShowDetailsOff}
                  gaViewId={gaViewId}
                  leadsStatus={leadsStatus}
                  detailsStatus={detailsStatus}
                />
              )}
              <ButtonRow>
                {leads.length > 0 ? (
                  <OutlinedButton
                    onClick={loadMore}
                    className={!isStatusSucceed(leadsStatus) ? 'd-none' : ''}
                    disabled={!isStatusSucceed(leadsStatus)}
                  >
                    {rootT('loadMore')}
                  </OutlinedButton>
                ) : (
                  <TextGreyThin>{homeT('noLeads')}</TextGreyThin>
                )}
              </ButtonRow>
            </div>
          )}
        </MainLead>
      )}
    </Main>
  );
}
