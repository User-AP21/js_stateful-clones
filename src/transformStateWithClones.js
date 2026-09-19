'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const results = [];
  let currentState = structuredClone(state);

  for (const action of actions) {
    const { type, extraData, keysToRemove } = action;

    if (type === 'addProperties') {
      currentState = {
        ...currentState,
        ...extraData,
      };
    }

    if (type === 'removeProperties') {
      const newState = structuredClone(currentState);

      for (const key of keysToRemove) {
        delete newState[key];
      }
      currentState = newState;
    }

    if (type === 'clear') {
      currentState = {};
    }

    results.push(structuredClone(currentState));
  }

  return results;
}

module.exports = transformStateWithClones;
