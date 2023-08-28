import React, {useState, useMemo} from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";

export default function DropdownSelect({items, selected, callback, label, placeholder}) {
  const selectItem = () => {
    if(selected) return selected;
    if(placeholder) return placeholder;
    return items[0].key
  }
  const [selectedKeys, setSelectedKeys] = useState(new Set([selectItem()]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <div>
      {label && <small className="block opacity-50">{label}</small>}
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
          >
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Single selection example"
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={selectedKeys}
          onAction={(e) => {
            if(callback) callback(items.find(item => item.key === e));
          }}
          onSelectionChange={setSelectedKeys}
        >
          {items.map(e => <DropdownItem key={e.key}>{e.name}</DropdownItem>)}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
