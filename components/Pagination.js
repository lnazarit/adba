"use client";
import { useState } from "react";
import {Checkbox, Button, Input, Textarea} from "@nextui-org/react";
import CategoryList from "./CategoryList";

export default function Pagination({meta}) {
  const [title, setTitle] = useState('');

  if(meta.total <= meta.per_page) return null;
  const countPages = meta.total / meta.per_page;
  //const arrayPages = new Array(countPages)
  const arrayPages = ['a','a','a','a','a']

  return (
    <div className="pagination">
     <p>mm</p>
      {arrayPages.map((e, i) => {
        return <p>hola</p>
      })}

    </div>
  )
}
