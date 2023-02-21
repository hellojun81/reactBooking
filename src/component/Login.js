import React from 'react';
import { useState } from 'react';

export default function Login(props) {
    const [id, setid] = useState(props.id);
    const [pw, setpw] = useState(props.pw);

    async function loginApi(id, pw) {
        console.log('id', id, 'pw', pw)
        const response = await fetch('http://localhost:4000/api/login?id=' + id + '&pw=' + pw)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.indexOf('ok') > -1) {                 
                    return ('ok');
                }
            });
        // return body
    }

    return <article>
        <h2>LOGIN</h2>
        <form onSubmit={event => {
            event.preventDefault();
            const id = event.target.id.value;
            const pw = event.target.pw.value;
            // const setMode = event.target.pw.value;
            console.log(loginApi(id, pw))
        }}>
            {/* {id}='01031019551';
            {pw}='h23585858!'; */}
            <p><input type="text" name="id" placeholder='id' value='01031019551' onChange={e => {
                console.log(e.target.value)
                setid(e.target.value)
            }} /></p>
            <p><textarea name="pw" placeholder="pw" value='h23585858!' onChange={e => {
                setpw(e.target.value)
            }}></textarea></p>
            <p><input type="submit" value="login" ></input></p>

        </form>
    </article>
}


