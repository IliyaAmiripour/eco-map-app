
let app; let auth; let db; let storage;
window.addEventListener('DOMContentLoaded', () => {
  app = firebase.initializeApp(window.FB_CONFIG);
  auth = firebase.auth();
  db = firebase.firestore();
  storage = firebase.storage();
});

const Fire = {
  async setAreas(arr){},
  async addArea(a){await db.collection('areas').add(a);},
  async getAreas(){const snap=await db.collection('areas').orderBy('createdAt','desc').get();return snap.docs.map(d=>({id:d.id,...d.data()}));},
  async addPhoto(p){const doc=await db.collection('photos').add(p);return doc.id;},
  async getPhotos(){const snap=await db.collection('photos').orderBy('createdAt','desc').get();return snap.docs.map(d=>({id:d.id,...d.data()}));},
  async addPoints(name,pts){const ref=db.collection('users').doc(name);return db.runTransaction(async t=>{const d=await t.get(ref);const cur=d.exists?d.data().points:0;t.set(ref,{name,points:cur+pts},{merge:true});});},
  async getLeaderboard(){const snap=await db.collection('users').orderBy('points','desc').limit(100).get();return snap.docs.map(d=>d.data());},
  async addFeedback(f){await db.collection('feedback').add(f);},
  async getFeedback(){const snap=await db.collection('feedback').orderBy('createdAt','desc').limit(50).get();return snap.docs.map(d=>d.data());},
  async saveFile(file){const hash=Math.random().toString(36).slice(2);const ref=storage.ref().child('uploads/'+hash+'_'+file.name);await ref.put(file);return await ref.getDownloadURL();},
  async signup(email,pass){await auth.createUserWithEmailAndPassword(email,pass);},
  async login(email,pass){await auth.signInWithEmailAndPassword(email,pass);}
};
const StorageAPI=new Proxy(Fire,{get(t,p){return t[p];}});
