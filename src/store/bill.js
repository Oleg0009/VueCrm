
import firebase from "firebase/app";

export default {
  actions:{
    async changeBill({dispatch,commit}, bill){
      try{
        const userId = await dispatch('getUid');
        console.log(bill)
        await firebase.database().ref(`/users/${userId}/info`).update({bill});
      }
      catch(e){
        commit('setError',e);
        throw e
      }
    },
    async fetchRecords({dispatch,commit}){
      try{
        const userId = await dispatch('getUid');
        const records = (await firebase.database().ref(`/users/${userId}/records`).once('value')).val();
        return Object.keys(records).map( key => ({...records[key],id:key}));
      }
      catch(e){
        commit('setError',e);
        throw e
      }
    },
    async createRecord({dispatch,commit}, record){
      try{
        const userId = await dispatch('getUid');
        console.log(record)
        return await firebase.database().ref(`/users/${userId}/records`).push(record);
      }
      catch(e){
        commit('setError',e);
        throw e
      }
    }
   
  }
}
