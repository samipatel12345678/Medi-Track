import React, { useState } from 'react';
import { Calendar, Clock, Bell, BellOff, Edit, Pill, AlertTriangle } from 'lucide-react';
import { usePrescription } from '../context/PrescriptionContext';
import { Reminder } from '../types/prescription';

const DashboardPage: React.FC = () => {
  const { prescriptionData } = usePrescription();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Generate sample reminders based on prescription data
  const generateReminders = (): Reminder[] => {
    if (!prescriptionData) return [];
    
    const reminders: Reminder[] = [];
    let reminderId = 1;
    
    prescriptionData.medicines.forEach(medicine => {
      if (medicine.reminderSet) {
        // Generate sample times based on frequency
        const times = getTimesForFrequency(medicine.frequency);
        times.forEach(time => {
          reminders.push({
            id: reminderId++,
            medicineId: medicine.id,
            medicineName: medicine.name,
            dosage: medicine.dosage,
            time,
            date: selectedDate,
            taken: Math.random() > 0.7, // Random taken status for demo
            enabled: true,
          });
        });
      }
    });
    
    return reminders;
  };
  
  const getTimesForFrequency = (frequency: string): string[] => {
    const freq = frequency.toLowerCase();
    if (freq.includes('3 times') || freq.includes('thrice')) {
      return ['08:00', '14:00', '20:00'];
    } else if (freq.includes('2 times') || freq.includes('twice')) {
      return ['08:00', '20:00'];
    } else if (freq.includes('once') || freq.includes('1 time')) {
      return ['09:00'];
    } else if (freq.includes('4 times')) {
      return ['08:00', '12:00', '16:00', '20:00'];
    } else {
      return ['09:00']; // Default
    }
  };
  
  const [reminders, setReminders] = useState<Reminder[]>(generateReminders());
  
  // Update reminders when prescription data or selected date changes
  React.useEffect(() => {
    setReminders(generateReminders());
  }, [prescriptionData, selectedDate]);

  const toggleReminder = (id: number) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, enabled: !reminder.enabled } : reminder
    ));
  };

  const markAsTaken = (id: number) => {
    setReminders(reminders.map(reminder =>
      reminder.id === id ? { ...reminder, taken: !reminder.taken } : reminder
    ));
  };

  const todayReminders = reminders.filter(r => r.date === selectedDate);
  const pendingReminders = todayReminders.filter(r => !r.taken && r.enabled);
  const completedReminders = todayReminders.filter(r => r.taken);

  // Show message if no prescription data
  if (!prescriptionData) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Prescription Data</h2>
            <p className="text-gray-600 mb-6">
              Please upload and process a prescription first to view your reminder dashboard.
            </p>
            <button
              onClick={() => window.location.href = '/upload'}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Upload Prescription
            </button>
          </div>
        </div>
      </div>
    );
  }
  const getTimeLabel = (time: string) => {
    const hour = parseInt(time.split(':')[0]);
    if (hour < 12) return 'Morning';
    if (hour < 17) return 'Afternoon';
    return 'Evening';
  };

  const isOverdue = (time: string) => {
    const now = new Date();
    const reminderTime = new Date(`${selectedDate}T${time}`);
    return reminderTime < now;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Reminder Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Stay on track with your medication schedule. Your health is our priority.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {/* Stats Cards */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{pendingReminders.length}</p>
                <p className="text-sm text-gray-600">Pending Today</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-3 rounded-full">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{completedReminders.length}</p>
                <p className="text-sm text-gray-600">Completed Today</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-100 p-3 rounded-full">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingReminders.filter(r => r.enabled && isOverdue(r.time)).length}
                </p>
                <p className="text-sm text-gray-600">Overdue</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-3 rounded-full">
                <Pill className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{prescriptionData.medicines.length}</p>
                <p className="text-sm text-gray-600">Active Medicines</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar & Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Date Selector */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span>Select Date</span>
                </h2>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Today's Schedule
              </h2>
              
              {todayReminders.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No reminders for this date</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {todayReminders
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((reminder, index) => (
                      <div
                        key={reminder.id}
                        className={`relative flex items-center space-x-4 p-4 rounded-xl border-2 transition-all ${
                          reminder.taken
                            ? 'bg-green-50 border-green-200'
                            : reminder.enabled
                            ? isOverdue(reminder.time)
                              ? 'bg-red-50 border-red-200'
                              : 'bg-blue-50 border-blue-200'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        {/* Timeline dot */}
                        <div
                          className={`w-4 h-4 rounded-full ${
                            reminder.taken
                              ? 'bg-green-500'
                              : reminder.enabled
                              ? isOverdue(reminder.time)
                                ? 'bg-red-500'
                                : 'bg-blue-500'
                              : 'bg-gray-400'
                          }`}
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {reminder.medicineName}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {reminder.dosage} • {getTimeLabel(reminder.time)}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-mono text-lg font-semibold text-gray-900">
                                {reminder.time}
                              </p>
                              {isOverdue(reminder.time) && !reminder.taken && reminder.enabled && (
                                <p className="text-xs text-red-600 font-medium">Overdue</p>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => markAsTaken(reminder.id)}
                            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                              reminder.taken
                                ? 'bg-green-600 text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-green-100 hover:text-green-700'
                            }`}
                          >
                            {reminder.taken ? 'Taken' : 'Mark Taken'}
                          </button>
                          <button
                            onClick={() => toggleReminder(reminder.id)}
                            className="p-1 rounded hover:bg-gray-200 transition-colors"
                          >
                            {reminder.enabled ? (
                              <Bell className="h-4 w-4 text-blue-600" />
                            ) : (
                              <BellOff className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <span>Enable All Reminders</span>
                </button>
                <button className="w-full bg-gray-100 text-gray-600 py-3 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2">
                  <Edit className="h-4 w-4" />
                  <span>Edit Medicine Schedule</span>
                </button>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">App Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">SMS Reminders</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Email Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Today's Progress */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Today's Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Completion Rate</span>
                    <span>{Math.round((completedReminders.length / todayReminders.length) * 100) || 0}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${todayReminders.length > 0 ? (completedReminders.length / todayReminders.length) * 100 : 0}%`
                      }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>{completedReminders.length} of {todayReminders.length} doses taken</p>
                  {pendingReminders.length > 0 && (
                    <p className="text-blue-600 mt-1">
                      {pendingReminders.length} doses remaining today
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;