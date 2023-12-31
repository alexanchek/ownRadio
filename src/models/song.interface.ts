export interface ISong {
  artist: string;
  title: string;
  cover: string | null;
  coverType?: 'image/jpg' | 'image/png';
}