
import React, { useState, useRef } from 'react';

interface ProfileProps {
  userInfo: { 
    name: string; 
    avatar: string; 
    phone: string; 
    isLoggedIn: boolean;
    donatedAmount: string;
    donationCount: number;
  };
  onUpdateUser: (name: string, avatar: string) => void;
  onShowCertificate?: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ userInfo, onUpdateUser, onShowCertificate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tempUserName, setTempUserName] = useState(userInfo.name);
  const [tempAvatarUrl, setTempAvatarUrl] = useState(userInfo.avatar || 'https://picsum.photos/100/100');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleOpenEdit = () => {
    setTempUserName(userInfo.name === '爱心用户' ? '' : userInfo.name);
    setTempAvatarUrl(userInfo.avatar || 'https://picsum.photos/100/100');
    setIsEditModalOpen(true);
  };

  const handleConfirmEdit = () => {
    onUpdateUser(tempUserName || '爱心用户', tempAvatarUrl);
    setIsEditModalOpen(false);
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTempAvatarUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-full bg-[#f8f8f8] pb-10 relative">
      {/* Top Gradient Background */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-[#FFF0F2] via-[#FFF8F8] to-[#f8f8f8] pointer-events-none" />

      {/* Header */}
      <header className="relative pt-14 pb-10 text-center">
        <h1 className="text-xl font-bold text-gray-800">我的</h1>
      </header>

      {/* User Info Section */}
      <div className="px-6 mb-8 relative flex items-center gap-4">
        <div 
          onClick={handleOpenEdit}
          className="w-[74px] h-[74px] rounded-full overflow-hidden border-2 border-white shadow-sm bg-white flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        >
          {userInfo.isLoggedIn && userInfo.avatar ? (
            <img src={userInfo.avatar} className="w-full h-full object-cover" alt="Avatar" />
          ) : (
            <div className="w-full h-full bg-[#FFF0F2] flex items-center justify-center">
                {/* Simulated Heart Placeholder Avatar */}
                <svg className="w-10 h-10 text-[#FF6B8B]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-1.5" onClick={handleOpenEdit}>
            <h3 className="text-xl font-bold text-gray-800">{userInfo.name}</h3>
            <svg className="w-4 h-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </div>
          <p className="text-[13px] text-gray-400 mt-0.5">
            {userInfo.isLoggedIn ? userInfo.phone : '暂未授权手机号'}
          </p>
        </div>
      </div>

      <div className="px-5 space-y-4 relative">
        {/* Stats Card */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm flex items-center">
          <div className="flex-1">
            <p className="text-[13px] text-gray-400 font-medium">累计捐赠 (元)</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{userInfo.donatedAmount}</p>
          </div>
          <div className="flex-1 pl-4">
            <p className="text-[13px] text-gray-400 font-medium">捐赠次数 (次)</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{userInfo.donationCount}</p>
          </div>
        </div>

        {/* My Donated Projects Card */}
        <div className="bg-white rounded-[20px] p-5 shadow-sm">
           <div className="flex justify-between items-center mb-5">
              <h4 className="text-[15px] font-bold text-gray-800">我捐赠的项目</h4>
              <button className="text-[13px] text-gray-400 flex items-center gap-1">
                查看全部 <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
              </button>
           </div>

           {userInfo.isLoggedIn && userInfo.donationCount > 0 ? (
             <div onClick={onShowCertificate} className="flex gap-4 cursor-pointer active:opacity-70 transition-opacity">
                <img src="https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=300&auto=format&fit=crop" className="w-[100px] h-[75px] rounded-lg object-cover" alt="Project" />
                <div className="flex flex-col justify-center gap-1">
                  <h5 className="text-[14px] font-bold text-gray-800">无声合唱团关爱计划</h5>
                  <p className="text-[11px] text-gray-400">捐赠时间：2025-12-30 17:22:51</p>
                </div>
             </div>
           ) : (
             <div className="py-2 text-[13px] text-gray-300">暂无数据~</div>
           )}
        </div>

        {/* System Links List */}
        <div className="bg-white rounded-[20px] overflow-hidden shadow-sm">
           {[
             { label: '平台简介', icon: (
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
             )},
             { label: '联系我们', icon: (
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
               </svg>
             )},
             { label: '捐赠协议', icon: (
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
               </svg>
             )},
             { label: '隐私政策', icon: (
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
               </svg>
             )},
           ].map((item, i, arr) => (
             <div key={i} className={`flex items-center justify-between p-5 active:bg-gray-50 transition-colors ${i !== arr.length - 1 ? 'border-b border-gray-50' : ''}`}>
               <div className="flex items-center gap-3">
                 <span className="text-gray-800">{item.icon}</span>
                 <span className="text-[15px] font-medium text-gray-800">{item.label}</span>
               </div>
               <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
               </svg>
             </div>
           ))}
        </div>
      </div>

      {/* Footer Brand */}
      <footer className="mt-16 mb-10 flex flex-col items-center gap-1.5 opacity-40">
        <div className="flex items-center gap-1.5">
           <img src="https://api.iconify.design/ri:shining-2-fill.svg?color=%23e63946" className="w-4 h-4" alt="Logo" />
           <span className="text-[13px] font-bold text-gray-800">乐善市南</span>
        </div>
        <p className="text-[11px] text-gray-600">青岛市市南区慈善协会运营服务</p>
      </footer>

      {/* WeChat-style User Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity" 
            onClick={() => setIsEditModalOpen(false)} 
          />
          <div className="relative bg-white rounded-t-[32px] p-8 animate-slide-up w-full max-w-md mx-auto shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L1 21h22L12 2z"/></svg>
              </div>
              <span className="text-base text-gray-800 font-semibold">乐善市南 授权中心</span>
            </div>

            <h2 className="text-xl font-bold text-gray-900 mb-8">完善您的个人资料</h2>

            <div className="space-y-0">
              <div 
                className="flex items-center justify-between py-6 border-t border-gray-50 cursor-pointer active:bg-gray-50"
                onClick={handleAvatarClick}
              >
                <span className="text-gray-600 font-medium">设置头像</span>
                <div className="flex items-center gap-3">
                  <img 
                    src={tempAvatarUrl} 
                    className="w-14 h-14 rounded-full object-cover border border-gray-100 shadow-sm" 
                    alt="Temp" 
                  />
                  <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex items-center py-6 border-t border-b border-gray-50">
                <span className="text-gray-600 font-medium whitespace-nowrap w-20">姓名/昵称</span>
                <input 
                  type="text" 
                  value={tempUserName}
                  onChange={(e) => setTempUserName(e.target.value)}
                  className="flex-1 outline-none text-gray-800 font-bold placeholder-gray-300 text-lg"
                  placeholder="请输入昵称"
                  maxLength={10}
                  autoFocus
                />
              </div>
            </div>

            <div className="flex gap-4 mt-12 pb-2">
              <button 
                className="flex-1 py-4 bg-gray-50 rounded-2xl text-gray-400 font-bold text-base active:bg-gray-100 transition-colors"
                onClick={() => setIsEditModalOpen(false)}
              >
                取消
              </button>
              <button 
                className="flex-1 py-4 bg-[#07c160] rounded-2xl text-white font-black text-base shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all"
                onClick={handleConfirmEdit}
              >
                授权并登录
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
