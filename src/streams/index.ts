import { IStream } from "../models/stream.interface";

import radioMaximum from './radioMaximum.jpg';
import radioUltra from './radioUltra.jpg';
import radioGelosa from './radioGelosa.jpg';
import { getGelosaInfo, getMaximumInfo, getUltraInfo } from "../services/trackinfo.service";

export const streams: IStream[] = [
  {
    name: 'Радио Ультра',
    url: 'https://nashe1.hostingradio.ru/ultra-256',
    cover: radioUltra,
    extra: 'ULTRA',
    coverType: 'image/jpg',
    titleUrl: getUltraInfo
  },
  {
    name: 'Радио Максимум',
    url: 'https://maximum.hostingradio.ru/maximum96.aacp',
    cover: radioMaximum,
    extra: '103,7',
    titleUrl: getMaximumInfo,
  },
  {
    name: 'Radio Gelosa',
    url: 'https://ice01.fluidstream.net/gelosa?FLID=1&type=.aac',
    cover: radioGelosa,
    extra: 'Gelosa',
    titleUrl: getGelosaInfo
  },
];