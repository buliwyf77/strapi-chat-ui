import io from 'socket.io-client';

const STRAPI_ENDPOINT = 'https://api.vecimarket.com';
export const socket = io(STRAPI_ENDPOINT);