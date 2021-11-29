export const createSagaAction = (actionType) => ({
  ACTION: `${actionType}_ACTION`,
  SUCCESS: `${actionType}_SUCCESS`,
  FAILED: `${actionType}_FAILED`,
});
