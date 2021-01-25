
import firebase from "firebase/app";
export default {
  actions:{
    async login({dispatch, commit },{email, password }){
      try{
       await firebase.auth().signInWithEmailAndPassword(email,password);
      }catch(e){
        throw(e);
      }
    },
    async register({dispatch}, {email, password, name}){
      try{
       await firebase.auth().createUserWithEmailAndPassword(email, password);
       const userId = await dispatch('getUid');
       await firebase.database().ref(`/users/${userId}/info`).set({
         bill:1000,
         name
       });
      }catch(e){
        console.log(e.message)
        throw(e);
      }
    },
    getUid(){
      const user = firebase.auth().currentUser;
      return user ? user.uid : null
    },
    async logout(){
      try{
       await firebase.auth().signOut();
      }catch(e){
        throw(e);
      }
    }
  }
}
