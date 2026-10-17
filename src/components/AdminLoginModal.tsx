import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Lock, X, ShieldCheck, Eye, EyeOff, User } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, isAdmin, logout, adminName } = useAuth();
  const [email, setEmail] = useState('wwwds4994@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const ok = login(email, password);
    if (ok) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setPassword('');
        closeAuthModal();
      }, 900);
    } else {
      setError('Invalid credentials. Please verify your Email ID and Password.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EB] p-6 sm:p-8 border border-[#D4AF37]/50 shadow-2xl text-[#2C1810]">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-full text-[#8C6208] hover:bg-[#F3E5AB]/50 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#D4AF37]/25">
          <div className="p-2.5 rounded-xl bg-[#801323] text-[#F5D77F] shadow-sm">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-royal text-xl font-bold text-[#801323]">
              Host Administration Portal
            </h3>
            <p className="text-xs text-[#8C6208] font-medium">
              Durgesh Sharma · Wedding Host Access
            </p>
          </div>
        </div>

        {isAdmin ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 border border-emerald-400 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <p className="font-semibold text-sm text-[#2C1810]">
                Logged in as Host
              </p>
              <p className="text-xs text-[#8C6208]">{adminName} (wwwds4994@gmail.com)</p>
            </div>
            <p className="text-xs text-[#78350F] bg-[#FFF8ED] p-3 rounded-lg border border-[#D4AF37]/30">
              You currently have full permissions to add/delete wedding photos in the gallery and delete inappropriate blessings.
            </p>
            <div className="pt-2 flex gap-2">
              <button
                onClick={closeAuthModal}
                className="flex-1 py-2.5 rounded-xl bg-[#801323] text-[#FAF5EB] font-semibold text-xs hover:bg-[#9B192C] transition-colors"
              >
                Close Portal
              </button>
              <button
                onClick={() => {
                  logout();
                  closeAuthModal();
                }}
                className="py-2.5 px-4 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 font-medium text-xs transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <p className="text-xs text-[#78350F] leading-relaxed">
              Login to manage the photo gallery and moderate guest blessings.
            </p>

            {error && (
              <div className="p-2.5 rounded-lg bg-red-50 border border-red-300 text-red-800 text-xs">
                {error}
              </div>
            )}

            {success && (
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Authentication successful! Unlocking host controls...</span>
              </div>
            )}

            <div>
              <label className="block text-[#5C2E0A] font-semibold mb-1">
                Host Email ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="wwwds4994@gmail.com"
                  required
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-[#FFFDF9] border border-[#D4AF37]/50 text-[#2C1810] focus:border-[#801323] focus:outline-none transition-colors"
                />
                <User className="w-4 h-4 text-[#8C6208] absolute left-3 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-[#5C2E0A] font-semibold mb-1">
                Host Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter host password"
                  required
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-[#FFFDF9] border border-[#D4AF37]/50 text-[#2C1810] focus:border-[#801323] focus:outline-none transition-colors"
                />
                <Lock className="w-4 h-4 text-[#8C6208] absolute left-3 top-3" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-[#8C6208] hover:text-[#2C1810]"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#801323] via-[#9B192C] to-[#680E1B] text-[#FFF2B2] font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Verify Host Credentials
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
