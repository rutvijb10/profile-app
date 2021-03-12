
  // Initial state
const initialState = {
    firstName: 'Matt',
    lastName: 'Smith',
    email: 'smith@gmail.com',
    phone: '9090909090',
    summary: 'Hi my name is Mica Smith. I am from Mesa but go to school in Salt Lake City. I make this drive all the time and plenty',
    profileImageUri: ''
};

const FIRST_NAME_UPDATED = 'ProfileState/FIRST_NAME_UPDATED';
const LAST_NAME_UPDATED = 'ProfileState/LAST_NAME_UPDATED';
const PHONE_UPDATED = 'ProfileState/PHONE_UPDATED';
const EMAIL_UPDATED = 'ProfileState/EMAIL_UPDATED';
const SUMMARY_UPDATED = 'ProfileState/SUMMARY_UPDATED';
const PROFILE_IMAGE_URI_UPDATED = 'ProfileState/PROFILE_IMAGE_URI_UPDATED'

const KEY_ACTION_TYPE_MAP = {
    firstName: FIRST_NAME_UPDATED,
    lastName: LAST_NAME_UPDATED,
    email: EMAIL_UPDATED,
    phone: PHONE_UPDATED,
    summary: SUMMARY_UPDATED,
    profileImageUri: PROFILE_IMAGE_URI_UPDATED
};

export function updateProfileData(key, value) {
      console.log('reducer params');
      console.log(key);
      console.log(value);
      console.log({
        type: KEY_ACTION_TYPE_MAP[key], 
        data: value
      });
      return {
          type: KEY_ACTION_TYPE_MAP[key], 
          data: value
      }
    // return dispatch => {
    //   dispatch(startImagesLoading());
    //   // Connect to the API here
    //   dispatch(imagesLoaded(stubImages));
    // };
}

  // Reducer
  export default function ProfileStateReducer(state = initialState, action = {}) {
      console.log(' ==== main reducer function called ==== ');
      console.log(action);
    switch (action.type) {
        case FIRST_NAME_UPDATED:
            return Object.assign({}, state, {
                firstName: action.data,
            });
        case LAST_NAME_UPDATED:
            return Object.assign({}, state, {
                lastName: action.data,
            });
        case PHONE_UPDATED:
            return Object.assign({}, state, {
                phone: action.data,
            });
        case EMAIL_UPDATED:
            console.log('updating EMAIL_UPDATED in reducer');
            return Object.assign({}, state, {
                email: action.data,
            });
        case SUMMARY_UPDATED:
            return Object.assign({}, state, {
                summary: action.data,
            });
        case PROFILE_IMAGE_URI_UPDATED: 
            console.log('updating PROFILE_IMAGE_URI_UPDATED in reducer');
            return Object.assign({}, state, {
                profileImageUri: action.data,
            });
        default:
            return state;
        }
  }
  