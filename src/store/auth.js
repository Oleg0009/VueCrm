
import firebase from "firebase/app";
export default {
  actions:{
    async login({ dispatch, commit },{ email, password }){
      try{
       await firebase.auth().signInWithEmailAndPassword(email,password);
      }catch(e){
        commit('setError',e);
        throw e;
      }
    },
    async register({ dispatch, commit}, { email, password, name }){
      try{
       await firebase.auth().createUserWithEmailAndPassword(email, password);
       const userId = await dispatch('getUid');
       console.log(userId);
       await firebase.database().ref(`/users/${userId}/info`).set({
         bill:1000,
         name
       });
      }catch(e){
        commit('setError',e);
        throw e;
      }
    },
    getUid(){
      const user = firebase.auth().currentUser;
      return user ? user.uid : null
    },
    async logout({commit}){
      try{
       await firebase.auth().signOut();
        commit('clearInfo');
      }catch(e){
        commit('setError',e);
        throw e;
      }
    }
  }
}
