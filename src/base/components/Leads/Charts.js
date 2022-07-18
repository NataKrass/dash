import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Block, Flex } from 'base/styled';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import TooltipDark from 'base/components/TooltipDark';
import Checked from 'assets/images/radio_active.svg';
import Check from 'assets/images/radio_circle.svg';
import { bool, object } from 'prop-types';

const ChartBlock = styled(Block)`
  display: flex;
  flex-direction: column;
  width: ${ props => props.details ? '73%' : '56%;'};
  @media (max-width: 1485px) {
    width: ${ props => props.details ? '71%' : '55%;'};
  }
  @media (max-width: 1345px) {
    width: ${ props => props.details ? '69%' : '53%;'};
  }
  @media (max-width: 1230px) {
    width: ${ props => props.details ? '67%' : '51%;'};
  }
  @media (max-width: 1160px) {
    width: ${ props => props.details ? '65%' : '48%;'};
  }
`;

const Text = styled.p`
  font-size: .7rem;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0rem;
  color: ${props => props.theme.colors.lightText};
  margin: 0 10px;
`;

const Tab = styled.div`
  font-size: .7rem;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: 0rem;
  margin: 0 10px;
  padding-left: 20px;
  cursor: pointer;
  &.check {
    background: url(${Check}) no-repeat 4% center;
    color: ${props => props.theme.colors.lightText};
  }
  &.active {
    background: url(${Checked}) no-repeat 4% center;
    color: ${props => props.theme.colors.accentRed};
  }
`;

const FlexWrap = styled(Flex)`
justify-content: space-between;
`;

function LineChart({details, results}) {
  const { t: homeT } = useTranslation('home');
  const [active, setActive] = useState(0);

  const data = {
    //labels: ['1:00', '', '', '5:00', '', '',  '9:00', '', '',  '13:00', '', '',  '17:00',  '', '', '20:00'],
    //labels: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    labels:
      (active === 0 &&
        Object.keys(results?.today).map((item) => item.slice(11, 16))) ||
      (active === 1 &&
        Object.keys(results?.week).map((item) => item.slice(0, 10))) ||
      (active === 2 &&
        Object.keys(results?.month).map((item) => item.slice(0, 10))),
    datasets: [
      {
        label: 'amount of new leads',
        //data: [15, 8, 9, 22, 12, 18, 24],
        //data: [15, 8, 9, 24, 12, 18, 30, 29, 34, 40, 30, 29, 34, 35, 37, 49],
        data:
          (active === 0 && Object.values(results?.today)) ||
          (active === 1 && Object.values(results?.week)) ||
          (active === 2 && Object.values(results?.month)),
        fill: false,
        backgroundColor: '#F97B6A',
        borderColor: '#F97B6A',
        borderWidth: 1,
        pointRadius: 2,
      },
    ],
  };
  
  const options = {
    legend: {
      display: false,
    },
    type: "line",
    lineThickness: 1,
    borderWidth: 1,
    animation: {
      duration: 0
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  function handleTab(e) {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  }

  return (
    <ChartBlock details={details}>
      <TooltipDark text={homeT('tooltipChart')}/>
      <FlexWrap>
        <Text>{new Date().toLocaleDateString()}</Text>
        <Flex>
          <Tab onClick={handleTab} active={active === 0} id={0} className={active === 0 ? 'active' : 'check'}>
            {homeT('today')}
          </Tab>
          <Tab onClick={handleTab} active={active === 1} id={1} className={active === 1 ? 'active' : 'check'}>
            {homeT('week')}
          </Tab>
          <Tab onClick={handleTab} active={active === 2} id={2} className={active === 2 ? 'active' : 'check'}>
            {homeT('month')}
          </Tab>
        </Flex>
      </FlexWrap>
      <div>
        <Line data={data} options={options} width={450} height={80} />
      </div>
     
    </ChartBlock>
  );
}

export default LineChart;


LineChart.propTypes = {
  details: bool,
  results: object
};
