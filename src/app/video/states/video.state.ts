import { Video } from '../models';

export interface VideoState  {
  isSubmitting: boolean;
  isLoading: boolean;
  items: Video[];
}

export const initialVideoState: VideoState = {
  isSubmitting: false,
  isLoading: false,
  items: []
};
