import React, { useState, useMemo } from 'react';

// 计算两点距离
function getDistance(lat1, lng1, lat2, lng2) {
  const rad = Math.PI / 180;
  const rLat1 = lat1 * rad;
  const rLat2 = lat2 * rad;
  const dLat = (lat2 - lat1) * rad;
  const dLng = (lng2 - lng1) * rad;
  const a = Math.sin(dLat/2)**2 + Math.cos(rLat1)*Math.cos(rLat2)*Math.sin(dLng/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return (6371 * c).toFixed(2); // km
}

export default function Courier({ user, orderList, setOrderList }) {
  const [courierPos, setCourierPos] = useState({lat:'', lng:''})

  // 按距离从小到大排序
  const sortedOrders = useMemo(()=>{
    if(!courierPos.lat || !courierPos.lng) return orderList;
    return [...orderList].sort((o1,o2)=>{
      const d1 = getDistance(+courierPos.lat, +courierPos.lng, +o1.lat, +o1.lng);
      const d2 = getDistance(+courierPos.lat, +courierPos.lng, +o2.lat, +o2.lng);
      return d1 - d2;
    })
  }, [orderList, courierPos])

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
      <h2>骑手接单页面（距离优先匹配）</h2>
      <p>骑手：{user.name}</p>
      <div style={{marginBottom:20}}>
        <p>填写你的位置：</p>
        <input placeholder="纬度lat" value={courierPos.lat} onChange={e=>setCourierPos({...courierPos, lat:e.target.value})}/>
        <input placeholder="经度lng" value={courierPos.lng} onChange={e=>setCourierPos({...courierPos, lng:e.target.value})} style={{marginLeft:8}}/>
      </div>
      <h3>订单列表（距离近的排在前面）</h3>
      {
        sortedOrders.length === 0
        ? <p>暂无订单</p>
        : sortedOrders.map(item=>{
          const dist = (courierPos.lat && courierPos.lng)
            ? getDistance(+courierPos.lat, +courierPos.lng, +item.lat, +item.lng)
            : null;
          return (
            <div key={item.id} style={{border:'1px solid #ccc',padding:'10px',margin:'8px 0'}}>
              <p>发单人：{item.publisher}</p>
              <p>取件地址：{item.address}</p>
              <p>取件码：{item.code}</p>
              <p>联系电话：{item.phone}</p>
              {dist && <p>距离：{dist} km</p>}
              {
                item.accept
                ? <span style={{color:'green'}}>已被接单</span>
                : <button onClick={()=>acceptOrder(item.id)}>接单</button>
              }
            </div>
          )
        })
      }
    </div>
  )
}
