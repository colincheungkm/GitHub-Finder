import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const GithubContext = createContext();

//

//
export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  // REDUCER
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // GET Search Users = dispatch "GET_USERS"
  const searchUsers = async (text) => {
    setLoading();
    const params = new URLSearchParams({ q: text });
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`);
    const { items } = await response.json();
    dispatch({
      type: 'GET_USERS',
      payload: items,
    });
  };

  // GET single USER = dispatch "GET_USER"
  const getUser = async (login) => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users/${login}`);
    if (response.status === 404) {
      window.location = '/notfound';
    } else {
      const data = await response.json();
      dispatch({ type: 'GET_USER', payload: data });
    }
  };

  // GET User Repos = dispatch "GET_REPOS"
  const getUserRepos = async (login) => {
    setLoading();
    const params = new URLSearchParams({ sort: 'created', per_page: 10 });
    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);
    const data = await response.json();
    dispatch({ type: 'GET_REPOS', payload: data });
  };

  // Set Loading GIF = dispatch "SET_LOADING"
  const setLoading = () => dispatch({ type: 'SET_LOADING' });

  // Set Users to [] = dispatch "CLEAR_USERS"
  const clearUsers = () => {
    const items = [];
    dispatch({ type: 'CLEAR_USERS', payload: items });
  };

  //

  //
  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUserRepos,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
