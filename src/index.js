import Gitter from 'gitter';

import { isEmitter } from 'gitter/src/util/GitterUtil';

import UrlShare from './UrlShare';

const container = document.getElementById('container'),
      mobile = document.getElementById('mobile'),
      buttonEnableAudio = document.getElementById('enable-audio'),
      reveal = document.getElementById('reveal');

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function init() {
  const gitter = new Gitter({
    canvas: {
      container
    },
    keyboard: {
      bindTo: document
    }
  });

  gitter.get('eventBus').on('gitter.sounds.loaded', () => {
    reveal.classList.add('hidden');

    gitter.get('audio').start();

    gitter.get('canvas').zoom('fit-viewport');
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
}

if (isMobileDevice()) {
  mobile.classList.remove('hidden');
} else {
  buttonEnableAudio.classList.remove('hidden');

  buttonEnableAudio.addEventListener('click', () => {
    buttonEnableAudio.classList.add('hidden');

    init();
  });

}