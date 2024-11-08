export interface Media {
  title: string;
  description: string;
  genres: string[];
  platforms: string[];
  type: "Película" | "Serie";
}

export interface Group {
  id: string;
  name: string;
  minAge: number;
  maxAge: number;
  genres: string[];
  likes: string[];
  dislikes: string[];
  image: string | null;
  users: User[];
  ownerId: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  age: number;
  // image: string | null;
  // role: "admin" | "user";
  genres: string[];
  likes: string[];
  dislikes: string[];
  firstTime: boolean;
}

export interface Option {
  value: string;
  label: string;
  color: string;
}

export interface GroupOption {
  value: string;
  label: string;
  color: string;
  age: number;
  genres: string[];
  likes: string[];
  dislikes: string[];
}
