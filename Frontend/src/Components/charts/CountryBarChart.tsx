import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useSelector } from 'react-redux';

const CountryBarChart = () => {
    // @ts-expect-error state
    const {countryData}=useSelector(state=>state.urlStats);  
    const data=countryData;
  return (
    <div className='w-[50%] rounded-lg flex flex-col items-center bg-white py-5'>
    <h3 className="text-lg font-semibold mb-2">Clicks Based on Countries </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        layout="vertical"
        data={data}
        margin={{ top: 10, right: 30, left: 50, bottom: 10 }}
        barSize={25}
      >
        <XAxis type="number" />
        <YAxis type="category" dataKey="name" />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#6366F1" />
      </BarChart>
    </ResponsiveContainer>
  </div>
  )
}

export default CountryBarChart
