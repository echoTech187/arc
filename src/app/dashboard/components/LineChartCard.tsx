import { getChart } from '@/app/actions/DashboardAction';
import { formatCurrency } from '@/utils/constant';
import { format } from 'path';
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const LineChartCard = () => {
    const [data, setData] = useState([]);
    const [profit, setProfit] = useState<any>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        async function getData() {
            let type = '';
            if (activeIndex === 1) {
                type = 'month';
            } else if (activeIndex === 2) {
                type = 'year';
            } else {
                type = 'week';
            }
            const response = await getChart(type);
            const data = await response;
            setData(data.data);
            setProfit(data.profit.original);
        }
        getData();
    }, [activeIndex]);


    return (
        <div className="bg-white rounded-lg p-6 shadow-custom col-span-2">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">Data Laporan Remunerasi</h3>
                <div className="flex space-x-2 text-sm text-gray-600">
                    <button className={`px-3 py-1 rounded-md ${activeIndex === 0 ? 'bg-blue-100 text-blue-700' : ''} cursor-pointer`} onClick={() => setActiveIndex(0)}>7 Days</button>
                    <button className={`px-3 py-1 rounded-md ${activeIndex === 1 ? 'bg-blue-100 text-blue-700' : ''} cursor-pointer`} onClick={() => setActiveIndex(1)}>1 Month</button>
                    <button className={`px-3 py-1 rounded-md ${activeIndex === 2 ? 'bg-blue-100 text-blue-700' : ''} cursor-pointer`} onClick={() => setActiveIndex(2)}>1 Year</button>
                </div>
            </div>

            <div className="mb-4">
                <p className="text-gray-500 text-sm">Total Remunerasi dalam {activeIndex === 1 ? '1 Bulan' : activeIndex === 2 ? '1 Tahun' : '7 Hari'}</p>
                <div className="flex items-center justify-start gap-4">
                    <p className="text-4xl font-bold text-gray-800">{formatCurrency(profit.current || 0)}</p>
                    <div className={`flex items-center ${profit.profit === 'up' ? 'text-green-500' : 'text-red-500'} text-sm font-semibold`}>
                        <span className="ml-1">{profit.profit === 'up' ? '▲' : '▼'} {profit.percentage}</span>
                    </div>
                </div>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%" className={'text-xs'}>
                    <LineChart data={data}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" dot={false} strokeWidth={2} />
                        <Line type="monotone" dataKey="value" stroke="#ffc658" fill="#ffc658" dot={false} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
};

export default LineChartCard;