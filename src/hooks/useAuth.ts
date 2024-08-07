import { create } from "zustand";

type User = {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
} | null;

type State = {
  user: User | null;
};

type Actions = {
  setUser: (user: User) => void;
};

export const useAuth = create<State & Actions>((set) => ({
  user: null,
  setUser: (user: User) => set((/* state */) => ({ user })),
}));
