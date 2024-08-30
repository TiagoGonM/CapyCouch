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
