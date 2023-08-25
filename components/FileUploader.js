import Image from "next/image"
import { Chip, Tooltip } from "@nextui-org/react";
import { useId } from "react";
import { IMAGES_FOLDER } from "@/app/constants/constants"

const nameFile = file => {
  if(file && typeof file === 'string') return file;
  return file.name
}

export default function FileUploader({file, handleFileChange}) {
  const id = useId();
  let fileExist = {};
  if(file && typeof file === 'string') fileExist = {destroy: file}

  const coverFile = (file, string) => {
    return (
      <>
      <button onClick={() => handleFileChange({file: null, ...fileExist})}>borrar</button>
        <Image
          src={string ? `${IMAGES_FOLDER}/${file}` : URL.createObjectURL(file)}
          alt="Uploaded file"
          className="object-contain mx-auto my-5"
          width={100}
          height={100}
        />
        <Tooltip content={string ? file : file.name}>
          <Chip size="sm" className="ellipsis">{nameFile(file)}</Chip>
        </Tooltip>
    </>
    )
  }

  const conditionalImage = () => {
    return file === null || file === '' || file?.destroy
  }

  const resultImage = () => {
    if(conditionalImage()) return null
    if(file && typeof file === 'string') return coverFile(file, true)
    return coverFile(file)
  }
  const form = (
    <div className="p-5 border border-radius">
      <label className="block mb-2" for={id}>Select cover for your item</label>
      <input id={id} type="file" onChange={(e) => {
        if (!e.target.files?.[0]) return;
        handleFileChange({file: e.target.files?.[0], ...fileExist});
      }} />
    </div>
  )

  return conditionalImage() ? form : resultImage()
}
