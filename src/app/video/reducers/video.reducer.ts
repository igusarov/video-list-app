import * as videoActions from '../actions/video.action';
import { initialVideoState, VideoState } from '../states/video.state';
import { GET_VIDEOS_SUCCESS } from '../actions/video.action';

export function videoReducer(
  state = initialVideoState,
  action: videoActions.Actions
): VideoState {
  if (action.type === GET_VIDEOS_SUCCESS) {
    return {
      ...state,
      items: action.payload
    };
  } else {
    return state;
  }
}
