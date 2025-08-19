import React, { useState } from 'react';
import { Plus, Trash2, Save } from 'lucide-react';
import { Medicine } from '../types/prescription';

interface PrescriptionFormProps {
  medicines: Medicine[];
  onMedicinesChange: (medicines: Medicine[]) => void;
  patientName: string;
  onPatientNameChange: (name: string) => void;
  importantNotes: string[];
  onNotesChange: (notes: string[]) => void;
  onSave: () => void;
}

const PrescriptionForm: React.FC<PrescriptionFormProps> = ({
  medicines,
  onMedicinesChange,
  patientName,
  onPatientNameChange,
  importantNotes,
  onNotesChange,
  onSave,
}) => {
  const [newNote, setNewNote] = useState('');

  const addMedicine = () => {
    const newMedicine: Medicine = {
      id: Date.now(),
      name: '',
      dosage: '',
      frequency: '',
      duration: '',
      instructions: '',
      reminderSet: false,
    };
    onMedicinesChange([...medicines, newMedicine]);
  };

  const updateMedicine = (id: number, field: keyof Medicine, value: string | boolean) => {
    onMedicinesChange(
      medicines.map(med =>
        med.id === id ? { ...med, [field]: value } : med
      )
    );
  };

  const removeMedicine = (id: number) => {
    onMedicinesChange(medicines.filter(med => med.id !== id));
  };

  const addNote = () => {
    if (newNote.trim()) {
      onNotesChange([...importantNotes, newNote.trim()]);
      setNewNote('');
    }
  };

  const removeNote = (index: number) => {
    onNotesChange(importantNotes.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      {/* Patient Information */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Patient Information</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Name
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => onPatientNameChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter patient name"
          />
        </div>
      </div>

      {/* Medicines */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Medicines</h3>
          <button
            onClick={addMedicine}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Medicine</span>
          </button>
        </div>

        <div className="space-y-4">
          {medicines.map((medicine) => (
            <div key={medicine.id} className="border border-gray-200 rounded-lg p-4">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medicine Name
                  </label>
                  <input
                    type="text"
                    value={medicine.name}
                    onChange={(e) => updateMedicine(medicine.id, 'name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Amoxicillin"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    value={medicine.dosage}
                    onChange={(e) => updateMedicine(medicine.id, 'dosage', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 500mg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Frequency
                  </label>
                  <input
                    type="text"
                    value={medicine.frequency}
                    onChange={(e) => updateMedicine(medicine.id, 'frequency', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 3 times daily"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={medicine.duration}
                    onChange={(e) => updateMedicine(medicine.id, 'duration', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 7 days"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions
                </label>
                <input
                  type="text"
                  value={medicine.instructions || ''}
                  onChange={(e) => updateMedicine(medicine.id, 'instructions', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Take with food"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => removeMedicine(medicine.id)}
                  className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          ))}

          {medicines.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No medicines added yet. Click "Add Medicine" to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Important Notes</h3>
        
        <div className="flex space-x-2 mb-4">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add an important note..."
            onKeyPress={(e) => e.key === 'Enter' && addNote()}
          />
          <button
            onClick={addNote}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Add
          </button>
        </div>

        <div className="space-y-2">
          {importantNotes.map((note, index) => (
            <div key={index} className="flex items-center justify-between bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <span className="text-yellow-800">{note}</span>
              <button
                onClick={() => removeNote(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center">
        <button
          onClick={onSave}
          className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Save className="h-5 w-5" />
          <span>Save Prescription</span>
        </button>
      </div>
    </div>
  );
};

export default PrescriptionForm;