import {format} from "date-fns";

const validateFields = (categoryId, title) => {
  if(!categoryId || title === '') return true;
  return false;
}

const formatDateToDo = (dateToDo) => {
  if(dateToDo) return <strong className="ml-2">{format(new Date(dateToDo), 'PP')}</strong>
  return <span className="ml-2" style={{opacity: '.5'}}>No date to do</span>
}

export {validateFields, formatDateToDo}