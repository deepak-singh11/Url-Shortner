import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSelector } from 'react-redux';

const COLORS = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#3B82F6'];

const ReferrerPirChart = () => {

    // @ts-expect-error state
    const { referrerData } = useSelector(state => state.urlStats);
    const data = referrerData;

    return (
        <div className='rounded-lg w-[50%] flex flex-col items-center bg-white py-5'>
            <h3 className="text-lg font-semibold ">Devices </h3>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label={({ name, percent }) =>
                            `${name}: ${(percent * 100).toFixed(0)}%`
                        }
                    >
                        {data ? (data.map((_: { name: string, count: number }, index: number) => (
                                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                         ))
                                ) 
                                : 
                                null}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>

        </div>
    )
}

export default ReferrerPirChart
