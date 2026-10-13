const API_BASE_URL = process.env.REACT_APP_API_BASE_URL !== undefined
  ? process.env.REACT_APP_API_BASE_URL
  : process.env.NODE_ENV === 'production'
    ? ''
    : 'http://localhost:8090';

export default API_BASE_URL;