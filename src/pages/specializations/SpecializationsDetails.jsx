import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileCard, SendModal, SpecializationDetailsCard } from '../../components';

const SpecializationsDetails = () => {
  const { state } = useLocation();
  const [openSendModal, setSendApplyModal] = useState(false);

  const handleSend = () => setSendApplyModal(true);
  const handleClose = () => setSendApplyModal(false);

  // console.log(state);

  return (
    <div className='max-w-5xl mx-auto py-5'>
      <ProfileCard
        user={state}
      />

      <div className='flex flex-col gap-6 mt-10'>
        <div className='mt-8'>
          <h1 className='text-custom-gray lg:text-2xl text-lg font-gunterz'>
            Профессиональная информация
          </h1>
        </div>

        <div>
          <SpecializationDetailsCard
            user={state}
          />
        </div>

        <div className='flex justify-end gap-2 w-full lg:w-auto'>
          <button
            onClick={handleSend}
            className='p-3 w-full lg:w-auto lg:px-16 lg:mt-0 mt-2 bg-text-main_green text-white rounded-md'
          >
            Отправить приглашение
          </button>
        </div>
      </div>

      <SendModal isOpen={openSendModal} onClose={handleClose} data={state} />
    </div>
  );
};

export default SpecializationsDetails;
