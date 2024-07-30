import React, { memo, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { axiosInstances } from '../../../../config/config';
import { errorHandler, getToast } from '../../../../utils/options';
import { deleteOneExperience } from '../../../../redux/reducers/profileReducer';

function ExperienceData(props) {
    const { item, index, getData } = props;
    const [loading, setLoading] = useState(false);
    const start_date_ref = useRef();
    const end_date_ref = useRef();

    // professional information
    const handleExperienceData = async index => {
        let forms = document.querySelectorAll('.forms_experience')[index];

        const obj = {
            job_title: forms.querySelector('.position').value,
            company: forms.querySelector('.company').value,
            beginning_work: start_date_ref.current.value,
            finishing_work: end_date_ref.current.value,
            until_now: forms.querySelector('.current_experience_update').checked,
            achievement: forms.querySelector('.achievements').value,
        };
        // console.log(obj);
        setLoading(true);
        try {
            const res = await axiosInstances.put(`/experience/${item.id}/`, obj);
            if (res.status) {
                getToast("Изменено успешно.");
                setLoading(false);
                getData();
            }
        } catch (error) {
            // console.log(error);
            setLoading(false);
            errorHandler(error);
        }
    };

    // delete item
    const deleteItem = value => {
        props.onDeleteOneExperience({ item: value });
        getData();
    }

    return (
        <div className='forms_experience'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        Должность работы
                    </span>
                    <input
                        className='appearance-none rounded w-full p-3 bg-custom-light text-gray-700 leading-tight focus:outline-none focus:shadow-outline position'
                        name='position_experience_update'
                        type='text'
                        placeholder='Программист'
                        defaultValue={item?.job_title}
                        autoComplete='true'
                    />
                </div>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        Компания
                    </span>
                    <input
                        className='appearance-none rounded w-full p-3 bg-custom-light text-gray-700 leading-tight focus:outline-none focus:shadow-outline company'
                        name='company_experience_update'
                        type='text'
                        placeholder='Usertech'
                        defaultValue={item?.company}
                        autoComplete='true'
                    />
                </div>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        Начало работы
                    </span>
                    <input
                        type="date"
                        name="start_date_experience_update"
                        className="relative block w-full appearance-none rounded-md p-2.5 bg-custom-light placeholder-gray-500 focus:z-10 focus:outline-none text-sm cursor-pointer"
                        ref={start_date_ref}
                        required
                        defaultValue={item?.beginning_work}
                        autoComplete='true'
                        onClick={event => event.target.showPicker()}
                    />
                </div>
                <div>
                    <span className='block mb-2 text-[13px] lg:text-sm font-bold text-custom-gray'>
                        Окончание работы
                    </span>
                    <input
                        type="date"
                        name="end_date_experience_update"
                        className="relative block w-full appearance-none rounded-md p-2.5 bg-custom-light placeholder-gray-500 focus:z-10 focus:outline-none text-sm cursor-pointer"
                        ref={end_date_ref}
                        required
                        defaultValue={item?.finishing_work}
                        autoComplete='true'
                        onClick={event => event.target.showPicker()}
                    />
                    <div className='flex items-center mt-2'>
                        <label htmlFor={`current_experience_update${item.id}`} className='flex items-center cursor-pointer current_experience'>
                            <input
                                id={`current_experience_update${item.id}`}
                                type='checkbox'
                                className='form-checkbox h-4 w-4 cursor-pointer current_experience_update'
                                defaultChecked={item.until_now}
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
                    className='bg-custom-light appearance-none rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline achievements'
                    name='achievements_experience_update'
                    placeholder='Осуществлял руководство проектом по внедрению электронного документооборота на базе DocsVision ver. 5.0.'
                    rows={5}
                    defaultValue={item?.achievement}
                    autoComplete='true'
                />
            </div>
            <div className='grid grid-cols-2 lg:flex lg:items-center lg:justify-end gap-4 mt-2 lg:mb-0 mb-2'>
                <button
                    type='button'
                    className='text-white col-span-1 bg-custom-gray border-1 border-custom-gray hover:border-gray-500 transition-all hover:bg-gray-500 hover:text-white font-gilroy-bold p-3 px-[35px] text-[13px] rounded focus:outline-none focus:shadow-outline'
                    onClick={() => deleteItem(item)}
                >
                    Удалить
                </button>
                <button
                    type='submit'
                    className={`text-text-main_green text-[13px] border col-span-1 border-text-main_green transition-all hover:bg-main-green hover:text-white font-gilroy-bold py-3 px-[35px] rounded focus:outline-none focus:shadow-outline ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={loading}
                    onClick={() => handleExperienceData(index)}
                >
                    Сохранить
                </button>
            </div>

            {/* <div className='grid grid-cols-2 lg:flex lg:items-center lg:justify-end gap-4'>
                <button
                    type='button'
                    className='text-white col-span-1 bg-custom-gray border-1 border-custom-gray hover:border-gray-500 transition-all hover:bg-gray-500 hover:text-white font-gilroy-bold p-3 px-8 rounded focus:outline-none focus:shadow-outline'
                    onClick={() => deleteItem(item)}
                >
                    Удалить
                </button>
                <button
                    type='submit'
                    className={`text-text-main_green col-span-1 border border-text-main_green hover:bg-main-green hover:text-white font-gilroy font-bold py-3 px-6 rounded focus:outline-none  focus:shadow-outline ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                    disabled={loading}
                    onClick={() => handleExperienceData(index)}
                >
                    Сохранить
                </button>
            </div> */}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        onDeleteOneExperience: value => dispatch(deleteOneExperience(value)),
    }
}

export default connect(null, mapDispatchToProps)(memo(ExperienceData));