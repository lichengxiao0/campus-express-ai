import React, { useState } from 'react';

export default function Login({ setUser }) {
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', pwd: '', role: 'publisher' });

  const submit = (e) => {
    e.preventDefault();
    // 本地模拟登录注册，不连后端
    setUser({ name: form.username, role: form.role });
  };

  return (
    <div style={{ padding: '30px', maxWidth: '400px', margin: '50px auto' }}>
      <h2>{isRegister ? '用户注册' : '用户登录'}</h2>
      <form onSubmit={submit}>
        <div>
          <label>账号：</label>
          <input
            value={form.username}
            onChange={e => setForm({...form, username: e.target.value})}
            required
          />
        </div>
        <div style={{margin:'10px 0'}}>
          <label>密码：</label>
          <input type="password"
            value={form.pwd}
            onChange={e => setForm({...form, pwd: e.target.value})}
            required
          />
        </div>
        <div style={{margin:'10px 0'}}>
          <label>身份：</label>
          <select value={form.role} onChange={e => setForm({...form, role:e.target.value})}>
            <option value="publisher">发单用户</option>
            <option value="courier">跑腿骑手</option>
          </select>
        </div>
        <button type="submit">{isRegister ? '注册' : '登录'}</button>
      </form>
      <p onClick={()=>setIsRegister(!isRegister)} style={{color:'blue',cursor:'pointer'}}>
        {isRegister ? '已有账号？去登录' : '没有账号？去注册'}
      </p>
    </div>
  )
}
