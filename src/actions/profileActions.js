import axios from 'axios';
import {
  GET_PROFILE,
  // GET_PROFILES,
  // PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  // UNLOAD
  GET_GITHUB_REPOS
} from './types';
import { setLoading, setUnLoad } from './loadingAction';

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setLoading());
  axios.get('/api/profile')
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      dispatch(setUnLoad());
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
      dispatch(setUnLoad());
    });
}

// get profile by handle
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setLoading());
  axios.get(`/api/profile/handle/${handle}`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
      dispatch(setUnLoad());
    })
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      });
      dispatch(setUnLoad());
    });
}

// create profile
export const createProfile = (profileData, history) => dispatch => {
  axios.post('/api/profile', profileData)
    .then(profile =>
      history.push('/dashboard'))
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    })
}

// profile loading
// export const setProfileLoading = () => {
//   return {
//     type: PROFILE_LOADING
//   }
// }

// clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}

// add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// delete experience
export const deleteExperience = (id) => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// delete education
export const deleteEducation = (id) => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      }))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}

// get all profiles
// export const getProfiles = () => dispatch => {
//   dispatch(setProfileLoading());
//   axios
//     .get('/api/profile/all')
//     .then(res =>
//       dispatch({
//         type: GET_PROFILES,
//         payload: res.data
//       }))
//     .catch(err =>
//       dispatch({
//         type: GET_PROFILES,
//         payload: null
//       })
//     );
// }

// delete account and profile
export const deleteAccount = () => dispatch => {
  axios
    .delete('/api/profile')
    .then(res => dispatch(
      {
        type: SET_CURRENT_USER,
        payload: {}
      }
    ))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.res.data
    }));
}

export const getGithubRepos = (username) => dispatch => {
  // const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID
  // const clientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
  const count = 5
  const sort = 'created: asc'
  axios.get(`https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}`)
    .then(data => {
      dispatch({
        type: GET_GITHUB_REPOS,
        payload: data.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
}