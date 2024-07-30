import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import { useAuth } from '../../services/useAuth';

function SendModal({ data, isOpen, onClose = true }) {
  const navigate = useNavigate();
  let { user_id } = useAuth();
  const text_ref = useRef();

  // reply handler
  const replyHandler = () => {

    if (text_ref.current.value.trim()?.length > 0) {
      let obj = {
        receiver: data,
        senderId: user_id,
        text: text_ref.current.value,
        project: null
      }
      navigate("/admin/messages", { state: obj });
    }
  }

  return (
    <>
      <Dialog placeholder={<div />} open={isOpen} handler={onClose} className='p-8 w-[500px]' size='lg'>
        <DialogHeader placeholder={<div />} className='uppercase flex items-center gap-2'>
          <span>Пришлашение для:</span>
          <span className='text-main-green'>{data.first_name}</span>
          <span className='text-main-green'>{data.last_name}</span>
        </DialogHeader>

        {/* <div className='flex flex-wrap gap-2 p-4 w-[300px]'>
          <div className='bg-white shadow rounded'>
            <select
              id='countries'
              className='text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[300px] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none p-6'
            >
              {data.technologies.map((tech) => {
                return <option key={Math.random().toString()} value={tech}>{tech}</option>;
              })}
            </select>
          </div>
        </div> */}
        <DialogBody placeholder={<div />}>
          <div className='flex flex-col '>
            <span className='text-custom-gray font-gilroy-bold' >
              Напишите письмо
            </span>
            <textarea
              placeholder='Комментарий'
              className={`bg-gray-50 text-gray-900 text-sm rounded-lg border border-gray-50 outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
              rows={4}
              ref={text_ref}
            />
          </div>
        </DialogBody>
        <DialogFooter
          className='flex flex-col lg:flex-row items-start gap-2 justify-start w-full '
          placeholder={<div />}
        >
          <Button
            placeholder={<div />}
            color='red'
            variant='text'
            onClick={onClose}
            className='w-full md:w-auto md:mr-1 bg-gray-800 text-white text-xs py-5 px-10 rounded-md hover:bg-gray-700 '
          >
            Отменить
          </Button>
          <Button
            placeholder={<div />}
            onClick={replyHandler}
            className='w-full md:w-auto bg-main-green text-white text-xs py-5 px-10 rounded-md hover:opacity-55'
          >
            Отправить
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default SendModal;
