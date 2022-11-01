import MaterialTable from 'material-table'
import tableIcons from './MaterialTableIcons'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { getAttributes } from '../../redux/attributes-reducer/attributes-selector'
import { useEffect, useState } from 'react'
import { patchAttributes } from '../../redux/attributes-reducer/attributes-reducer'

export const SubgroupTable = () => {
  const dispatch = useAppDispatch()

  const attributes = useAppSelector(getAttributes)
  const [attributeGroups, setAttributeGroups] = useState([])
  console.log(attributes)

  useEffect(() => {
    let attributeGroupsEffect = attributes.map(({ attributeGroup: { id, name, description } }) => {
      return {
        id,
        name,
        description,
      }
    })

    attributeGroupsEffect = attributeGroupsEffect.filter(
      (value, index, self) => index === self.findIndex((t) => t.id === value.id),
    )

    setAttributeGroups(attributeGroupsEffect)
  }, [attributes])

  let newData = [...attributeGroups, ...attributes]

  newData = newData.filter(
    (value, index, self) => index === self.findIndex((t) => t.id === value.id),
  )

  const [data, setData] = useState(newData)
  useEffect(() => {
    setData([...attributeGroups, ...attributes])
  }, [attributes, attributeGroups])

  const columns = [
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
    { title: 'ID', field: 'id', type: 'numeric', editable: 'never' },
  ]

  return (
    <MaterialTable
      title='Table with subgroups'
      icons={tableIcons}
      columns={columns}
      data={data}
      parentChildData={(row, rows) =>
        rows.find((a) => {
          return a.id === row.attributeGroupId
        })
      }
      editable={{
        isEditHidden: (rowData) => !rowData.attributeGroupId,
        onRowUpdate: (newData) =>
          new Promise(async (resolve) => {
            await dispatch(patchAttributes(newData.id, newData))
            resolve()
          }),
      }}
    />
  )
}
