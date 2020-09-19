import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import {ipcRenderer} from 'electron'; // import正常不支持，需要解决一下

function App() {
  const [remoteCode, setRemoteCode] = useState('');
  const [localCode, setLocalCode] = useState('');
  const [controlText, setControlText] = useState('');  // controlText有三个状态，未连接、正在控制屏幕、被控制中

  const login = async () => {
    let code = await ipcRenderer.invoke('login');
    setLocalCode(code);
  };

  useEffect(() => {
    login();
    ipcRenderer.on('control-state-change', handleControlStateChange);
    return () => {  // 组件销毁的时候，移除之前的注册的监听事件
      ipcRenderer.removeListener('control-state-change', handleControlStateChange);
    }
  }, [])

  const startControl = (remoteCode) => {
    ipcRenderer.send('control', remoteCode);
  };

  const handleControlStateChange = (e, name, type) => {
    let text = '';
    if (type === 1) { // 控制别人
      text = `正在远程控制${name}`;
    } else if (type=== 2) { //被控制
      text = `被${name}控制中`;
    }
    setControlText(text);
  };

  return (
    <div className="App">
      {
        controlText === '' ? <>
          <div>你的控制码：{localCode}</div>
          <input type='text' value={remoteCode} onChange={e => setRemoteCode(e.target.value)} ></input>
          <button onClick={() => startControl(remoteCode)} >确认</button>
        </> : controlText 
      }
    </div>
  );
}

export default App;
