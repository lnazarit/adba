export default function Loading({showText}) {
  return (
    <div className="text-center">
      <div className="lds-ripple">
        <div />
        <div />
      </div>
      <div>Loading</div>
    </div>
  )
}