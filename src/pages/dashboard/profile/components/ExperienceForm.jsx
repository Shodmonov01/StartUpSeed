import React, { memo } from 'react';

function ExperienceForm({ handleExperience, register, errors, handleSubmit, start_date_ref, end_date_ref, current_check_ref, loading }) {

    return (
        <form onSubmit={handleSubmit(data => handleExperience(data))}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        Должность работы <span className='text-red-700'>*</span>
                    </span>
                    <input
                        className={`bg-gray-50 text-gray-900 text-sm rounded-lg outline-none border focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ${errors.position ? "border-red-700" : "border-gray-50"}`}
                        name='position_experience'
                        type='text'
                        placeholder='Программист'
                        autoComplete='true'
                        {...register('position', { required: true, maxLength: 255 })}
                    />
                </div>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        Компания <span className='text-red-700'>*</span>
                    </span>
                    <input
                        className={`bg-gray-50 text-gray-900 text-sm rounded-lg outline-none border focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ${errors.company ? "border-red-700" : "border-gray-50"}`}
                        name='company_experience'
                        type='text'
                        placeholder='Usertech'
                        autoComplete='true'
                        {...register('company', { required: true, maxLength: 255 })}
                    />
                </div>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        Начало работы <span className='text-red-700'>*</span>
                    </span>
                    <input
                        type="date"
                        name="start_date_experience"
                        className="relative block w-full appearance-none rounded-md p-2.5 bg-custom-light placeholder-gray-500 focus:z-10 focus:outline-none text-sm cursor-pointer"
                        ref={start_date_ref}
                        required
                        autoComplete='true'
                        onClick={event => event.target.showPicker()}
                    />
                </div>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        Окончание работы <span className='text-red-700'>*</span>
                    </span>
                    <input
                        type="date"
                        name="end_date_experience"
                        className="relative block w-full appearance-none rounded-md p-2.5 bg-custom-light placeholder-gray-500 focus:z-10 focus:outline-none text-sm cursor-pointer"
                        ref={end_date_ref}
                        required
                        autoComplete='true'
                        onClick={event => event.target.showPicker()}
                    />
                    <div className='flex items-center mt-2'>
                        <label htmlFor="current_experience" className='flex items-center cursor-pointer current_experience'>
                            <input
                                id='current_experience'
                                name='currentChecked_experience'
                                type='checkbox'
                                className='form-checkbox h-4 w-4 cursor-pointer'
                                ref={current_check_ref}
                                autoComplete='true'
                            />
                            <span className="checkmark"></span>
                            <span className='pl-6 text-sm text-gray-700'>
                                По настоящее время
                            </span>
                        </label>
                    </div>
                </div>
            </div>
            <div className='mt-6'>
                <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                    Ваши достижения
                </span>
                <textarea
                    className='bg-custom-light appearance-none rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    name='achievements_experience'
                    placeholder='Осуществлял руководство проектом по внедрению электронного документооборота на базе DocsVision ver. 5.0.'
                    rows={5}
                    {...register('achievements', { required: false, maxLength: 255 })}
                    autoComplete='true'
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

export default memo(ExperienceForm);