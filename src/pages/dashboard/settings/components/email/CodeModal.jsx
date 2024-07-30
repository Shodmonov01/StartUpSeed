import React, { memo, useRef, useState } from 'react';
import { axiosInstances } from '../../../../../config/config';
import { errorHandler, getToast, getToastWarn } from '../../../../../utils/options';

function CodeModal(props) {
    const [loading, setLoading] = useState(false);
    const [code, setCode] = useState(false);
    const email_ref = useRef();
    const code_ref = useRef();

    // get code handler
    const getCodeHandler = async () => {
        if (email_ref.current?.value) {
            setLoading(true);
            try {
                const res = await axiosInstances.post("/change/email/", {
                    email: email_ref.current.value,
                });
                if (res.status === 200 || res.status === 201) {
                    getToast(res.data || "На этот адрес электронной почты был отправлен специальный код");
                    setLoading(false);
                    setCode(true);
                } else {
                    getToastWarn(res.data || res.data?.message);
                    setLoading(false);
                }
            } catch (error) {
                // console.log(error);
                errorHandler(error);
                setLoading(false);
            }
        }
    }

    // submit
    const submitHandler = async () => {
        if (email_ref.current?.value && code_ref.current?.value) {
            setLoading(true);
            try {
                const res = await axiosInstances.put("/change/email/", {
                    email: email_ref.current.value,
                    code: code_ref.current.value,
                });
                if (res.status === 200 || res.status === 201) {
                    getToast("Электронная почта успешно изменена.");
                    props.closeModal();
                    props.getData();
                    setCode(false);
                    setLoading(false);
                } else {
                    getToastWarn(res.data || res.data?.message);
                    setLoading(false);
                }
            } catch (error) {
                // console.log(error);
                setLoading(false);
                errorHandler(error);
            }
        }
    }

    return (
        <>
            <div className="sm:text-left text-txt_color-slate p-4 md:p-6 lg:p-14 flex flex-col gap-8">
                <div className="text-sm sm:text-base font-normal flex flex-col gap-2">
                    <h3 className='font-thin font-gunterz lg:text-left text-center'>СМЕНА ПОЧТЫ</h3>
                    <span className='text-[#a7a5a5]'>Нам указанный вами новый адрес электронной почты будет выслано письмо <strong className='text-text-main_green font-thin'>с кодом подтверждения</strong>, каторый нужно будет ввести на следующем шаге.</span>
                    {/* <span className='cursor-pointer text-[22px]' onClick={props.closeModal}>&times;</span> */}
                </div>

                <div className='w-full'>
                    <span className='block font-gilroy text-md font-bold mb-2'>
                        E-mail
                    </span>
                    <input className='appearance-none bg-custom-light rounded-md w-full p-5 text-gray-700 leading-tight focus:outline-none'
                        id="email"
                        name="emails"
                        type="email"
                        placeholder="Новый yourmail@mail.ru"
                        required
                        ref={email_ref}
                    />
                </div>
                {code && (
                    <div className='w-full'>
                        <span className='block font-gilroy text-md font-bold mb-2'>
                            Код подвержедения
                        </span>
                        <input className='appearance-none bg-custom-light rounded-md w-full p-5 text-gray-700 leading-tight focus:outline-none'
                            id="code"
                            name="code_name"
                            type="text"
                            placeholder="Код подвержедения"
                            ref={code_ref}
                        />
                    </div>
                )}
                <div className='grid grid-cols-1 lg:flex lg:items-center lg:justify-center gap-4 mt-2'>
                    <button
                        type='button'
                        className='text-white col-span-1 bg-custom-gray w-full transition-all hover:bg-gray-700 hover:text-white font-gilroy-bold p-5 px-10 rounded focus:outline-none focus:shadow-outline lg:w-[40%]'
                        onClick={props.closeModal}
                    >
                        Отменить
                    </button>
                    {!code ? (
                        <button
                            type='button'
                            className={`text-white col-span-1 transition-all bg-text-main_green font-gilroy font-bold py-5 px-10 rounded focus:outline-none focus:shadow-outline w-full lg:w-[60%] ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                            disabled={loading}
                            onClick={getCodeHandler}
                        >
                            Получить код подвержедения
                        </button>
                    ) : (
                        <button
                            type='button'
                            className={`text-white col-span-1 transition-all bg-text-main_green font-gilroy font-bold py-5 px-10 rounded focus:outline-none focus:shadow-outline w-full lg:w-[60%] ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                            disabled={loading}
                            onClick={submitHandler}
                        >
                            Отправмть код повторно
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}

export default memo(CodeModal);