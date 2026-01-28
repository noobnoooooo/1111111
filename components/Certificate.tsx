
import React, { useState, useRef } from 'react';

interface CertificateProps {
  userInfo: { name: string; avatar: string };
  amount?: string;
  onUpdateUser: (name: string, avatar: string) => void;
  onBack: () => void;
}

export const Certificate: React.FC<CertificateProps> = ({ userInfo, amount = '520.00', onUpdateUser, onBack }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Modal temp state
  const [tempName, setTempName] = useState(userInfo.name);
  const [tempAvatar, setTempAvatar] = useState(userInfo.avatar);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const certificateData = {
    certificateNo: `SN${new Date().getFullYear()}${Math.floor(Math.random() * 900000 + 100000)}`,
    issueDate: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
  };

  const handleOpenEdit = () => {
    setTempName(userInfo.name);
    setTempAvatar(userInfo.avatar);
    setShowEditModal(true);
  };

  const handleConfirm = () => {
    onUpdateUser(tempName, tempAvatar);
    setShowEditModal(false);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('证书已成功保存至相册！');
    }, 1500);
  };

  const handleAvatarSelect = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setTempAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-[#FFE5B4] to-[#FFCC80] p-6 pb-24 relative overflow-hidden animate-fade-in">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/30 blur-[100px] rounded-full pointer-events-none" />

      {/* Back Button */}
      <button 
        onClick={onBack}
        className="mb-4 w-10 h-10 rounded-full bg-black/10 backdrop-blur flex items-center justify-center text-gray-700 active:scale-90 transition-transform relative z-10"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Main Certificate Card */}
      <div className="w-full bg-gradient-to-br from-[#FFF5E6] to-[#FFE5CC] rounded-[32px] p-5 shadow-[0_20px_80px_-10px_rgba(251,146,60,0.6)] relative z-10">
        <div className="border-[8px] border-[#FFD700] rounded-2xl p-1 relative">
          <div className="border border-[#FFD700]/30 rounded-xl p-0.5">
            <div className="bg-white rounded-lg p-6 relative overflow-hidden min-h-[520px]">
              
              <div className="absolute left-2 top-32 opacity-10 text-orange-400 pointer-events-none">
                <svg className="w-16 h-32" viewBox="0 0 30 60" fill="currentColor"><path d="M15 60C15 60 5 45 5 30C5 15 15 0 15 0C15 0 25 15 25 30C25 45 15 60 15 60Z" /></svg>
              </div>
              <div className="absolute right-2 top-32 opacity-10 text-orange-400 pointer-events-none">
                <svg className="w-16 h-32 scale-x-[-1]" viewBox="0 0 30 60" fill="currentColor"><path d="M15 60C15 60 5 45 5 30C5 15 15 0 15 0C15 0 25 15 25 30C25 45 15 60 15 60Z" /></svg>
              </div>

              <div className="border border-dashed border-gray-100 rounded-lg p-6 flex flex-col items-center h-full">
                <h2 className="text-[44px] font-black text-[#FF9800] tracking-[0.2em] mb-1 drop-shadow-sm">捐赠证书</h2>
                <div className="w-24 h-[3px] bg-orange-100 mb-2 rounded-full" />
                <p className="text-[10px] text-gray-300 font-mono mb-10 tracking-widest uppercase">Certificate No: {certificateData.certificateNo}</p>

                <div className="w-full flex items-center justify-start gap-4 mb-8 cursor-pointer group" onClick={handleOpenEdit}>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-gray-800 border-b-2 border-orange-400/30 pb-1">{userInfo.name}</span>
                      <svg className="w-4 h-4 text-gray-300 group-hover:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold uppercase mt-1">Honorable Donor</span>
                  </div>
                </div>

                <div className="w-full space-y-6 text-gray-700 mb-12">
                  <p className="text-base leading-relaxed">
                    感谢您为 <span className="font-black text-orange-600">乐善市南慈善项目</span> 捐赠人民币 
                    <span className="text-3xl font-black text-red-600 mx-2 italic font-mono">{amount}</span> 
                    元。
                  </p>
                  <p className="text-[13px] text-gray-500 leading-loose indent-8 text-justify">
                    您的慷慨捐赠不仅是一份物质支持，更是一份温暖的力量。您的每一分爱心都将被转化为希望，去点亮更多人的梦想，温暖这座美丽的城市。
                  </p>
                </div>

                <div className="w-full mt-auto flex justify-between items-end relative">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-2xl p-2 border border-gray-100 mb-2 shadow-inner overflow-hidden">
                      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=LeshanShinan" className="w-full h-full grayscale opacity-40 mix-blend-multiply" alt="QR" />
                    </div>
                    <span className="text-[8px] text-gray-300 font-black tracking-tight uppercase">Verify Authenticity</span>
                  </div>

                  <div className="text-right flex flex-col items-end gap-1 relative">
                    <div className="absolute -top-14 -right-2 w-32 h-32 opacity-70 pointer-events-none rotate-[-15deg] mix-blend-multiply">
                      <svg viewBox="0 0 100 100" fill="none" className="text-red-600/60">
                        <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                        <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" />
                        <text x="50" y="45" textAnchor="middle" fill="currentColor" fontSize="6" fontWeight="bold">青岛市市南区</text>
                        <text x="50" y="55" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="black">慈善专用印</text>
                      </svg>
                    </div>
                    <p className="text-sm font-black text-gray-800">青岛市市南慈善协会</p>
                    <p className="text-[10px] text-gray-400 font-mono">{certificateData.issueDate}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-8 left-6 right-6 z-20 space-y-3">
        <button 
          onClick={() => {
              alert('已同步到公益秀！');
              onBack();
          }}
          className="w-full h-14 bg-white rounded-full text-[#ff3b30] font-black text-base shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 border border-red-50"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          分享到公益秀
        </button>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="w-full h-14 bg-gradient-to-r from-red-600 to-red-500 rounded-full text-white font-black text-base shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          {isSaving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : '保存证书到手机'}
        </button>
      </div>

      {/* Modal ... (same logic as before) */}
      {showEditModal && (
          <div className="fixed inset-0 z-[200] flex flex-col justify-end animate-fade-in">
              <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowEditModal(false)} />
              <div className="relative bg-white rounded-t-[32px] p-8 animate-slide-up w-full max-w-md mx-auto shadow-2xl">
                  <h2 className="text-xl font-bold text-gray-900 mb-8">设置证书展示名称</h2>
                  <div className="flex items-center py-6 border-t border-b border-gray-50">
                    <input type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} className="flex-1 outline-none text-gray-800 font-black text-lg" placeholder="请输入姓名" maxLength={10} autoFocus />
                  </div>
                  <div className="flex gap-4 mt-12 pb-2">
                    <button className="flex-1 py-4 bg-gray-100 rounded-2xl text-gray-500 font-bold" onClick={() => setShowEditModal(false)}>取消</button>
                    <button className="flex-1 py-4 bg-[#07c160] rounded-2xl text-white font-black" onClick={handleConfirm}>确认修改</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
