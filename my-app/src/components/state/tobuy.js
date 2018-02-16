const UPDATE = 'tobuy/UPDATE';
const LOAD = 'tobuy/LOAD';
const CLEAR = 'tobuy/CLEAR';


export const update = (itemId, content) => ({
  type: UPDATE,
  itemId, content
});

export const load = (items) => ({
  type: LOAD,
  items
});
export const clear = () => ({
  type: CLEAR
});

const initialState = {
  tobuyItems: [],
  tobuyFavorites: []
};

export default (state = initialState, action) => {
  switch (action.type) {
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
    case LOAD:
      return {
        ...state,
        tobuyItems: action.items ? Object.keys(action.items).map(function (key) {
            action.items[key].id = key;
            return action.items[key];
          })
          :
          []
      };
    case CLEAR:
      return {
        ...state,
        tobuyItems: []
      };
    default:
      return state
  }
}