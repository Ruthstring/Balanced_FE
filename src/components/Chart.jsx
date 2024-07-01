import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const Chart = ({ balances }) => {
    const data = {
        labels: balances.map(balance => balance.username),
        datasets: [
            {
                data: balances.map(balance => balance.balance),
                backgroundColor: balances.map(balance =>
                    balance.balance >= 0 ? 'rgba(75, 192, 192, 0.5)' : 'rgba(255, 99, 132, 0.5)'
                ),
                barThickness: 50 // Adjust bar thickness if needed
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
                display: false // Disable the legend
            },
            datalabels: {
                anchor: 'center', // Center the label inside the bar
                align: 'center', // Center the label inside the bar
                color: '#000', // Text color
                font: {
                    weight: '600', // '600' corresponds to 'semibold' in Tailwind CSS
                    size: 14 // Adjust font size if needed
                },
                formatter: (value) => value // Display the value inside the bar
            }
        },
        scales: {
            x: {
                grid: {
                    display: false // Remove vertical grid lines
                },
                ticks: {
                    color: '#000', // Set tick labels color to black
                    font: {
                        size: 14, // Adjust font size for tick labels
                        weight: '600' // Adjust font weight for tick labels
                    }
                },
                border: {
                    display: false // Remove x-axis border
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    display: false // Remove horizontal grid lines
                },
                ticks: {
                    display: false // Remove y-axis ticks
                },
                border: {
                    display: false // Remove y-axis border
                }
            }
        }
    };

    return (
        <div className="w-full md:w-1/2 lg:w-1/2 mx-auto p-4">
            <div className="mx-auto">
                <Bar data={data} options={options} plugins={[ChartDataLabels]} />
            </div>
        </div>
    );
};

export default Chart;