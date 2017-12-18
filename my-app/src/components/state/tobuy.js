const ADD = 'tobuy/ADD'
const REMOVE = 'tobuy/REMOVE'
const UPDATE = 'tobuy/UPDATE'

export const add = tobuyItem => ({
  type: ADD,
  tobuyItem
})

export const remove = itemId => ({
  type: REMOVE,
  itemId
})

export const update = (itemId, content) => ({
  type: UPDATE,
  itemId, content
})

const initialState = {
  tobuyItems: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD:
      return {
        tobuyItems: state.tobuyItems.concat({
          id: state.tobuyItems.map(
            tobuyItem => tobuyItem.id
          ).reduce(
            (currentMax, next) => currentMax > next ? currentMax : next,
            0
          ) + 1,
          content: action.tobuyItem,
          done: false
        })
      }
    case REMOVE:
      return {
        tobuyItems: state.tobuyItems.filter(
          tobuyItem => tobuyItem.id !== action.itemId // itemId is set during dispatch in component (it's an extra param set in action object)
        )
      }
    case UPDATE:
      return {
        tobuyItems: state.tobuyItems.map(
          tobuyItem => tobuyItem.id !== action.itemId ?
            tobuyItem :
            {
              id: tobuyItem.id,
              content: action.content,
              done: tobuyItem.done
            }
        )
      }
    default:
      return state
  }
}