import DropdownSelect from "./DropdownSelect";
const arr = [...Array(Number(process.env.NEXT_PUBLIC_RATE_SIZE) || 5)]
.map((_, index) => index).map(e => ({key: e+1, name: '★'.repeat(e+1)}))

export default function FilterRate({callback}) {
  return (
    <DropdownSelect placeholder="Select a rate" label="Rate" items={arr} callback={callback} />
  )
}
