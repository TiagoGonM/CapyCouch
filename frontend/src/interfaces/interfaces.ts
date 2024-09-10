export enum MediaType {
  "Película",
  "Serie",
}

export interface Media {
  title: string;
  description: string;
  genres: string[];
  type: MediaType;
}

export interface Group {
  name: string;
  minAge: number;
  maxAge: number;
  image: string | null;
  users: string[]
}
