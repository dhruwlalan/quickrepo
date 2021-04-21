import ConfigStore from 'configstore';
import pkg from '../../package.json';

const store = new ConfigStore(pkg.name);

// default settings
if (!store.has('ranSetup')) store.set('ranSetup', false);
if (!store.has('token')) store.set('token', null);
if (!store.has('autoCommit')) store.set('autoCommit', 'ask each time');
if (!store.has('autoCommitMessage')) store.set('autoCommitMessage', 'Initial Commit');
if (!store.has('hints')) store.set('hints', 'on');

export default {
   getConfig() {
      return store.all;
   },
   clearConfig() {
      store.clear();
   },

   ranSetup(completed?: any) {
      if (completed) {
         store.set('ranSetup', true);
      } else {
         return store.get('ranSetup');
      }
   },

   getToken() {
      return store.get('token');
   },
   setToken(token: any) {
      store.set('token', token);
   },

   getAutoCommit() {
      return store.get('autoCommit');
   },
   setAutoCommit(value: any) {
      store.set('autoCommit', value);
   },

   getAutoCommitMessage() {
      return store.get('autoCommitMessage');
   },
   setAutoCommitMessage(value: any) {
      store.set('autoCommitMessage', value);
   },

   getHints() {
      return store.get('hints');
   },
   setHints(value: any) {
      store.set('hints', value);
   },
};
