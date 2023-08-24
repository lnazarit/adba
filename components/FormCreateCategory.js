"use client";
import { useState } from "react";
import {Button, Input} from "@nextui-org/react";
import { slugify } from "@/utils";
import ErrorBox from "./ErrorBox";

export default function FormCreateCategory({reloadList}) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const save = (name, slug) => {
      fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        body: JSON.stringify({name, slug}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res) => {
        if(res.status > 400) {
          res.json().then((e) => {
            setError(true);
            setErrorMsg(e.message)
          });
        } else {
          setError(false)
          setErrorMsg('')
          reloadList();
        }
      })
    .catch((err) => {
      console.log(err.message)
    })
  }

  const submit = (e) => {
    e.preventDefault();
    save(name, slug);
  }

  return (
    <form onSubmit={submit}>
      {error && <ErrorBox msg={errorMsg} />}
      <div className="mb-4">
        <label>Title</label>
      <Input type="text" name="title" value={name}
        onChange={({target}) => {
          setName(target.value)
          setSlug(slugify(target.value))
        }}
      />
      </div>
      <div>
      <label>Slug</label>
      <Input type="text" name="slug" value={slug} onChange={({target}) => setSlug(target.value)} />
      </div>
      <Button type="submit">Crear</Button>

    </form>
  )
}
