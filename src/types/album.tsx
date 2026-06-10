import type { Metadata } from "./metadata";

export interface Album {
  title: string;
  artist: string;
  tracks: Metadata[];
  coverUrl: string | null;
}
