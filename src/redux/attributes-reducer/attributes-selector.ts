import { RootState } from '../store'

export const getAttributes = (state: RootState) => {
  return state.attributes.attributes
}
