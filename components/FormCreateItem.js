"use client";
import { useState } from "react";
import {Checkbox, Button, Input, Textarea} from "@nextui-org/react";
import CategoryList from "./CategoryList";
import Image from "next/image";
import { ITEMS_API } from "@/app/constants/constants";


export default function FormCreateItem({reloadList}) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategory] = useState(null);
  const [done, setDone] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false)

  const submit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.set("cover", file);
      data.set("title", title);
      data.set("content", content);
      data.set("categoryId", categoryId);
      data.set("done", done)
      const response = await fetch(ITEMS_API, {
        method: 'POST',
        body: data
      });
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      await reloadList();
    } catch(e) {
      console.log("pedazo de error", e.Error)
    }
  }

  const handleFileChange = e => {
    if (!e.target.files?.[0]) return;
    setFile(e.target.files?.[0]);
  };

  return (
    <form onSubmit={submit}>
      <h2 className="mb-3">Agregar item</h2>
      <div className="mb-4">
        <CategoryList callback={(category) => setCategory(category.id)} />
      </div>
      <div className="mb-4">
        <Input label="Title" type="text" name="title" value={title} onChange={({target}) => setTitle(target.value)} />
      </div>
      <div className="mb-4">
        <Textarea label="Description" name="content" value={content}  onChange={({target}) => setContent(target.value)} />
      </div>
      <div className="mb-4">
        <Input label="Url" type="text" name="title" value={url} onChange={({target}) => setUrl(target.value)} />
      </div>
      <div className="mb-4">
      {file && (
          <Image
            src={URL.createObjectURL(file)}
            alt="Uploaded file"
            className="w-64 h-64 object-contain mx-auto"
            width={256}
            height={256}
          />
        )}
        <input type="file" onChange={handleFileChange} />
        <button
          className="btn btn-primary"
          type="submit"
        >
          Send to server
        </button>
      </div>
      <div className="mb-4">
        <Checkbox isSelected={done} onValueChange={setDone}>
          DONE
        </Checkbox>
      </div>

      <Button type="submit">Agregar</Button>

    </form>
  )
}
