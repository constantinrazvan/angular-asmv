export interface Volunteer {
  id?: number; // Opțional, deoarece este generat automat
  firstname: string; // Obligatoriu
  lastname: string; // Obligatoriu
  email: string; // Obligatoriu
  phoneNumber: string; // Renumit din 'phone', obligatoriu
  ocupation: string; // Obligatoriu
  joinedDate?: string; // Opțional
  president?: boolean; // Opțional
  vicepresident?: boolean; // Opțional
  department: string; // Obligatoriu
  volunteerImage?: { url: string } | File | string | null; // Opțional
  secretary?: boolean; // Adăugat pentru a reflecta modelul backend
}
