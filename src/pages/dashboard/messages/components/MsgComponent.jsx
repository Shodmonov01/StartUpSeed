import React, { memo } from 'react';

function MsgComponent({ item, profileData }) {

    return (
        <div className=''>
            {(item.sender === profileData?.id || item.sender.id === profileData?.id) ? (
                <div className='flex justify-end'>
                    <pre className='bg-custom-gray font-normal text-white p-2 rounded-md text-[13px] relative flex flex-col gap-3 pr-4 shadow-lg w-[60%] break-words whitespace-normal'>
                        {item.text}
                        <span className='text-[10px] text-end'>{new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        <div className='w-[10px] h-[8px] rounded-br-full absolute top-0 -right-[4px] bg-custom-gray'></div>
                    </pre>
                </div>
            ) : (
                <div className='flex justify-start'>
                    <pre className='bg-white font-normal text-black p-2 rounded-md text-[13px] relative flex flex-col gap-3 pl-4 shadow-lg w-[60%] break-words whitespace-normal'>
                        {item.text}
                        <span className='text-[10px] text-start'>{new Date(item.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}</span>
                        <div className='w-2 h-[8px] rounded-bl-full absolute top-0 -left-[3px] bg-white'></div>
                    </pre>
                </div>
            )}
        </div>
    )
}

export default memo(MsgComponent);