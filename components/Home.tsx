
import React, { useState } from 'react';
import { CharityEntity, View } from '../types';

interface HomeProps {
  onSelectProject: (p: CharityEntity) => void;
  onSelectCategory: (v: View) => void;
}

export const Home: React.FC<HomeProps> = ({ onSelectProject, onSelectCategory }) => {
  const [activeNewsTab, setActiveNewsTab] = useState('政策解读');
  const newsTabs = ['政策解读', '公益课堂', '品牌项目', '慈善榜样'];

  const featuredProject: CharityEntity = {
    id: 'p1',
    type: 'PROJECT',
    title: '乐善市南——爱上你，疗愈我',
    cover: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
    target: 100000.00,
    current: 28355.83,
    donorsCount: 2739,
    category: '助学教育',
    description: '汇聚微光，照亮需要帮助的邻里，让善意成为习惯。',
    org: '市南区慈善总会'
  };

  const categories = [
    { label: '慈善项目', view: View.PROJECT_LIST, color: 'bg-[#ff5d6e]', icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor"><circle cx="7" cy="7" r="2.5" /><circle cx="17" cy="7" r="2.5" /><circle cx="7" cy="17" r="2.5" /><circle cx="17" cy="17" r="2.5" /></svg>
    )},
    { label: '社区慈善基金', view: View.FUND_LIST, color: 'bg-[#ff9e57]', icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /><path d="M12 14c.5-1 1.5-1 2-1s1.5 0 2 1" /></svg>
    )},
    { label: '专项基金', view: View.SPECIAL_FUND_LIST, color: 'bg-[#5edb91]', icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
        <rect x="10" y="7" width="4" height="4" rx="1" />
        <rect x="7" y="12" width="4" height="4" rx="1" />
        <rect x="13" y="12" width="4" height="4" rx="1" />
      </svg>
    )},
    { label: '慈善超市', view: View.MARKET_LIST, color: 'bg-[#ffcc4d]', icon: (
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="14" r="1.2" fill="currentColor" />
      </svg>
    )},
  ];

  return (
    <div className="bg-[#fdfdfd] min-h-full pb-20 relative overflow-x-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-pink-200/40 via-transparent to-transparent rounded-full -translate-y-20 translate-x-20 blur-3xl" />
      
      <div className="px-6 pt-6 pb-2">
        <div className="flex items-center gap-2">
           <img src="https://api.iconify.design/ri:shining-2-fill.svg?color=%23e63946" className="w-6 h-6" alt="Logo" />
           <span className="text-sm font-bold text-gray-800">乐善市南</span>
        </div>
      </div>

      <div className="px-6 py-8">
        <h1 className="text-[24px] font-black leading-tight text-[#8a0028]">
          让每一份善意，都轻松抵达 ~
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-2 px-6 pb-8">
        {categories.map((cat, i) => (
          <div key={i} onClick={() => onSelectCategory(cat.view)} className="flex flex-col items-center gap-2 cursor-pointer active:scale-95 transition-transform">
            <div className={`w-[54px] h-[54px] rounded-full flex items-center justify-center shadow-lg shadow-gray-200/50 ${cat.color}`}>
              {cat.icon}
            </div>
            <span className="text-[11px] font-bold text-[#666] whitespace-nowrap">{cat.label}</span>
          </div>
        ))}
      </div>

      <div className="px-5 mb-8">
        <div className="bg-white rounded-[20px] p-6 shadow-xl shadow-gray-100/50 border border-gray-50 text-center">
          <p className="text-[#333] text-[13px] mb-4">
            截至目前，已有 <span className="text-[#ff3b30] font-black text-xl mx-0.5">68,013,705</span> 元爱心捐款
          </p>
          <div className="flex items-center justify-center border-t border-gray-50 pt-4">
            <div className="flex-1">
              <p className="text-xl font-black text-[#333]">1.2 <span className="text-sm">万</span></p>
              <p className="text-[11px] text-[#999] mt-0.5">捐赠人次(次)</p>
            </div>
            <div className="w-[1px] h-8 bg-gray-100 mx-4" />
            <div className="flex-1">
              <p className="text-xl font-black text-[#333]">396</p>
              <p className="text-[11px] text-[#999] mt-0.5">慈善项目(个)</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 mb-4 flex justify-between items-center">
        <h3 className="text-[17px] font-black text-[#333]">慈善项目</h3>
        <button onClick={() => onSelectCategory(View.PROJECT_LIST)} className="text-[12px] text-[#999] flex items-center gap-0.5 font-medium">
          全部项目 <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="px-5 mb-8">
        <div onClick={() => onSelectProject(featuredProject)} className="bg-white rounded-[24px] overflow-hidden shadow-2xl shadow-gray-200/50 active:scale-[0.99] transition-all border border-gray-50">
          <div className="relative h-[200px]">
            <img src={featuredProject.cover} className="w-full h-full object-cover" alt="Cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300/30 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-center">
               <h4 className="text-[26px] font-black text-[#3b82f6] leading-tight tracking-tighter drop-shadow-sm">
                 爱上你，<br/>疗愈我
               </h4>
            </div>
          </div>
          <div className="p-5">
            <h4 className="text-[16px] font-black text-[#333] mb-1">{featuredProject.title}</h4>
            <p className="text-[12px] text-[#999] leading-tight mb-6">汇聚微光，照亮需要帮助的邻里，让善意成为习惯。</p>
            <div className="bg-[#f9f9f9] rounded-2xl p-4 grid grid-cols-3 gap-2">
              <div className="text-center"><p className="text-[14px] font-black text-[#333]">100000.00</p><p className="text-[9px] text-[#999] mt-1">目标金额(元)</p></div>
              <div className="text-center border-l border-gray-200"><p className="text-[14px] font-black text-[#333]">28355.83</p><p className="text-[9px] text-[#999] mt-1">已筹集金额(元)</p></div>
              <div className="text-center border-l border-gray-200"><p className="text-[14px] font-black text-[#333]">2739</p><p className="text-[9px] text-[#999] mt-1">捐赠人次(次)</p></div>
            </div>
            <button className="w-full h-11 bg-[#ff3b30] text-white rounded-xl mt-5 font-black text-[14px] shadow-lg shadow-red-500/20 active:scale-95 transition-all">捐一笔</button>
          </div>
        </div>
      </div>

      <div className="px-6 mb-5 flex gap-4 border-b border-gray-100">
        {newsTabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => setActiveNewsTab(tab)} 
            className={`py-3 text-[14px] font-black relative transition-all ${activeNewsTab === tab ? 'text-[#ff3b30]' : 'text-[#666]'}`}
          >
            {tab}
            {activeNewsTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ff3b30] rounded-full" />}
          </button>
        ))}
      </div>

      <div className="px-5 space-y-4">
        {[1, 2].map(i => (
          <div key={i} className="bg-white p-4 rounded-[20px] flex gap-4 shadow-sm border border-gray-50 active:bg-gray-50 transition-colors">
            <div className="w-[100px] h-[75px] rounded-[12px] bg-gradient-to-br from-red-500 to-[#ff3b30] flex items-center justify-center text-white font-black text-[14px] leading-tight shrink-0 p-3">政策解读</div>
            <div className="flex-1 flex flex-col justify-between">
               <h5 className="text-[14px] font-bold text-[#333] line-clamp-2 leading-tight">关于印发《青岛市刚性支出困难家庭认定实施细则》...</h5>
               <div className="flex justify-end"><button className="text-[11px] font-bold text-gray-400 bg-gray-50 px-4 py-1.5 rounded-lg border border-gray-100">查看</button></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
