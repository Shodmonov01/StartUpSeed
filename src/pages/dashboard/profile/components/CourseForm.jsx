import React, { memo } from 'react';

function CourseForm({ handleSubmitCourse, register, errors, handleSubmit, start_date_ref, end_date_ref, loading }) {
    return (
        <form onSubmit={handleSubmit(data => handleSubmitCourse(data))}>
            <div className='grid grid-cols-1 gap-6 mb-6'>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        Название <span className='text-red-700'>*</span>
                    </span>
                    <input
                        className={`bg-gray-50 text-gray-900 text-sm rounded-lg outline-none border focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ${errors.specialty ? "border-red-700" : "border-gray-50"}`}
                        name='specialty_course'
                        type='text'
                        placeholder='Введите название'
                        {...register('specialty', { required: true, maxLength: 255 })}
                    />
                </div>

                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        Учебное заведение <span className='text-red-700'>*</span>
                    </span>
                    <input
                        className={`bg-gray-50 text-gray-900 text-sm rounded-lg outline-none border focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ${errors.institution ? "border-red-700" : "border-gray-50"}`}
                        name='institution_course'
                        type='text'
                        placeholder='МГУ'
                        {...register('institution', { required: true, maxLength: 255 })}
                    />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        Начало обучения <span className='text-red-700'>*</span>
                    </span>
                    <input
                        type="date"
                        name="start_date_course"
                        className="relative block w-full appearance-none rounded-md p-2.5 bg-custom-light placeholder-gray-500 focus:z-10 focus:outline-none text-sm cursor-pointer"
                        ref={start_date_ref}
                        required
                        onClick={event => event.target.showPicker()}
                    />
                </div>

                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        Окончание обучения <span className='text-red-700'>*</span>
                    </span>
                    <input
                        type="date"
                        name="end_date_course"
                        className="relative block w-full appearance-none rounded-md p-2.5 bg-custom-light placeholder-gray-500 focus:z-10 focus:outline-none text-sm cursor-pointer"
                        ref={end_date_ref}
                        required
                        onClick={event => event.target.showPicker()}
                    />
                </div>
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

export default memo(CourseForm);