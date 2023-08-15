"use client";
import {useState, Fragment} from 'react';
import { useFetch } from "@/services/useFetch";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { CATEGORIES_API } from '@/app/constants/constants';

export default function CategoryList({callback, showAll = false}) {
  const obj = {name: 'All', slug: 'all', id: 0}
  const {data, loading, error} = useFetch(CATEGORIES_API)
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
      {data && <DropdownMenu
        aria-label="Dynamic Actions"
        items={showAll ? [...data, obj] : data}
      >
      {(item) => (
          <DropdownItem
            key={item.slug}
            onClick={() => {
              setTitle(item.name);
              callback(item.id !== 0 ? {name: item.name, id: item.id} : null)
            }}
          >
            {item.name}
          </DropdownItem>
        )}
      </DropdownMenu>}
    </Dropdown>
  );
}
