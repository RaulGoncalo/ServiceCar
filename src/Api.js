const BASE_API = 'http://192.168.0.4:3000';

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

    companies: async (token, specialty) =>{

        const req = await fetch(`${BASE_API}/getEmpresas/${specialty}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Authorization': `${token}`,
            }
        });
        
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

    services: async (token, idCompanie) =>{

        const req = await fetch(`${BASE_API}/getServices/${idCompanie}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Authorization': `${token}`,
            }
        });
        
        return req;
    },

    getfavorites: async (token, idCompanie) =>{

        const req = await fetch(`${BASE_API}/getFavorites/${idCompanie}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Authorization': `${token}`,
            }
        });
        
        return req;
    },

    favorite: async (token, idCompanie) =>{
        const req = await fetch(`${BASE_API}/favorites`,{
            method: 'POST',
            headers:{
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({idCompanie})
        })

        return req;
    },

    deleteFavorite: async (token, idCompanie) =>{
        const req = await fetch(`${BASE_API}/deleteFavorite`,{
            method: 'DELETE',
            headers:{
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({idCompanie})
        })

        return req;
    },

    getHoursService: async (token, data) =>{

        const req = await fetch(`${BASE_API}/getHoursService/idEmpresa=${data.idCompanie}/idServico=${data.idService}/data=${data.date}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Authorization': `${token}`,
            }
        });
        
        return req;
    },
    
    saveSchedule : async (token, data) =>{
        const req = await fetch(`${BASE_API}/saveSchedule`,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Authorization': `${token}`
            },
            body: JSON.stringify({data}),
        });

        return req;
    },


    getScheduleds: async (token) =>{
        const req =  await fetch(`${BASE_API}/getSchedule`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Authorization': `${token}`,
            }
        });

        return req;
    },

    cancelSchedule: async (token, idSchedule) => {
        const req = fetch(`${BASE_API}/deleteSchedule/${idSchedule}`,{
            method: 'DELETE',
            headers:{
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Authorization': `${token}`,
            }
        });

        return req
    },

    getListFavorites: async (token) =>{
        const req =  await fetch(`${BASE_API}/getListFavorites`,{
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
                'Authorization': `${token}`,
            }
        });

        return req;
    },
}