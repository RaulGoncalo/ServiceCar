export const initialState = {
    name: '',
    email:'',
    phone: '',
    favorites: [''],
};
//grade de ações
export const UserReducer = (state, action) => {
    switch(action.type){
        //uma da ações é definir um phone
        case 'setUser':
            return{
                ...state, 
                name: action.payload.name, 
                email:action.payload.email, 
                phone: action.payload.phone,
            };
        break;

        default:
            return state; 
    }
}