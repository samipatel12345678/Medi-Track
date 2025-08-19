import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, AlertTriangle, Clock, Pill, Edit, CheckCircle } from 'lucide-react';
import { usePrescription } from '../context/PrescriptionContext';
import { Medicine } from '../types/prescription';

const SummaryPage: React.FC = () => {
  const navigate = useNavigate();
  const { prescriptionData, updateMedicine } = usePrescription();

  const [showToast, setShowToast] = useState(false);

  // Redirect if no prescription data
  if (!prescriptionData) {
    navigate('/upload');
    return null;
  }

  const { medicines } = prescriptionData;

  const toggleReminder = (id: number) => {
    const medicine = medicines.find(med => med.id === id);
    if (medicine) {
      updateMedicine(id, { reminderSet: !medicine.reminderSet });
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const allRemindersSet = medicines.every(med => med.reminderSet);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-green-100 p-3 rounded-full w-16 h-16 mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600 mx-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Prescription Analysis Complete
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI has successfully extracted the following information from your prescription.
            Please review and set up reminders for your medications.
          </p>
        </div>

        {/* Overdose Warning Banner */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-r-xl">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Important Safety Information
              </h3>
              <ul className="text-yellow-800 space-y-1">
                <li>• Do not exceed the prescribed dosage of Paracetamol (max 3g/day)</li>
                <li>• Take Amoxicillin with food to avoid stomach upset</li>
                <li>• Complete the full course of antibiotics even if you feel better</li>
                <li>• Consult your doctor if you experience any unusual side effects</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Medicine Table */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-green-600 p-6">
                <h2 className="text-2xl font-bold text-white mb-2">Prescription Details</h2>
                <p className="text-blue-100">{prescriptionData.doctorName} • {prescriptionData.doctorSpecialty}</p>
                <p className="text-blue-100 text-sm mt-1">Patient: {prescriptionData.patientName}</p>
              </div>
              
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-2 font-semibold text-gray-900">Medicine</th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-900">Dosage</th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-900">Frequency</th>
                        <th className="text-left py-3 px-2 font-semibold text-gray-900">Duration</th>
                        <th className="text-center py-3 px-2 font-semibold text-gray-900">Reminders</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicines.map((medicine) => (
                        <tr key={medicine.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-2">
                            <div className="flex items-center space-x-3">
                              <div className="bg-blue-100 p-2 rounded-lg">
                                <Pill className="h-4 w-4 text-blue-600" />
                              </div>
                              <span className="font-medium text-gray-900">{medicine.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-2 text-gray-700">{medicine.dosage}</td>
                          <td className="py-4 px-2 text-gray-700">{medicine.frequency}</td>
                          <td className="py-4 px-2 text-gray-700">{medicine.duration}</td>
                          <td className="py-4 px-2 text-center">
                            <button
                              onClick={() => toggleReminder(medicine.id)}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto ${
                                medicine.reminderSet
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                  : 'bg-gray-100 text-gray-600 hover:bg-blue-100 hover:text-blue-800'
                              }`}
                            >
                              <Bell className="h-4 w-4" />
                              <span>{medicine.reminderSet ? 'Set' : 'Set Reminder'}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Important Notes */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Edit className="h-5 w-5 text-blue-600" />
                <span>Important Notes</span>
              </h3>
              {prescriptionData.importantNotes.length > 0 ? (
                <div className="space-y-3">
                  {prescriptionData.importantNotes.map((note, index) => (
                    <div key={index} className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <p className="text-sm text-yellow-800">{note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No additional notes provided</p>
                </div>
              )}
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center space-x-2">
                <Clock className="h-5 w-5 text-green-600" />
                <span>Next Steps</span>
              </h3>
              <div className="space-y-4">
                <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                  allRemindersSet ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                }`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    allRemindersSet ? 'bg-green-600' : 'bg-gray-300'
                  }`}>
                    {allRemindersSet ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-white text-sm font-bold">1</span>
                    )}
                  </div>
                  <span className={`font-medium ${
                    allRemindersSet ? 'text-green-800' : 'text-gray-700'
                  }`}>
                    Set up medication reminders
                  </span>
                </div>
                
                <button
                  onClick={() => navigate('/dashboard')}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
                    allRemindersSet
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!allRemindersSet}
                >
                  Go to Dashboard
                </button>
                
                <p className="text-sm text-gray-500 text-center">
                  {allRemindersSet
                    ? 'All set! Manage your reminders from the dashboard.'
                    : 'Please set reminders for all medications first.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-24 md:bottom-8 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50">
            <CheckCircle className="h-5 w-5" />
            <span>Reminder updated successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryPage;