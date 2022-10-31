import { InferAction, InferThunk } from '../store'
import {attributesAPI} from "../../API/API";

const SET_ATTRIBUTES = 'BAREBONES_PROJECT/ATTRIBUTES_REDUCER/SET_ATTRIBUTES'

const initialState = {
    attributes: [] as any[]
}

export type AttributesReducerState = typeof initialState

type AttributesAction = InferAction<typeof attributesActions>

type AttributesThunk = InferThunk<AttributesAction>

const attributesReducer = (state = initialState, action: AttributesAction): AttributesReducerState => {
  switch (action.type) {
    case SET_ATTRIBUTES:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export const attributesActions = {
  setAttributes: (attributes: any[]) =>
    ({
      type: SET_ATTRIBUTES,
      payload: { attributes },
    } as const),

}

export const fetchAttributes = (): AttributesThunk => async (dispatch) => {
    const data = await attributesAPI.getAttributes(1, 10)

    dispatch(attributesActions.setAttributes(data.results))

}

export default attributesReducer
