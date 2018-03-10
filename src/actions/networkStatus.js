export const NETWORK_ONLINE = 'NETWORK_ONLINE';
export const NETWORK_OFFLINE = 'NETWORK_OFFLINE';

export const online = () => ({
  type: NETWORK_ONLINE,
});

export const offline = () => ({
  type: NETWORK_OFFLINE,
});
