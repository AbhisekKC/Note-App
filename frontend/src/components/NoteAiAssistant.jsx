import React, { useState, useEffect } from 'react';
import { aiApi } from '@/api/axios';

function NoteAiAssistant({ activeNoteId, noteTitle, onClose, onNoteUpdated }) {
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTaggingLoading, setIsTaggingLoading] = useState(false);
  const [isSavingLoading, setIsSavingLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Automatically fetch the AI summary as soon as the pop-up opens
  useEffect(() => {
    const fetchSummary = async () => {
      if (!activeNoteId) return;
      setIsLoading(true);
      setError('');
      setSuccessMsg('');

      try {
        const response = await aiApi.post(`/summarize/${activeNoteId}`);
        setSummary(response.data.summary);
        setError('');
      } catch (err) {
        setSuccessMsg('');
        setError(err.response?.data?.message || 'Failed to generate AI summary.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [activeNoteId]);

  // Handler to prompt Gemini for tags
  const handleAutoTag = async () => {
    setIsTaggingLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      const response = await aiApi.post(`/auto-tag/${activeNoteId}`);
      setTags(response.data.tags);
      setError('');
      setSuccessMsg('Tags successfully analyzed and saved!');
      if (typeof onNoteUpdated === 'function') onNoteUpdated();
    } catch (err) {
      setSuccessMsg('');
      setError(err.response?.data?.message || 'Failed to generate tags.');
    } finally {
      setIsTaggingLoading(false);
    }
  };

  // Handler to store the current summary text permanently
  const handleSaveSummary = async () => {
    setIsSavingLoading(true);
    setError('');
    setSuccessMsg('');

    try {
      await aiApi.put(`/save-summary/${activeNoteId}`, { summary });
      setError('');
      setSuccessMsg('Summary permanently stored in the database.');
      if (typeof onNoteUpdated === 'function') onNoteUpdated();
    } catch (err) {
      setSuccessMsg('');
      setError(err.response?.data?.message || 'Failed to save summary.');
    } finally {
      setIsSavingLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" />

      {/* Modal Layout Window */}
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h3 className="text-base font-semibold text-slate-800 flex items-center gap-1.5">
              <span className="text-indigo-500">✨</span> Gemini Workspace Insights
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 truncate max-w-70">Note: {noteTitle}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {error ? (
            <div className="p-3 bg-rose-50 border border-rose-100 text-rose-700 text-sm rounded-lg">
              ⚠️ {error}
            </div>
          ) : successMsg ? (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm rounded-lg">
              ✅ {successMsg}
            </div>
          ) : null}

          {/* Loading States */}
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-8 gap-2">
              <div className="animate-spin h-6 w-6 border-2 border-indigo-600 border-t-transparent rounded-full" />
              <p className="text-sm text-slate-500">Reading note structures...</p>
            </div>
          ) : (
            <>
              {/* Summary Segment */}
              {summary && (
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-4 border-l-4 border-l-indigo-500">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">AI Summary</h4>
                  <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{summary}</p>
                  
                  <button
                    onClick={handleSaveSummary}
                    disabled={isSavingLoading}
                    className="mt-3 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-md font-medium transition-colors"
                  >
                    {isSavingLoading ? 'Storing...' : '💾 Save Summary to Note'}
                  </button>
                </div>
              )}

              {/* Tagging Segment */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Smart Categories</h4>
                  <button
                    onClick={handleAutoTag}
                    disabled={isTaggingLoading}
                    className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 disabled:opacity-40"
                  >
                    {isTaggingLoading ? 'Analyzing...' : '🏷️ Auto-Generate Tags'}
                  </button>
                </div>

                {tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-xs px-2.5 py-1 rounded-full font-medium border border-slate-200">
                        #{tag.toLowerCase()}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 italic">No tags loaded yet. Click generate to sort this note into categories.</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-slate-100 flex justify-end bg-slate-50/50">
          <button onClick={onClose} className="px-4 py-2 border border-slate-200 text-slate-600 font-medium text-sm rounded-lg hover:bg-slate-100 active:scale-[0.98] transition-all">
            Close Panel
          </button>
        </div>

      </div>
    </div>
  );
}

export default NoteAiAssistant;
