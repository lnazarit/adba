"use client";
import React, {useState} from "react";
import {Button, Checkbox} from "@nextui-org/react";
import { ITEMS_API } from "@/app/constants/constants";
import { IoIosClose } from "react-icons/io";


export default function Item({title, content, id, className, reloadList, done}) {
  const [isLoading, setLoading] = useState(false);

  const deleteItem = (id)  => {
    setLoading(true)
    fetch(`${ITEMS_API}/${id}`, {
      method: 'DELETE'
    }).then(() => {
      alert("se borro");
      reloadList();

    }).catch((err) => {
      console.log("ERROR", err)
      setLoading(false);
    })
  }

  const modifyDone = (data)  => {
    fetch(`${ITEMS_API}/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({done: data}),
    }).then(() => {
      alert("se marcó como hecho");
      reloadList();

    }).catch((err) => {
      console.log("ERROR", err)
      setLoading(false);
    })
  }


  return (
      <div style={{borderRadius: '4px', padding: '1rem'}} className={`border flex ${className}`}>
        <div style={{flex: '1'}}>
      <h3 className="flex">
      <Checkbox isSelected={done} onValueChange={(e) => {
        modifyDone(e)
      }}>
      </Checkbox><span> {title}</span></h3>
      <small className="block">{content}</small>

      </div>
      <Button
        className="btn-close"
        isIconOnly
        isLoading={isLoading}
        isDisabled={isLoading}
        onClick={() => deleteItem(id)}
        >
          <IoIosClose />
      </Button>
    </div>
  )
}
