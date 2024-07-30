import React, { memo, useCallback, useState } from 'react';
import Modal from '../../../../../components/modal/Modal';
import PasswordModal from './PasswordModal';

function Password(props) {
    const [openPasswordModal, setOpenPasswordModal] = useState({ open: false, data: {} });

    // open add unit modal
    const openPasswordModalHandler = useCallback(value => {
        setOpenPasswordModal({ open: true, data: value });
    }, []);

    // close add unit modal
    const closePasswordModalHandler = useCallback(() => {
        setOpenPasswordModal({ open: false, data: {} });
    }, []);

    return (
        <>
            <div className='flex items-end gap-4'>
                <div className='w-full'>
                    <span className='block font-gilroy text-sm font-bold mb-2'>
                        Пароль
                    </span>
                    <input className='appearance-none bg-custom-light rounded-md w-full p-3.5 text-gray-700 leading-tight focus:outline-none'
                        id="password"
                        name="passwords"
                        type="password"
                        placeholder="••••••••••••••"
                        disabled
                    />
                </div>
                <button
                    className='bg-custom-gray hover:bg-gray-900 text-white font-gilroy p-3 rounded-md focus:outline-none focus:shadow-outline text-]13px] lg:text-[15px]'
                    onClick={() => openPasswordModalHandler("item")}
                >
                    Изменить
                </button>
            </div>

            {/* open code modal */}
            {openPasswordModal.open && (
                <Modal
                    closeModal={() => { }}
                    open={openPasswordModal.open}
                    maxWidth="sm:max-w-2xl"
                >
                    <PasswordModal
                        closeModal={closePasswordModalHandler}
                        element={openPasswordModal.data}
                    />
                </Modal>
            )}
        </>
    )
}

export default memo(Password);