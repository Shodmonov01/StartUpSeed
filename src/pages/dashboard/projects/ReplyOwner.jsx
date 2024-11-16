import React, { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Cookies from 'universal-cookie';
import noImage from '../../../assets/images/noImage.png';
import { useAuth } from '../../../services/useAuth';
import { axiosInstances } from '../../../config/config';
import { getToastWarn } from '../../../utils/options';
import { getProfile } from '../../../redux/reducers/profileReducer';

function ReplyOwner(props) {
    const { state } = props;
    let { user_id } = useAuth();
    const navigate = useNavigate();
    const cookie = new Cookies();

    // get profile
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        props.onGetProfile({ signal }); // get profile

        return () => controller.abort();
    }, []);

    // navigate handler
    const navigateHandler = item => {
        navigate("/admin/specializations/specialization-detail", { state: { ...item, isChange: true } });
    }

    // console.log(state);

    // navigate chat handler
    const navigateChatHandler = async item => {
        // console.log(item);
        if (props.profileData && props.profileData.hasOwnProperty("id")) {
            let obj = {
                receiver: item.owner,
                senderId: user_id,
                text: "",
                project: item.owner,
                state: state
            }

            // create room
            const r = await axiosInstances.post("/chat/create_room/", {
                email: props.profileData?.email
            });

            if (r.status === 200 || r.status === 201 || r.status == 204) {
                // get room
                const response = await axiosInstances.get(`/chat/rooms/`);
                // console.log(response);

                if (response.data?.length > 0) {
                    let t = {};
                    response.data.forEach(elem => {
                        if ((elem.initiator?.id == item.owner?.id && elem.receiver?.id == user_id) || (elem.initiator?.id == user_id && elem.receiver?.id == item.owner?.id)) t = { ...elem };
                    });
                    if (t && t.hasOwnProperty("id")) {
                        const res = await axiosInstances.get(`/chat/conversation/${t?.id}/`);
                        if (res.status === 200 || res.status === 201 || res.status == 204) {
                            // console.log(res.data);

                            let soc = new W3CWebSocket(`${import.meta.env.VITE_SOCKET_SERVER_URL}message/${res.data?.id}/?token=${cookie.get("user")}`);
                            if (soc) {
                                if (item.description) {
                                    let msg = new W3CWebSocket(`${import.meta.env.VITE_SOCKET_SERVER_URL}chat/${res.data?.id}/?token=${cookie.get("user")}`);
                                    msg.onopen = () => {
                                        msg.send(
                                            JSON.stringify({
                                                message: item.description,
                                                info: ""
                                            })
                                        );
                                    };
                                }
                            }
                            setTimeout(() => {
                                navigate("/admin/messages", { state: obj });
                            }, 500);
                        } else getToastWarn(res.data || res.data?.message);
                    }
                }

                // setUsers(response.data);
            } getToastWarn(r.data || r.data?.message || "Не найдено.");
        }
    }

    return (
        state && state.replay_owner?.length > 0 && state.replay_owner.map(item => (
            <div key={item.id} className='p-6 bg-white shadow-lg rounded-lg'>
                <div className='flex items-center justify-between'>
                    <div className='flex gap-4 items-center'>
                        {item.owner?.avatar ? (
                            <img src={item.owner?.avatar} alt="no image" />
                        ) : (
                            <div className='h-[90px] w-[90px] rounded-full bg-black relative'>
                                <img src={noImage} alt="no image" className='absolute inset-0 m-auto w-[30px] h-[30px]' />
                            </div>
                        )}
                        <div>
                            <div className='flex items-start gap-3'>
                                <span className='font-gilroy_bold text-[17px] lg:text-[18px]'>{item.owner?.first_name} {item.owner?.last_name}</span>
                                <span
                                    className='underline text-[12px] font-gilroy_semibold text-[#A7A5A5] pt-0.5 cursor-pointer hover:text-[#a7a5a5e7] transition-all'
                                    onClick={() => navigateHandler(item.owner)}
                                >
                                    Посмотреть профиль
                                </span>
                            </div>
                            <div>
                                {item.owner?.information?.length > 0 && item.owner.information.map(elem => (
                                    <div key={elem.id} className='text-text-main_green text-[14px] font-gilroy_semibold flex gap-1'>
                                        <span>{elem.career_objective}</span>
                                        <span>{elem.level}</span>
                                    </div>
                                ))}
                            </div>
                            <div className='mt-[14px]'>
                                {item.owner?.information?.length > 0 && item.owner.information.map(elem => (
                                    elem.skills && elem.skills.split(",").map(e => (
                                        <div key={Math.random().toString()} className='rounded-[5px] bg-custom-gray py-[6px] max-w-max px-[12px] text-white font-gilroy_bold text-[13px] lg:text-[14px]'>
                                            {e}
                                        </div>
                                    ))
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-end'>
                        <button
                            className='bg-black font-gilroy_semibold lg:w-auto w-full hover:bg-[#000000e6] transition-all text-white py-4 px-8 text-[13px] rounded focus:outline-none focus:shadow-outline'
                            onClick={() => navigateChatHandler(item)}
                        >
                            Подтвердить и перейти в чат
                        </button>
                    </div>
                </div>
            </div>
        ))
    )
}

const mapStateToProps = state => {
    return {
        profileData: state.profileReducer.profileData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetProfile: (value) => dispatch(getProfile(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(ReplyOwner));