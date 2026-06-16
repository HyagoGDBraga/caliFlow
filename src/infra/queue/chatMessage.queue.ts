import { Queue } from "bullmq";
import {connection} from '../bullmq/index';

export const chatMessageQueue = new Queue("chat-message", {
    connection,
});
