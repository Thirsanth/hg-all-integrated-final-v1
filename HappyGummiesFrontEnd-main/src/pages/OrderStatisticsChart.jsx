import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js';
Chart.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Tooltip);

export default function OrderStatisticsChart({ monthlyStats }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Delivered',
        data: months.map(m => monthlyStats[m]?.completed || 0),
        borderColor: 'green',
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Pending',
        data: months.map(m => monthlyStats[m]?.pending || 0),
        borderColor: 'gray',
        borderDash: [5, 5],
        tension: 0.3,
        fill: false,
      },
      {
        label: 'Cancelled',
        data: months.map(m => monthlyStats[m]?.cancelled || 0),
        borderColor: 'red',
        borderDash: [5, 5],
        tension: 0.3,
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
}
