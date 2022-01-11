
export const extraxtParams=(location)=>{
    const urlParams = new URLSearchParams(location.search);
    const start = urlParams.get('start') || '0'
    const end = urlParams.get('end') || '6'
    return {start,end}
}