"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { 
  User, 
  MapPin, 
  Car, 
  FileText, 
  ChevronRight, 
  ArrowLeft,
  Loader2,
  PartyPopper
} from "lucide-react";
import { useTheme } from "next-themes";

interface FormData {
  fullName: string;
  mobile: string;
  email: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  vehicleType: string;
  learningType: string;
  batchTime: string;
  hasLicense: string;
  licenseNumber: string;
  startDate: string;
  notes: string;
}

interface Errors {
  [key: string]: string;
}

const initialForm: FormData = {
  fullName: "",
  mobile: "",
  email: "",
  dob: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  vehicleType: "",
  learningType: "",
  batchTime: "",
  hasLicense: "",
  licenseNumber: "",
  startDate: "",
  notes: "",
};

export default function EnrollPage() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const validate = (): Errors => {
    const errs: Errors = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required.";
    if (!form.mobile.trim()) errs.mobile = "Mobile number is required.";
    else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) errs.mobile = "Valid mobile required.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required.";
    if (!form.dob) errs.dob = "DOB required.";
    if (!form.gender) errs.gender = "Gender required.";
    if (!form.vehicleType) errs.vehicleType = "Selection required.";
    if (!form.learningType) errs.learningType = "Selection required.";
    if (!form.batchTime) errs.batchTime = "Selection required.";
    if (!form.hasLicense) errs.hasLicense = "Selection required.";
    if (form.hasLicense === "Yes" && !form.licenseNumber.trim()) errs.licenseNumber = "LL Number required.";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const first = document.querySelector("[data-error]");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  // Design Tokens
  const accentColor = "blue-600";
  const accentBorder = "focus:border-blue-600 focus:ring-blue-600/20";
  const accentBg = "bg-blue-600 hover:bg-blue-700";

  const inputCls = (name: string) =>
    `w-full h-11 rounded-lg border px-4 text-sm font-medium outline-none transition-all duration-200 ${
      theme === 'dark' 
        ? "bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-4" 
        : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-4"
    } ${accentBorder} ${
      errors[name] ? "border-red-500 bg-red-50/10" : "hover:border-slate-300 dark:hover:border-slate-600"
    }`;

  const labelCls = `block text-[11px] font-bold uppercase tracking-wider mb-1.5 ${
    theme === 'dark' ? "text-slate-400" : "text-slate-500"
  }`;

  return (
    <div className="min-h-screen relative overflow-x-hidden font-sans selection:bg-amber-400/30">
      <AnimatedGradientBackground Breathing={true} />

      {/* Header - Minimal */}
      <nav className="relative z-20 flex items-center justify-between px-6 md:px-12 py-5 lg:py-6">
        <Link href="/" className="group flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300">
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span className={theme === 'dark' ? "text-white/80 group-hover:text-blue-400" : "text-slate-600 group-hover:text-blue-600"}>Tech Driving</span>
        </Link>
        <div className="hidden sm:flex items-center gap-2">
          <span className={`text-[9px] tracking-[0.2em] uppercase font-bold opacity-40 ${theme === 'dark' ? "text-white" : "text-slate-600"}`}>Enrollment Portal</span>
        </div>
      </nav>

      {/* Main Form Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pb-12">
        
        {/* Compact Title Section */}
        <div className="text-center mb-6">
          <h1 className={`text-3xl md:text-3xl font-black tracking-tight mb-1 ${theme === 'dark' ? "text-white" : "text-slate-900"}`}>
            Driver Enrollment
          </h1>
          <p className={`text-xs font-medium ${theme === 'dark' ? "text-slate-400" : "text-slate-500"}`}>
            Complete the form to start your expert training.
          </p>
        </div>

        {submitted ? (
          /* Success Card */
          <div className={`w-full max-w-[500px] rounded-2xl border shadow-2xl p-10 text-center animate-in fade-in zoom-in duration-500 ${
            theme === 'dark' ? "bg-slate-900 border-slate-800" : "bg-white border-slate-100"
          }`}>
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-6">
              <PartyPopper className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className={`text-2xl font-black mb-3 ${theme === 'dark' ? "text-white" : "text-slate-900"}`}>Application Sent!</h2>
            <p className={`text-sm leading-relaxed mb-8 ${theme === 'dark' ? "text-slate-400" : "text-slate-500"}`}>
              Thank you for choosing Tech Driving. Our counselor will contact you at <span className="font-bold text-blue-600">{form.mobile}</span> within 24 hours.
            </p>
            <Link 
              href="/" 
              className={`block w-full py-3.5 rounded-xl text-white text-xs font-black uppercase tracking-widest transition-all duration-300 ${accentBg}`}
            >
              Return Home
            </Link>
          </div>
        ) : (
          /* Enrollment Card - Clean Minimal */
          <form 
            onSubmit={handleSubmit} 
            noValidate 
            className={`w-full max-w-[900px] rounded-2xl border shadow-2xl transition-all duration-500 p-8 md:p-10 ${
              theme === 'dark' ? "bg-slate-900 border-slate-800 shadow-black/20" : "bg-white border-slate-100 shadow-slate-200/40"
            }`}
          >
            {/* Field Grid */}
            <div className="space-y-5">
              
              {/* Row 1: Name | Mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className={labelCls}>Full Name</label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="e.g. Raj Patel" className={inputCls("fullName")} />
                  {errors.fullName && <p className="mt-1 text-[9px] font-bold text-red-500 uppercase">{errors.fullName}</p>}
                </div>
                <div>
                  <label className={labelCls}>Mobile Number</label>
                  <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="10-digit mobile" maxLength={10} className={inputCls("mobile")} />
                  {errors.mobile && <p className="mt-1 text-[9px] font-bold text-red-500 uppercase">{errors.mobile}</p>}
                </div>
              </div>

              {/* Row 2: Email | DOB */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label className={labelCls}>Email Address <span className="opacity-40 font-normal ml-1">(Optional)</span></label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@email.com" className={inputCls("email")} />
                  {errors.email && <p className="mt-1 text-[9px] font-bold text-red-500 uppercase">{errors.email}</p>}
                </div>
                <div>
                  <label className={labelCls}>Date of Birth</label>
                  <input name="dob" type="date" value={form.dob} onChange={handleChange} className={inputCls("dob")} />
                  {errors.dob && <p className="mt-1 text-[9px] font-bold text-red-500 uppercase">{errors.dob}</p>}
                </div>
              </div>

              {/* Row 3: Gender (Full Width) */}
              <div>
                <label className={labelCls}>Gender</label>
                <div className={`flex p-1 rounded-xl gap-1 border transition-colors ${
                  theme === 'dark' ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"
                }`}>
                  {["Male", "Female", "Other"].map(g => (
                    <button 
                      key={g} 
                      type="button"
                      onClick={() => setForm(f => ({ ...f, gender: g }))}
                      className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all duration-200 ${
                        form.gender === g 
                          ? `bg-white dark:bg-slate-700 shadow-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}` 
                          : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
                {errors.gender && <p className="mt-1 text-[9px] font-bold text-red-500 uppercase">{errors.gender}</p>}
              </div>

              {/* Row 4: Address (Full Width) */}
              <div>
                <label className={labelCls}>Residential Address</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Building, Street, Area..." className={inputCls("address")} />
              </div>

              {/* Row 5: Training Selections (Grid) */}
              <div className="pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                  <div>
                    <label className={labelCls}>Vehicle</label>
                    <select name="vehicleType" value={form.vehicleType} onChange={handleChange} className={inputCls("vehicleType")}>
                      <option value="">Select</option>
                      <option value="2W">2 Wheeler</option>
                      <option value="4W">4 Wheeler</option>
                      <option value="Both">Both</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Expertise</label>
                    <select name="learningType" value={form.learningType} onChange={handleChange} className={inputCls("learningType")}>
                      <option value="">Select</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Pro</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Preferred Slot</label>
                    <select name="batchTime" value={form.batchTime} onChange={handleChange} className={inputCls("batchTime")}>
                      <option value="">Select</option>
                      <option>Morning</option>
                      <option>Afternoon</option>
                      <option>Evening</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section: Secondary (Compact) */}
              <div className={`grid grid-cols-1 ${form.hasLicense === 'Yes' ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4 md:gap-6 pt-2 border-t border-slate-100 dark:border-slate-800 mt-2`}>
                <div className="flex flex-col gap-1.5">
                  <label className={labelCls}>Have Learner's License?</label>
                  <div className="flex gap-4">
                    {["Yes", "No"].map(opt => (
                      <label key={opt} className="flex items-center gap-2 cursor-pointer group">
                        <div 
                          onClick={() => setForm(f => ({ ...f, hasLicense: opt }))}
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                            form.hasLicense === opt ? "border-blue-600 bg-blue-600" : "border-slate-300 dark:border-slate-700 hover:border-blue-400"
                          }`}
                        >
                          <div className={`w-2 h-2 rounded-full bg-white transition-transform ${form.hasLicense === opt ? "scale-100" : "scale-0"}`} />
                        </div>
                        <span className={`text-[13px] font-medium transition-colors ${form.hasLicense === opt ? "text-slate-900 dark:text-white" : "text-slate-500 group-hover:text-slate-700"}`} onClick={() => setForm(f => ({ ...f, hasLicense: opt }))}>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {form.hasLicense === "Yes" && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className={labelCls}>LL Number</label>
                    <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} placeholder="GJ01-2024..." className={inputCls("licenseNumber")} />
                  </div>
                )}

                <div>
                  <label className={labelCls}>Planned Start Date</label>
                  <input name="startDate" type="date" value={form.startDate} onChange={handleChange} className={inputCls("startDate")} />
                </div>
              </div>

              {/* Submit Section */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full h-12 rounded-xl text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg transition-all duration-300 ${accentBg} hover:shadow-blue-600/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Enroll Now
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </span>
                </button>
                <div className="mt-4 flex items-center justify-center gap-5 opacity-40">
                  <span className={`text-[8px] font-bold uppercase tracking-widest ${theme === 'dark' ? "text-white" : "text-slate-900"}`}>Trust</span>
                  <div className="w-1 h-1 rounded-full bg-slate-400" />
                  <span className={`text-[8px] font-bold uppercase tracking-widest ${theme === 'dark' ? "text-white" : "text-slate-900"}`}>Quality</span>
                  <div className="w-1 h-1 rounded-full bg-slate-400" />
                  <span className={`text-[8px] font-bold uppercase tracking-widest ${theme === 'dark' ? "text-white" : "text-slate-900"}`}>Elite</span>
                </div>
              </div>

            </div>
          </form>
        )}
      </main>

      {/* Footer - Minimal */}
      <footer className="relative z-10 text-center pb-8 pt-4">
        <p className={`text-[10px] font-black tracking-[0.4em] uppercase opacity-20 ${theme === 'dark' ? "text-white" : "text-slate-900"}`}>
          Elite Tier Academy
        </p>
      </footer>
    </div>
  );
}
