import React from 'react';
import { Link } from 'react-router-dom';
import { Upload, LogIn, FileText, Clock, AlertTriangle, Stethoscope, Smartphone } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  MediTrack
                </h1>
                <p className="text-xl md:text-2xl text-blue-600 font-medium">
                  Smart Prescription & Reminder System
                </p>
                <p className="text-lg text-gray-600 max-w-lg">
                  Never miss a dose again. Our AI-powered system reads your prescriptions 
                  and creates intelligent reminders to keep you healthy and safe.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/upload"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Upload className="h-5 w-5" />
                  <span>Upload Prescription</span>
                </Link>
                <button className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-all duration-300 flex items-center justify-center space-x-2">
                  <LogIn className="h-5 w-5" />
                  <span>Login / Sign Up</span>
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Stethoscope className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Dr. Sarah Johnson</h3>
                    <p className="text-gray-600">Internal Medicine</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="text-sm text-gray-600 mb-2">Prescription for:</div>
                  <div className="font-medium text-gray-900">John Doe</div>
                  <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                    <div>
                      <div className="text-gray-500">Medicine</div>
                      <div className="font-medium">Amoxicillin</div>
                    </div>
                    <div>
                      <div className="text-gray-500">Dosage</div>
                      <div className="font-medium">500mg</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-6 w-6 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">
                    Smart reminders activated
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MediTrack?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Advanced AI technology meets healthcare expertise to provide you with 
              the most reliable prescription management system.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                  <FileText className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  AI Reads Your Prescription
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Advanced optical character recognition and medical AI extract medicine 
                  details with 99.9% accuracy from any prescription format.
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                  <Clock className="h-8 w-8 text-green-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  Automatic Medicine Reminders
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Personalized notifications via app, SMS, and email ensure you never 
                  miss a dose. Smart scheduling adapts to your routine.
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-yellow-100 p-4 rounded-full w-16 h-16 mx-auto mb-6 group-hover:bg-yellow-200 transition-colors">
                  <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  Overdose Prevention Alerts
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Real-time monitoring prevents dangerous drug interactions and overdoses 
                  with instant alerts and safety recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Managing Your Health Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust MediTrack for their medication management. 
            Upload your first prescription in seconds.
          </p>
          <Link
            to="/upload"
            className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg"
          >
            <Upload className="h-5 w-5" />
            <span>Get Started Now</span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;