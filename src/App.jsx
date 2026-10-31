import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Publisher from './Publisher';
import Courier from './Courier';

// 全局状态：本地模拟用户、订单数据
function App() {
  // users: [{id, username, password, role: publisher / courier}]
  const [userList, setUserList] = useState([]);
  // orders: [{id, address, pickupCode, phone, taken, publisherId}]
  const [orderList, setOrderList] = useState([]);
  // 当前登录用户
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <Routes>
        {/* 注册 */}
        <Route path="/register" element={
          <Register userList={userList} setUserList={setUserList} />
        } />
        {/* 登录 */}
        <Route path="/login" element={
          <Login userList={userList} setCurrentUser={setCurrentUser} />
        } />
        {/* 发布商页面，需要登录且角色是publisher */}
        <Route path="/publisher" element={
          currentUser?.role === 'publisher'
            ? <Publisher currentUser={currentUser} orderList={orderList} setOrderList={setOrderList} />
            : <Navigate to="/login" />
        } />
        {/* 快递员页面，需要登录且角色是courier */}
        <Route path="/courier" element={
          currentUser?.role === 'courier'
            ? <Courier currentUser={currentUser} orderList={orderList} setOrderList={setOrderList} />
            : <Navigate to="/login" />
        } />
        {/* 默认跳转登录 */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
