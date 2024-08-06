import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { LC, NC, SC, UC } from './Passchar';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() {
  let [upper,setupper]=useState(false)
  let [lower,setlower]=useState(false)
  let [number,setnumber]=useState(false)
  let [special,setspecial]=useState(false)
  let [length,setlength]=useState(10)
  let [result,setresult]=useState('')
  let generate=()=>{
    if(upper || lower || number || special){
          let charset=''
          let finalpass=''
          if(upper){
            charset+=UC
          }
          if(lower){
            charset+=LC
          }
          if(number){
            charset+=NC
          }
          if(special){
            charset+=SC
          }
          // console.log(charset)
          for(let i=0;i<length;i++){
            finalpass+= charset.charAt(Math.floor(Math.random()*charset.length))

          }
          setresult(finalpass)
    }
    else{
      NotificationManager.warning('Check at least 1 box');
    }
    
  }
  let copypass=()=>{
    navigator.clipboard.writeText(result)
    if(result!=''){
          NotificationManager.success('Password Copied');
          setresult('')
          setupper(false)
          setspecial(false)
          setnumber(false)
          setlower(false)

    }
    else{

    }
  }

  return (
   <>
        <div className='outer'> 
              <div className='passwordbox'>
                <h2>Password Generator</h2>
                <div className='passwordin'>
           
                  <input type='text' value={result} readOnly/>
                  <button onClick={copypass}>Copy</button>
                </div>
                <div className='length'>
                  <label>Passsword length</label>
                <input type='number' value={length} min={10} max={20} onChange={(event)=>setlength(event.target.value)}/>

                </div>
                <div className='length box'>
                      <label>Including upper case</label>
                      <input type='checkbox' checked={upper} onChange={()=>setupper(!upper)}/>
                </div>
                <div className='length box'>
                      <label>Including Lower case</label>
                      <input type='checkbox' checked={lower} onChange={()=>setlower(!lower)}/>
                </div>
                <div className='length box'>
                      <label>Including  Number</label>
                      <input type='checkbox' checked={number} onChange={()=>setnumber(!number)}/>
                </div>
                <div className='length box'>
                      <label>Including Special character</label>
                      <input type='checkbox' checked={special} onChange={()=>setspecial(!special)}/>
                </div>
                <div className='btn '>
                  <button onClick={generate}>Generate Password</button>
                </div>
              </div>
      </div>
      <NotificationContainer/>
   </>
  );
}

export default App;
