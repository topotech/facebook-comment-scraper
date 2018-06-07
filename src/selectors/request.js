export const makeGetRequest = stateKey => (state, requestKey) => state[stateKey].getIn(['requests', ...[].concat(requestKey)]);

export const makeGetRows = stateKey => (state, requestKey) => {
  const statePiece = state[stateKey];

  if (!statePiece) {
    throw new Error('Missing Redux state.');
  }

  const recordIds = statePiece.getIn(['requests', ...[].concat(requestKey), 'data']);

  if (!recordIds) {
    return recordIds;
  }

  return recordIds.map(recordId => statePiece.getIn(['records', recordId]));
};
