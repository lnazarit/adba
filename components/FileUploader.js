import Image from "next/image"
import { useId } from "react";
import { IMAGES_FOLDER } from "@/app/constants/constants"

const coverFile = (file, string) => {
  return (<Image
    src={string ? file : URL.createObjectURL(file)}
    alt="Uploaded file"
    className="object-contain mx-auto my-5"
    width={100}
    height={100}
  />)
}

const nameFile = file => {
  if(file === null) return 'Select file';
  if(file && typeof file === 'string') return file;
  return file.name
}

export default function FileUploader({file, handleFileChange}) {
  const id = useId();
  const resultImage = () => {
    if(file === null) return <p>No image</p>
    if(file && typeof file === 'string') return coverFile(`${IMAGES_FOLDER}/${file}`, true)
    return coverFile(file)
  }
  return (
    <>
    {resultImage()}
    <label for={id}>{nameFile(file)}</label>
    <input id={id} type="file" onChange={(e) => {
      if (!e.target.files?.[0]) return;
      handleFileChange(e.target.files?.[0]);
    }} />
    </>
  );
}
