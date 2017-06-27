import original_fetch from 'node-fetch';

let cache: Map<string, [Promise<any>, Date]> = new Map();
let outstandingRequests: Map<string, [()=>any, ()=>any]> = new Map();


/**
 * the minimum time between two requests to a webservice in ms
 * @type {number}
 */
export let minTimeBetweenRequests = 500;

/**
 * fetches the request with node-fetch and caches the result. Also only allows one request every 200ms and will put all
 * other into a waiting query
 */
export async function fetch(request, maxCacheAge:number = 60*60*1000){
    if(!cache.has(request) || (cache.get(request)[2] as Date).getTime() + maxCacheAge - new Date().getTime() < 0){
        let promise = new Promise((resolve, reject) => {
            outstandingRequests.set(request, [resolve, reject]);
        });

        cache.set(request, [promise, new Date()]);

        return await promise;
    }else{
        return await cache.get(request)[0];
    }
}

setInterval(()=>{
    let iter = outstandingRequests.entries().next();

    if(!iter.done){
        let [request, [resolve, reject]] = iter.value;

        original_fetch(request).then(res => res.json()).then(resolve).catch(reject);

        outstandingRequests.delete(request);
    }
}, minTimeBetweenRequests);