import NodeSequencer from 'node-sequencer';

import { isEmitter } from 'node-sequencer/src/util/NodeSequencerUtil';

import UrlShare from './UrlShare';

const container = document.getElementById('container'),
      mobile = document.getElementById('mobile'),
      buttonEnableAudio = document.getElementById('enable-audio'),
      reveal = document.getElementById('reveal');

function isMobileDevice() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}

function init() {
  buttonEnableAudio.classList.add('hidden');

  window.removeEventListener('keydown', onKeydown);

  const nodeSequencer = new NodeSequencer({
    canvas: {
      container
    },
    keyboard: {
      bindTo: document
    }
  });

  nodeSequencer.get('eventBus').on('nodeSequencer.sounds.loaded', () => {
    reveal.classList.add('hidden');

    nodeSequencer.get('audio').start();

    nodeSequencer.get('canvas').zoom('fit-viewport');
  });

  // intercept normal create
  const urlShare = new UrlShare(nodeSequencer);
  urlShare.intercept();

  nodeSequencer.create();

  const canvas = nodeSequencer.get('canvas');
  const elementRegistry = nodeSequencer.get('elementRegistry');
  const selection = nodeSequencer.get('selection');

  const emitter = elementRegistry.filter(e => isEmitter(e))[0];
  selection.select(emitter);

  canvas.zoom(1.5);

  window.nodeSequencer = nodeSequencer;
}

const onKeydown = (e) => {

  // space
  if (e.keyCode === 32) {
    init();
  }
};

if (isMobileDevice()) {
  mobile.classList.remove('hidden');
} else {
  buttonEnableAudio.classList.remove('hidden');

  buttonEnableAudio.addEventListener('click', init);

  window.addEventListener('keydown', onKeydown);
}