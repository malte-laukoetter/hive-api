import original_fetch from 'node-fetch';

let cache: Map<string, Promise<any>> = new Map();
let outstandingRequests: Map<string, [()=>any, ()=>any]> = new Map();

/**
 * fetches the request with node-fetch and caches the result. Also only allows one request every 200ms and will put all
 * other into a waiting query
 */
export async function fetch(request, ignoreCache:boolean = false){
    if(ignoreCache || !cache.has(request)){
        let promise = new Promise((resolve, reject) => {
            outstandingRequests.set(request, [resolve, reject]);
            console.log(outstandingRequests)
        });

        cache.set(request, promise);

        return await promise;
    }else{
        return await cache.get(request);
    }
}

setInterval(()=>{
    let iter = outstandingRequests.entries().next();

    if(!iter.done){
        let [request, [resolve, reject]] = iter.value;

        original_fetch(request).then(resolve).catch(reject);

        outstandingRequests.delete(request);
    }
}, 200);