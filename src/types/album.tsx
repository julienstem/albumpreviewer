import type { Metadata } from "./metadata";

export interface Album {
  title: string;
  artist: string | string[] | null;
  tracks: Metadata[];
  coverUrl: string | null;
}
