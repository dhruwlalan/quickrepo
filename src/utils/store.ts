import ConfigStore from 'configstore';
import pkg from '../../package.json';

const store = new ConfigStore(pkg.name);

interface Store {
   token: string;
}

// default settings
if (!store.has('token')) store.set('token', null);

export default {
   getConfig(): Store {
      return store.all;
   },
   clearConfig() {
      store.clear();
      return true;
   },

   getToken(): string {
      return store.get('token');
   },
   setToken(token: any) {
      store.set('token', token);
      return true;
   },
};
