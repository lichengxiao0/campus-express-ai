import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 注册页面
 * 角色二选一：订单发布商 publisher / 兼职快递 courier
 */
function Register({ userList, setUserList }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'publisher'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 判断用户名是否重复
    const exist = userList.find(item => item.username === form.username);
    if (exist) {
      alert('用户名已存在！');
      return;
    }
    const newUser = {
      id: Date.now(),
      username: form.username,
      password: form.password,
      role: form.role
    };
    setUserList([...userList, newUser]);
    alert('注册成功，请登录！');
    navigate('/login');
  };

  return (
    <div style={{ width: '400px', margin: '50px auto' }}>
      <h2>账号注册</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>用户名：</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            style={{ width: '100%', margin: '8px 0', padding: '6px' }}
          />
        </div>
        <div>
          <label>密码：</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: '100%', margin: '8px 0', padding: '6px' }}
          />
        </div>
        <div>
          <label>用户类型：</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{ width: '100%', margin: '8px 0', padding: '6px' }}
          >
            <option value="publisher">订单发布商</option>
            <option value="courier">兼职快递员</option>
          </select>
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '8px', marginTop: '12px' }}
        >
          注册
        </button>
      </form>
      <p style={{ marginTop: '16px', textAlign: 'center' }}>
        已有账号？
        <button onClick={() => navigate('/login')} style={{ border: 'none', background: 'none', color: '#0066cc', cursor: 'pointer' }}>去登录</button>
      </p>
    </div>
  );
}

export default Register;
