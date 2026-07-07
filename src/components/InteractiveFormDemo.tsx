import React, { useState, useEffect } from 'react';
import { Mail, User, Lock, AlertTriangle, ShieldCheck, CheckCircle2, RotateCcw, Eye, EyeOff, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { FormValues, FormErrors } from '../types';

export default function InteractiveFormDemo() {
  const [formValues, setFormValues] = useState<FormValues>({
    fullName: '',
    email: '',
    password: '',
    category: '',
    agreeToTerms: false,
    honeypot: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    text: string;
    color: string;
    checks: { length: boolean; number: boolean; special: boolean; upper: boolean };
  }>({
    score: 0,
    text: 'Empty',
    color: 'bg-slate-200',
    checks: { length: false, number: false, special: false, upper: false },
  });

  // Analyze password strength whenever password input changes
  useEffect(() => {
    const p = formValues.password;
    const checks = {
      length: p.length >= 8,
      number: /[0-9]/.test(p),
      special: /[^A-Za-z0-9]/.test(p),
      upper: /[A-Z]/.test(p),
    };

    let score = 0;
    if (checks.length) score += 1;
    if (checks.number) score += 1;
    if (checks.special) score += 1;
    if (checks.upper) score += 1;

    let text = 'Weak';
    let color = 'bg-red-500';
    if (p.length === 0) {
      text = 'Empty';
      color = 'bg-slate-200';
    } else if (score === 2) {
      text = 'Moderate';
      color = 'bg-amber-500';
    } else if (score === 3) {
      text = 'Strong';
      color = 'bg-emerald-500';
    } else if (score === 4) {
      text = 'Fortified';
      color = 'bg-indigo-500';
    }

    setPasswordStrength({ score, text, color, checks });
  }, [formValues.password]);

  // Handle Input Changes with Real-time Validation Clears
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormValues((prev) => ({
      ...prev,
      [name]: val,
    }));

    // Clear specific error upon typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Main client side validator
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 1. Full name validation
    if (!formValues.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    } else if (formValues.fullName.trim().length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }

    // 2. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formValues.email)) {
      newErrors.email = 'Please provide a valid email format';
    }

    // 3. Password validation
    if (!formValues.password) {
      newErrors.password = 'Security password is required';
    } else if (formValues.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // 4. Category selection validation
    if (!formValues.category) {
      newErrors.category = 'Please select a preferred category';
    }

    // 5. Terms checkbox
    if (!formValues.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-spam Honeypot Check!
    if (formValues.honeypot) {
      alert('Spam bot detected! Honeypot filled.');
      return;
    }

    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate real API network request
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
      }, 1500);
    }
  };

  const resetForm = () => {
    setFormValues({
      fullName: '',
      email: '',
      password: '',
      category: '',
      agreeToTerms: false,
      honeypot: '',
    });
    setErrors({});
    setSubmitSuccess(false);
  };

  return (
    <div id="form-demo" className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
          <div>
            <h3 className="text-lg font-bold font-display text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-accent-500" />
              Secure Validation Studio
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Secure client-side sanitization, live criteria tracking, anti-spam honeypot layers, and fluid transitions.
            </p>
          </div>

          {submitSuccess && (
            <button
              id="reset-form-btn"
              onClick={resetForm}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Form
            </button>
          )}
        </div>

        {/* Dynamic Canvas Container */}
        <div className="bg-slate-50 border border-slate-200/50 rounded-xl p-6 min-h-[440px] flex flex-col justify-center">
          
          <AnimatePresence mode="wait">
            {!submitSuccess ? (
              <motion.div
                key="form-entry-canvas"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="max-w-md mx-auto w-full bg-white rounded-xl border border-slate-200/80 shadow-md p-6"
              >
                <div className="mb-4">
                  <h4 className="text-sm font-bold text-slate-800 font-display">Client Registration</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Complete registration. Honeypots remain invisible.</p>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  
                  {/* Honeypot Field (Hidden from user, catches spam-bots) */}
                  <div className="hidden">
                    <label htmlFor="honeypot" className="text-xs">Do not fill this if you are human:</label>
                    <input
                      id="honeypot"
                      type="text"
                      name="honeypot"
                      value={formValues.honeypot}
                      onChange={handleInputChange}
                      autoComplete="off"
                    />
                  </div>

                  {/* Input 1: Full name */}
                  <div className="space-y-1">
                    <label htmlFor="fullName" className="text-xs font-bold text-slate-600 block">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        id="fullName"
                        type="text"
                        name="fullName"
                        placeholder="John Doe"
                        value={formValues.fullName}
                        onChange={handleInputChange}
                        className={`w-full text-xs pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.fullName
                            ? 'border-red-300 focus:ring-red-100 bg-red-50/10'
                            : 'border-slate-200 focus:border-slate-900 focus:ring-slate-100 bg-white'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <div className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{errors.fullName}</span>
                      </div>
                    )}
                  </div>

                  {/* Input 2: Email */}
                  <div className="space-y-1">
                    <label htmlFor="email" className="text-xs font-bold text-slate-600 block">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={formValues.email}
                        onChange={handleInputChange}
                        className={`w-full text-xs pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-red-300 focus:ring-red-100 bg-red-50/10'
                            : 'border-slate-200 focus:border-slate-900 focus:ring-slate-100 bg-white'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <div className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Input 3: Password */}
                  <div className="space-y-1">
                    <label htmlFor="password" className="text-xs font-bold text-slate-600 block">
                      Security Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Lock className="w-4 h-4" />
                      </div>
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="••••••••"
                        value={formValues.password}
                        onChange={handleInputChange}
                        className={`w-full text-xs pl-9 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                          errors.password
                            ? 'border-red-300 focus:ring-red-100 bg-red-50/10'
                            : 'border-slate-200 focus:border-slate-900 focus:ring-slate-100 bg-white'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Real-time password strength meter */}
                    {formValues.password.length > 0 && (
                      <div className="pt-1.5 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-medium">
                          <span className="text-slate-400">Complexity Index:</span>
                          <span className="text-slate-800 font-bold font-mono uppercase">{passwordStrength.text}</span>
                        </div>
                        {/* Dynamic Progress Bar */}
                        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                            style={{ width: `${(passwordStrength.score / 4) * 100}%` }}
                          />
                        </div>
                        {/* Checklist Indicators */}
                        <div className="grid grid-cols-2 gap-1.5 pt-1">
                          {[
                            { key: 'length', text: 'Min 8 characters' },
                            { key: 'number', text: 'Includes numeric digit' },
                            { key: 'upper', text: 'Capital letter' },
                            { key: 'special', text: 'Special character' },
                          ].map((check) => (
                            <div key={check.key} className="flex items-center gap-1">
                              <div className={`w-1.5 h-1.5 rounded-full ${passwordStrength.checks[check.key as keyof typeof passwordStrength.checks] ? 'bg-emerald-500' : 'bg-slate-200'}`} />
                              <span className={`text-[9px] ${passwordStrength.checks[check.key as keyof typeof passwordStrength.checks] ? 'text-emerald-600 font-medium' : 'text-slate-400'}`}>
                                {check.text}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {errors.password && (
                      <div className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{errors.password}</span>
                      </div>
                    )}
                  </div>

                  {/* Input 4: Select Category */}
                  <div className="space-y-1">
                    <label htmlFor="category" className="text-xs font-bold text-slate-600 block">
                      Preferred Interface
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formValues.category}
                      onChange={handleInputChange}
                      className={`w-full text-xs px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all bg-white ${
                        errors.category
                          ? 'border-red-300 focus:ring-red-100'
                          : 'border-slate-200 focus:border-slate-900 focus:ring-slate-100'
                      }`}
                    >
                      <option value="">Choose category...</option>
                      <option value="minimal">Minimal Single-View SPA</option>
                      <option value="bento">Bento Dashboard Platform</option>
                      <option value="enterprise">Full-Stack Cloud Core</option>
                    </select>
                    {errors.category && (
                      <div className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{errors.category}</span>
                      </div>
                    )}
                  </div>

                  {/* Input 5: Checkbox Terms */}
                  <div className="space-y-1">
                    <label className="flex items-start gap-2 text-[11px] text-slate-500 cursor-pointer select-none">
                      <input
                        id="agreeToTerms"
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formValues.agreeToTerms}
                        onChange={handleInputChange}
                        className="mt-0.5 rounded border-slate-200 text-slate-900 focus:ring-slate-900 accent-slate-900"
                      />
                      <span>I authorize client-side validation processes to catalog input arrays locally.</span>
                    </label>
                    {errors.agreeToTerms && (
                      <div className="flex items-center gap-1 text-[10px] text-red-500 font-medium">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>{errors.agreeToTerms}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit CTA button */}
                  <button
                    id="submit-register-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 mt-4 bg-slate-900 text-white py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-800 disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Validating Credentials...</span>
                      </>
                    ) : (
                      <span>Complete Registration</span>
                    )}
                  </button>

                </form>
              </motion.div>
            ) : (
              // SUBMIT SUCCESS VIEW
              <motion.div
                key="form-success-canvas"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-md mx-auto w-full bg-white rounded-xl border border-slate-200/80 shadow-lg p-8 text-center space-y-4"
              >
                <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-base font-bold font-display text-slate-900 leading-tight">Data Array Cataloged</h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    Client credentials successfully parsed, passed client-side security loops, and registered in-memory.
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-lg p-3 text-left font-mono text-[10px] text-slate-500 space-y-1.5">
                  <div><span className="text-slate-400">Node Full Name:</span> {formValues.fullName}</div>
                  <div><span className="text-slate-400">Verified Email:</span> {formValues.email}</div>
                  <div><span className="text-slate-400">Interface Preference:</span> {formValues.category}</div>
                  <div><span className="text-slate-400">Honeypot State:</span> Empty (Spam Block Verified)</div>
                </div>

                <button
                  id="success-new-btn"
                  onClick={resetForm}
                  className="w-full bg-slate-100 text-slate-700 py-2 rounded-lg text-xs font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
                >
                  Create Another Node Record
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Security Metrics & Anti-Spam Logger Overlay */}
        <div className="mt-5 border-t border-slate-100 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Bot className="w-4 h-4 text-indigo-500" />
            <span>Anti-Spam Security Indicator:</span>
            <span className="text-slate-700 font-bold font-mono">Honeypot Active</span>
          </div>
          <div className="text-[10px] text-slate-400 italic">
            Validation cycles execute natively in user's viewport without network leaks.
          </div>
        </div>

      </div>

      {/* Form and client validation best practices checklist */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-6">
        <h4 className="text-sm font-bold font-display text-slate-900 mb-4 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          Forms & Secure Validation Core Directives
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Instant Real-time Visual Helpers</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Provide live progress and validation markers as users type. Highlighting rules dynamically (like password strength) removes the friction of waiting for a submit to find errors.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Clear Action Feedback States</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Disable action triggers and inject explicit progress spinners during form loading stages. This prevents users from initiating double requests that clog databases.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Anti-Spam Honeypots</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Utilize invisible visual fields to intercept malicious bots without degrading the human workflow. Bots will fill in inputs containing normal keys while real users remain blissfully unaware.
              </p>
            </div>
          </div>
          <div className="flex gap-2.5 items-start">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold text-slate-800">Preserve Form State Context</h5>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Keep validated input values intact if errors occur. Wiping input fields forces users to repeat work, which drastically lowers conversion rates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
