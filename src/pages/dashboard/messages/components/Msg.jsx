import React, { memo, useRef } from 'react';
import MsgComponent from './MsgComponent';

function Msg({ data, profileData }) {
    const scroll_Ref = useRef();

    // automatically scroll messages
    // useEffect(() => {
    //     scroll_Ref.current?.scrollIntoView({ behavior: "smooth" });
    // }, [data])

    return (
        <div className='flex flex-col gap-2'>
            {data?.messages?.length > 0 && data.messages.map(item => (
                <div key={item.id} ref={scroll_Ref}>
                    <MsgComponent
                        item={item}
                        profileData={profileData}
                    />
                </div>
            ))}
        </div>
    )
}

export default memo(Msg);