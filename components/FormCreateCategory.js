"use client";
import { useState } from "react";
import {Button, Input} from "@nextui-org/react";
import { slugify } from "@/utils";

export default function FormCreateCategory({reloadList}) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState(null);

  const savse = async (name, slug) => {
    try {
      const response = await fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        body: JSON.stringify({name, slug}),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // if (!response.ok) {
      //   console.log(response.errors)
      //   const message = `An error has occured: ${response.status}`;
      //   throw new Error(message);
      // }
    } catch(err) {
      console.log(err.message)
    }
  }

  const save = (name, slug) => {
    
      fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        body: JSON.stringify({name, slug}),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(() => {
        console.log("exito")
      })
      // if (!response.ok) {
      //   console.log(response.errors)
      //   const message = `An error has occured: ${response.status}`;
      //   throw new Error(message);
      // }
    .catch((err) => {
      console.log(err.message)
    })
  }

  const submit = (e) => {
    e.preventDefault();
      save(name, slug);
      // await reloadList();
  }

  return (
    <form onSubmit={submit}>
      {error && <p>Error: {error}</p>}
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
