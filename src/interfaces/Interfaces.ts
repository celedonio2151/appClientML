export interface UserProfileInterface {
  // Define las propiedades de perfil del usuario aquí
  _id: string;
  ci: number;
  name: string;
  surname: string;
  phone_number?: number;
  email?: string;
  meter_number?: number;
  birthdate?: string;
  roles: string[];
  profileImg?: string;
  created_at: string;
  updated_at: string;
  status: boolean;
  devices?: string;
}

export interface TypeContext {
  token: string | null;
  setToken: (token: string | null) => void;
  userProfile: UserProfileInterface | null;
  setProfile: (profile: UserProfileInterface) => void;
  logout: () => void;
}

export interface typeColors {
  primary: string; // Verde selecionado
  secondary: string; // Gris selecionado
  tertiary: string; // Naranja selecionado
  quaternary: string; // Rojo selecionado
  quinary: string; // Púrpura oscuro
  darkGray: string; // Gris Oscuro selecionado
  whileC: string; // Blanco selecionado
  blackC: string; // Negro selecionado
}
