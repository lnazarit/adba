"use client";
import { useState } from "react";
import {Button, Input} from "@nextui-org/react";
import { slugify } from "@/utils";

const save = async (name, slug) => {
  const response = await fetch('http://localhost:8080/api/categories', {
    method: 'POST',
    body: JSON.stringify({name, slug}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
}

export default function FormCreateCategory({reloadList}) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const submit = async (e) => {
    e.preventDefault();
      try {
        await save(name, slug);
      } catch(err) {
        console.log(err);
      }
      await reloadList();
  }

  return (
    <form onSubmit={submit}>
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
