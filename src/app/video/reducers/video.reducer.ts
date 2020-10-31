import * as videoActions from '../actions/video.action';
import { ADD_VIDEO, ADD_VIDEO_SUCCESS, EDIT_VIDEO, EDIT_VIDEO_SUCCESS, GET_VIDEOS_SUCCESS } from '../actions/video.action';
import * as getDataActions from '../actions/get-data.action';
import { GET_DATA } from '../actions/get-data.action';
import { initialVideoState, VideoState } from '../states/video.state';

export function videoReducer(
  state = initialVideoState,
  action: videoActions.Actions | getDataActions.Actions
): VideoState {
  switch (action.type) {
    case GET_VIDEOS_SUCCESS:
      return  {
      ...state,
      isLoading: false,
      items: action.payload
    };
    case GET_DATA:
    return {
      ...state,
      isLoading: true,
    };
    case EDIT_VIDEO:
    case ADD_VIDEO:
      return {
        ...state,
        isSubmitting: true,
      };
    case EDIT_VIDEO_SUCCESS:
    case ADD_VIDEO_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    default:
      return state;
  }
}
