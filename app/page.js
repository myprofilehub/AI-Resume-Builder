'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, LayoutTemplate, Download, CheckCircle, Zap } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-950 text-white">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-gray-900 to-black"></div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[100px]"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -left-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[100px]"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-gray-300">New: AI Portfolio Generator</span>
            </motion.div>

            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl font-heading font-extrabold tracking-tight mb-8 leading-tight">
              Build your legacy <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">in seconds.</span>
            </motion.h1>

            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              The most advanced resume builder on the web. Create ATS-friendly resumes and stunning portfolio websites with a single click.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <Zap size={20} className="fill-current" />
                Start Building Free
              </Link>
              <Link
                href="/login"
                className="px-8 py-4 bg-white/5 text-white backdrop-blur-md border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center"
              >
                Login to Account
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-b border-gray-100 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-6">Trusted by professionals at</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Google', 'Microsoft', 'Spotify', 'Amazon', 'Netflix'].map(brand => (
              <span key={brand} className="text-xl font-bold text-gray-800">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-heading">Everything you need to <br /> land the job.</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">More than just a resume builder. A complete career toolkit.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div whileHover={{ y: -10 }} className="p-8 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                <FileText />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">Smart Editor</h3>
              <p className="text-gray-600 leading-relaxed">
                Real-time preview, drag-and-drop sections, and AI-powered suggestions to help you write better bullet points.
              </p>
            </motion.div>

            {/* Feature 2: Large Span */}
            <motion.div whileHover={{ y: -10 }} className="md:col-span-2 p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl shadow-xl shadow-gray-900/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="flex-[2]">
                  <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 text-3xl backdrop-blur-md">
                    <LayoutTemplate />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-heading">Instant Portfolio Website</h3>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Don't just send a PDF. Send a link. We automatically generate a personal website from your resume data, hosted for free.
                  </p>
                </div>
                <div className="flex-1 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10 mt-6 md:mt-0 w-full">
                  <div className="space-y-3">
                    <div className="h-2 w-1/3 bg-white/20 rounded"></div>
                    <div className="h-2 w-2/3 bg-white/20 rounded"></div>
                    <div className="h-2 w-1/2 bg-white/20 rounded"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div whileHover={{ y: -10 }} className="p-8 bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 text-3xl">
                <Download />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 font-heading">ATS-Ready PDF</h3>
              <p className="text-gray-600 leading-relaxed">
                Export pixel-perfect PDFs that pass Applicant Tracking Systems (ATS) and look great on any device.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div whileHover={{ y: -10 }} className="md:col-span-2 p-8 bg-blue-600 text-white rounded-3xl shadow-xl shadow-blue-500/20 relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-4 font-heading flex items-center gap-3">
                    <CheckCircle className="text-blue-200" />
                    Review & Feedback
                  </h3>
                  <p className="text-blue-100 leading-relaxed text-lg">
                    Get instant feedback on your resume. Our evaluator checks for formatting, keyword optimization, and clarity.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-500">
          <p className="mb-4 md:mb-0 font-medium">© {new Date().getFullYear()} ResumeAI. Crafted for success.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Terms</a>
            <a href="#" className="hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
