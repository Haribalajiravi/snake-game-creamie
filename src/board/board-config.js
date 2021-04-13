
import Boot from './board-boot.js';

export default {
    template: 'board-component.html',
    style: 'board-component.css',
    tag: 'board-component',
    isShadowDom: false,
    shadowMode: 'open',
    binder: 'data',
    boot: Boot
}