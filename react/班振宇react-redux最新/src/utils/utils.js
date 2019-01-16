/**
 * 距离某个时间段有多远
 */
export function showTime(historyTime){
    let diffTime = Date.now() - historyTime;
    diffTime = Math.floor(diffTime / 1000);
    let unit = '秒';
    if (diffTime > 60) {
        diffTime = Math.floor(diffTime / 60);
        unit = '分钟';
    
        if (diffTime > 60) {
            diffTime = Math.floor(diffTime / 60);
            unit = '小时';
    
            if (diffTime > 24) {
                diffTime = Math.floor(diffTime / 24);
                unit = '天';
    
                if (diffTime > 365) {
                    diffTime = Math.floor(diffTime / 365);
                    unit = '年';
                }
            }
        }
    }
    return `${diffTime}${unit}前`
}