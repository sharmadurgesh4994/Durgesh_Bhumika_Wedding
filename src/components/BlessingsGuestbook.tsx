import React, { useState, useEffect } from 'react';
import { INITIAL_BLESSINGS } from '../data/weddingData';
import { Blessing } from '../types/wedding';
import { useAuth } from '../context/AuthContext';
import { Heart, Send, Sparkles, MessageCircle, Trash2, ShieldAlert } from 'lucide-react';

interface BlessingsGuestbookProps {
  id?: string;
}

const STORAGE_KEY = 'durgesh_bhumika_wedding_blessings';

export const BlessingsGuestbook: React.FC<BlessingsGuestbookProps> = ({ id = 'blessings' }) => {
  const { isAdmin } = useAuth();
  const [blessings, setBlessings] = useState<Blessing[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_BLESSINGS;
  });

  const [senderName, setSenderName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [deletedNotice, setDeletedNotice] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(blessings));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, [blessings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) {
      setError('Please provide your name and your blessing message.');
      return;
    }

    const newBlessing: Blessing = {
      id: 'b-' + Date.now(),
      sender: senderName.trim(),
      relation: relation.trim() || 'Well-Wisher',
      message: message.trim(),
      timestamp: 'Just now',
    };

    setBlessings([newBlessing, ...blessings]);
    setSenderName('');
    setRelation('');
    setMessage('');
    setError('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleDeleteBlessing = (blessingId: string) => {
    if (window.confirm('Delete this blessing as host?')) {
      setBlessings(blessings.filter((b) => b.id !== blessingId));
      setDeletedNotice(true);
      setTimeout(() => setDeletedNotice(false), 3000);
    }
  };

  return (
    <section id={id} className="py-16 sm:py-24 px-4 bg-[#FAF5EB] text-[#2C1810] relative">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#8C6208] block mb-1">
            Words of Love &amp; Joy
          </span>
          <h2 className="font-royal text-2xl sm:text-4xl font-bold text-[#3B0710] tracking-wide">
            Wishes &amp; Blessings Guestbook
          </h2>
          <div className="my-3 flex items-center justify-center gap-3">
            <div className="h-[1px] w-14 bg-[#D4AF37]" />
            <span className="font-hindi text-[#D4AF37] text-base">॥ शुभाशीर्वाद एवं मंगल कामनाएं ॥</span>
            <div className="h-[1px] w-14 bg-[#D4AF37]" />
          </div>
          <p className="text-xs sm:text-sm text-[#78350F] max-w-xl mx-auto">
            Leave your warm prayers and congratulations for Durgesh &amp; Bhumika as they begin their sacred journey together.
          </p>

          {isAdmin && (
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-medium">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
              <span>Host Moderation Active: You can delete any inappropriate blessings below.</span>
            </div>
          )}

          {deletedNotice && (
            <div className="mt-2 text-xs text-red-600 font-medium">
              Blessing message has been deleted.
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Submit Form */}
          <div className="lg:col-span-5 rounded-2xl bg-[#FFFDF9] p-6 sm:p-7 border border-[#D4AF37]/50 shadow-lg">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#D4AF37]/25">
              <Sparkles className="w-4 h-4 text-[#B8860B]" />
              <h3 className="font-royal text-lg font-bold text-[#3B0710]">
                Send Your Blessing
              </h3>
            </div>

            {submitted && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                <Heart className="w-4 h-4 text-emerald-600 fill-current shrink-0" />
                <span>Your blessing has been lovingly recorded! Thank you.</span>
              </div>
            )}

            {error && (
              <div className="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-300 text-red-700 text-xs">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#5C2E0A] font-semibold mb-1">
                  Your Full Name <span className="text-[#801323]">*</span>
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="e.g. Rakesh Sharma, Jaipur"
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF5EB] border border-[#D4AF37]/40 text-[#2C1810] placeholder-[#8C6208]/60 focus:border-[#801323] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#5C2E0A] font-semibold mb-1">
                  Relation / City (Optional)
                </label>
                <input
                  type="text"
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  placeholder="e.g. Friend, Udaipur / Cousin"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF5EB] border border-[#D4AF37]/40 text-[#2C1810] placeholder-[#8C6208]/60 focus:border-[#801323] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[#5C2E0A] font-semibold mb-1">
                  Blessing / Message <span className="text-[#801323]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your prayers, best wishes, or congratulations for the bride and groom..."
                  required
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[#FAF5EB] border border-[#D4AF37]/40 text-[#2C1810] placeholder-[#8C6208]/60 focus:border-[#801323] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#801323] via-[#9B192C] to-[#680E1B] text-[#FFF2B2] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Blessing</span>
              </button>
            </form>
          </div>

          {/* Blessings List */}
          <div className="lg:col-span-7 space-y-4 max-h-[520px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between pb-2 text-xs text-[#78350F]">
              <span className="flex items-center gap-1.5 font-medium">
                <MessageCircle className="w-3.5 h-3.5 text-[#B8860B]" />
                Recent Blessings ({blessings.length})
              </span>
              <span className="text-[11px] text-[#8C6208]">
                Preserved with Love
              </span>
            </div>

            {blessings.map((b) => (
              <div
                key={b.id}
                className="p-4 sm:p-5 rounded-xl bg-[#FFFDF9] border border-[#D4AF37]/35 shadow-sm space-y-2 hover:border-[#D4AF37] transition-colors relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#801323] text-[#FFF2B2] border border-[#D4AF37]/40 flex items-center justify-center font-royal text-xs font-bold">
                      {b.sender.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#3B0710] block">
                        {b.sender}
                      </span>
                      <span className="text-[10px] text-[#8C6208]">
                        {b.relation}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#8C6208]/80">
                      {b.timestamp}
                    </span>

                    {/* Host-only Delete Button */}
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteBlessing(b.id)}
                        className="p-1 rounded text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors ml-1"
                        title="Delete inappropriate blessing (Host only)"
                        aria-label="Delete blessing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="text-xs text-[#4A2010] leading-relaxed font-normal pt-1">
                  &ldquo;{b.message}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
