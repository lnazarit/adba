"use client";
import {useState} from 'react';
import { useFetch } from "@/services/useFetch";
import dynamic from 'next/dynamic'
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

const URL_CATEGORIES = 'http://localhost:8080/api/categories';

export default function CategoryList({callback, showAll = false}) {
  const obj = {name: 'All', slug: 'all', id: 0}
  const {data, loading, error} = useFetch(URL_CATEGORIES)
  const [title, setTitle] = useState('Select a category');
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error</p>
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
        >
          {title}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions" items={showAll ? [...data, obj] : data}>
      {(item) => (
          <DropdownItem
            onClick={() => {setTitle(item.name); callback(item.id)}}
            key={item.id}
          >
            {item.name}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
