
import './App.css';
import React, { useEffect, useRef, useState } from "react";
import { alpha, makeStyles } from '@material-ui/core/styles';
import Booking from './component/Booking'

function Login(props) {
  const [id, setid] = useState(props.id);
  const [pw, setpw] = useState(props.pw);
  return <article>

    <form onSubmit={event => {
      event.preventDefault();
      console.log('onSubmit', event.target.id.value)
      const id = event.target.id.value;
      const pw = event.target.pw.value;
      props.onlogin(id, pw)

    }}>
      <h2>LOGIN</h2>
      <p><input type="text" name="id" placeholder='id' class="inputField" value={id} onChange={e => {
        setid(e.target.value)
      }} /></p>
      <p><input name="pw" placeholder="pw" class="inputField" value={pw} onChange={e => {
        setpw(e.target.value)
      }}></input></p>
      <p><input type="submit" value="login" id="loginbtn"></input></p>

    </form>
  </article>
}
//01031019551 ,h23585858!
//junsup99 ,kjs0529**

function App() {
  let content = null;
  const [mode, setMode] = useState('login');
  const [tel, setTel] = useState()
  const [id, setID] = useState()
  const [name, setname] = useState()
  const [state, setState] = useState({ message: "", name: "" });

  async function loginApi(id, pw) {
    const response = await fetch('http://gyulwang.cafe24app.com/api/login?id=' + id + '&pw=' + pw)
      .then((response) => response.json())
      .then((data) => {
        alert(data.replace(/\"/gi,''));
        if (data.indexOf('ok') > -1) {
          data = data.replace('_ok', '')
          setID(id)
          setTel(data)
          setMode('booking')
          return data
        }
      });
  }


  if (mode === 'login') {
    content = <Login onlogin={(id, pw) => {
      loginApi(id, pw)
    }} ></Login>
  } else if (mode === 'booking') {
    content = <Booking tel={tel} id={id}></Booking>
  }

  return (
    <div className="App">
      <header className="App-header">
      </header>
      {content}
    </div>
  )

}
// }
export default App;




