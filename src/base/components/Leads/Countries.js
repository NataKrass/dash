
import { useTranslation } from 'react-i18next';
import { Doughnut } from 'react-chartjs-2';
import { Block } from 'base/styled';
import { string, array } from 'prop-types';
import styled from 'styled-components';
import TooltipDark from 'base/components/TooltipDark';

const ChartBlock = styled(Block)`
  padding: 17px 5px 10px 20px;
  width: 24%;
  .esQzEn {
    left: 1px;
    top: -11px;
  }
`;

const options = {
  legend: {
    display: true,
    labels: {
      fontSize: 12,
      boxWidth: 12,
      font: 'Montserrat'
    },
    position: 'left',
  },
  elements: {
    arc: {
      borderWidth: 0,
    },
  },
  tooltips: {
    //enabled: false,
    callbacks: {
      label: (tooltipItem, data) => {
        // Get the dataset label, global label or fall back to empty label
        let label =
          (data.datasets[tooltipItem.datasetIndex].labels &&
            data.datasets[tooltipItem.datasetIndex].labels[
              tooltipItem.index
            ]) ||
          data.labels[tooltipItem.index] ||
          "";
        if (label) {
          label += ": ";
        }

        // Apply the value and suffix
        label +=
          data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index] +
          (data.datasets[tooltipItem.datasetIndex].labelSuffix || "");

        return label;
      }
    }
  }
};


function Countries({results, status}) {
  const { t: homeT } = useTranslation('home');

  const label = results?.map(el => el[0]);
  const numbers = results?.map(el => Math.round(el[1]));
  function summ(arr){
    let x = 0;
    return 100 - arr.map(i=>x+=i, x).reverse()[0];
  }

  const otherNum = summ(numbers);
  numbers.push(otherNum || '100');
  label.push('Other countries');

  const data = {
    maintainAspectRatio: false,
    responsive: false,
    labels: label,
    datasets: [
      {
        data: numbers,
        backgroundColor: ['#FFDA7C', '#F97B6A', '#A1D066', '#9D3636', '#F55B6A', '#649567', ],
        labelSuffix: "%",
      },
    ],
  };

  return (
    <ChartBlock>
      {status === 'loading' ? (
        <></>
      ) : (results ? (
        <>
          <TooltipDark text={homeT('tooltipCountries')} />
          <Doughnut data={data} options={options} />
        </>
      ) : (
        'no results'
      )
      )}
    </ChartBlock>
  );
}

export default Countries;

Countries.propTypes = {
  results: array, 
  status: string
};
