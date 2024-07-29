import { useEffect, useState, useRef } from 'react';
import { FcAlarmClock } from "react-icons/fc";
import Nav from './comp/Nav';
import Wav from './assets/audio.wav';
import { MdDeleteOutline } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { FaRegPauseCircle } from "react-icons/fa";
import ReactSwitch from 'react-switch';

function App() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false)
  const [hours, sethour] = useState([])
  const [minutes, setmin] = useState([])
  const [ams, setam] = useState([])
  const [Alarms, setAlarms] = useState([])
  const [Showalarm, setShowalarm] = useState(false)
  const [checked, setChecked] = useState(true);
  const [pause, setpause] = useState(false)
  // const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const numbers = []
  for (let i = 1; i < 13; i++) {
    numbers.push(i)
  }

  const mins = []
  for (let i = 0; i < 60; i++) {
    if (i < 10) {
      const n = '0' + i
      mins.push(n)
    } else {
      mins.push(i)
    }
  }

  const pm = ['AM', 'PM']

  const onClick = () => setShow(!show)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const datee = date.toLocaleDateString()

  useEffect(() => {
    if(Alarms){
      setShowalarm(true)
    }
  }, [])
  
  const setAlarm = () => {
    if (hours != 0) {
      for (let index = 0; index < hours.length; index++) {
        const al = hours[index] + ":" + minutes[index] + ":" + 0 + 0 + " " + ams[index]
        setAlarms([...Alarms, al])
        localStorage.setItem("Alarms", JSON.stringify([...Alarms, al]))
      }
      setShow(!show)
    }
  }

  useEffect(() => {
    const Alarmss = localStorage.getItem('Alarms');
    if (Alarmss) {
      setAlarms(JSON.parse(Alarmss));
    }
  }, []);
  

  const handleClick = (index) => {
    const hr = numbers[index]
    sethour([...hours, hr])
  }
  const handleClick2 = (index) => {
    const minute = mins[index]
    setmin([...minutes, minute])
  }
  const handleClick3 = (index) => {
    const m = pm[index]
    setam([...ams, m])
  }

  const handledelete = (index) => {
    const newlist = [...Alarms]
    newlist.splice(index, 1);
    setAlarms(newlist)
    localStorage.setItem("Alarms", JSON.stringify(newlist))
  }

  const handleEdit = (index) => {
    onClick()
    setAlarm()
    handledelete(index)
  }

  const handleChange = () => {
    setChecked(!checked)
  }

  useEffect(() => {
    setTime(date.toLocaleTimeString());
    if (checked) {
      for (let index = 0; index < Alarms.length; index++) {
        const b = Alarms[index].toString()
        if (time == b) {
          aud.play()
        }
      }
    }
  }, [date]);

  const aud = new Audio(Wav)
  
  // const togglePlay = () => {
  //   if (isPlaying) {
  //     audioRef.current.pause();
  //   } else {
  //     audioRef.current.play();
  //   }
  //   setIsPlaying(!isPlaying);
  // };
  
  // useEffect(() => {
  //   setInterval(() => {
  //     if (pause) {
  //       aud.pause();
  //       console.log("pause")
  //     }
  //   }, 1000);
  // }, [pause]);

  return (
    <>
      <Nav />
      <div className=' bg-violet-100 h-screen' onKeyDown={(e) => {
        if (e.key === "Enter") {
          setAlarm()
        }
      }}>
        <h1 className=' w-96 font-bold text-3xl text-center mx-auto p-4 hover:text-4xl duration-300'>Smart Alarm Clock</h1>
        <div className=' flex justify-center my-2 py-2'>
          <FcAlarmClock className=' size-10 hover:size-20 duration-300' />
        </div>
        <div className='flex flex-col items-center'>
          <div className=' font-medium hover:text-xl duration-300'>{datee}</div>
          <div className=' font-medium hover:text-xl duration-300'>{time}</div>
        </div>
        <div className=' flex justify-center my-5'>
          <button className=' bg-violet-600 w-48 h-10 font-medium rounded-3xl text-white hover:bg-violet-800' onClick={setAlarm}>Set Alarm</button>
        </div>
        <div className=' flex justify-center text-center my-3 py-3'>
          <div>
            <div className='flex justify-center text-center gap-4'>
              <button className=' border border-white bg-sky-300 rounded-xl p-3 h-8 flex items-center hover:bg-sky-600' onClick={onClick}>Hour</button>
              <button className=' border border-white bg-sky-300 rounded-xl p-3 h-8 flex items-center hover:bg-sky-600' onClick={onClick}>Minutes</button>
              <button className=' border border-white bg-sky-300 rounded-xl p-3 h-8 flex items-center hover:bg-sky-600' onClick={onClick}>AM/PM</button>
            </div>
            <div className='flex'>
              {show &&
                <div className=' flex gap-10'>
                  <div className=' grid overflow-y-scroll h-24'>{numbers.map((number, index) => <li className=' list-none'><button key={index} className=' bg-slate-200 w-10 hover:bg-slate-500' type="button" onClick={() => handleClick(index)}>{number}</button></li>)}</div>
                  <div className=' grid overflow-y-scroll h-24'>
                    {mins.map((min, index) => <li className=' list-none'><button key={index} className=' bg-slate-200 w-10 hover:bg-slate-500' type="button" onClick={() => handleClick2(index)}>{min}</button></li>)}
                  </div>
                  <div className=' grid h-24'>{pm.map((pm, index) => <li className=' list-none'><button key={index} className=' bg-slate-200 w-10 hover:bg-slate-500' type="button" onClick={() => handleClick3(index)}>{pm}</button></li>)}</div>
                </div>
              }
            </div>
          </div>
        </div>
        <div className=' flex justify-center'>
          <div>
            <div className='text-2xl flex justify-center  font-semibold hover:font-bold duration-300' >Your Alarms</div>
            {Showalarm &&
              <div className='text-center gap-10 relative left-32 my-3'>
                {Alarms.map((alarm, index) =>
                  <div className=' flex py-1'>
                    <li className='list-none font-normal text-lg relative right-5' key={index}>{alarm}</li>
                    <div className=' flex justify-center gap-4 relative left-10'>
                      <div className=' flex'>
                        <button className=' bg-violet-500 rounded-3xl w-10 flex justify-center items-center hover:bg-violet-800'
                          onClick={() => { handledelete(index) }} >
                          <MdDeleteOutline className=' fill-white' />
                        </button>
                      </div>
                      <div className=' flex'>
                        <button className=' bg-violet-500 rounded-3xl w-10 flex justify-center items-center hover:bg-violet-800'
                          onClick={() => { handleEdit(index) }} >
                          <MdModeEdit className=' fill-white' />
                        </button>
                      </div>
                      <div className=' flex'>
                        <button className=' bg-violet-500 rounded-3xl w-10 flex justify-center items-center hover:bg-violet-800'
                          onClick={() => setpause(!pause)} >
                          <FaRegPauseCircle className=' fill-white' />
                        </button>
                      </div>
                      <div>
                        <div>
                          <ReactSwitch
                            checked={checked}
                            onChange={handleChange}
                            className=" bg-slate-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
