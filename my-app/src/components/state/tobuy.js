const MARK = 'tobuy/MARK';
const UNMARK = 'tobuy/UNMARK';
const LOAD = 'tobuy/LOAD';

export const mark = itemContent => ({
  type: MARK,
  itemContent
});

export const unmark = itemContent => ({
  type: UNMARK,
  itemContent
});

export const load = (data) => ({
  type: LOAD,
  data
});


const initialState = {
  tobuyItems: [],
  tobuyFavorites: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MARK:
      return {
        ...state,
        tobuyFavorites: state.tobuyFavorites.concat(action.itemContent).filter((value, index, inputArray) => {
          return inputArray.indexOf(value) === index
        })
      };
    case UNMARK:
      return {
        ...state,
        tobuyFavorites: state.tobuyFavorites.filter(favItem => {
          return favItem.itemContent !== action.itemContent
        })
      };
    case LOAD:
      return {
        tobuyItems: action.data.items ?
          Object.keys(action.data.items).map(function (key) {
            action.data.items[key].id = key;
            return action.data.items[key];
          }).reverse()
          :
          [],
        tobuyFavorites: action.data.favoriteItems ?
          action.data.favoriteItems.items.content
          :
          []
      };
    default:
      return state
  }
}