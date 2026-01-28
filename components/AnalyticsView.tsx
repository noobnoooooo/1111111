
import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const data = [
  { name: 'Mon', usage: 4000, cost: 2400 },
  { name: 'Tue', usage: 3000, cost: 1398 },
  { name: 'Wed', usage: 2000, cost: 9800 },
  { name: 'Thu', usage: 2780, cost: 3908 },
  { name: 'Fri', usage: 1890, cost: 4800 },
  { name: 'Sat', usage: 2390, cost: 3800 },
  { name: 'Sun', usage: 3490, cost: 4300 },
];

const modelUsage = [
  { name: 'Gemini 3 Pro', tokens: 120 },
  { name: 'Gemini Flash', tokens: 80 },
  { name: 'Imagen V3', tokens: 45 },
  { name: 'Embeddings', tokens: 25 },
];

const COLORS = ['#6366f1', '#a855f7', '#ec4899', '#f43f5e'];

export const AnalyticsView: React.FC = () => {
  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total API Calls', value: '12,482', change: '+12%', color: 'text-indigo-400' },
          { label: 'Average Latency', value: '450ms', change: '-5%', color: 'text-emerald-400' },
          { label: 'Tokens Processed', value: '1.2M', change: '+24%', color: 'text-purple-400' },
          { label: 'Active Sessions', value: '42', change: '+3%', color: 'text-amber-400' },
        ].map((stat, i) => (
          <div key={i} className="glass p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              <span className={`text-xs font-bold px-2 py-1 rounded-full bg-slate-900 ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl border border-slate-800">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-indigo-500 rounded-full"></span>
            Usage Trends
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="usage" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorUsage)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-slate-800">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-6 bg-purple-500 rounded-full"></span>
            Model Distribution
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={modelUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#1e293b' }}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #334155' }}
                />
                <Bar dataKey="tokens" radius={[6, 6, 0, 0]}>
                  {modelUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
