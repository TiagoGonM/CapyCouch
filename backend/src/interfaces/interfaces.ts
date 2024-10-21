import { MediaType } from "@prisma/client";

// export enum MediaType {
//   "movie",
//   "series",
// }


export interface Media {
  title: string;
  description: string;
  genres: string[];
  type: MediaType;
  platforms: string[];
}
