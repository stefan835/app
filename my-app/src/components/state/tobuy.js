const ADD = 'tobuy/ADD';
const REMOVE = 'tobuy/REMOVE';
const UPDATE = 'tobuy/UPDATE';
const MARK = 'tobuy/MARK';
const UNMARK = 'tobuy/UNMARK';

export const add = (tobuyItem, isFav) => ({
  type: ADD,
  tobuyItem,
  isFav
});

export const remove = itemId => ({
  type: REMOVE,
  itemId
});

export const mark = itemId => ({
  type: MARK,
  itemId
});

export const unmark = (itemId) => ({
  type: UNMARK,
  itemId
});

export const update = (itemId, content) => ({
  type: UPDATE,
  itemId, content
});

const initialState = {
  tobuyItems: [],
  tobuyFavorites: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        tobuyItems: state.tobuyItems.concat({
          id: state.tobuyItems.map(
            tobuyItem => tobuyItem.id
          ).reduce(
            (currentMax, next) => currentMax > next ? currentMax : next,
            0
          ) + 1,
          content: action.tobuyItem,
          favorite: action.isFav || false
        })
      };
    case REMOVE:
      return {
        ...state,
        tobuyItems: state.tobuyItems.filter(
          tobuyItem => tobuyItem.id !== action.itemId
        )
      };
    case MARK:
      return {
        tobuyItems: state.tobuyItems.map(
          tobuyItem => tobuyItem.id !== action.itemId ?
            tobuyItem :
            {
              id: tobuyItem.id,
              content: tobuyItem.content,
              favorite: true
            }
        ),
        tobuyFavorites: state.tobuyFavorites.concat(state.tobuyItems.filter(
          tobuyItem => tobuyItem.id === action.itemId).map(favItem => {
          return favItem.content
        }).filter((value, index, inputArray) => {
          return inputArray.indexOf(value) === index
        }))
      };
    case UNMARK:
      return {
        tobuyItems: state.tobuyItems.map(
          tobuyItem => tobuyItem.id !== action.itemId ?
            tobuyItem :
            {
              id: tobuyItem.id,
              content: tobuyItem.content,
              favorite: false
            }
        ),
        tobuyFavorites: state.tobuyFavorites.filter(favItem => {
          return favItem !== state.tobuyItems.filter(
            tobuyItem => tobuyItem.id === action.itemId)[0].content
        })
      };
    case UPDATE:
      return {
        ...state,
        tobuyItems: state.tobuyItems.map(
          tobuyItem => tobuyItem.id !== action.itemId ?
            tobuyItem :
            {
              id: tobuyItem.id,
              content: action.content,
              favorite: tobuyItem.favorite
            }
        )
      };
    default:
      return state
  }
}