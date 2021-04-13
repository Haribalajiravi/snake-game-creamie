import Creamie from '@creamie/core';
import AppConfig from './app-config';

export default class App extends Creamie {
  constructor() {
    super(AppConfig);
    console.log('App constructor!');
  }

  connectedCallback() {
    console.log('connected!');
  }
}

window.customElements.define(AppConfig.tag, App);
