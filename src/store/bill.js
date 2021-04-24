
import firebase from "firebase/app";

export default {
  actions:{
    async changeBill({dispatch,commit}, bill){
      try{
        const userId = await dispatch('getUid');
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
        console.log(records);
        return Object.keys(records).map( key => {
             console.log(key);
             return {...records[key],id:key}
        });
      }
      catch(e){
        commit('setError',e);
        throw e
      }
    },
    async fetchRecordById({dispatch,commit},id){
      try{
        const userId = await dispatch('getUid');
        const record = (await firebase.database().ref(`/users/${userId}/records`).child(id).once('value')).val();
        return {...record,id};
      }
      catch(e){
        commit('setError',e);
        throw e
      }
    },
    async createRecord({dispatch,commit}, record){
      try{
        const userId = await dispatch('getUid');
        return await firebase.database().ref(`/users/${userId}/records`).push(record);
      }
      catch(e){
        commit('setError',e);
        throw e
      }
    }
   
  }
}
