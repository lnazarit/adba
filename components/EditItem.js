import React, {useState, useEffect} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody,
  ModalFooter, Button, useDisclosure, Checkbox, Input, Textarea, Tooltip} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import CategoryList from "./CategoryList";
import FileUploader from "./FileUploader";
import { IoMdCreate } from "react-icons/io";
import { ITEMS_API } from "@/app/constants/constants";
import { validateFields } from "./actionsItem";
import DatePicker from "./DatePicker";
import Rate from "./Rate";

export default function EditItem(props) {
  const {reloadList} = props;
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const t = useTranslations();
  const [title, setTitle] = useState(props.title);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(props.content);
  const [done, setDone] = useState(props.done);
  const [dateToDone, setDateToDone] = useState(props.dateToDone);
  const [url, setUrl] = useState(props.url);
  const [file, setFile] = useState(props.cover);
  const [categoryId, setCategoryId] = useState(props.category?.id)
  const [removeCover, setRemoveCover] = useState(null)
  const [priority, setPriority] = useState(props.priority)

  const save = onClose => {
    setLoading(true);
    const data = new FormData();
    data.set("cover", file);
    data.set("priority", priority);
    data.set("title", title);
    data.set("content", content);
    data.set("categoryId", categoryId);
    data.set("done", done);
    data.set("url", url);
    data.set("dateToDone", dateToDone);

    if(removeCover) data.set("removeCover", removeCover);

    fetch(`${ITEMS_API}/${props.id}`, {
      method: 'PUT',
      body: data,
    }).then(() => {
      reloadList();
      onClose();
    }).catch((err) => {
      console.log("ERROR", err)
    })
    .finally(() => {
      setLoading(false);
    })
  }

  const reset = (cb) => {
    setTitle(props.title);
    setUrl(props.url);
    setContent(props.content);
    setCategoryId(props.category?.id);
    setDone(props.done);
    setDateToDone(props.dateToDone);
    setFile(props.cover);
    if(cb) cb();
  }

  useEffect(() => {
    reset();
  }, [props]);

  return (
    <>
      <Tooltip content={t('commons.edit')}>
        <Button
          className="btn-close"
          isIconOnly
          onClick={onOpen}
          >
            <IoMdCreate />
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Edit {title}</ModalHeader>
              <ModalBody>
                <CategoryList name={categoryId} callback={(category) => setCategoryId(category.id)} />
                <Input
                  autoFocus
                  label={t('commons.title')}
                  variant="bordered"
                  value={title}
                  onChange={({target}) => setTitle(target.value)}
                />
                <Textarea
                  label={t('commons.description')}
                  name="content"
                  value={content}
                  onChange={({target}) => setContent(target.value)}
                />
                <div className="mb-4">
                  <FileUploader file={file} handleFileChange={e => {
                    setRemoveCover(e.destroy ? e.destroy : null)
                    setFile(e.file)
                  }} />
                </div>
                <div className="mb-4">
                  <DatePicker onChange={(date) => setDateToDone(date)} title={t('commons.select_date')} />
                </div>
                <Input
                  label={t('commons.url')}
                  variant="bordered"
                  value={url}
                  onChange={({target}) => setUrl(target.value)}
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    isSelected={done === true}
                    onChange={() => setDone(!done)}
                    classNames={{
                      label: "DONE",
                    }}
                  >
                    DONE
                  </Checkbox>
                </div>
                <Rate callback={e => setPriority(Number(e))} />
              </ModalBody>
              <ModalFooter>
                <Button variant="flat"  onPress={() => reset(onClose)}>
                  {t('commons.cancel')}
                </Button>
                <Button color="primary" isDisabled={loading || validateFields(categoryId, title)} onPress={() => save(onClose)}>
                  {t('commons.save')}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
