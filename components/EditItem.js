import React, {useState} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody,
  ModalFooter, Button, useDisclosure, Checkbox, Input, Textarea} from "@nextui-org/react";
import { useTranslations } from "next-intl";
import CategoryList from "./CategoryList";
import FileUploader from "./FileUploader";

export default function EditItem(props) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const t = useTranslations();
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [done, setDone] = useState(props.done);
  const [url, setUrl] = useState(props.url || '');
  const [cover, setCover] = useState(props.cover);
  const [categoryId, setCategoryId] = useState(props.category?.id)

  return (
    <>
      <Button className="ml-2" onPress={onOpen} color="primary">Edit</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <CategoryList name={categoryId} callback={(category) => setCategoryId(category.id)} />
                <Input
                  autoFocus
                  label={t('commons.title')}
                  variant="bordered"
                  value={title}
                  onChange={({target}) => setContent(target.value)}
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
                <Button color="primary" onPress={onClose}>
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
