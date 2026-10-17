import React, { useState, useEffect } from 'react';
import { Blessing } from '../types/wedding';
import { useAuth } from '../context/AuthContext';
import {
  subscribeToBlessings,
  saveBlessing,
  removeBlessing,
} from '../services/weddingDb';
import { Heart, Send, Sparkles, MessageCircle, Trash2, ShieldAlert, AlertTriangle, Check, Lock } from 'lucide-react';

interface BlessingsGuestbookProps {
  id?: string;
}

export const BlessingsGuestbook: React.FC<BlessingsGuestbookProps> = ({ id = 'blessings' }) => {
  const { isAdmin, openAuthModal } = useAuth();
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [senderName, setSenderName] = useState('');
  const [relation, setRelation] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // In-app delete confirmation state
  const [blessingToDelete, setBlessingToDelete] = useState<Blessing | null>(null);

  // Real-time Cloud Firestore synchronization across all visitors
  useEffect(() => {
    const unsubscribe = subscribeToBlessings((liveBlessings) => {
      setBlessings(liveBlessings);
    });
    return () => unsubscribe();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !message.trim()) {
      setError('Please provide your name and your blessing message.');
      return;
    }

    setIsSubmitting(true);
    const newBlessing: Blessing = {
      id: 'b-' + Date.now(),
      sender: senderName.trim(),
      relation: relation.trim() || 'Well-Wisher',
      message: message.trim(),
      timestamp: 'Just now',
    };

    try {
      await saveBlessing(newBlessing);
      setSenderName('');
      setRelation('');
      setMessage('');
      setError('');
      setSubmitted(true);
      showToast('Your blessing has been posted live for all to see!');
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      console.error('Save blessing error:', err);
      setError('Could not post blessing to cloud. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerDeleteBlessing = (b: Blessing) => {
    if (!isAdmin) {
      openAuthModal();
      return;
    }
    setBlessingToDelete(b);
  };

  const confirmDeleteBlessing = async () => {
    if (!blessingToDelete) return;
    const targetId = blessingToDelete.id;
    try {
      await removeBlessing(targetId);
      setBlessingToDelete(null);
      showToast('Blessing deleted live for all users.');
    } catch (err) {
      console.error('Delete blessing error:', err);
      showToast('Failed to delete blessing from cloud.');
    }
  };

  return (
    <section id={id} className="py-16 sm:py-24 px-4 bg-[#FAF5EB] text-[#2C1810] relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 p-3.5 rounded-xl bg-[#240409] text-[#FFF2B2] border border-[#D4AF37] shadow-2xl flex items-center gap-2 text-xs font-semibold animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

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

          <div className="mt-4 flex items-center justify-center gap-3">
            {isAdmin ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-medium">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                <span>Host Moderation Active: Deleting any message removes it live across all devices worldwide.</span>
              </div>
            ) : (
              <button
                onClick={openAuthModal}
                className="inline-flex items-center gap-1.5 text-xs text-[#8C6208] hover:text-[#3B0710] py-1 px-3 rounded-lg border border-[#D4AF37]/50 bg-[#FFFDF9] hover:bg-[#FFF8ED] transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>Host Login to Moderate Blessings</span>
              </button>
            )}
          </div>
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
                <span>Your blessing has been lovingly recorded in the cloud! Thank you.</span>
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
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#801323] via-[#9B192C] to-[#680E1B] text-[#FFF2B2] font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Posting Live...' : 'Submit Blessing'}</span>
              </button>
            </form>
          </div>

          {/* Blessings List */}
          <div className="lg:col-span-7 space-y-4 max-h-[520px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between pb-2 text-xs text-[#78350F]">
              <span className="flex items-center gap-1.5 font-medium">
                <MessageCircle className="w-3.5 h-3.5 text-[#B8860B]" />
                Live Blessings ({blessings.length})
              </span>
              <span className="text-[11px] text-[#8C6208]">
                Cloud Synced
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
                        onClick={() => triggerDeleteBlessing(b)}
                        className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 transition-colors ml-1.5 flex items-center gap-1 text-[11px] font-semibold cursor-pointer"
                        title="Delete this blessing (Host only)"
                        aria-label="Delete blessing"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-red-600" />
                        <span className="hidden sm:inline">Delete</span>
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

      {/* In-App Delete Confirmation Modal for Blessings */}
      {blessingToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-2xl bg-[#FFFDF9] p-6 border-2 border-red-500/50 shadow-2xl text-[#2C1810]">
            <div className="flex items-center gap-3 mb-4 pb-3 border-b border-red-200">
              <div className="p-2.5 rounded-full bg-red-100 text-red-600 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-royal text-lg font-bold text-red-900">
                  Delete Inappropriate Blessing
                </h3>
                <p className="text-xs text-[#8C6208]">
                  Host Action · Durgesh Sharma
                </p>
              </div>
            </div>

            <p className="text-xs text-[#5C2E0A] mb-3 leading-relaxed">
              Are you sure you want to permanently delete this message sent by{' '}
              <strong className="text-red-900">{blessingToDelete.sender}</strong>? It will be removed live for all visitors worldwide.
            </p>

            <div className="p-3 rounded-xl bg-[#FAF5EB] border border-[#D4AF37]/30 text-xs text-[#4A2010] italic mb-4">
              &ldquo;{blessingToDelete.message}&rdquo;
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setBlessingToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-semibold text-xs hover:bg-neutral-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteBlessing}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Yes, Delete for Everyone</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
