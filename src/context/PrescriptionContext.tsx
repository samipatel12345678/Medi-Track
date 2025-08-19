import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PrescriptionData, Medicine } from '../types/prescription';

interface PrescriptionContextType {
  prescriptionData: PrescriptionData | null;
  setPrescriptionData: (data: PrescriptionData) => void;
  addMedicine: (medicine: Omit<Medicine, 'id' | 'reminderSet'>) => void;
  updateMedicine: (id: number, updates: Partial<Medicine>) => void;
  clearPrescription: () => void;
}

const PrescriptionContext = createContext<PrescriptionContextType | undefined>(undefined);

export const usePrescription = () => {
  const context = useContext(PrescriptionContext);
  if (!context) {
    throw new Error('usePrescription must be used within a PrescriptionProvider');
  }
  return context;
};

interface PrescriptionProviderProps {
  children: ReactNode;
}

export const PrescriptionProvider: React.FC<PrescriptionProviderProps> = ({ children }) => {
  const [prescriptionData, setPrescriptionDataState] = useState<PrescriptionData | null>(null);

  const setPrescriptionData = (data: PrescriptionData) => {
    setPrescriptionDataState(data);
  };

  const addMedicine = (medicine: Omit<Medicine, 'id' | 'reminderSet'>) => {
    if (!prescriptionData) return;
    
    const newMedicine: Medicine = {
      ...medicine,
      id: Date.now(),
      reminderSet: false,
    };

    setPrescriptionDataState({
      ...prescriptionData,
      medicines: [...prescriptionData.medicines, newMedicine],
    });
  };

  const updateMedicine = (id: number, updates: Partial<Medicine>) => {
    if (!prescriptionData) return;

    setPrescriptionDataState({
      ...prescriptionData,
      medicines: prescriptionData.medicines.map(med =>
        med.id === id ? { ...med, ...updates } : med
      ),
    });
  };

  const clearPrescription = () => {
    setPrescriptionDataState(null);
  };

  return (
    <PrescriptionContext.Provider
      value={{
        prescriptionData,
        setPrescriptionData,
        addMedicine,
        updateMedicine,
        clearPrescription,
      }}
    >
      {children}
    </PrescriptionContext.Provider>
  );
};