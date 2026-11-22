import Axios from 'react-native-axios';

const api = Axios.create({
  baseURL: 'http://192.168.0.102:8080',
});

export default api;
 