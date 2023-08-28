import DropdownSelect from "./DropdownSelect";
const arr = [{name: 'All', key:"all"}, {name: 'Done', key:"done"}, {name: 'Not done', key:"not_done"}]

export default function FilterDone({callback}) {
  return (
    <DropdownSelect label="Done" items={arr} callback={(e) => callback(e.key)} />
  )
}
