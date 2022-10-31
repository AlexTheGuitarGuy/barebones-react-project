import MaterialTable from "material-table";
import tableIcons from "./MaterialTableIcons";
import {useAppSelector} from "../../hooks/reduxHooks";
import {getAttributes} from "../../redux/attributes-reducer/attributes-selector";



export const ActionTable = () => {
    const attributes = useAppSelector(getAttributes)
    let attributeGroups = attributes.map(attribute=>(attribute.attributeGroup))
    attributeGroups = attributeGroups.filter((value, index, self) =>
            index === self.findIndex((t) => (
                t.id === value.id
            ))
    )
    console.log(attributeGroups)


    const columns = [
        { title: "ID", field: "id", type: "numeric" },
        { title: "Name", field: "name" },
        { title: "Description", field: "description" },
    ];

    return (
        <MaterialTable
            title="Table with subgroups"
            icons={tableIcons}
            columns={columns}
            data={[...attributeGroups,...attributes]}
            parentChildData={(row, rows) => rows.find(a => {
                return a.id === row.attributeGroupId
            })}

        />
    );
};
