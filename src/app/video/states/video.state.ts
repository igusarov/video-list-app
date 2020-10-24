import { Video } from '../models';

export interface VideoState  {
  isLoading: boolean;
  items: Video[];
}

export const initialVideoState: VideoState = {
  isLoading: false,
  items: []
};
