import { Queue } from "bullmq";
import {connection} from '../bullmq/index';


export const userQueue = new Queue('users',{
connection
});




