
import firebase from "firebase/app";
export default {
  actions:{
      async fetchCategories({dispatch,commit}){
        try{
          const userId = await dispatch('getUid');
          const categories = (await firebase.database().ref(`/users/${userId}/categories`).once('value')).val();
          console.log(categories)
          if(categories)
          return Object.keys(categories).map( key => ({...categories[key],id:key}));
          else
          return []
        }
        catch(e){
          commit('setError',e);
          throw e
        }
      },
      async updateCategory({dispatch,commit},{title,limit,id}){
        try{
          const userId = await dispatch('getUid');
          await firebase.database().ref(`/users/${userId}/categories`).child(id).update({title,limit});
        
        }
        catch(e){
          commit('setError',e);
          throw e
        }
      },
      async createCategory({dispatch,commit},{title,limit}){
        try{
          const userId = await dispatch('getUid');
          const category = await firebase.database().ref(`/users/${userId}/categories`).push({title,limit})
          return {title,limit,id:category.key} 
        }
        catch(e){
          commit('setError',e);
          throw e
        }
      }


  }
}
