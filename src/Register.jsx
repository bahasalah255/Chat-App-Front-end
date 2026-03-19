import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "./useToast";

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getPasswordStrength = () => {
    const len = formData.password.length;
    if (len === 0) return 0;
    if (len < 6) return 1;
    if (len < 10) return 2;
    return 3;
  };

  const strength = getPasswordStrength();
  const strengthLabel = ["", "Faible", "Moyen", "Fort"][strength];
  const strengthColor = strength === 1 ? "#ffbc05" : "#22c55e";

  const validate = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      showToast("Veuillez remplir tous les champs.", "error");
      return false;
    }
    if (formData.password.length < 8) {
      showToast("Le mot de passe doit faire au moins 8 caractères.", "error");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      showToast("Les mots de passe ne correspondent pas !", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    try {
      await axios.post("http://127.0.0.1:8000/api/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });
      showToast("Compte créé avec succès ! 🎉", "success");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setAgreed(false);
      // Wait for toast, then redirect.
      setTimeout(() => navigate('/login'), 1200);
    } catch (error) {
      const msg = error.response?.data?.message || "Erreur, veuillez réessayer.";
      showToast(msg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-4 bg-[#f8f7f4] font-sans text-[#1a1a2e] antialiased">
      <div className="w-full max-w-[380px] bg-white border border-[#e2e0da] rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.06)] z-10">
        <div className="bg-[#f2f1ee] border-b border-[#e2e0da] py-2 px-3 flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="px-6 py-6 flex flex-col items-center">
          <div className="w-9 h-9 bg-[#4F6EF7] rounded-lg flex items-center justify-center mb-3">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2Z" fill="white" />
            </svg>
          </div>
          <h1 className="text-lg font-semibold mb-0.5 text-center">
            Create account
          </h1>
          <p className="text-[12px] text-[#8888aa] mb-5 text-center">
            Join Chattio — it's free
          </p>
          <form className="w-full flex flex-col" onSubmit={handleSubmit}>
            <Field label="Full name">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="flex-1 bg-transparent text-[12px] text-[#1a1a2e] outline-none placeholder-[#8888aa] w-full"
              />
            </Field>
            <Field label="Email address" icon={<EmailIcon />}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="flex-1 bg-transparent text-[12px] text-[#1a1a2e] outline-none placeholder-[#8888aa] w-full"
              />
            </Field>
            <Field label="Password" icon={<LockIcon />}>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="flex-1 bg-transparent text-[12px] text-[#1a1a2e] outline-none placeholder-[#8888aa] w-full"
              />
            </Field>
            {formData.password.length > 0 && (
              <div className="mb-3 -mt-2">
                <div className="flex gap-[3px] mb-1">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className="flex-1 h-[3px] rounded-sm transition-colors duration-300"
                      style={{
                        background: level <= strength ? strengthColor : "#e2e0da",
                      }}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-medium" style={{ color: strengthColor }}>
                  {strengthLabel}
                </span>
              </div>
            )}
            <Field label="Confirm password" icon={<LockIcon />}>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                className="flex-1 bg-transparent text-[12px] text-[#1a1a2e] outline-none placeholder-[#8888aa] w-full"
              />
            </Field>
            <div
              className="w-full flex items-center gap-2 mb-4 cursor-pointer select-none"
              onClick={() => setAgreed(!agreed)}
            >
              <div className={`w-[14px] h-[14px] rounded-[3px] border-[1.5px] flex items-center justify-center shrink-0 transition-colors ${agreed ? "border-[#4F6EF7] bg-[#4F6EF7]" : "border-[#e2e0da] bg-white"}`}>
                {agreed && (
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-[11px] text-[#4a4a6a]">
                I agree to the{" "}
                <a href="#terms" className="text-[#4F6EF7] font-medium hover:underline" onClick={(e) => e.stopPropagation()}>Terms</a>
                {" "}and{" "}
                <a href="#privacy" className="text-[#4F6EF7] font-medium hover:underline" onClick={(e) => e.stopPropagation()}>Privacy Policy</a>
              </span>
            </div>
            <button
              type="submit"
              disabled={!agreed || isLoading}
              className="w-full h-[38px] bg-[#4F6EF7] text-white rounded-[8px] text-[13px] font-semibold cursor-pointer mb-3 flex items-center justify-center gap-1.5 shadow-[0_2px_10px_rgba(79,110,247,0.15)] transition-all active:translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                "Create account"
              )}
            </button>
            <div className="flex items-center gap-2.5 w-full mb-3">
              <div className="flex-1 h-[0.5px] bg-[#e2e0da]" />
              <span className="text-[11px] text-[#8888aa]">or continue with</span>
              <div className="flex-1 h-[0.5px] bg-[#e2e0da]" />
            </div>
            <button
              type="button"
              onClick={() => console.log("Google login — pas encore implémenté")}
              className="w-full h-[36px] bg-white border border-[#e2e0da] rounded-[8px] text-[12px] font-medium text-[#4a4a6a] cursor-pointer flex items-center justify-center gap-2 mb-4 hover:bg-gray-50 active:translate-y-[1px] transition-all"
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <p className="text-[12px] text-[#8888aa] text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-[#4F6EF7] font-medium hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, icon, children }) => (
  <div className="w-full mb-3">
    <label className="text-[11px] font-medium text-[#4a4a6a] mb-1 block">
      {label}
    </label>
    <div className="w-full h-[36px] border border-[#e2e0da] rounded-lg bg-[#fdfcf9] px-2.5 flex items-center gap-1.5 focus-within:border-[#4F6EF7] focus-within:bg-[#eef1fe] transition-colors group">
      {icon && (
        <span className="text-[#8888aa] group-focus-within:text-[#4F6EF7] transition-colors shrink-0">
          {icon}
        </span>
      )}
      {children}
    </div>
  </div>
);

const EmailIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 6L12 13L22 6" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const LockIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default Register;
