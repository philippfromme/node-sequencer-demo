import Gitter from 'gitter';

import { isEmitter } from 'gitter/src/util/GitterUtil';

import UrlShare from './UrlShare';

const container = document.getElementById('container');


const gitter = new Gitter({
  canvas: {
    container
  },
  keyboard: {
    bindTo: document
  }
});

// intercept normal create
const urlShare = new UrlShare(gitter);
urlShare.intercept();

gitter.create();

const canvas = gitter.get('canvas');
const elementRegistry = gitter.get('elementRegistry');
const selection = gitter.get('selection');

const emitter = elementRegistry.filter(e => isEmitter(e))[0];
selection.select(emitter);

canvas.zoom(1.5);

window.gitter = gitter;
