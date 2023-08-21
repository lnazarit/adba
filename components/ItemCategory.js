"use client";
import React, {useState} from "react";
import {Button} from "@nextui-org/button";
import { CATEGORIES_API } from "@/app/constants/constants";

export default function ItemCategory({name, slug, id, className, reloadList}) {
  const [isLoading, setLoading] = useState(false);

  const deleteItem = (id)  => {
    setLoading(true)
    fetch(`${CATEGORIES_API}/${id}`, {
      method: 'DELETE'
    }).then(() => {
      alert("se borro");
      reloadList();

    }).catch((err) => {
      console.log("ERROR", err)
      setLoading(false);
    })
  }


  return (
      <div className={className}>
      <h3>{name}</h3>
      <p>{slug}</p>
      <Button
        isLoading={isLoading}
        isDisabled={isLoading}
        onClick={(e) => deleteItem(id)}>X
      </Button>
    </div>
  )
}
