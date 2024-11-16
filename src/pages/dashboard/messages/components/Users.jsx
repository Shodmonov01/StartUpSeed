import React, { memo } from 'react';
import userImg from '../../../../assets/images/user.jpg';

function Users(props) {
    const { users, selectedUser } = props;

    return (
        users && Array.isArray(users) && users?.length > 0 && users.map(item => (
            item.initiator?.id !== item.receiver?.id && (
                <div key={item.id} className={`getMessagesUsers flex items-center gap-2 p-3 rounded-lg shadow mb-3 cursor-pointer transition-all ${item.id === selectedUser.id ? "bg-custom-gray text-white" : "bg-white text-custom-gray hover:bg-gray-100"}`} onClick={() => props.getMessages(item)}>
                    {item.receiver.id !== props.profileData.id ? (
                        <img
                            src={item.receiver?.avatar ? item.receiver?.avatar : userImg}
                            alt={"no image"}
                            className='rounded-full w-10 h-10'
                        />
                    ) : (
                        <img
                            src={item.initiator?.avatar ? item.initiator?.avatar : userImg}
                            alt={"no image"}
                            className='rounded-full w-10 h-10'
                        />
                    )}
                    <div>
                        <h5 className='font-gilroy-bold text-xs'>
                            {item.receiver.id !== props.profileData.id ? (
                                <span>
                                    {item.receiver?.first_name} {item.receiver?.last_name}
                                </span>
                            ) : (
                                <span>
                                    {item.initiator?.first_name} {item.initiator?.last_name}
                                </span>
                            )}
                        </h5>
                        <p className='text-sm text-gray-400'></p>
                    </div>
                    <div className='ml-auto flex flex-col items-end'>
                        <span className='text-xs text-gray-400'></span>
                        {/* <div className={`text-md text-gray-400`}>
                    {isSeen ? (
                        isSeenFull ? (
                            <IoCheckmarkDone className='text-lg text-green-500' />
                        ) : (
                            <IoCheckmarkDone className='text-lg' />
                        )
                    ) : (
                        <IoMdCheckmark />
                    )}
                </div> */}
                    </div>
                </div>
            )
        ))
    )
}

export default memo(Users);