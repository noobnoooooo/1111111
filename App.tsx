
import React, { useState } from 'react';
import { Home } from './components/Home';
import { Community } from './components/Community';
import { Profile } from './components/Profile';
import { ProjectDetail } from './components/ProjectDetail';
import { Certificate } from './components/Certificate';
import { ListView } from './components/ListView';
import { View, CharityEntity } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>(View.HOME);
  const [selectedEntity, setSelectedEntity] = useState<CharityEntity | null>(null);
  const [lastDonationAmount, setLastDonationAmount] = useState<string>('0.00');
  
  const [userInfo, setUserInfo] = useState({
    name: '爱心用户',
    avatar: '',
    phone: '',
    isLoggedIn: false,
    donatedAmount: '0.00',
    donationCount: 0
  });

  const navigateToDetail = (entity: CharityEntity) => {
    setSelectedEntity(entity);
    setActiveView(View.DETAIL);
  };

  const handleDonationSuccess = (amount: string) => {
    setUserInfo(prev => ({
      ...prev,
      name: '李德尔',
      avatar: 'https://picsum.photos/100/100',
      phone: '136****6052',
      isLoggedIn: true,
      donatedAmount: (parseFloat(prev.donatedAmount) + parseFloat(amount)).toFixed(2),
      donationCount: prev.donationCount + 1
    }));
    setLastDonationAmount(amount);
    setActiveView(View.CERTIFICATE);
  };

  const updateUserInfo = (name: string, avatar: string) => {
    setUserInfo(prev => ({ ...prev, name, avatar, isLoggedIn: true, phone: prev.phone || '136****6052' }));
  };

  const renderContent = () => {
    switch (activeView) {
      case View.HOME:
        return <Home onSelectCategory={(view) => setActiveView(view)} onSelectProject={navigateToDetail} />;
      case View.PROJECT_LIST:
        return <ListView type="PROJECT" onBack={() => setActiveView(View.HOME)} onSelect={navigateToDetail} />;
      case View.FUND_LIST:
        return <ListView type="FUND" onBack={() => setActiveView(View.HOME)} onSelect={navigateToDetail} />;
      case View.SPECIAL_FUND_LIST:
        return <ListView type="SPECIAL_FUND" onBack={() => setActiveView(View.HOME)} onSelect={navigateToDetail} />;
      case View.MARKET_LIST:
        return <ListView type="MARKET" onBack={() => setActiveView(View.HOME)} onSelect={navigateToDetail} />;
      case View.COMMUNITY:
        return <Community />;
      case View.PROFILE:
        return <Profile userInfo={userInfo} onUpdateUser={updateUserInfo} onShowCertificate={() => { if (userInfo.donationCount > 0) { setLastDonationAmount(userInfo.donatedAmount); setActiveView(View.CERTIFICATE); }}} />;
      case View.CERTIFICATE:
        return <Certificate userInfo={userInfo} amount={lastDonationAmount} onUpdateUser={updateUserInfo} onBack={() => setActiveView(View.PROFILE)} />;
      case View.DETAIL:
        return selectedEntity ? <ProjectDetail entity={selectedEntity} onDonationSuccess={handleDonationSuccess} onBack={() => setActiveView(View.HOME)} /> : null;
      default:
        return <Home onSelectCategory={(view) => setActiveView(view)} onSelectProject={navigateToDetail} />;
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl overflow-hidden relative">
      <main className="flex-1 overflow-y-auto custom-scrollbar relative no-scrollbar bg-[#f8f8f8]">
        {renderContent()}
      </main>

      {![View.DETAIL, View.CERTIFICATE, View.PROJECT_LIST, View.FUND_LIST, View.SPECIAL_FUND_LIST, View.MARKET_LIST].includes(activeView) && (
        <nav className="bg-white/95 backdrop-blur-md border-t border-gray-100 flex justify-around pt-3 pb-8 safe-bottom shrink-0 z-50 overflow-hidden no-scrollbar">
          <button onClick={() => setActiveView(View.HOME)} className={`flex flex-col items-center gap-1 transition-all ${activeView === View.HOME ? 'text-[#ff3b30]' : 'text-[#999]'}`}>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill={activeView === View.HOME ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="text-[10px] font-bold">首页</span>
          </button>
          <button onClick={() => setActiveView(View.COMMUNITY)} className={`flex flex-col items-center gap-1 transition-all ${activeView === View.COMMUNITY ? 'text-[#ff3b30]' : 'text-[#999]'}`}>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill={activeView === View.COMMUNITY ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="text-[10px] font-bold">公益秀</span>
          </button>
          <button onClick={() => setActiveView(View.PROFILE)} className={`flex flex-col items-center gap-1 transition-all ${activeView === View.PROFILE ? 'text-[#ff3b30]' : 'text-[#999]'}`}>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill={activeView === View.PROFILE ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="10" r="3" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 20.662V19a2 2 0 012-2h6a2 2 0 012 2v1.662" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <span className="text-[10px] font-bold">我的</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
