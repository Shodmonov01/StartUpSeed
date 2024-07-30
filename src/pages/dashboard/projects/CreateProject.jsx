import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaCamera } from 'react-icons/fa';
import { BiCamera } from 'react-icons/bi';
import Projectform from './components/Projectform';
import { errorHandler, getToast, getToastWarn } from '../../../utils/options';
import { axiosInstances } from '../../../config/config';
import { levels } from '../../../utils/options';
import { getProfile } from '../../../redux/reducers/profileReducer';

const CreateProject = (props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(state ? state.komanda : []);
  const [file, setFile] = useState(null);
  const [extraData, setExtraData] = useState(state ? state.employees : [
    {
      id: Math.random().toString(),
      specialist: "",
      people_needed: "",
      people_now: 0,
    }
  ]);
  const name_ref = useRef();
  const desc_ref = useRef();
  // const people_ref = useRef();
  // const many_people_ref = useRef();

  // get profile
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    props.onGetProfile({ signal });

    return () => controller.abort();
  }, []);


  // add new row
  const addTeamForm = useCallback(() => {
    setData([...data, {
      id: Math.random().toString(),
      position: "",
      level: levels[0].value,
      tasks: "",
      tags: [],
    }]);
  }, [data]);

  // change input 
  const changeInputHandler = useCallback((value, id, name) => {
    setData(item => {
      return item.filter(elem => {
        if (elem.id === id)
          elem[name] = value;
        return elem;
      })
    })
  }, [data]);

  // change extra input handler
  const changeExtraInputHandler = useCallback((value, index, name) => {
    setExtraData(prev => {
      return prev.filter((el, i) => {
        if (i === index) {
          el[name] = value;
        }
        return el;
      })
    })
  }, [extraData]);

  // add item in extraData
  const addItemHandler = useCallback(() => {
    setExtraData([...extraData, {
      id: Math.random().toString(),
      specialist: "",
      people_needed: "",
      people_now: 0,
    }])
  }, [extraData]);

  // delete item in extraData
  const deleteItemHandler = useCallback(index => {
    setExtraData(prev => {
      return prev.filter((el, i) => i !== index)
    })
  }, [extraData]);


  // delete item
  const deleteItem = useCallback(value => {
    setData(prev => prev.filter(el => el.id !== value.id))
  }, [data]);

  // change tags
  const changeTagsInputHandler = useCallback((value, id, length) => {
    setData(item => {
      return item.filter(elem => {
        if (elem.id === id) {
          if (length === 0) elem.tags = [value];
          else elem.tags = [...elem.tags, value];
        }
        return elem;
      })
    })
  }, [data]);

  // delete tags
  const deleteTags = useCallback((tagId, id) => {
    setData(prev => {
      return prev.filter(item => {
        if (item.id === id) {
          item.tags = item.tags.filter(el => el.id !== tagId);
        }
        return item;
      })
    })
  }, [data]);

  // submit handler
  const submitHandler = async () => {
    try {
      if (name_ref.current?.value && desc_ref.current.value) {
        if (data?.length > 0) {
          // checking all tags
          let isBool = true;
          for (let i = 0; i < data?.length; i++) {
            if (!(data[i].tags?.length > 0)) {
              isBool = false;
              getToastWarn("Некоторые навыки отсутствуют, пожалуйста, заполните их все.");
              return;
            }
          }

          for (let i = 0; i < extraData?.length; i++) {
            if (extraData[i].specialist?.length === 0 || extraData[i].people_needed < 1 || extraData[i].people_now < 0) {
              getToastWarn("Требуемое количество помощников может не быть заполнено");
              return;
            }
          }

          let obj = {
            name: name_ref.current?.value,
            description: desc_ref.current?.value,
            number_programmers: 0,
            number_of_people: 0,
            komanda: JSON.stringify(data),
            employees: JSON.stringify(extraData)
          }
          // console.log(obj);
          let res;
          if (!state) {
            if (file) {
              res = await axiosInstances.post("/project/", {
                ...obj,
                project_image: file,
              }, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
              console.log(res);
            } else getToastWarn("Для проекта не выбрано ни одного изображения.");
          } else {
            if (file) obj.project_image = file;
            res = await axiosInstances.put(`/project/${state.id}/`, obj, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            });
          }
          if (res.status === 201 || res.status === 200) {
            if (!state) {
              getToast("Проект отправляется на проверку к админу.");
              setData([]);
              setFile(null);
              name_ref.current.value = "";
              desc_ref.current.value = "";
              // people_ref.current.value = "";
              // many_people_ref.current.value = "";
            } else {
              getToast("Ваш проект успешно изменено.");
              navigate("/admin/projects");
            }
          }
        } else getToastWarn("Нет доступной должность.");
      } else getToastWarn("Название проекта, описание проекта не указано.");
    } catch (error) {
      // console.log(error);
      errorHandler(error);
    }
  }

  return (
    <div className='max-w-5xl mx-auto my-10'>
      <h1 className='font-gunterz lg:text-2xl text-lg text-custom-gray text-center lg:text-left'>
        {state ? "Изменить проект" : "Создать проект"}
      </h1>

      <div className='bg-white shadow-md rounded px-2 lg:px-8 pt-6 pb-4 lg:pb-8 mb-4 flex flex-col'>
        <div className='flex lg:flex-row flex-col items-start py-4'>
          <div className='rounded-full bg-gray-200 relative flex items-center justify-center lg:justify-start'>
            <div className='w-[60px] h-[60px] lg:w-[70px] lg:h-[70px]'>
              <div className='w-[60px] h-[60px] lg:w-[70px] lg:h-[70px]'>
                {file ? (
                  <img src={URL.createObjectURL(file)} alt="" className='w-full h-full p-0 rounded-full' />
                ) : (
                  state ? (
                    <img src={state.project_image} alt="" className='w-full h-full p-0 rounded-full' />
                  ) : (
                    <FaCamera className='text-custom-gray w-full h-full p-4' />
                  )
                )}
              </div>
              <label htmlFor="selectFiles">
                <BiCamera className='absolute bottom-0 right-0 text-gray-700 bg-white rounded-full p-0.5 cursor-pointer hover:bg-gray-200 transition-all' size={24} />
                <input
                  type="file"
                  name="selectFiles"
                  id="selectFiles"
                  className='hidden'
                  onClick={event => event.target.value = null}
                  onChange={event => setFile(event.target.files[0])}
                />
              </label>
            </div>
          </div>
          <div className='w-full lg:px-6 p-0 flex flex-col gap-4 mt-2'>
            <div>
              <span className='text-custom-gray text-sm font-gilroy-bold'>
                Название <span className='text-red-500'> *</span>
              </span>
              <input
                className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
                id='username'
                type='text'
                placeholder='Название проекта'
                defaultValue={state ? state.name : ""}
                ref={name_ref}
              />
            </div>
            <div>
              <span className='text-custom-gray text-sm font-gilroy-bold'>
                Описание <span className='text-red-500'> *</span>
              </span>
              <textarea
                className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
                id='description'
                rows={4}
                placeholder='Описание проекта'
                defaultValue={state ? state.description : ""}
                ref={desc_ref}
              ></textarea>
            </div>
            {/* <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              <div className='col-span-1'>
                <span className='text-custom-gray text-sm font-gilroy-bold'>
                  Сколько человек необходимо? <span className='text-red-500'> *</span>
                </span>
                <input
                  className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
                  id='people'
                  type='number'
                  placeholder='Сколько человек необходимо?'
                  defaultValue={state ? state.number_programmers : ""}
                  ref={people_ref}
                />
              </div>
              <div className='col-span-1'>
                <span className='text-custom-gray text-sm font-gilroy-bold'>
                  Сколько их сейчас?
                </span>
                <input
                  className={`bg-gray-50 text-gray-900 text-sm rounded-lg border outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5`}
                  id='many_people'
                  type='number'
                  placeholder='Сколько их сейчас?'
                  defaultValue={state ? state.number_of_people ? state.number_of_people : '0' : "0"}
                  ref={many_people_ref}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {data.length > 0 && (
        <>
          <h1 className='font-gunterz text-xl lg:text-2xl mt-12 text-custom-gray text-center lg:text-left'>
            Команда проекта
          </h1>

          <Projectform
            data={data}
            changeInputHandler={changeInputHandler}
            deleteItem={deleteItem}
            changeTagsInputHandler={changeTagsInputHandler}
            deleteTags={deleteTags}
            levels={levels}
            state={state}
            extraData={extraData}
            changeExtraInputHandler={changeExtraInputHandler}
            addItemHandler={addItemHandler}
            deleteItemHandler={deleteItemHandler}
          />
        </>
      )}

      {/* buttons save and create */}
      <div className='flex gap-2 md:gap-4 items-center justify-between flex-wrap md:flex-nowrap'>
        <div className='flex gap-2 flex-wrap w-full'>
          <button
            type='button'
            onClick={addTeamForm}
            className='bg-custom-gray hover:bg-gray-600 transition-all text-white py-3 px-6 text-sm rounded focus:outline-none focus:shadow-outline border border-custom-gray font-gilroy-bold w-full md:w-auto'
          >
            Добавить должность
          </button>
          {/* <button
            className='text-text-main_green font-gilroy-bold hover:text-white py-3 px-6 text-sm rounded focus:outline-none focus:shadow-outline border border-text-main_green hover:bg-text-main_green transition-all w-full md:w-auto'
            type='button'
            onClick={submitHandler}
          >
            {state ? "Изменить" : "Сохранить"}
          </button> */}
        </div>
        {props.profileData?.active && (
          <div className='w-full flex justify-end'>
            <button
              // className='text-custom-gray font-gilroy-bold hover:text-white py-3 px-6 text-sm rounded focus:outline-none focus:shadow-outline border border-gray-400 hover:bg-custom-gray transition-all w-full md:w-auto'
              className='text-text-main_green font-gilroy-bold hover:text-white py-3 px-6 text-sm rounded focus:outline-none focus:shadow-outline border border-text-main_green hover:bg-text-main_green transition-all w-full md:w-auto'
              type='button'
              onClick={submitHandler}
            >
              {state ? "Изменить" : "Отправить на проверку"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profileData: state.profileReducer.profileData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetProfile: value => dispatch(getProfile(value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
