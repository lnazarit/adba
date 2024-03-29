"use client";
import { useState, useEffect, useCallback, useRef} from "react";
import { Button, Input } from "@nextui-org/react";
import { useDebounce } from "@/app/hooks";
import { useTranslations } from "next-intl";
import { IoIosClose } from "react-icons/io";

export default function Search({ callback }) {
  const t = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const debounceSearch = useDebounce(searchTerm, 300);
  const cb = useCallback(callback, [callback]);

  const node = useRef(null)

  useEffect(() => {
    if(node.current) {
      cb(debounceSearch);
    } else {
      node.current = true;
    }
  }, [debounceSearch]);

  return (
    <div className="search ml-2 relative">
      <Input
        value={searchTerm}
        style={{paddingRight: 35}}
        placeholder={t("commons.search") + "..."}
        onChange={({ target }) => {
          setSearchTerm(target.value);
        }}
      />
      {searchTerm !== "" && <Button
        style={{position: 'absolute', right: 12, top: 6, padding: '3px', minWidth: 0, width: 25, height: 25}}
        className="btn-close"
        isIconOnly
        onClick={() => setSearchTerm("")}
      >
        <IoIosClose style={{}} />
      </Button>}
    </div>
  );
}
