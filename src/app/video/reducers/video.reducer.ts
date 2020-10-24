import * as videoActions from '../actions/video.action';
import * as getDataActions from '../actions/get-data.action';
import { initialVideoState, VideoState } from '../states/video.state';
import { GET_VIDEOS_SUCCESS } from '../actions/video.action';
import { GET_DATA } from '../actions/get-data.action';

export function videoReducer(
  state = initialVideoState,
  action: videoActions.Actions | getDataActions.Actions
): VideoState {
  if (action.type === GET_VIDEOS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      items: action.payload
    };
  } else if (action.type === GET_DATA) {
    return {
      ...state,
      isLoading: true,
    };
  } else {
    return state;
  }
}
