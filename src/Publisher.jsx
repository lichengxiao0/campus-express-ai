import React, { useState } from 'react';
export default function Publisher({ user, orderList, setOrderList }) {
  const [form, setForm] = useState({
    address: '',
    code: '',
    phone: ''
  })

  const publishOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      id: Date.now(),
      publisher: user.name,
      ...form,
      accept: false
    }
    setOrderList([...orderList, newOrder]);
    alert('订单发布成功！');
    setForm({address:'',code:'',phone:''});
  }

  return (
    <div style={{padding:'30px',maxWidth:'500px',margin:'0 auto'}}>
      <h2>发单页面（订单发布者）</h2>
      <p>欢迎，{user.name}</p>
      <form onSubmit={publishOrder}>
        <div>
          <label>取件地址：</label>
          <input value={form.address} onChange={e=>setForm({...form,address:e.target.value})} required />
        </div>
        <div style={{margin:'10px 0'}}>
          <label>取件码：</label>
          <input value={form.code} onChange={e=>setForm({...form,code:e.target.value})} required />
        </div>
        <div style={{margin:'10px 0'}}>
          <label>联系电话：</label>
          <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required />
        </div>
        <button type="submit">发布订单</button>
      </form>
    </div>
  )
}
