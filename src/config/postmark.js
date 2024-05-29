// File: config/postmark.ts
import { ServerClient } from 'postmark';

const client = new ServerClient(process.env.POSTMARK_API_TOKEN);

export default client;
