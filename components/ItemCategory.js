"use client";
import React, {useState} from "react";
import {Button} from "@nextui-org/button";

const URL = 'http://localhost:8080/api/licors'

export default function ItemCategory({name, slug, id, className, reloadList}) {
  const [isLoading, setLoading] = useState(false);

  const deleteItem = (id)  => {
    setLoading(true)
    fetch(`${URL}/${id}`, {
      method: 'DELETE'
    }).then(() => {
      alert("se borro");
      // reloadList();

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
