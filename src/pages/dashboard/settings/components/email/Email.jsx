import React, { memo, useCallback, useState } from 'react';
import Modal from '../../../../../components/modal/Modal';
import CodeModal from './CodeModal';

function Email({ data, getData }) {
    const [openCodeModal, setOpenCodeModal] = useState({ open: false, data: {} });

    // open add unit modal
    const openCodeModalHandler = useCallback(value => {
        setOpenCodeModal({ open: true, data: value });
    }, []);

    // close add unit modal
    const closeCodeModalHandler = useCallback(() => {
        setOpenCodeModal({ open: false, data: {} });
    }, []);

    return (
        <>
            <div className='flex items-end gap-4'>
                <div className='w-full'>
                    <span className='block font-gilroy text-sm font-bold mb-2'>
                        E-mail
                    </span>
                    <input className='appearance-none bg-custom-light rounded-md w-full p-3.5 text-gray-700 leading-tight focus:outline-none'
                        id="email"
                        name="emails"
                        type="email"
                        placeholder="Yourmail@mail.ru"
                        defaultValue={data ? data.email : ""}
                        disabled
                        required
                    />
                </div>
                <button
                    type='button'
                    className='bg-custom-gray hover:bg-gray-900 text-white font-gilroy p-3 rounded-md focus:outline-none focus:shadow-outline text-]13px] lg:text-[15px]'
                    onClick={() => openCodeModalHandler("item")}
                >
                    {/* Сохранить */}
                    Изменить
                </button>
            </div>

            {/* open code modal */}
            {openCodeModal.open && (
                <Modal
                    closeModal={() => { }}
                    open={openCodeModal.open}
                    maxWidth="sm:max-w-2xl"
                >
                    <CodeModal
                        closeModal={closeCodeModalHandler}
                        element={openCodeModal.data}
                        getData={getData}
                    />
                </Modal>
            )}
        </>
    )
}

export default memo(Email);