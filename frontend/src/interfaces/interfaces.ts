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
  image: string | null;
  users: string[]
}
