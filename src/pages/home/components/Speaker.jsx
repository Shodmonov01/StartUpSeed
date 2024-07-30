import React, { memo } from 'react';
import speakerImage from '../../../assets/images/speaker-girl.png';

function Speaker() {
    return (
        // {/* speaker section */ }
        <a name="contact">
            <div className='bg-white p-0 lg:p-8 py-0 mb-8 mt-4 lg:mt-24' >
                <div className='container mx-auto px-4 py-8 lg:py-12'>
                    <div>
                        <div className='flex flex-col md:flex-row items-center relative shadow-lg rounded-lg px-6'>
                            <div className='md:w-2/3 w-full p-0 lg:p-4 pt-0 pb-10 lg:pb-32'>
                                <span className='text-custom-gray text-[20px] lg:text-[30px] font-gunterz font-medium uppercase text-center lg:text-left'>
                                    Остались <span className='text-text-main_green'>вопросы?</span>
                                </span>
                                <div className='grid mt-4 grid-cols-1 md:grid-cols-3 gap-4 px-4 pl-0'>
                                    <input
                                        className='bg-transparent rounded-md outline-none border border-gray-300 p-2'
                                        placeholder='Введите имя'
                                        type='text'
                                    />
                                    <input
                                        className='bg-transparent rounded-md outline-none border border-gray-300 p-2'
                                        placeholder='Ваш E-mail'
                                        type='text'
                                    />
                                    <button className='bg-text-main_green text-white rounded-md p-3 md:p-6 font-gilroy-bold'>
                                        Оставить заявку
                                    </button>
                                </div>
                                <p className='text-[#939393] font-gilroy mt-6 px-4 pl-0 text-[14px] text-center lg:text-left lg:mt-4 font-medium'>
                                    Присоединяйтесь к платформе, чтобы стать частью команды
                                </p>
                            </div>

                            <div className='lg:mt-6 lg:mb-10 lg:absolute -bottom-10 right-0 z-10'>
                                <div className='relative'>
                                    <img src={speakerImage} alt='' className='w-full' />
                                    <div className='absolute bottom-0 left-0 lg:left-10 right-0 backdrop-blur-lg py-[24px] rounded-[5px] text-center w-[90%] lg:w-[70%] m-auto' style={{ background: "rgba(169, 169, 169, 0.3)" }}>
                                        <span className='font-bold text-white text-[14px]'>Стань частью команды!</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default memo(Speaker);