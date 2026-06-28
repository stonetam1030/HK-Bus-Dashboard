function updateTime() {
    const now = new Date();
    // 將時間格式化為 YYYY/MM/DD HH:MM AM/PM 格式
    document.getElementById('datetime').innerText = now.toLocaleString();
}
setInterval(updateTime, 1000); // 每秒更新一次

// 獲取69X站的 ETA
async function fetchBusETA() {
    // 這裡需要替換為你實際查詢到的 站點ID (stop_id) 和 路線 (route)
    const stopId = '高鐵(西九龍站)'; 
    const route = '69X';
    
    try {
        const response = await fetch(`https://data.etabus.gov.hk/v1/transport/kmb/eta/${高鐵(西九龍站)}/${69X}/1`);
        const data = await response.json();
        
        if (data.data.length > 0) {
            // 解析數據並更新到 HTML
            console.log(data.data);
            // 這裡寫入將 ETA 時間顯示到 document.getElementById('...') 的邏輯
        }
    } catch (error) {
        console.error("無法獲取巴士資料", error);
    }
}

// 每 60 秒更新一次巴士資料
setInterval(fetchBusETA, 60000);
fetchBusETA(); // 啟動時立刻執行一次