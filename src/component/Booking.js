import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
// import { useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // css import
import moment from 'moment';
// import reactMoment from 'react-moment';
import { useInterval } from "use-interval";
import io from "socket.io-client"; //모듈 가져오기
const socket = io.connect("localhost:8001");
const msg=[]


export default function Main(props) {
    const tel = props.tel;
    const id = props.id;
    const [receiveMsg, setReceiveMsg] = useState(tel)
    const [value, _onChange] = useState(new Date());
    const [mark, setMark] = useState([]);
    let [delay, setDelay] = useState(1000);
    let [teeoff, setTeeoff] = useState(2);
    let now
    // setReceiveMsg(tel)
// console.log('props',id)
    const handleChange = (e) => {
        setTeeoff(e.target.value)
    }
    useInterval(() => {
        setDelay(delay + 1);
    }, delay);

    useEffect(function () {
        socket.on(id, (message) => {
            now=moment().format('HH시 mm분 ss초').replace(/,/g,'')
            if(msg.indexOf(now + ':'+message+'\n')==-1){
            msg.push(now + ':'+message+'\n')
            // console.log(now + ':'+message+'\n')
            setReceiveMsg(msg)
            }
             
        });
    },[receiveMsg])
 

    async function BookingApi() {
        let date = moment(value).format("YYYYMMDD")
        let _tel = tel.split('_')
        _tel = _tel[1]
        const response = await fetch('http://gyulwang.cafe24app.com/api/booking?date=' + date + '&tel=' + _tel + '&teeoff=' + teeoff +'&id='+id)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.indexOf('ok') > -1) {
                    alert('예약성공');
                } else {
                    alert(data);
                }
            });

    }
    return <article>

        <div class='booking'>
            <h2>{tel}</h2>

            <Calendar
                onChange={_onChange} // useState로 포커스 변경 시 현재 날짜 받아오기
                formatDay={(locale, date) => moment(date).format("DD")} // 날'일' 제외하고 숫자만 보이도록 설정
                value={value}
                calendarType='US'
                navigationLabel={null}
                showNeighboringMonth={true} //  이전, 이후 달의 날짜는 보이지 않도록 설정
                className="mx-auto w-full text-sm border-b"
                tileContent={({ date, view }) => { // 날짜 타일에 컨텐츠 추가하기 (html 태그)
                    let html = [];
                    // 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
                    if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                        html.push(<div className="dot"></div>);
                    }
                    return (
                        <>
                            <div className="flex justify-center items-center absoluteDiv">
                                {html}
                            </div>
                        </>
                    );
                }}
            />



            <h1>{moment().format('HH시 mm분 ss초')}</h1>
            <select onChange={(e) => handleChange(e)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <button onClick={() =>
            BookingApi()} id="bookingbtn">Booking</button>
             <textarea value={receiveMsg}
            //  onChange={(event) => handleOnChange(event)}
             ></textarea>
        </div>
       

    </article>
}

