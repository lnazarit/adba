import { useState } from "react"
export default function Rate({label, size = 10, selected = 2, callback}) {
  const [rating, setRating] = useState(selected);
  const [hover, setHover] = useState(selected);
  return (
    <fieldset className="mb-4">
      {label && <label className="block mb-3">{label}</label>}
      <span className="star-cb-group">
        {[...Array(size)].map((_, index) => {
          index += 1;
          return <button
          type="button"
          key={index}
          className={`star-button ${index <= (hover || rating) ? "on" : "off"}`}
          onClick={() => {
            setRating(index)
            callback(index)
          }}
          onMouseEnter={() => setHover(index)}
          onMouseLeave={() => setHover(rating)}
        >
          <span className="star">&#9733;</span>
        </button>
        })}
      </span>
    </fieldset>
  )
}