/* eslint-disable no-console */
import Creamie from '@creamie/core';
import AppConfig from './app-config';

export default class App extends Creamie {
  constructor() {
    super(AppConfig);
    console.log('Hey there! If you are here, thats great!');
    console.log('Check out https://creamie.io if you like this site');
    console.log('Fork https://github.com/Haribalajiravi/snake-game-creamie');
  }
}

window.customElements.define(AppConfig.tag, App);
