function updateTime() {
    const now = new Date();
    // 將時間格式化為 YYYY/MM/DD HH:MM AM/PM 格式
    document.getElementById('datetime').innerText = now.toLocaleString();
}
setInterval(updateTime, 1000); // 每秒更新一次

// 獲取69X站的 ETA
async function fetchBusETA() {
    const stopId = 'DA4C00397F6B56EC'; 
    const route = '69M';
    const serviceType = '1';
    
    const url = `https://data.etabus.gov.hk/v1/transport/kmb/eta/${stopId}/${route}/${serviceType}`;    
    
    try {
        const response = await fetch(url);
        const json = await response.json();
        
        console.log("API 回傳資料:", json); // 在 Console 查看完整數據

        if (json.data && json.data.length > 0) {
            const busInfo = json.data[0]; 
            
            // 計算 ETA 分鐘數
            const etaTime = new Date(busInfo.eta);
            const now = new Date();
            const diffInMs = etaTime - now;
            const diffInMin = Math.round(diffInMs / 60000);
            
            const displayTime = diffInMin < 0 ? "Now" : diffInMin + "m";

            // 更新 HTML
            const routeEl = document.querySelector('.bus-route');
            const etaEl = document.querySelector('.bus-eta');
            
            if (routeEl) routeEl.innerText = `🚌 ${busInfo.route}`;
            if (etaEl) etaEl.innerText = displayTime;
            
            console.log("更新成功:", busInfo.route, displayTime);
        } else {
            console.warn("目前沒有該路線的班次資料");
        }
    } catch (error) {
        console.error("更新巴士資料失敗:", error);
    }
}