import React, {useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody,
  ModalFooter, Button, useDisclosure, Checkbox, Input, Textarea, Tooltip} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import CategoryList from "./CategoryList";
import FileUploader from "./FileUploader";
import { IoMdCreate } from "react-icons/io";
import { ITEMS_API } from "@/app/constants/constants";

export default function EditItem(props) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const t = useTranslations();
  const [title, setTitle] = useState(props.title);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(props.content);
  const [done, setDone] = useState(props.done);
  const [url, setUrl] = useState(props.url || '');
  const [cover, setCover] = useState(props.cover);
  const [categoryId, setCategoryId] = useState(props.category?.id)

  const save = onClose => {
    setLoading(true);
    const data = new FormData();
    data.set("cover", cover);
    data.set("title", title);
    data.set("content", content);
    data.set("categoryId", categoryId);
    data.set("done", done)
    console.log(data);
    // fetch(`${ITEMS_API}/${props.id}`, {
    //   method: 'PUT',
    //   body: data,
    // }).then(() => {
    //   // reloadList();
    //   onClose();
    // }).catch((err) => {
    //   console.log("ERROR", err)
    // })
    // .finally(() => {
    //   setLoading(false);
    // })
  }

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
                <FileUploader file={cover} handleFileChange={e => setCover(e)} />
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
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  {t('commons.cancel')}
                </Button>
                <Button color="primary" onPress={() => save(onClose)}>
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
