"use client";
import React, {useState} from "react";
import {Button, Checkbox, Tooltip, Chip} from "@nextui-org/react";
import { ITEMS_API, IMAGES_FOLDER, FILES_API } from "@/app/constants/constants";
import { IoIosClose } from "react-icons/io";
import { useTranslations } from "next-intl";
import Image from "next/image";
import EditItem from "./EditItem";
import {formatDateToDo} from './actionsItem';


export default function Item(props) {
  const {
    title, content, id, className, reloadList, done, category, cover, dateToDone, dateDone, priority
  } = props;
  const [isLoading, setLoading] = useState(false);
  const t = useTranslations();

  const removeFile = () => {
    fetch(FILES_API, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({cover})
    }).then(e => console.log(e))
    .catch((err) => console.log(err));
  }

  const deleteItem = ()  => {
    setLoading(true)
    fetch(`${ITEMS_API}/${id}`, {
      method: 'DELETE'
    }).then(() => {
      toast.success(`Se borro exitosamente ${title}`);
      if(cover) removeFile()
      reloadList();

    }).catch((err) => {
      console.log("ERROR", err)
    })
    .finally(() => {
      setLoading(false);
    })
  }

  const modifyDone = (done)  => {
    const data = new FormData();
    data.set("done", done);
    fetch(`${ITEMS_API}/${id}`, {
      method: 'PUT',
      body: data,
    }).then(() => {
      reloadList();

    }).catch((err) => {
      console.log("ERROR", err)
      setLoading(false);
    })
  }


  return (
      <div style={{borderRadius: '4px', padding: '1rem'}} className={`border flex ${className}`}>
        <div className="cover mr-2">
          {cover && <Image alt={cover} width="150" height="150" src={`${IMAGES_FOLDER}/${cover}`} />}
        </div>
        <div style={{flex: '1', width: '1%'}}>
          {dateDone && <small style={{color: 'yellow'}}>Done in: {formatDateToDo(dateDone)}</small>}
      <h3 className="flex">
      <Checkbox isSelected={done} onValueChange={(e) => {
        modifyDone(e)
      }}>
      </Checkbox><span> {title}</span></h3>
      <small className="block" style={{textOverflow: 'ellipsis',overflow: 'hidden', whiteSpace: 'nowrap'}}>{content}</small>
      <Chip size="sm" className="mb-3">{category.name}</Chip>
      <p>Date to do: {formatDateToDo(dateToDone)}</p>
      <p>{[...Array(priority)].map((e, index) => index + 1).map((item) => <span key={item} className="star">&#9733;</span>)}</p>
      </div>
      <EditItem reloadList={reloadList} {...props} />
      <Tooltip content={t('commons.delete')}>
        <Button
          className="btn-close ml-2"
          isIconOnly
          isLoading={isLoading}
          isDisabled={isLoading}
          onClick={() => {
            if(window.confirm(t('commons.delete_item'))) {
              deleteItem()
            }
          }}
          >
            <IoIosClose />
        </Button>
      </Tooltip>
    </div>
  )
}
