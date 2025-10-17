import { EventEmitter } from 'events';
import loadListeners from '../subscriber/subscribe.js';

export const emitter = new EventEmitter();

export const eventLoader = async ({ app }) => {
  loadListeners(emitter);

  return app;
};