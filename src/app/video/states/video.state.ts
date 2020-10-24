import { Video } from '../models';

export interface VideoState  {
  items: Video[];
}

export const initialVideoState: VideoState = {
  items: []
};
