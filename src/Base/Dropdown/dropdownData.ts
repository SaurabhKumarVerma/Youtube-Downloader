import { EVIDEOQUALITY } from "../../types/VideoQuality.interface";

export const data = [
  {
    id: 1,
    quality: EVIDEOQUALITY.HIGHEST,
    type: "Highest",
  },
  {
    id: 2,
    quality: EVIDEOQUALITY.HIGHEST_AUDIO,
    type: "Highest Audio",
  },
  {
    id: 3,
    quality: EVIDEOQUALITY.HIGHEST_VIDEO,
    type: "Highest Video",
  },
  {
    id: 4,
    quality: EVIDEOQUALITY.LOWEST,
    type: "Lowest",
  },
  {
    id: 5,
    quality: EVIDEOQUALITY.LOWEST_AUDIO,
    type: "Lowest Audio",
  },
  {
    id: 6,
    quality: EVIDEOQUALITY.LOWEST_VIDEO,
    type: "Lowest Video",
  },
];
