import React, { memo, useRef } from 'react';
import InputTag from '../../../../components/InputTag';
import { getToastWarn } from '../../../../utils/options';

function Projectform({ data, changeInputHandler, deleteItem, changeTagsInputHandler, changeExtraInputHandler, addItemHandler, deleteItemHandler, deleteTags, levels, extraData }) {
    const tag_ref = useRef();

    // click handler
    const clickHandler = (id) => {
        if (tag_ref.current?.value) {
            let arr = data.filter(el => el.id === id);
            let isTrue = arr.tags?.length > 0 ? arr.tags.find(el => el.name === tag_ref.current.value) : false;
            if (!isTrue) {
                if (arr.tags?.length === 0)
                    changeTagsInputHandler({ id: Math.random().toString(), name: tag_ref.current.value }, id, 0);
                else
                    changeTagsInputHandler({ id: Math.random().toString(), name: tag_ref.current.value }, id, 1);

                tag_ref.current.focus();
            } else getToastWarn("Невозможно повторить.");

            setTimeout(() => {
                tag_ref.current.value = "";
            }, 10);
        }
    }

    // add tag base optional
    const enterClick = (event, id) => {
        if (event.keyCode === 13) {
            clickHandler(id);
        }
    };

    // delete tag base optional
    const deleteTag = (tagId, id) => {
        deleteTags(tagId, id);
    };

    return (
        data.map(item => (
            <div key={item.id} className='bg-white px-2 lg:px-8 pt-6 pb-4 lg:pb-8 rounded shadow my-4'>
                {/* row 1 */}
                {extraData?.length > 0 && extraData.map((elem, i) => (
                    <div className='grid grid-cols-1 lg:grid-cols-7 gap-4 items-end'>
                        <div className='col-span-2'>
                            <span className='block text-sm font-medium text-gray-700'>
                                Специалист <span className='text-red-500'> *</span>
                            </span>
                            <input
                                type='text'
                                id='Специалист'
                                className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
                                placeholder='Специалист'
                                value={elem.specialist}
                                onChange={event => changeExtraInputHandler(event.target.value, i, 'specialist')}
                            />
                        </div>
                        <div className='col-span-2'>
                            <span className='block text-sm font-medium text-gray-700'>
                                Сколько человек необходимо? <span className='text-red-500'> *</span>
                            </span>
                            <input
                                type='number'
                                id='Сколько человек необходимо?'
                                className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
                                placeholder='Сколько человек необходимо?'
                                value={elem.people_needed}
                                onChange={event => changeExtraInputHandler(event.target.value, i, 'people_needed')}
                            />
                        </div>
                        <div className='col-span-2'>
                            <span className='block text-sm font-medium text-gray-700'>
                                Сколько их сейчас? <span className='text-red-500'> *</span>
                            </span>
                            <input
                                type='number'
                                id='Сколько их сейчас?'
                                className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
                                placeholder='Сколько их сейчас?'
                                value={elem.people_now}
                                onChange={event => changeExtraInputHandler(event.target.value, i, 'people_now')}
                            />
                        </div>
                        <div className='col-span-1 w-full'>
                            <button
                                type='button'
                                className='bg-red-500 font-gilroy-bold text-white p-3.5 text-sm rounded focus:outline-none focus:shadow-outline transition-all w-full'
                                onClick={() => deleteItemHandler(i)}
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
                <div className='w-full flex justify-end mt-2'>
                    <button
                        type='button'
                        className='bg-text-main_green font-gilroy-bold text-white py-3 px-[31px] text-sm rounded focus:outline-none focus:shadow-outline transition-all w-full md:w-auto'
                        onClick={addItemHandler}
                    >
                        Добавить
                    </button>
                </div>

                <div className='flex flex-col md:flex-row md:space-x-4 mb-4'>
                    <div className='flex-1 mb-4 md:mb-0'>
                        <span className='block text-sm font-medium text-gray-700'>
                            Желаемая должность <span className='text-red-500'> *</span>
                        </span>
                        <input
                            type='text'
                            id='position'
                            name='positions'
                            className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ${!item.position && 'border-red-700'}`}
                            placeholder='Тестировщик'
                            defaultValue={item.position}
                            onChange={event => changeInputHandler(event.target.value, item.id, 'position')}
                        />
                    </div>
                    <div className='flex-1'>
                        <span className='block text-sm font-medium text-gray-700'>
                            Уровень <span className='text-red-500'> *</span>
                        </span>
                        <select
                            id='level'
                            name='levels'
                            className='block w-full bg-gray-50 h-12 border rounded-md outline-none p-2 focus:ring-blue-500 focus:border-blue-500'
                            onChange={event => changeInputHandler(event.target.value, item.id, 'level')}
                        >
                            {levels.map(el => (
                                <option key={el.value} value={el.value} selected={el.value == item.level}>{el.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='mb-4'>
                    <span className='block text-sm font-medium text-gray-700'>
                        Задачи и достижения  <span className='text-red-500'> *</span>
                    </span>
                    <textarea
                        id='tasks'
                        name='tasks'
                        rows='4'
                        className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ${!item.tasks && 'border-red-700'}`}
                        placeholder=''
                        defaultValue={item.tasks}
                        onChange={event => changeInputHandler(event.target.value, item.id, 'tasks')}
                    ></textarea>
                </div>

                <div className='mb-4'>
                    <InputTag
                        title="Навыки"
                        name="Навыки"
                        ref={tag_ref}
                        enterClick={event => enterClick(event, item.id)}
                        deleteItem={deleteTag}
                        item={item}
                        tags={item.tags}
                        clickHandler={() => clickHandler(item.id)}
                    />
                </div>

                <div className='flex justify-end'>
                    <button
                        className='bg-custom-gray hover:bg-gray-600 transition-all text-white py-3 px-6 text-sm rounded focus:outline-none focus:shadow-outline border border-custom-gray font-gilroy-bold w-full md:w-auto'
                        onClick={() => deleteItem(item)}
                    >
                        Удалить
                    </button>
                </div>
            </div>
        ))
    )
}

export default memo(Projectform);