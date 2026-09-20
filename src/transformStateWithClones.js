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

    switch (type) {
      case 'addProperties':
        currentState = {
          ...currentState,
          ...extraData,
        };
        break;

      case 'removeProperties': {
        const newState = structuredClone(currentState);

        for (const key of keysToRemove) {
          delete newState[key];
        }
        currentState = newState;
        break;
      }

      case 'clear':
        currentState = {};
        break;

      default:
        throw new Error(`Unknown action type: ${type}`);
    }

    results.push(structuredClone(currentState));
  }

  return results;
}

module.exports = transformStateWithClones;
