const BASE_API = 'http://192.168.103.114:3000';

export default {
    checkToken: async(token) => {
        const req = await fetch(`${BASE_API}/refresh`, {
            
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({token})
        })  
        const json = await req.json();

        return json;
    },

    signIn: async(email, password) => {
        const req = await fetch(`${BASE_API}/signinUser`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })
        const json = await req.json();

        return json;
    },

    signUp: async(name, email, password, phone) => {
        const req = await fetch(`${BASE_API}/cadUser`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({name, email, password, phone})
        }
        )
        const json = await req.json();

        return json;
    },

    resetPass: async(email) => {
        const req = await fetch(`${BASE_API}/resetPassUser`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({email})
        })
        const json = await req.json();

        return json;
    },
}