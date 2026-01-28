
import React, { useState, useEffect } from 'react';
import { CharityEntity, Donation } from '../types';

interface ProjectDetailProps {
  entity: CharityEntity;
  onDonationSuccess: (amount: string) => void;
  onBack: () => void;
}

const DONORS_LOG: string[] = [
  '簇拥烈日的花捐了10元',
  '我捐了50元',
  '张虎捐了50元',
  '爱心人士捐了100元'
];

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ entity, onDonationSuccess, onBack }) => {
  const [activeTab, setActiveTab] = useState('');
  const [currentDonorIndex, setCurrentDonorIndex] = useState(0);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(20);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (entity.type === 'SPECIAL_FUND' || entity.type === 'FUND') {
      setActiveTab('基金介绍');
    } else {
      setActiveTab('项目详情');
    }
  }, [entity.type]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDonorIndex(prev => (prev + 1) % DONORS_LOG.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const progress = Math.min(Math.round((entity.current / entity.target) * 100), 200);

  const getTabs = () => {
    if (entity.type === 'SPECIAL_FUND' || entity.type === 'FUND') {
      return ['基金介绍', '捐款明细', '基金动态', '募捐资质'];
    }
    return ['项目详情', '捐款明细', '项目进展', '募捐资质'];
  };

  const tabs = getTabs();

  const handleDonationConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowDonationModal(false);
      onDonationSuccess(selectedAmount === 'custom' ? customAmount : selectedAmount.toString());
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Top Navigation */}
      <div className="bg-white px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-50">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center text-gray-800"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg></button>
        <h2 className="text-[17px] font-bold text-gray-800">
          {entity.type === 'SPECIAL_FUND' || entity.type === 'FUND' ? '基金详情' : '项目详情'}
        </h2>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {/* Banner with Floating Donor Bubbles */}
        <div className="relative h-64 bg-gray-100 overflow-hidden">
           {entity.type === 'SPECIAL_FUND' ? (
              <div className="w-full h-full bg-gradient-to-br from-[#1a73e8] to-[#42a5f5] flex items-center justify-center p-8 text-center text-white font-black text-5xl italic tracking-tighter shadow-inner uppercase leading-tight">
                专项基金
                <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10">
                   <svg className="w-48 h-48" viewBox="0 0 100 100" fill="currentColor"><path d="M50 0 C70 0 100 30 100 50 S70 100 50 100 0 70 0 50 30 0 50 0" /></svg>
                </div>
              </div>
           ) : entity.type === 'MARKET' ? (
              <div className="w-full h-full bg-gradient-to-br from-[#ff6b6b] to-[#f06595] flex items-center justify-center p-8 text-center text-white font-black text-5xl italic tracking-tighter shadow-inner relative">
                <div className="absolute inset-0 flex items-center justify-center opacity-10"><svg className="w-80 h-80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></div>
                <div className="relative z-10 leading-tight">慈善<br/>超市</div>
              </div>
           ) : (
              <img src={entity.cover || 'https://picsum.photos/400/400'} className="w-full h-full object-cover" alt="Cover" />
           )}
           
           <div className="absolute top-32 left-4 space-y-3">
              <div className="bg-black/30 backdrop-blur-md rounded-full pl-1.5 pr-4 py-1.5 flex items-center gap-2 text-white border border-white/10 shadow-lg animate-fade-in transition-all">
                 <img src={`https://picsum.photos/40/40?u=${currentDonorIndex}`} className="w-7 h-7 rounded-full border-2 border-white/20" />
                 <span className="text-[12px] font-bold">{DONORS_LOG[currentDonorIndex]}</span>
              </div>
              <div className="bg-black/30 backdrop-blur-md rounded-full pl-1.5 pr-4 py-1.5 flex items-center gap-2 text-white border border-white/10 shadow-lg animate-fade-in">
                 <img src="https://picsum.photos/40/40?u=9" className="w-7 h-7 rounded-full border-2 border-white/20" />
                 <span className="text-[12px] font-bold">我捐了50元</span>
              </div>
           </div>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-black text-gray-800 mb-2 leading-tight">{entity.title}</h2>
          <p className="text-[13px] text-gray-400 leading-relaxed mb-8">{entity.description}</p>

          <div className="bg-[#f9f9f9] rounded-[24px] p-6 mb-10 shadow-sm border border-gray-50">
             <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                   <p className="text-[18px] font-black text-gray-800 tracking-tight">{entity.target.toFixed(2)}</p>
                   <p className="text-[10px] text-gray-400 font-bold mt-1.5 uppercase">已募集金额(元)</p>
                </div>
                <div className="border-l border-gray-100">
                   <p className="text-[18px] font-black text-gray-800 tracking-tight">{(entity.spent || 100500).toFixed(2)}</p>
                   <p className="text-[10px] text-gray-400 font-bold mt-1.5 uppercase">支出金额(元)</p>
                </div>
                <div className="border-l border-gray-100">
                   <p className="text-[18px] font-black text-gray-800 tracking-tight">{entity.donorsCount}</p>
                   <p className="text-[11px] text-gray-400 font-bold mt-1.5 uppercase">捐赠人次</p>
                </div>
             </div>
          </div>

          <div className="border-t border-gray-50 -mx-6">
             <div className="flex px-4 sticky top-0 bg-white z-10 border-b border-gray-100 overflow-x-auto no-scrollbar">
               {tabs.map(tab => (
                 <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`shrink-0 px-4 py-4 text-[15px] font-black relative transition-all ${activeTab === tab ? 'text-gray-900' : 'text-gray-400'}`}
                 >
                   {tab}
                   {activeTab === tab && <div className="absolute bottom-0 left-4 right-4 h-[3.5px] bg-[#ff3b30] rounded-full" />}
                 </button>
               ))}
             </div>
             <div className="p-6">
               <h4 className="text-[17px] font-black text-gray-800 mb-5">{activeTab.includes('介绍') ? '背景' : activeTab}</h4>
               <div className="space-y-6">
                 <p className="text-[14px] text-gray-500 leading-loose text-justify">
                    {entity.type === 'SPECIAL_FUND' ? 
                      '本体育专项基金旨在作为推动体育事业创新与均衡发展的关键引擎。其核心贡献在于三个方面：首先，赋能体育创新，基金将用于支持前沿训练技术的研发、引进智能体育设备，并鼓励举办新兴赛事，以驱动训练方法和赛事运营的现代化变革。' :
                      entity.description
                    }
                 </p>
                 <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50 min-h-[160px] flex items-center justify-center">
                    {entity.cover ? <img src={entity.cover} className="w-full object-cover" alt="Detail" /> : <div className="text-gray-200 font-black text-xl italic opacity-50 uppercase tracking-tighter">Charity Visual Engine</div>}
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 border-t safe-bottom flex gap-4 bg-white/95 backdrop-blur-md z-50 shadow-lg">
         <button className="flex flex-col items-center justify-center px-4 gap-1 group active:scale-95 transition-transform"><svg className="w-6 h-6 text-gray-400 group-hover:text-[#ff3b30]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0l-4-4m4 4V4" /></svg><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">分享</span></button>
         <button onClick={() => setShowDonationModal(true)} className="flex-1 h-14 bg-[#ff3b30] rounded-xl text-white font-black text-lg shadow-xl shadow-red-500/30 active:scale-[0.98] transition-all">捐一笔</button>
      </div>

      {showDonationModal && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => !isProcessing && setShowDonationModal(false)} />
          <div className="relative bg-white rounded-t-[32px] p-8 animate-slide-up space-y-8 shadow-2xl">
            <h3 className="text-[20px] font-black text-center text-gray-800 tracking-tight">选择捐赠金额</h3>
            <div className="grid grid-cols-3 gap-4">
              {[10, 20, 50, 100, 200].map(amt => (
                <button key={amt} onClick={() => setSelectedAmount(amt)} className={`py-5 rounded-2xl border-2 transition-all font-black text-xl shadow-sm ${selectedAmount === amt ? 'border-[#ff3b30] bg-red-50 text-[#ff3b30]' : 'border-gray-100 text-gray-400 bg-gray-50'}`}>¥{amt}</button>
              ))}
              <button onClick={() => setSelectedAmount('custom')} className={`py-5 rounded-2xl border-2 transition-all font-black text-xl shadow-sm ${selectedAmount === 'custom' ? 'border-[#ff3b30] bg-red-50 text-[#ff3b30]' : 'border-gray-100 text-gray-400 bg-gray-50'}`}>其他</button>
            </div>
            <button disabled={isProcessing} onClick={handleDonationConfirm} className="w-full h-16 bg-[#ff3b30] rounded-2xl text-white font-black text-xl shadow-xl shadow-red-600/40 flex items-center justify-center active:scale-[0.98] transition-all">
              {isProcessing ? <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" /> : '确认捐赠'}
            </button>
            <div className="pb-4" />
          </div>
        </div>
      )}
    </div>
  );
};
