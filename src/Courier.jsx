import React from 'react';
export default function Courier({ user, orderList, setOrderList }) {

  const acceptOrder = (id) => {
    const arr = orderList.map(item=>{
      if(item.id === id) return {...item, accept:true, courier: user.name};
      return item;
    })
    setOrderList(arr);
    alert('接单成功！');
  }

  return (
    <div style={{padding:'30px',maxWidth:'600px',margin:'0 auto'}}>
      <h2>骑手接单页面</h2>
      <p>骑手：{user.name}</p>
      <h3>订单列表</h3>
      {
        orderList.length === 0
        ? <p>暂无订单</p>
        : orderList.map(item=>(
          <div key={item.id} style={{border:'1px solid #ccc',padding:'10px',margin:'8px 0'}}>
            <p>发单人：{item.publisher}</p>
            <p>取件地址：{item.address}</p>
            <p>取件码：{item.code}</p>
            <p>联系电话：{item.phone}</p>
            {
              item.accept
              ? <span style={{color:'green'}}>已被接单</span>
              : <button onClick={()=>acceptOrder(item.id)}>接单</button>
            }
          </div>
        ))
      }
    </div>
  )
}
