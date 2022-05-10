const BASE_API = 'http://192.168.43.47:3000';

export default {
    checkToken: async(token) => {
        const req = await fetch(`${BASE_API}/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Authorization': `${token}`,
            },

        })

        return req;
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

    listCompanies: async (token, specialty) =>{

        const req = await fetch(`${BASE_API}/getEmpresa`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Authorization': `${token}`,
            }
        });
        console.log(req)
        return req;

    },

    requestCode: async (email) =>{
        const req = await fetch(`${BASE_API}/requestCodeMobile`,{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({email})
        });

        return req;
    },

    validateCode: async (code) =>{
        const req = await fetch(`${BASE_API}/validateCode/${code}`, {
            method: 'GET',
            headers:{
                Accept: 'application/json',
                'Content-type': 'application/json',
            }
        })

        return req;
    },

    resetPassword: async (email, password) =>{
        const req = await fetch(`${BASE_API}/resetPswUser`,{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
            body: JSON.stringify({email, password})
        })

        return req;
    },

}