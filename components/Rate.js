import { useState, useEffect } from "react"
import { useTranslations } from "next-intl";

export default function Rate(props) {
  const t = useTranslations();
  const {label = t('commons.priority'), size = 10, selected = 1, callback} = props;

  const [rating, setRating] = useState(selected);
  const [hover, setHover] = useState(selected);

  useEffect(() => {
    setRating(selected);
  }, [selected])

  return (
    <fieldset className="mb-4">
      {label && <label className="block mb-1">{label}</label>}
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