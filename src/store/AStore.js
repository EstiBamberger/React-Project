import { observable, makeObservable, action } from 'mobx';

class AStore {
    isLogin =  localStorage.getItem('isLogIn');
    isEdit=false;
    constructor() {
        makeObservable(this, {
            isLogin: observable,
            setIsLogin: action,
            isEdit:observable,
            setIsEdit:action,
        })
    }

    setIsLogin = () => {
       this.isLogin=localStorage.getItem('isLogIn');
    }
    setIsEdit = (val) => {
        this.isEdit = val;
    }
   
   
}

export default new AStore();