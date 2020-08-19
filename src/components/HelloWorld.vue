<template>
<div class='hello'>
    <div class='container'>
     <div class='row'>
       <div class='col-md-4 order-md-2 mb-4'>
         <h4>Current Pets:</h4>
         <!-- If allPets has data, show the list -->
         <div v-if="allPets">
          <ul class='list-group mb-3'>
            <!-- A list item calling allPets from firebase, it renders by using the -->
            <!-- v-for uses the item/s to get all of the pets -->
             <li class='list-group-item d-flex justify-content-between lh-condensed' v-for="item in allPets" :key="item.id">
               <span>{{item.type}}</span>
               <span>{{item.age}}</span>
               <span>{{item.name}}</span>
               <span class="delete-it" v-on:click="deleteClick(item)">x</span>
             </li>
           </ul>
         </div>
         <!-- allPets List END -->
         <div v-else>
           <p>Waiting for data...</p>
         </div>
       </div>
       <div class='col-md-8 order-md-1'>
         <h4>Add or Delete Pets:</h4>
         <form class='needs-validation' novalidate>
           <div class='mb-3'>
             <!-- v-models store the value of the input, in the data  -->
             <input type='text' class='form-control' v-model="petName" id='address' placeholder='Pet name...' required>
             <div class='invalid-feedback'>
               Please enter your shipping address.
             </div>
           </div>
           <div class='mb-3'>
             <input type='text' class='form-control' v-model="petType" id='address' placeholder='Pet type...' required>
             <div class='invalid-feedback'>
               Please enter your shipping address.
             </div>
           </div>
           <div class='mb-3'>
             <input type='text' class='form-control' v-model="petAge" id='address2' placeholder='Pets age...'>
           </div>
          <button type='button' class='btn btn-primary' v-on:click='addMethod'>Add</button>
         </form>
       </div>
     </div>
     <!-- row ENDS -->
    </div>
    <!-- Container Div ENDS -->
  </div>
  <!-- Hello Div ENDS -->
</template>

<script>
// 1. Importing the firebase module
import firebase from 'firebase'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDRo5-pZkaNUi896olMteozG271OPhHbP0',
  authDomain: 'student-demo-a.firebaseapp.com',
  databaseURL: 'https://student-demo-a.firebaseio.com',
  projectId: 'student-demo-a',
  storageBucket: 'student-demo-a.appspot.com',
  messagingSenderId: '283564645682',
  appId: '1:283564645682:web:15894b8f3347d18df10b2b'
}

// Initialize Firebase
var firebaseApp = firebase.initializeApp(firebaseConfig)
// Get the firebase database
var db = firebaseApp.firestore()

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'hello this',
      message: '',
      thing: false,
      catName: '****',
      allPets: false,
      petName: '',
      petType: '',
      petAge: ''
    }
  },
  // As soon as vue mounts or is ready...
  mounted () {
    var v = this
    // Making a call to firebase
    db.collection('pet-house').onSnapshot(function (pets) {
      // pets is the data response or collection - we use a forEach
      // loop to loop through and then list
      var arr = []
      // This is the loop below...
      pets.forEach(function (doc) {
        // eachDoc is a js object representing each document in the collection
        var eachDoc = doc.data()
        // Pushing each array item into the vue data property 'allPets'
        // above...
        console.log(doc.id)
        // This is adding the id to each doc object
        eachDoc.id = doc.id
        // Here we push each doc to the array above
        arr.push(eachDoc)
      })
      // this code runs after the loop/s have finished
      v.allPets = arr
    })
  },
  methods: {
    addMethod: function () {
      // We use v instead of this because of the this coming from Vue
      // we use v inside of a firebase context/function
      var v = this
      // Add a new document in collection pet-store
      db.collection('pet-house').doc().set({
        name: v.petName,
        type: v.petType,
        age: v.petAge
      })
        .then(function () {
          console.log('Document successfully written!')
        })
        .catch(function (error) {
          console.error('Error writing document: ', error)
        })
    }, // aMethod ENDS
    check: function () {
      console.log(this.petGender + this.petType + this.petName)
    },
    deleteClick: function (item) {
      // In here the item parameter represents all the item data (age, type, name, id)
      db.collection('pet-house').doc(item.id).delete().then(function () {
        console.log('Document successfully deleted!')
      }).catch(function (error) {
        console.error('Error removing document: ', error)
      })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='scss'>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
