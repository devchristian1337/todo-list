import { ReactNode } from "react";

export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export type AnimatedTextProps = {
  children: ReactNode;
};

export type LanguageDropdownProps = {
  language: string;
  setLanguage: (lang: string) => void;
};
