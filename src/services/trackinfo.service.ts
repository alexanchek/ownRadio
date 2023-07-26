import axios from "axios";

// INTERFACES
import { IGelosaTrackInfo } from "../models/radiostreamsData/radioGelosa.interface";
import { IMaximumTrackInfo } from "../models/radiostreamsData/radioMaximum.interface";
import { IUltraInfo } from "../models/radiostreamsData/radioUltra.interface";
import { ISong } from "../models/song.interface";

export const getGelosaInfo = async (): Promise<ISong | null> => {
  try {
    const { data } = await axios.get<IGelosaTrackInfo>('https://titoli.fluidstream.it/klasseuno/onair_gelosa.json');
    return { artist: data.artistName, title: data.trackName, cover: data.artworkUrl1000 };
  } catch (e: any) {
    return null;
  }
};

export const getMaximumInfo = async (): Promise<ISong | null> => {
  try {
    const { data } = await axios.get<IMaximumTrackInfo>('https://meta.pcradio.ru/fm_maximum_current.json');
    return { artist: data.artist, title: data.title, cover: null };
  } catch (e: any) {
    return null;
  }
};

export const getUltraInfo = async (): Promise<ISong | null> => {
  try {
    const t = Math.floor(Date.now() / 1000);
    const { data } = await axios.get<IUltraInfo>('https://meta.fmgid.com/stations/ultra/current.json', {
      params: {
        t,
      }
    });
    return { artist: data.artist, title: data.title, cover: `https://meta.fmgid.com/100x100/stations/ultra/${data.cover}`, };
  } catch (e: any) {
    return null;
  }
}
