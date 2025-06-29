
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const BarChartCard = () => {
    const data = [
        { name: 'Week 01', value: 3000 },
        { name: 'Week 02', value: 4500 },
        { name: 'Week 03', value: 2000 },
        { name: 'Week 04', value: 4000 },
    ];

    return (
        <div className="bg-white rounded-lg p-6 shadow-custom">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Data company visitors</h3>
            <p className="text-red-500 text-3xl font-bold mb-4">5.567K</p>

            <div className="h-48 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis hide={true} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>

            </div>
        </div>
    );
};

export default BarChartCard;