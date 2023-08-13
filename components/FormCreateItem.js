"use client";
import { useState } from "react";
import {Checkbox, Button, Input, Textarea} from "@nextui-org/react";
import CategoryList from "./CategoryList";

export default function FormCreateItem({reloadList}) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryId, setCategory] = useState(null);
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/items', {
        method: 'POST',
        body: JSON.stringify({title, content, categoryId, done}),
        headers: {
          'Content-Type': 'application/json'
        }
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

  return (
    <form onSubmit={submit}>
      <h2 className="mb-3">Agregar item</h2>
      <div className="mb-4">
      <Input label="Title" type="text" name="title" value={title} onChange={({target}) => setTitle(target.value)} />
      </div>
      <div>
      <div className="mb-4">
        <CategoryList callback={(id) => setCategory(id)} />
      </div>
      <div className="mb-4">
        <Textarea label="Description" name="content" value={content}  onChange={({target}) => setContent(target.value)} />
      </div>
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
