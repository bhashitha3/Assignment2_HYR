import { FETCH_PIKACHUS_SUCCESS, NEXT_PIKACHUS, PREV_PIKACHUS } from './actions';

const initialState = {
  pikachus: [],
  offset: 0,
};

const pikachuReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PIKACHUS_SUCCESS:
      return {
        ...state,
        pikachus: action.payload,
      };
    case NEXT_PIKACHUS:
      return {
        ...state,
        offset: state.offset + 3,
      };
    case PREV_PIKACHUS:
      return {
        ...state,
        offset: Math.max(0, state.offset - 3),
      };
    default:
      return state;
  }
};

export default pikachuReducer;
