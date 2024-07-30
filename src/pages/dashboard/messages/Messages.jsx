import { useCallback, useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { FiSearch, FiArrowLeftCircle } from 'react-icons/fi';
import { IoIosArrowDown } from 'react-icons/io';
import { IoSend } from 'react-icons/io5';
import { PiPlus } from 'react-icons/pi';
import Users from './components/Users';
import { errorHandler, getToastWarn } from '../../../utils/options';
import { axiosInstances } from '../../../config/config';
import Msg from './components/Msg';
import { getProfile } from '../../../redux/reducers/profileReducer';
import userImg from '../../../assets/images/user.jpg';

const Messages = (props) => {
  const { state } = useLocation();
  const cookie = new Cookies();
  const [selectedUser, setSelectedUser] = useState({});
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const email_ref = useRef();
  const message_ref = useRef();

  // console.log(state);

  // working socket
  useEffect(() => {
    if (socket) {
      socket.onopen = () => {
        // console.log("WebSocket Client Connected");
      };

      socket.onmessage = msg => {
        let resultMsg = selectedUser.messages;
        resultMsg.push(JSON.parse(msg.data));
        setSelectedUser({ ...selectedUser, messages: resultMsg });
      }
    }
  }, [socket]);

  // working with state
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (state) {
      const getData = async () => {
        if (state.receiver.email) {
          try {
            const res = await axiosInstances.post("/chat/create_room/", {
              email: state.receiver.email
            }, { signal });
            if (res.status === 200 || res.status === 201) {
              const response = await axiosInstances.get(`/chat/rooms/`, { signal });
              setUsers(response.data);
            } getToastWarn(res.data || res.data?.message || "Не найдено.");
          } catch (error) {
            errorHandler(error);
          }
        }
      }
      getData();
    }

    return () => controller.abort();
  }, [state]);

  useEffect(() => {
    if (state && users && Array.isArray(users) && users?.length > 0) {
      let idx = -1;
      let copyUsers = users.filter(el => el.initiator?.id !== el.receiver?.id);
      for (let i = 0; i < copyUsers?.length; i++) {
        if (copyUsers[i].receiver.id === state.receiver.id || copyUsers[i].initiator.id === state.receiver.id) {
          idx = i;
          break;
        }
      }
      if (idx > -1) {
        let user = document.querySelectorAll('.getMessagesUsers')[idx];
        user?.click();
      }
    }
  }, [users]);

  // get all chat users
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const getData = async () => {
      try {
        const res = await axiosInstances.get(`/chat/rooms/`, { signal });
        setUsers(res.data);
      }
      catch (error) {
        errorHandler(error);
      }
      props.onGetProfile({ signal }); // get profile data
    }
    getData();

    return () => controller.abort();
  }, []);

  // get user with email
  const getUser = async () => {
    if (email_ref.current?.value) {
      try {
        const res = await axiosInstances.post("/chat/create_room/", {
          email: email_ref.current.value
        });
        if (res.status === 200 || res.status === 201) {
          if (res.data?.message)
            getToastWarn(res.data?.message);
          else {
            try {
              const res = await axiosInstances.get(`/chat/rooms/`, { signal });
              setUsers(res.data);
            }
            catch (error) {
              errorHandler(error);
            }
          }
        } getToastWarn(res.data || res.data?.message || "Не найдено.");
      } catch (error) {
        errorHandler(error);
      }
    }
  }

  // get messages for one user
  const getMessages = useCallback(async item => {
    try {
      const res = await axiosInstances.get(`/chat/conversation/${item?.id}/`);
      if (res.status === 200 || res.status === 201) {
        setSocket(new W3CWebSocket(`${import.meta.env.VITE_SOCKET_SERVER_URL}message/${res.data.id}/?token=${cookie.get("user")}`,)); // connection to room
        setSelectedUser(res.data);
      } else getToastWarn(res.data || res.data?.message);
    } catch (error) {
      // console.log(error);
      errorHandler(error);
    }
  }, []);

  // send message
  const sendMessage = () => {
    if (socket) {
      if (message_ref.current?.value) {
        let msg = new W3CWebSocket(`${import.meta.env.VITE_SOCKET_SERVER_URL}chat/${selectedUser.id}/?token=${cookie.get("user")}`);
        msg.onopen = () => {
          msg.send(
            JSON.stringify({
              message: message_ref.current.value,
            })
          );
          message_ref.current.value = "";
          message_ref.current.focus();
        };
      }
    }
  };

  const enterClickHandler = event => {
    if (event.keyCode === 13) sendMessage();
  }

  // back to chat
  const backToChat = () => {
    setSelectedUser({});
  }

  // console.log(selectedUser);

  return (
    <div className='h-screen p-0 lg:p-4 w-full lg:max-w-5xl mx-auto my-4 lg:my-10 grid grid-cols-7 gap-4'>
      <div className={`relative max-h-screen col-span-7 lg:col-span-3 bg-white rounded-lg shadow p-2 lg:p-4 ${selectedUser.hasOwnProperty('id') ? 'hidden lg:block' : 'block lg:block'}`}>
        <div className='flex items-center gap-2 mb-2 lg:mb-4'>
          <div className='flex items-center bg-white rounded-lg shadow p-2 w-full'>
            <FiSearch className='text-gray-500 mr-2' />
            <input
              type='text'
              placeholder='Поиск чата'
              className='bg-transparent flex-1 outline-none'
              ref={email_ref}
            />
          </div>
          <div className='h-[40px] rounded-xl bg-text-main_green flex items-center justify-center cursor-pointer' onClick={getUser}>
            <PiPlus className='w-[50px]' size={20} color='white' />
          </div>
        </div>
        <div className='flex border-b py-3 justify-between items-center mb-4'>
          <div className='flex items-center'>
            <span className='font-gilroy-bold text-gray-400 text-lg'>
              Все Сообщения
            </span>
            <IoIosArrowDown className='ml-2 text-gray-400 ' />
          </div>
          {/* <FiMoreVertical /> */}
        </div>
        <div className='user_sidebar absolute top-[130px] left-0 right-0 bottom-0 overflow-y-scroll px-2'>
          <Users
            users={users}
            getMessages={getMessages}
            profileData={props.profileData}
            selectedUser={selectedUser}
          />
        </div>
      </div>

      {/* messages */}
      {selectedUser.hasOwnProperty("id") && (
        <div className={`max-h-screen col-span-7 lg:col-span-4 bg-white rounded-lg shadow ${selectedUser.hasOwnProperty('id') ? 'flex' : 'hidden'} lg:flex flex-col relative`}>
          <div className='flex justify-between p-2 lg:p-4 px-6 items-center border-b-[3px] w-[90%] mx-auto'>
            <div className='flex items-center w-full'>
              <FiArrowLeftCircle className='cursor-pointer mr-4 block lg:hidden' size={25} onClick={backToChat} />
              {state && state.project && state.receiver?.id === selectedUser?.receiver?.id ? (
                <img
                  src={state.project?.project_image ? state.project.project_image : userImg}
                  alt='Contact Name'
                  className='rounded-full w-10 lg:w-12 h-10 lg:h-12 mr-3'
                />
              ) : (
                <img
                  src={selectedUser?.receiver?.avatar ? selectedUser.receiver.avatar : userImg}
                  alt='Contact Name'
                  className='rounded-full w-10 lg:w-12 h-10 lg:h-12 mr-3'
                />
              )}
              <div className='text-xs lg:text-[15px]'>
                {selectedUser?.receiver?.id !== props.profileData.id ? (
                  <h5>
                    {state && state.project && state.receiver?.id === selectedUser?.receiver?.id ? (
                      <>
                        Проект: {state.project?.name}
                      </>
                    ) : (
                      <>
                        {selectedUser.receiver?.first_name} {selectedUser.receiver?.last_name}
                      </>
                    )}
                  </h5>
                ) : (
                  <h5>
                    {selectedUser.initiator?.first_name} {selectedUser.initiator?.last_name} 1
                  </h5>
                )}
                {/* <h5 className='font-semibold'>{selectedUser?.receiver?.first_name} {selectedUser?.receiver?.last_name}</h5> */}
                {/* <p className='text-sm text-gray-600'>Онлайн</p> */}
              </div>
            </div>
            {/* <div className='flex gap-5'>
              <button className='bg-transparent border border-gray-200 p-3 rounded-lg'>
                <IoSearchOutline />
              </button>
              <button className='bg-transparent border border-gray-200 p-3 rounded-lg'>
                <BsThreeDotsVertical />
              </button>
            </div> */}
          </div>

          {/* all messages */}
          <div className='p-0 lg:p-4 flex flex-col justify-end absolute top-[70px] left-0 right-0 bottom-[70px] lg:bottom-[60px]'>
            <div className='overflow-y-scroll p-2'>
              <Msg
                data={selectedUser}
                profileData={props.profileData}
              />
            </div>
          </div>


          {selectedUser && selectedUser?.messages?.length > 0 ? (
            (typeof selectedUser.messages[selectedUser.messages?.length - 1]?.sender === "object" ? selectedUser.messages[selectedUser.messages?.length - 1]?.sender?.id != props.profileData?.id : selectedUser.messages[selectedUser.messages?.length - 1]?.sender != props.profileData?.id) ? (
              <div className='flex p-2 border-gray-300 border items-center absolute bottom-0 left-0 right-0 rounded-lg m-2'>
                <input
                  type='text'
                  placeholder='Введите сообщение'
                  className='flex-1 bg-white p-2 outline-none mr-2 py-0'
                  onKeyDown={enterClickHandler}
                  ref={message_ref}
                  defaultValue={state ? state.text : ""}
                  autoFocus={true}
                />

                <button
                  type='button'
                  onClick={sendMessage}
                  className='text-gray-400 p-2 text-2xl rounded-full'
                >
                  <IoSend />
                </button>
              </div>
            ) : (
              <div className='flex p-2 border border-t-[1px] items-center absolute bottom-0 left-0 right-0 rounded-lg m-2'>
                <div
                  placeholder='Чат будет доступен, когда руководитель проекта ответит вам'
                  className='flex-1 bg-transparent outline-none mr-2 text-center text-gray-500 text-[12px] break-words whitespace-normal py-0 md:py-2'
                  disabled={true}
                  title='Чат будет доступен, когда руководитель проекта ответит вам'
                >
                  Чат будет доступен, когда руководитель проекта ответит вам
                </div>
              </div>
            )
          ) : (
            <div className='flex p-2 border-gray-300 border items-center absolute bottom-0 left-0 right-0 rounded-lg my-2'>
              <input
                type='text'
                placeholder='Введите сообщение'
                className='flex-1 bg-white p-2 outline-none mr-2 py-0'
                onKeyDown={enterClickHandler}
                ref={message_ref}
                defaultValue={state ? state.text : ""}
                autoFocus={true}
              />

              <button
                type='button'
                onClick={sendMessage}
                className='text-gray-400 p-2 text-2xl rounded-full'
              >
                <IoSend />
              </button>
            </div>
          )}
        </div>
      )}
      {/* messages */}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    allUsers: state.chatReducer.allUsers,
    profileData: state.profileReducer.profileData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetProfile: value => dispatch(getProfile(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
