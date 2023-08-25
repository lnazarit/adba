import DropdownSelect from "./DropdownSelect";
const arr = [{name: 'All', key:"all"}, {name: 'Done', key:"done"}, {name: 'Not done', key:"not_done"}]

export default function FilterDone({callback}) {
  return (
    <DropdownSelect items={arr} callback={callback} />
  )
}
