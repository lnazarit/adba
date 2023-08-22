
import Image from "next/image"
import { IMAGES_FOLDER } from "@/app/constants/constants"

const coverFile = (file, string) => {
  return (<Image
    src={string ? file : URL.createObjectURL(file)}
    alt="Uploaded file"
    className="w-64 h-64 object-contain mx-auto"
    width={256}
    height={256}
  />)
}

export default function FileUploader({file, handleFileChange}) {
  const resultImage = () => {
    if(file === null) return <p>No image</p>
    if(file && typeof file === 'string') return coverFile(`${IMAGES_FOLDER}/${file}`, true)
    return coverFile(file)
  }
  return (
    <>
    {resultImage()}
    <input type="file" onChange={(e) => {
      if (!e.target.files?.[0]) return;
      handleFileChange(e.target.files?.[0]);
    }} />
    <button
      className="btn btn-primary"
      type="submit"
    >
      Select cover
    </button>
    </>
  );
}
