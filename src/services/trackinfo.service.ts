import axios from "axios";
import { ISong } from "../models/song.interface";

interface IMaximumTrackInfo {
  artist: string;
  title: string;
  time: string;
  date: string;
}

interface IGelosaTrackInfo {
 trackId: string;
 artistName: string;
 trackName: string;
 artworkUrl1000: string;
 isSong: boolean;
 trackViewUrl: string;
 previewUrl: string;
}

export const getGelosaInfo = async ():Promise<ISong | null> => {
  try {
    const { data } = await axios.get<IGelosaTrackInfo>('https://titoli.fluidstream.it/klasseuno/onair_gelosa.json');
    return { artist: data.artistName, title: data.trackName, cover: data.artworkUrl1000 };
  } catch (e: any) {
    return null;
  }
};

export const getMaximumInfo = async (): Promise<ISong | null>  => {
  try {
    const { data } = await axios.get<IMaximumTrackInfo>('https://meta.pcradio.ru/fm_maximum_current.json');
    return { artist: data.artist, title: data.title, cover: null };
  } catch (e: any) {
    return null;
  }
};

export const getUltraInfo = async () => {
  try {

  } catch (e: any) {

  }
}