export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo?: {
    lat: string;
    lng: string;
  };
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username: string;
  address?: Address;
  company?: Company;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface AppContextType {
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedCity: string;
  availableCities: string[];
  setSearchQuery: (query: string) => void;
  setSelectedCity: (city: string) => void;
  setSelectedUser: (user: User | null) => void;
  fetchUsers: () => Promise<void>;
}