import { USER_PROFILE_LOADING } from "./profileTypes";

const initialState = {
  profileData: {},
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_PROFILE_LOADING:
      return {
        ...state,
        profileData: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
