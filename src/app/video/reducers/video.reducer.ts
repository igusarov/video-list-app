import * as videoActions from '../actions/video.action';
import { initialVideoState, VideoState } from '../states/video.state';

export function videoReducer(
  state = initialVideoState,
  action: videoActions.Actions
): VideoState {
  return state;
}
