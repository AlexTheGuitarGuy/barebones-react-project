import { InferAction, InferThunk } from '../store'
import { attributesAPI } from '../../API/API'

const SET_ATTRIBUTES = 'BAREBONES_PROJECT/ATTRIBUTES_REDUCER/SET_ATTRIBUTES'
const UPDATE_ATTRIBUTES = 'BAREBONES_PROJECT/ATTRIBUTES_REDUCER/UPDATE_ATTRIBUTES'

export type Attribute = {
  id: number
  name: string
  description: string
  attributeGroupId?: number
  attributeGroup?: any
}
const initialState = {
  attributes: [] as Attribute[],
}

export type AttributesReducerState = typeof initialState

type AttributesAction = InferAction<typeof attributesActions>

type AttributesThunk = InferThunk<AttributesAction>

const attributesReducer = (
  state = initialState,
  action: AttributesAction,
): AttributesReducerState => {
  switch (action.type) {
    case SET_ATTRIBUTES:
      return {
        ...state,
        ...action.payload,
      }
    case UPDATE_ATTRIBUTES:
      return {
        ...state,
        attributes: [
          ...state.attributes.map((attribute) => {
            if (attribute.id !== action.id) return attribute
            const { id, name, description, attributeGroupId, attributeGroup } = action.payload
            return { id, name, description, attributeGroupId, attributeGroup }
          }),
        ],
      }
    default:
      return state
  }
}

export const attributesActions = {
  setAttributes: (attributes: Attribute[]) =>
    ({
      type: SET_ATTRIBUTES,
      payload: { attributes },
    } as const),
  updateAttribute: (id: number, payload: Attribute) =>
    ({
      type: UPDATE_ATTRIBUTES,
      id,
      payload,
    } as const),
}

export const fetchAttributes = (): AttributesThunk => async (dispatch) => {
  const data = await attributesAPI.getAttributes(1, 10)
  const newData = data.results.map(
    ({ id, name, description, attributeGroup, attributeGroupId }: Attribute) => ({
      id,
      name,
      description,
      attributeGroup: {
        id: attributeGroup.id,
        name: attributeGroup.name,
        description: attributeGroup.description,
      },
      attributeGroupId,
    }),
  )
  dispatch(attributesActions.setAttributes(newData))
}

export const patchAttributes =
  (id: number, newData: Attribute): AttributesThunk =>
  async (dispatch) => {
    const res = await attributesAPI.patchAttributes(id, newData)

    if (res) dispatch(attributesActions.updateAttribute(res.id, res))
  }

export default attributesReducer
