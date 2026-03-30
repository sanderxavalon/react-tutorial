export const StatusFilters = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
}

const initialState = {
  status: StatusFilters.All,
  colors: [],
}

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/statusFilterChanged': {
      return {
        // 同樣，少一層嵌套需要複製
        ...state,
        status: action.payload,
      }
    }
    case 'filters/colorFilterChanged': {
      let { color, changeType } = action.payload
      const { colors } = state

      switch (changeType) {
        case 'added': {
          if (colors.includes(color)) {
            // 此顏色已設為篩選條件，不需要更改狀態。
            return state
          }

          return {
            ...state,
            colors: state.colors.concat(color),
          }
        }
        case 'removed': {
          return {
            ...state,
            colors: state.colors.filter(
              (existingColor) => existingColor !== color,
            ),
          }
        }
        default:
          return state
      }
    }
    default:
      return state
  }
}

export const statusFilterChanged = (status) => ({
  type: 'filters/statusFilterChanged',
  payload: status,
})

export const colorFilterChanged = (color, changeType) => {
  return {
    type: 'filters/colorFilterChanged',
    payload: { color, changeType },
  }
}
