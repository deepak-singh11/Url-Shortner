import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B","#EF4444"];


const DevicePieChart = () => {
  // @ts-expect-error state
  const { deviceData } = useSelector(state => state.urlStats);
  console.log(deviceData);
  return (
    <div className='rounded-lg w-[50%] flex flex-col items-center bg-white py-5'>
      <h3 className="text-lg font-semibold text-black">Referrers </h3>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={deviceData}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            >
              {console.log("deviceData inside Device PieChart:",deviceData)}
              { deviceData? (deviceData.map((_:{name:string,count:number}, index:number) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))
                            )
                            :
                            null
              }
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

}

export default DevicePieChart
