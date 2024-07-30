// react-core

// material-tailwind
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

function ApplyModal({ data, isOpen, onClose }) {
  return (
    <>
      <Dialog placeholder={<div />} open={isOpen} handler={onClose}>
        <DialogHeader placeholder={<div />}>
          {data.dialogTitle}
          <span className='text-main-green text-sm ml-3'>{data.status}</span>
        </DialogHeader>

        <hr />

        <div className='flex flex-wrap gap-2 p-4'>
          {data.technologies.map((tech) => (
            <Button
              key={tech}
              placeholder={<div />}
              variant='filled'
              className={`uppercase  bg-custom-gray`}
            >
              {tech}
            </Button>
          ))}
        </div>
        <DialogBody placeholder={<div />}>
          <div className='flex flex-col '>
            <label className='text-custom-gray font-gilroy-bold' htmlFor=''>
              Напишите письмо
            </label>
            <textarea
              placeholder='Комментарий'
              className='textarea bg-gray-50 p-2 textarea-bordered'
              rows={4}
            />
          </div>
        </DialogBody>
        <DialogFooter
          className='flex flex-col lg:flex-row items-start gap-2 justify-start w-full'
          placeholder={<div />}
        >
          <Button
            placeholder={<div />}
            color='red'
            variant='text'
            onClick={onClose}
            className='w-full md:w-auto md:mr-1 bg-gray-800 text-white text-sm px-10 py-4 rounded-md hover:bg-gray-700'
          >
            Отмена
          </Button>
          <Button
            placeholder={<div />}
            onClick={onClose}
            className='w-full md:w-auto bg-main-green text-white text-sm px-9 py-4 rounded-md hover:opacity-55'
          >
            Отправить
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default ApplyModal;
