import React, { memo } from 'react';

function AboutForm({ handleSubmitAbout, register, handleSubmit, loading, errors }) {
    return (
        <form onSubmit={handleSubmit(data => handleSubmitAbout(data))}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'></div>
            <div className='mt-2'>
                <textarea
                    className={`bg-gray-50 text-gray-900 text-sm rounded-lg outline-none border focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ${errors.content ? "border-red-700" : "border-gray-50"}`}
                    name='achievements_about'
                    placeholder='Опишите ваши задачи и достижения'
                    rows={5}
                    {...register('content', { required: true })}
                />
            </div>

            <div className='grid grid-cols-2 lg:flex lg:items-center lg:justify-end gap-4 mt-2'>
                <button
                    type='button'
                    className='text-white col-span-1 bg-custom-gray border-1 border-custom-gray hover:border-gray-500 transition-all hover:bg-gray-500 hover:text-white font-gilroy-bold p-3 px-[35px] rounded text-[13px] focus:outline-none focus:shadow-outline'
                >
                    Отменить
                </button>
                <button
                    type='submit'
                    className={`text-text-main_green border col-span-1 border-text-main_green transition-all hover:bg-main-green hover:text-white font-gilroy-bold py-3 px-[35px] rounded focus:outline-none text-[13px] focus:shadow-outline ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={loading}
                >
                    Сохранить
                </button>
            </div>
        </form>
    )
}

export default memo(AboutForm);