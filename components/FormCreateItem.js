"use client";
import { useState } from "react";
import {Checkbox, Button, Input, Textarea} from "@nextui-org/react";
import CategoryList from "./CategoryList";
import { ITEMS_API } from "@/app/constants/constants";
import FileUploader from "./FileUploader";
import DatePicker from "./DatePicker";
import { useTranslations } from "next-intl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function FormCreateItem({reloadList}) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategory] = useState(null);
  const [done, setDone] = useState(false);
  const [dateToDone, setDateToDone] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false)
  const t = useTranslations();

  const reset = () => {
    setTitle('');
    setUrl('');
    setContent('');
    setCategory(null);
    setDone(false);
    setDateToDone(null);
    setFile(null);
  }

  const submit = async (e) => {
    e.preventDefault();
    setUploading(true)
    try {
      const data = new FormData();
      data.set("cover", file);
      data.set("title", title);
      data.set("content", content);
      data.set("categoryId", categoryId);
      data.set("done", done)
      data.set("url", url)
      data.set("dateToDone", dateToDone)
      const response = await fetch(ITEMS_API, {
        method: 'POST',
        body: data
      });
      if (response.status > 400) {
        const res = await response.json();
        res.errors.forEach(e => {
          toast.error(`${e.code}: ${e.message}`)
        })
      } else {
        toast.success(`Se agregó correctamente el item ${title}`)
      }
      await reloadList();
      reset();
    } catch(e) {
      toast.error(`Error al crear item ${e.message}`)
    } finally {
      setUploading(false)
    }
  }

  const validate = () => {
    if(!categoryId || title === '') return true;
    return false;
  }

  return (
    <>
    <ToastContainer theme="dark" />
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
      <FileUploader file={file} handleFileChange={(e) => setFile(e)} />
      </div>
      <div className="mb-4">
        <DatePicker onChange={(date) => setDateToDone(date)} title={t('commons.select_date')} />
      </div>
      <div className="mb-4">
        <Checkbox isSelected={done} onValueChange={setDone}>
          DONE
        </Checkbox>
      </div>

      <Button color="primary" isDisabled={uploading || validate()} type="submit">Agregar</Button>

    </form>
    </>
  )
}
