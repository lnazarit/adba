import DropdownSelect from "./DropdownSelect";
const arr = [...Array(Number(process.env.NEXT_PUBLIC_RATE_SIZE) || 5)]
.map((_, index) => index).map(e => ({key: '★'.repeat(e+1), name: '★'.repeat(e+1), value: e+1}))

export default function FilterRate({callback}) {
  return (
    <DropdownSelect
      label="Rate"
      items={[{name: 'All', key:"all", value: 'all'}, ...arr]}
      callback={(e) => callback(e.value)}
    />
  )
}
