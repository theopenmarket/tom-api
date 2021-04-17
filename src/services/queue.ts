import Queue from 'bull';
import Redis from 'ioredis';

import { storeConfig } from '@config';

const client = new Redis(storeConfig.url);
const subscriber = new Redis(storeConfig.url);

const queueOptions = {
  createClient: function (type) {
    switch (type) {
      case 'client':
        return client;
      case 'subscriber':
        return subscriber;
      default:
        return new Redis(storeConfig.url);
    }
  },
};

/**
 * Queues
 */

const QueueIdentifier = {
  order: 'order',
  email: 'email',
};

export const orderQueue = new Queue(QueueIdentifier.order, queueOptions);
export const emailQueue = new Queue(QueueIdentifier.email, queueOptions);
