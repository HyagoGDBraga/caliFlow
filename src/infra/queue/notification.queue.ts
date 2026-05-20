import {connection} from '../bullmq/index';
import { Queue } from 'bullmq';

export const notificationQueue = new Queue('notification', {connection});