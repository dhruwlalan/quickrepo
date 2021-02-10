import ConfigStore from 'configstore';
import pkg from '../../package.json';

const config = new ConfigStore(pkg.name);

// initializing value
if (!config.has('token')) config.set('token', '');

export default {
   getToken(): string {
      return config.get('token');
   },
   setToken(token: any) {
      config.set('token', token);
      return true;
   },
};
