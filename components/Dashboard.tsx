
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend 
} from 'recharts';
import { AnalysisResult, PriceData } from '../types';

interface DashboardProps {
  data: AnalysisResult;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const chartData = data.comparisonData.map(item => ({
    name: `${item.propertyName}\n(${item.roomType})`,
    price: item.pricePerWeek,
    isIconInc: item.isIconInc,
    displayLabel: item.propertyName.split(' ').slice(0, 2).join(' ')
  }));

  // Sort by price for better visualization
  const sortedChartData = [...chartData].sort((a, b) => b.price - a.price);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Overview Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold mb-4 flex items-center text-slate-800">
            <i className="fas fa-file-alt text-amber-500 mr-3"></i>
            Executive Summary
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
            {data.summary.split('\n').map((line, idx) => (
              <p key={idx} className="mb-4">{line}</p>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-2xl shadow-xl flex flex-col justify-center h-full">
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-wider mb-2">IconInc Benchmark</p>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-bold text-amber-500">£{data.comparisonData.find(d => d.isIconInc)?.pricePerWeek || '---'}</span>
              <span className="text-slate-400">/ week</span>
            </div>
            <p className="mt-4 text-sm text-slate-300 italic">"Premium living at the heart of Glasgow's vibrant West End."</p>
          </div>
        </div>
      </section>

      {/* Visual Comparison */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold mb-8 flex items-center text-slate-800">
          <i className="fas fa-chart-bar text-amber-500 mr-3"></i>
          Market Price Comparison (GBP/pw)
        </h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={sortedChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis 
                dataKey="displayLabel" 
                interval={0} 
                angle={-45} 
                textAnchor="end" 
                tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
              />
              <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
              />
              <Bar dataKey="price" radius={[8, 8, 0, 0]} barSize={50}>
                {sortedChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.isIconInc ? '#f59e0b' : '#334155'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center mt-4 space-x-6 text-sm font-medium">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-amber-500 rounded mr-2"></div>
            <span>IconInc The Bonnie</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-slate-700 rounded mr-2"></div>
            <span>Competitor</span>
          </div>
        </div>
      </section>

      {/* Detailed Table */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800">Property Comparison Breakdown</h2>
          <button className="text-slate-400 hover:text-slate-600">
            <i className="fas fa-download mr-2"></i> Export Data
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-xs font-bold tracking-wider">
                <th className="px-8 py-4">Property</th>
                <th className="px-8 py-4">Room Type</th>
                <th className="px-8 py-4">Price (Weekly)</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Key Amenities</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.comparisonData.map((item, idx) => (
                <tr key={idx} className={`hover:bg-slate-50 transition-colors ${item.isIconInc ? 'bg-amber-50/30' : ''}`}>
                  <td className="px-8 py-4 font-semibold text-slate-800">
                    {item.propertyName}
                    {item.isIconInc && <span className="ml-2 bg-amber-100 text-amber-700 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold">Your Brand</span>}
                  </td>
                  <td className="px-8 py-4 text-slate-600">{item.roomType}</td>
                  <td className="px-8 py-4 font-mono font-bold text-slate-900">£{item.pricePerWeek}</td>
                  <td className="px-8 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Available
                    </span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex flex-wrap gap-1">
                      {item.amenities?.slice(0, 3).map((amenity, aIdx) => (
                        <span key={aIdx} className="text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sources Section (Required by API rules for grounding) */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center">
          <i className="fas fa-link mr-2 text-xs"></i> Verified Market Sources
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.sources.map((source, idx) => (
            <a 
              key={idx} 
              href={source.uri} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-amber-400 transition-all group shadow-sm"
            >
              <div className="bg-slate-100 p-2 rounded group-hover:bg-amber-100 transition-colors">
                <i className="fas fa-globe text-slate-400 group-hover:text-amber-600"></i>
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-slate-700 truncate">{source.title}</p>
                <p className="text-[10px] text-slate-400 truncate">{source.uri}</p>
              </div>
            </a>
          ))}
          {data.sources.length === 0 && (
            <p className="text-sm text-slate-400 italic">No direct links extracted, results generated from aggregate market data.</p>
          )}
        </div>
      </section>
    </div>
  );
};
