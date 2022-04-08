import { atom } from "jotai";
import type { User } from "types";

export const meAtom = atom<User | null>(null);
