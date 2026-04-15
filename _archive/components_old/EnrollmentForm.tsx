"use client";

import { useState, FormEvent } from "react";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";
import { ChevronRight, ArrowLeft, Loader2, PartyPopper } from "lucide-react";
import Link from "next/link";

export default function EnrollmentForm() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    dob: "",
    gender: "",
    address: "",
    course: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.mobile.trim()) errs.mobile = "Mobile is required.";
    else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) errs.mobile = "Valid mobile required.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required.";
    if (!form.dob) errs.dob = "DOB required.";
    if (!form.gender) errs.gender = "Gender required.";
    if (!form.address) errs.address = "Address required.";
    if (!form.course) errs.course = "Course required.";
    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputCls = (name: string) =>
    `w-full h-11 rounded-lg border border-white/20 bg-white/5 px-4 text-sm font-medium text-white outline-none transition-all duration-200 placeholder-white/40 focus:border-blue-500 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/20 backdrop-blur-md ${
      errors[name] ? "border-red-500 bg-red-500/10" : "hover:border-white/30"
    }`;

  const labelCls = "block text-[11px] font-bold uppercase tracking-wider mb-1.5 text-white/70";

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 bg-slate-950 text-white overflow-hidden font-sans">
      <AnimatedGradientBackground Breathing={true} />
      
      {/* Absolute Header */}
      <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-6 py-5">
        <Link href="/" className="group flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:text-blue-400">
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Tech Driving</span>
        </Link>
      </nav>

      <main className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center my-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3 text-white">Join Tech Driving</h1>
          <p className="text-sm font-medium text-white/60">Fill out this quick form to begin your expert training.</p>
        </div>

        {submitted ? (
          <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/5 p-12 text-center backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-8">
              <PartyPopper className="w-10 h-10 text-blue-400" />
            </div>
            <h2 className="text-3xl font-black mb-4 text-white">Application Sent!</h2>
            <p className="text-base text-white/60 leading-relaxed mb-10">
              We'll review your details and call you at <br/><span className="font-bold text-blue-400 text-lg">{form.mobile}</span> soon.
            </p>
            <button onClick={() => setSubmitted(false)} className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              Submit Another
            </button>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit}
            className="w-full rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(0,0,0,0.3)] p-8 sm:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
              <div>
                <label className={labelCls}>Name</label>
                <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. John Doe" className={inputCls("name")} />
                {errors.name && <p className="mt-1.5 text-[10px] font-bold text-red-400 uppercase">{errors.name}</p>}
              </div>
              <div>
                <label className={labelCls}>Mobile Number</label>
                <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="10-digit number" maxLength={10} className={inputCls("mobile")} />
                {errors.mobile && <p className="mt-1.5 text-[10px] font-bold text-red-400 uppercase">{errors.mobile}</p>}
              </div>
              
              <div>
                <label className={labelCls}>Email <span className="opacity-50 font-normal normal-case ml-1">(Optional)</span></label>
                <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" className={inputCls("email")} />
                {errors.email && <p className="mt-1.5 text-[10px] font-bold text-red-400 uppercase">{errors.email}</p>}
              </div>
              <div>
                <label className={labelCls}>Date of Birth</label>
                <input name="dob" type="date" value={form.dob} onChange={handleChange} className={inputCls("dob")} />
                {errors.dob && <p className="mt-1.5 text-[10px] font-bold text-red-400 uppercase">{errors.dob}</p>}
              </div>

              <div className="md:col-span-2 pt-2">
                <label className={labelCls}>Gender</label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {["Male", "Female", "Other"].map(g => (
                    <label key={g} className="flex flex-1 items-center justify-center p-3 rounded-lg border border-white/20 bg-white/5 cursor-pointer group transition-all hover:bg-white/10 has-[:checked]:bg-blue-600/20 has-[:checked]:border-blue-500/50">
                      <div className={`mr-3 w-4 h-4 rounded-full border-2 flex flex-shrink-0 items-center justify-center transition-all ${
                          form.gender === g ? "border-blue-400 bg-blue-500" : "border-white/30 group-hover:border-blue-400"
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-white transition-all ${form.gender === g ? "scale-100" : "scale-0"}`} />
                      </div>
                      <span className={`text-sm font-medium ${form.gender === g ? "text-white" : "text-white/60 group-hover:text-white/80"}`}>
                        {g}
                      </span>
                      <input type="radio" name="gender" className="hidden" checked={form.gender === g} onChange={() => setForm(f => ({ ...f, gender: g }))} />
                    </label>
                  ))}
                </div>
                {errors.gender && <p className="mt-1.5 text-[10px] font-bold text-red-400 uppercase">{errors.gender}</p>}
              </div>

              <div className="md:col-span-2 pt-2">
                <label className={labelCls}>Address</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Full residential address" className={inputCls("address")} />
                {errors.address && <p className="mt-1.5 text-[10px] font-bold text-red-400 uppercase">{errors.address}</p>}
              </div>

              <div className="md:col-span-2 pt-2 mb-2">
                <label className={labelCls}>Course Selection</label>
                <select name="course" value={form.course} onChange={handleChange} className={`${inputCls("course")} appearance-none`}>
                  <option value="" className="text-black">Select a course</option>
                  <option value="Beginner" className="text-black">Beginner (12 Sessions)</option>
                  <option value="Advanced" className="text-black">Advanced (20 Sessions)</option>
                  <option value="Pro" className="text-black">Pro Track (Unlimited)</option>
                </select>
                {errors.course && <p className="mt-1.5 text-[10px] font-bold text-red-400 uppercase">{errors.course}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full h-14 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-black text-sm uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-[0.98]"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <><ChevronRight className="w-5 h-5" /> Finalize Enrollment</>}
              </span>
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
