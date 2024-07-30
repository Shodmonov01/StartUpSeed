import React, { memo } from 'react';

function TimeFormat() {
    return (
        <div className=''>
            <span className='block text-gray-700 text-sm mb-2'>
                Часовой пояс
            </span>
            <select
                className='block appearance-none w-full bg-white hover:border-gray-500 p-4 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'
                id='timezone'
                name='timezone'
            >
                <option value='12' selected>UTC-12</option>
                <option value='24'>UTC-24</option>
            </select>
        </div>
    )
}

export default memo(TimeFormat);