import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Upload, FileText, Image, Camera, CheckCircle, AlertCircle, Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePrescription } from '../context/PrescriptionContext';
import { Medicine } from '../types/prescription';
import PrescriptionForm from '../components/PrescriptionForm';

const UploadPage: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [patientName, setPatientName] = useState('');
  const [importantNotes, setImportantNotes] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setPrescriptionData } = usePrescription();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
      setShowPreview(true);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
      setShowPreview(true);
     const formData = new FormData();
formData.append("file", e.target.files[0]);

const res = await axios.post(
  "http://localhost:5000/api/prescriptions",
  formData,
  {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }
);   

console.log(res.data);

    }
  };

  const handleScanPrescription = () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          // Show manual entry form after upload completes
          setTimeout(() => setShowManualEntry(true), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleSavePrescription = () => {
    if (medicines.length === 0 || !patientName.trim()) {
      alert('Please add at least one medicine and enter patient name');
      return;
    }

    const prescriptionData = {
      id: Date.now().toString(),
      patientName: patientName.trim(),
      medicines,
      importantNotes,
      doctorName: '', // You can update this to collect from user if needed
      doctorSpecialty: '', // You can update this to collect from user if needed
      ...(uploadedFile ? { uploadedFile } : {}),
      processedAt: new Date(),
    };

    setPrescriptionData(prescriptionData);
    navigate('/summary');
  };

  const openFileSelector = () => {
    fileInputRef.current?.click();
  };

  if (showManualEntry) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enter Prescription Details
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Please enter the prescription details extracted from your uploaded document.
            </p>
          </div>

          <PrescriptionForm
            medicines={medicines}
            onMedicinesChange={setMedicines}
            patientName={patientName}
            onPatientNameChange={setPatientName}
            importantNotes={importantNotes}
            onNotesChange={setImportantNotes}
            onSave={handleSavePrescription}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Upload Your Prescription
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload an image or PDF of your prescription, and our AI will extract 
            all the important information automatically.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {!uploadedFile ? (
                <>
                  <div className="mb-4">
                    <Upload className="h-16 w-16 text-gray-400 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Drop your prescription here
                  </h3>
                  <p className="text-gray-600 mb-6">
                    or click to browse files
                  </p>
                  <button
                    onClick={openFileSelector}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Choose File
                  </button>
                  <div className="mt-6 flex justify-center space-x-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <Image className="h-4 w-4 mr-1" />
                      JPG, PNG
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <FileText className="h-4 w-4 mr-1" />
                      PDF
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800 font-semibold">File uploaded successfully!</p>
                    <p className="text-green-600 text-sm mt-1">{uploadedFile.name}</p>
                  </div>
                  <button
                    onClick={openFileSelector}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Choose different file
                  </button>
                </div>
              )}
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Processing prescription...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Scan Button */}
            {uploadedFile && !isUploading && (
              <button
                onClick={handleScanPrescription}
                className="w-full mt-6 bg-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Camera className="h-5 w-5" />
                <span>Scan Prescription</span>
              </button>
            )}
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Preview</h3>
            
            {showPreview && uploadedFile ? (
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4 h-64 flex items-center justify-center">
                  {uploadedFile.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(uploadedFile)}
                      alt="Prescription preview"
                      className="max-h-full max-w-full object-contain rounded"
                    />
                  ) : (
                    <div className="text-center">
                      <FileText className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">PDF Preview</p>
                      <p className="text-sm text-gray-500">{uploadedFile.name}</p>
                    </div>
                  )}
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">Privacy Notice</h4>
                      <p className="text-blue-700 text-sm mt-1">
                        Your prescription is processed securely using end-to-end encryption. 
                        We never store your medical data without your explicit consent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-2" />
                  <p>Upload a file to see preview</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Manual Entry Option */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Don't have a prescription image?
            </h3>
            <p className="text-gray-600 mb-6">
              You can manually enter your prescription details instead.
            </p>
            <button
              onClick={() => setShowManualEntry(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
            >
              <Edit className="h-5 w-5" />
              <span>Enter Manually</span>
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Tips for Best Results</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-3">
                <Camera className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Clear Image</h4>
              <p className="text-gray-600 text-sm">
                Ensure the prescription is well-lit and all text is clearly visible
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-3">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Full Page</h4>
              <p className="text-gray-600 text-sm">
                Include the entire prescription with doctor's signature and clinic details
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 p-3 rounded-full w-12 h-12 mx-auto mb-3">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Avoid Glare</h4>
              <p className="text-gray-600 text-sm">
                Make sure there's no reflection or shadow covering important information
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;