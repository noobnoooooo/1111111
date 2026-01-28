
import React, { useState } from 'react';
import { GeneratedImage } from '../types';
import { generateImageWithGemini } from '../services/geminiService';

export const ImageStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [images, setImages] = useState<GeneratedImage[]>([]);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    try {
      const imageUrl = await generateImageWithGemini(prompt);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: prompt,
        timestamp: new Date()
      };
      setImages(prev => [newImage, ...prev]);
      setPrompt('');
    } catch (error) {
      console.error(error);
      alert('Failed to generate image. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-8 space-y-12 max-w-7xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold tracking-tight text-white">Generate Art</h2>
        <p className="text-slate-400 max-w-2xl text-lg">
          Describe the image you want to create. Lumina will use Gemini's creative engine to materialize your vision.
        </p>
      </div>

      <div className="glass p-6 rounded-3xl border border-slate-700 shadow-2xl bg-gradient-to-br from-slate-800/50 to-indigo-900/10">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="A futuristic cybernetic city floating in the clouds, digital art style..."
            className="flex-1 bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-indigo-500 transition-all text-slate-100 placeholder-slate-600 outline-none"
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95 shadow-lg shadow-indigo-600/20"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Creating...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11l-7 7-7-7m14-8l-7 7-7-7" />
                </svg>
                <span>Generate</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {images.map((img) => (
          <div key={img.id} className="group relative glass rounded-2xl overflow-hidden border border-slate-700 transition-all hover:border-indigo-500/50">
            <div className="aspect-square relative overflow-hidden bg-slate-900">
              <img 
                src={img.url} 
                alt={img.prompt} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-sm text-white font-medium line-clamp-2 mb-2">{img.prompt}</p>
                <div className="flex gap-2">
                  <a 
                    href={img.url} 
                    download={`lumina-${img.id}.png`}
                    className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
        {!isGenerating && images.length === 0 && (
          <div className="col-span-full py-24 flex flex-col items-center text-slate-500 border-2 border-dashed border-slate-800 rounded-3xl">
            <svg className="w-16 h-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-lg">No creations yet. Let your imagination run wild.</p>
          </div>
        )}
        {isGenerating && (
          <div className="aspect-square glass rounded-2xl flex flex-col items-center justify-center p-8 text-center animate-pulse border-indigo-500/30">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-4" />
            <p className="text-indigo-400 font-medium">Materializing pixels...</p>
          </div>
        )}
      </div>
    </div>
  );
};
