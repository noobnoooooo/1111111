
import React, { useState } from 'react';

const MOCK_MOMENTS = [
  { id: 'm1', user: '李德尔', avatar: 'https://picsum.photos/100/101', content: '今天为困境儿童项目捐赠了一点心意，希望孩子们能快乐成长。', project: '爱上你，疗愈我', amount: 50, likes: 24, time: '12分钟前', isLiked: false },
  { id: 'm2', user: '张老师', avatar: 'https://picsum.photos/100/102', content: '市南区的慈善氛围越来越好了，社区直达真的很方便。', project: '湛山社区慈善基金', amount: 200, likes: 156, time: '2小时前', isLiked: true },
  { id: 'm3', user: '匿名爱心人士', avatar: 'https://picsum.photos/100/103', content: '一份捐赠，万分关爱。', project: '专项医疗救助', amount: 100, likes: 8, time: '5小时前', isLiked: false },
];

export const Community: React.FC = () => {
  const [moments, setMoments] = useState(MOCK_MOMENTS);

  const toggleLike = (id: string) => {
    setMoments(prev => prev.map(m => {
        if (m.id === id) {
            return { ...m, isLiked: !m.isLiked, likes: m.isLiked ? m.likes - 1 : m.likes + 1 };
        }
        return m;
    }));
  };

  return (
    <div className="bg-[#fcfcfc] min-h-full pb-10">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 bg-white sticky top-0 z-20 flex justify-center border-b border-gray-50">
        <h2 className="text-xl font-bold text-gray-800">公益秀</h2>
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-4 animate-fade-in">
          {moments.map(moment => (
            <div key={moment.id} className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-50 space-y-4 transition-all">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <img src={moment.avatar} className="w-10 h-10 rounded-full border border-gray-100" />
                  <div>
                    <h4 className="text-sm font-black text-gray-800">{moment.user}</h4>
                    <p className="text-[10px] text-gray-400">{moment.time}</p>
                  </div>
                </div>
                <button className="text-[10px] font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">+ 关注</button>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed font-medium">{moment.content}</p>

              {/* Project Tag */}
              <div className="bg-gray-50 p-3 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">支持项目</p>
                    <p className="text-xs font-black text-gray-700">{moment.project}</p>
                  </div>
                </div>
                <p className="text-sm font-black text-red-600">¥{moment.amount}</p>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <button 
                  onClick={() => toggleLike(moment.id)}
                  className={`flex items-center gap-1 text-[11px] font-bold transition-colors ${moment.isLiked ? 'text-red-600' : 'text-gray-400'}`}
                >
                  <svg className={`w-5 h-5 ${moment.isLiked ? 'fill-current' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                  {moment.likes}
                </button>
                <button className="flex items-center gap-1 text-[11px] font-bold text-gray-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                  </svg>
                  评论
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
