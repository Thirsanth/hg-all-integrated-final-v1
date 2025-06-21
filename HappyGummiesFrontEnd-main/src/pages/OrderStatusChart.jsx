import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement, Tooltip, Legend);

export default function OrderStatusChart({ statusCounts }) {
  const data = {
    labels: ['Successful', 'Pending', 'Returned', 'Cancelled'],
    datasets: [
      {
        data: [
          statusCounts.completed,
          statusCounts.pending,
          statusCounts.refund,
          statusCounts.cancelled,
        ],
        backgroundColor: ['#00cc44', '#ffcc00', '#3399ff', '#ff3333'],
        borderWidth: 0,
        cutout: '70%',
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}`,
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-[300px] h-[300px] mb-4">
        <Doughnut data={data} options={options} />
      </div>

      {/* Legend */}
      <div className="mt-[-60px] space-y-3 text-m">
        <div className="flex justify-between w-56 mb-5 mr-5">
          <span>🟢 Successful Orders</span><span className="font-medium">{statusCounts.completed}</span>
        </div>
        <div className="flex justify-between w-56 mb-5 mr-5">
          <span>🟡 Pending Orders</span><span className='font-medium'>{statusCounts.pending}</span>
        </div>
        <div className="flex justify-between w-56 mb-5 mr-5">
          <span>🔵 Returned Orders</span><span className='font-medium'>{statusCounts.refund}</span>
        </div>
        <div className="flex justify-between w-56 mb-5 mr-5">
          <span>🔴 Cancelled Orders</span><span className='font-medium'>{statusCounts.cancelled}</span>
        </div>
      </div>
    </div>
  );
}
