import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export const Chart = ({ data }) => {
  return (
    <div className="rounded-xl border bg-white shadow-sm p-4 mt-4">
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} formatter={(value) => `$${value}`} />
          <Bar
            dataKey="total"
            fill="#43570e"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
