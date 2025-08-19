import axios from 'axios';
export interface   Medicine {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
  reminderSet: boolean;
}
const res = await axios.get('http://localhost:5000/api/prescriptions');

console.log(res.data);

export interface PrescriptionData {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  patientName: string;
  medicines: Medicine[];
  importantNotes: string[];
  uploadedFile?: File;
  processedAt: Date;
}

export interface Reminder {
  id: number;
  medicineId: number;
  medicineName: string;
  dosage: string;
  time: string;
  date: string;
  taken: boolean;
  enabled: boolean;
}