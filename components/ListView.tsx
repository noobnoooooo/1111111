
import React, { useState } from 'react';
import { CharityEntity, EntityType } from '../types';

interface ListViewProps {
  type: EntityType;
  onBack: () => void;
  onSelect: (e: CharityEntity) => void;
}

const MOCK_PROJECTS: CharityEntity[] = [
  { id: 'lp1', type: 'PROJECT', title: '乐善市南——爱上你，疗愈我', cover: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400', target: 100000, current: 28355.83, donorsCount: 2739, category: '综合', description: '汇聚微光，照亮需要帮助的邻里。', org: '市南区慈善总会' },
  { id: 'lp2', type: 'PROJECT', title: '市南慈善协会综合募捐项目', cover: 'https://images.unsplash.com/photo-1459749411177-042180ce673c?w=400', target: 500000, current: 15000, spent: 5000, donorsCount: 520, category: '综合', description: '非定向公益捐助，助力各类困难群体。', org: '市南区慈善总会' },
  { id: 'lp3', type: 'PROJECT', title: '保护海洋你我同行', cover: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=400', target: 500000, current: 1000000, spent: 250000, donorsCount: 187, category: '环境保护', description: '回收海洋垃圾，清理浒苔。', org: '市南区慈善总会' },
];

const MOCK_FUNDS: CharityEntity[] = [
  { id: 'lf1', type: 'FUND', title: '珠海路街道辛家庄社区慈善基金', cover: 'https://picsum.photos/400/220?1', target: 500000, current: 39200.87, donorsCount: 520, description: '用于资助社区困难群众。', org: '珠海路街道' },
  { id: 'lf2', type: 'FUND', title: '珠海路街道辛家庄社区慈善基金', cover: 'https://picsum.photos/400/220?2', target: 500000, current: 39200.87, donorsCount: 520, description: '用于资助社区困难群众。', org: '珠海路街道' },
];

const MOCK_SPECIAL_FUNDS: CharityEntity[] = [
  { id: 'ls1', type: 'SPECIAL_FUND', title: '文艺发展专项基金', cover: '', target: 500000, current: 39200.87, donorsCount: 520, description: '支持社区文艺事业发展。', org: '市南区慈善总会' },
  { id: 'ls2', type: 'SPECIAL_FUND', title: '体育发展专项基金', cover: '', target: 500000, current: 39200.87, donorsCount: 520, description: '支持社区体育事业。', org: '市南区慈善总会' },
  { id: 'ls3', type: 'SPECIAL_FUND', title: '音乐发展专项基金', cover: '', target: 500000, current: 39200.87, donorsCount: 520, description: '音乐艺术公益支持。', org: '市南区慈善总会' },
];

const MOCK_MARKETS: CharityEntity[] = [
  { id: 'lm1', type: 'MARKET', title: '宁夏路爱心小屋慈善超市', cover: '', target: 500000, current: 39200.87, donorsCount: 520, description: '为宁夏路爱心小屋慈善超市募捐运营经费，帮助附近的困难群众。', org: '宁夏路街道' },
  { id: 'lm2', type: 'MARKET', title: '澳门路小学爱心超市', cover: '', target: 500000, current: 39200.87, donorsCount: 520, description: '爱心超市募捐运营经费。', org: '澳门路街道' },
];

export const ListView: React.FC<ListViewProps> = ({ type, onBack, onSelect }) => {
  const [activeTab, setActiveTab] = useState('全部');

  const titleMap = { 'PROJECT': '慈善项目', 'FUND': '社区慈善基金', 'SPECIAL_FUND': '专项基金', 'MARKET': '慈善超市' };
  const data = type === 'PROJECT' ? MOCK_PROJECTS : type === 'FUND' ? MOCK_FUNDS : type === 'SPECIAL_FUND' ? MOCK_SPECIAL_FUNDS : MOCK_MARKETS;

  const renderCard = (entity: CharityEntity) => {
    // Project special rendering for lp1 (Featured)
    if (type === 'PROJECT' && entity.id === 'lp1') {
      return (
        <div key={entity.id} className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-50 flex flex-col active:scale-[0.99] transition-transform p-4 space-y-4" onClick={() => onSelect(entity)}>
          <div className="relative h-[200px] rounded-2xl overflow-hidden bg-blue-50">
            <img src={entity.cover} className="w-full h-full object-cover" alt="Cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300/40 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-center">
              <h4 className="text-[28px] font-black text-[#3b82f6] leading-tight drop-shadow-sm">爱上你，<br/>疗愈我</h4>
            </div>
          </div>
          <h4 className="text-[16px] font-black text-gray-800">{entity.title}</h4>
          <p className="text-[12px] text-gray-400">{entity.description}</p>
          <div className="bg-[#fcfcfc] rounded-xl p-4 grid grid-cols-3 text-center border border-gray-50">
            <div><p className="text-[14px] font-black text-gray-800">{entity.target.toFixed(2)}</p><p className="text-[10px] text-gray-400 mt-1">目标金额(元)</p></div>
            <div className="border-l border-gray-100"><p className="text-[14px] font-black text-gray-800">{entity.current.toFixed(2)}</p><p className="text-[10px] text-gray-400 mt-1">已筹集金额(元)</p></div>
            <div className="border-l border-gray-100"><p className="text-[14px] font-black text-gray-800">{entity.donorsCount}</p><p className="text-[10px] text-gray-400 mt-1">捐赠人次(次)</p></div>
          </div>
          <button className="w-full h-11 bg-[#ff3b30] text-white rounded-xl font-black text-sm shadow-lg shadow-red-500/20">捐一笔</button>
        </div>
      );
    }

    // Default card for all types
    return (
      <div key={entity.id} className="bg-white rounded-[16px] overflow-hidden shadow-sm border border-gray-50 active:scale-[0.99] transition-transform p-4 flex gap-4" onClick={() => onSelect(entity)}>
        <div className="relative w-[120px] h-[86px] rounded-xl shrink-0 overflow-hidden shadow-sm">
          {type === 'SPECIAL_FUND' ? (
             <div className="w-full h-full bg-gradient-to-br from-[#1a73e8] to-[#42a5f5] flex items-center justify-center p-2 text-center text-white font-black italic tracking-tighter text-[15px] leading-tight select-none">
                专项基金
                <div className="absolute right-[-10px] bottom-[-10px] w-14 h-14 bg-white/10 rounded-full blur-md" />
             </div>
          ) : type === 'MARKET' ? (
             <div className="w-full h-full bg-gradient-to-br from-[#ff6b6b] to-[#f06595] flex items-center justify-center p-2 text-center text-white relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </div>
                <span className="font-black text-[14px] relative z-10 leading-tight">慈善<br/>超市</span>
             </div>
          ) : (
             <img src={entity.cover || 'https://picsum.photos/200/200'} className="w-full h-full object-cover" alt="Cover" />
          )}
        </div>
        <div className="flex-1 flex flex-col justify-between">
           <h5 className="text-[15px] font-bold text-gray-800 leading-tight line-clamp-2">{entity.title}</h5>
           <div className="flex justify-between items-end">
              <div className="space-y-0.5">
                 <p className="text-[11px] text-[#ff3b30] font-black">{type === 'MARKET' ? '累计筹款' : '已筹'} <span className="text-[13px]">{entity.current.toFixed(2)}元</span></p>
                 <p className="text-[11px] text-gray-400 font-medium">{entity.donorsCount}捐赠人次</p>
              </div>
              <button className="bg-gray-100/50 px-4 py-1.5 rounded-lg text-[11px] font-black text-gray-400 border border-gray-100/50">查看</button>
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#f8f8f8] min-h-full">
      <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center text-gray-800"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
        <h2 className="text-[17px] font-bold text-gray-800">{titleMap[type]}</h2>
        <div className="w-8" />
      </div>

      {type === 'FUND' && (
        <div className="p-4 space-y-4">
           <div className="bg-gradient-to-br from-[#FFF5E6] to-[#FFE5CC] rounded-2xl p-6 relative overflow-hidden text-center border border-orange-100 shadow-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full blur-2xl" />
              <p className="text-[11px] text-orange-600 font-bold mb-1 tracking-tight">青岛市市南慈善协会</p>
              <h3 className="text-2xl font-black text-orange-800 mb-4 tracking-wider">社区慈善基金</h3>
              <p className="text-[11px] text-gray-500 text-left leading-relaxed">市南慈善协会托管的社区慈善基金是指由市南慈善协会根据协会与基金发起人签订协议设立并进行管理的，用于特定社区内公益事业发展。涵盖扶贫、济困、助老等慈善法规定的公益活动。</p>
           </div>
        </div>
      )}

      {/* Tabs */}
      <div className="px-4 pt-4 pb-2 flex gap-6 overflow-x-auto no-scrollbar">
        {(type === 'PROJECT' ? ['全部', '综合', '助老', '扶贫', '助农', '教育'] : type === 'FUND' ? ['珠海路街道', '香港中路街道', '八大峡街道', '云南路街道'] : ['全部']).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`shrink-0 py-2 text-[14px] font-black relative transition-colors ${activeTab === tab ? 'text-[#ff3b30]' : 'text-gray-400'}`}>
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#ff3b30] rounded-full" />}
          </button>
        ))}
      </div>

      <div className="p-4 space-y-4">
        {data.map(entity => renderCard(entity))}
        <p className="text-center text-[12px] text-gray-300 font-bold py-10">没有更多了~</p>
      </div>
    </div>
  );
};
