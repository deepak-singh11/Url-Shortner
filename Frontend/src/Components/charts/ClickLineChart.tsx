import { useEffect, useRef } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const data = [
  { day: "Mon 1st June", clicks: 2 },
  { day: "Tue 2nd June", clicks: 5 },
  { day: "Wed 3rd June", clicks: 1 },
  { day: "Thu 4th June", clicks: 3 },
  { day: "Fri 5th June", clicks: 6 },
  { day: "Sat 6th June", clicks: 4 },
  { day: "Sun 7th June", clicks: 7 },
  { day: "Mon 8th June", clicks: 2 },
  { day: "Tue 9th June", clicks: 5 },
  { day: "Wed 10th June", clicks: 3 },
  { day: "Thu 11th June", clicks: 2 },
  { day: "Fri 12th June", clicks: 6 },
  { day: "Sat 13th June", clicks: 1 },
  { day: "Sun 14th June", clicks: 4 },
  { day: "Mon 15th June", clicks: 3 },
  { day: "Tue 16th June", clicks: 5 },
  { day: "Wed 17th June", clicks: 2 },
  { day: "Thu 18th June", clicks: 4 },
  { day: "Fri 19th June", clicks: 7 },
  { day: "Sat 20th June", clicks: 6 },
];

function ClickLineChart() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }, []);


  return (

    <div className="flex flex-col items-center gap-5">
      <h3 className="mt-4 text-lg font-semibold text-black">No of Click on Respective Days</h3>
      <div style={{ display: "flex", height: 300 }} className=" w-[100%]">

        {/* Fixed Y-Axis */}
        <div style={{ width: 60 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <YAxis
                dataKey="clicks"
                tick={{ fontSize: 12 }}
                width={40}
                allowDecimals={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Scrollable X-Axis + Line */}
        <div
          ref={scrollRef}
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            width: "100%",
          }}
        >
          <div style={{ width: `${data.length * 80}px`, height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis
                  dataKey="day"
                  interval={0}
                  angle={-35}
                  textAnchor="end"
                  height={65}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClickLineChart;
