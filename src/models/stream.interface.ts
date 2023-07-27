import { ISong } from "./song.interface";

export interface IStream {
  name: string;
  url: string;
  cover: string;
  extra: string;
  coverType?: 'image/png' | 'image/jpg';
  titleUrl?: () => Promise<ISong | null>;
}