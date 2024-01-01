import { observable, makeObservable, action } from 'mobx';

class AStore {
    isLogin =  localStorage.getItem('isLogIn');
    isEdit=false;
    // meetingDetails={name:"",type:"",address:"",phone:"",email:"",date:"",};
    constructor() {
        makeObservable(this, {
            isLogin: observable,
            setIsLogin: action,
            isEdit:observable,
            setIsEdit:action,
            // meetingDetails:observable,
            // setMeetingDetails:action,

        })
    }

    setIsLogin = () => {
       this.isLogin=localStorage.getItem('isLogIn');
    }
    setIsEdit = (val) => {
        this.isEdit = val;
    }
    // setMeetingDetails=(filed,val)=>{
    //     switch (filed) {
    //         case "name":
    //           this.meetingDetails.name=val;
    //           break;
    //         case "type":
    //             this.meetingDetails.type=val;
    //           break;
    //         case "address":
    //             this.meetingDetails.address=val;
    //           break;
    //         case "email":
    //             this.meetingDetails.email=val;
    //           break;
    //         case "date":
    //             this.meetingDetails.date=val;
    //           break;
    //           case "phone":
    //             this.meetingDetails.phone=val;
    //           break;
    //         default:
    //             null;
    //           break;
    //       }
    // }
   
}

export default new AStore();