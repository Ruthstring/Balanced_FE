import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

// Register the annotation plugin
ChartJS.register(annotationPlugin);

const Chart = ({ balances }) => {
  const data = {
    labels: balances.map((balance) => balance.username),
    datasets: [
      {
        data: balances.map((balance) => balance.balance),
        backgroundColor: balances.map((balance) =>
          balance.balance >= 0
            ? 'rgba(75, 192, 192, 0.5)'
            : 'rgba(255, 99, 132, 0.5)'
        ),
        barThickness: 'flex', // Adjust bar thickness dynamically
        maxBarThickness: 50, // Set maximum bar thickness
        categoryPercentage: 0.6, // Adjust category width percentage
        barPercentage: 1, // Adjust bar width percentage
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
      datalabels: {
        anchor: 'center', // Center the label inside the bar
        align: 'center', // Center the label inside the bar
        color: '#000', // Text color
        font: {
          weight: '600', // '600' corresponds to 'semibold' in Tailwind CSS
          size: 14, // Adjust font size if needed
        },
        formatter: (value) => value.toFixed(2), // Display the value inside the bar
      },
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 0,
            yMax: 0,
            borderColor: 'rgba(0,0,0,0.5)',
            borderWidth: 2,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove vertical grid lines
        },
        ticks: {
          color: '#000', // Set tick labels color to black
          font: {
            size: 16, // Adjust font size for tick labels
            weight: '600', // Adjust font weight for tick labels
          },
        },
        border: {
          display: false, // Remove x-axis border
        },
        barPercentage: 0.9, // Adjust bar width percentage
        categoryPercentage: 0.9, // Adjust category width percentage
      },
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Remove horizontal grid lines
        },
        ticks: {
          display: false, // Remove y-axis ticks
        },
        border: {
          display: false, // Remove y-axis border
        },
      },
    },
  };

  return (
    <div className='chart md:w-full mx-auto px-10'>
      <div className='bg-white bg-opacity-15 p-4 rounded-md gap-x-14'>
        <Bar data={data} options={options} plugins={[ChartDataLabels]} />
      </div>
    </div>
  );
};

export default Chart;
