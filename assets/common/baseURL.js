import {Platform} from 'react-native';
let baseURL = '';

{Platform.OS == 'android'
? baseURL = 'http://192.168.100.4:5000/api/'
: baseURL = 'http://localhost:5000/api/'
}

export default baseURL;