
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const DonutChartCard = () => {
    const data = [{ name: 'Group A', value: 400 }, { name: 'Group B', value: 300 }, { name: 'Group C', value: 300 }];
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658']; // Contoh warna

    return (
        <div className="bg-white rounded-lg p-6 shadow-custom flex flex-col justify-between">
            <div className="h-40 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="font-bold text-xl fill-gray-800">
                            $6.581
                        </text>
                    </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col items-center justify-center h-full w-full bg-gray-50 text-gray-400 rounded-md relative">

                    <p className="font-bold text-xl text-gray-800 absolute">$6.581</p>
                </div>
            </div>
            <div className="flex justify-between mt-4 text-sm text-gray-600">
                <div>
                    <p className="font-semibold text-gray-800">7.95K</p>
                    <p>Data A</p>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-gray-800">4.38K</p>
                    <p>Data B</p>
                </div>
            </div>
        </div>
    );
};

export default DonutChartCard;