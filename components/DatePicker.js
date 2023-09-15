import React, {useState} from 'react';
import { format } from 'date-fns';
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import { DayPicker } from 'react-day-picker';

import 'react-day-picker/dist/style.css';

export default function Example({date, title, onChange}) {
  const [selected, setSelected] = useState(typeof date === 'string' ? new Date(date) : null)
  const [isOpen, setIsOpen] = useState(false);

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }
  return (
    <>
      {title && <label className='block mb-2'>{title}</label>}
      <Popover placement="right" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger>
          <Button>{selected ? format(selected, 'PP') : 'Select a date'}</Button>
        </PopoverTrigger>
        <PopoverContent>

          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(date) => {
              setSelected(date);
              onChange(date);
            }}
            footer={footer}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}