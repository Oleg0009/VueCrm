
import firebase from "firebase/app";


export default {

  actions:{
    async login({dispatch, commit },{email, password }){
      try{
        firebase.auth().signInWithEmailAndPassword(email,password);
      }catch(e){
        throw(e);
      }
    }
  }
  

}
