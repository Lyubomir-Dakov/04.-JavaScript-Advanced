const host = 'http://localhost:3030';

async function request(url, method, data) {
    const options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();
    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const res = await fetch(host + url, options);

        if (res.ok == false) {
            if (res.status == 403) {
                // AKO POLUCHIM 403 - TOEST AKO IMAME NEVALIDEN TOKEN - NQMA DA STIGNEM DO DOLNATA GRESHKA - ISKAME DA IZTRIEM SESSIONSTORAGE-A S IZNESENA FUNC V UTIL.JS
                clearUserData();
            }

            // PROVERAVAME DALI RESPONS-A E OK
            const error = await res.json();
            throw new Error(error.message);
        }

        // ako do tuk vsichko e nared --> imame 2 varianta --> v responsa ima danni ili nqma danni
        if (res.status == 204) {
            return res;
        } else {
            return res.json();
        }
    } catch (err) {
        alert(err.message);    // kazvame na potrebitelq che neshto ne e nared
        throw err; // i prehvarlqme greshkata nagore po verigata zashtoto funkciite koito vikat tazi funkciq ako ne poluchat greshka shte priemat che vsi4ko e nared
    }
}

export async function get(url) {
    return request(url, 'get');
}

export async function post(url, data) {
    return request(url, 'post', data);
}

export async function put(url, data) {
    return request(url, 'put', data);
}

export async function del(url) {
    return request(url, 'delete');
}