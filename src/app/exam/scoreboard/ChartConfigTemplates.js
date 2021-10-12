
const dataTemplate = (labels, data, floatLabel, color) => {
  const {backgroundColor, borderColor} = color;

  return {
    labels: labels,
    datasets: [{
      data: data,
      label: floatLabel,
      backgroundColor: [...backgroundColor],
      borderColor: [...borderColor],
      borderWidth: 0.5
    }]
  };
};

const optionsTemplate = (yAxisTitle, xAxisTitle) => {
  return {
    scales: {
      yAxes: {
        title: {
          display: true,
          text: yAxisTitle,
          font: {
            size: 15
          }
        },
        ticks: {
          precision: 0
        }
      },
      xAxes: {
        title: {
          display: true,
          text: xAxisTitle,
          font: {
            size: 15
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      }
    }
  };
};

export {dataTemplate, optionsTemplate};