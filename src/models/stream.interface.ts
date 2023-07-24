import { ISong } from "./song.interface";

export interface IStream {
  name: string;
  url: string;
  cover: string;
  extra: string;
  titleUrl?: () => Promise<ISong | null>;
}