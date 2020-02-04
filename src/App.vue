<template>
  <div class="td--home">
    <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet">
    <div class="nameHeader">
      <h3 @click="editName = true"><span class="cursor">{{uName ? uName : 'Hari\'s'}}</span> - TODO</h3>
    </div>
    <div class="box">
        <div class="box-header flex justify-between">
          <input type="text" class="input" v-model="tdata" placeholder="Type here....">
          <button @click="addTotdo" class="addBtn">+</button>
        </div>
    </div>
    <br/>
    <div class="box">
      <div class="box-body">
        <div v-if="tdlist.length > 0">
          <p class="flex justify-between lhead">
            <span>Total : {{tdlist.length}}</span>
            <span class="delall cursor" @click="removeAll">Delete All</span>
          </p>
          <ul class="list">
            <li v-for="(x, index) in tdlist" :key="index" class="flex justify-between">
              <span class="w-90">{{x}}</span> <span class="delone cursor" @click="removeTodo(index)">x</span>
            </li>
          </ul>
        </div>
        <div v-else class="empty">
          <p>{ No Todo Found....! }</p>
        </div>
      </div>
    </div>
    <div class="footer-pop" v-if="editName">
      <div class="flex justify-between">
        <input type="text" v-model="uName" class="input" placeholder="Enter your name">
        <button @click="savename" class="saveBtn">Save</button>
      </div>
      <p class="flex justify-between">
        <span>* Click the name for change in future.</span>
        <span @click="editName = false" class="cursor">x</span>
      </p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() { 
    return {
      tdata:'',
      uName: '',
      editName:false
    }
  },
  created() {
    this.uName = window.localStorage.getItem('todooName') || '';
    if(this.uName != ''){
      this.editName = false;
    } else {
      this.editName = true;
    }
  },
  computed: {
    tdlist () {
      return this.$store.getters.todos
    }
  },
  methods: {
    addTotdo(){
      if(this.tdata != ''){
        this.$store.dispatch('saveTodo', this.tdata);
        window.localStorage.setItem("todoo",JSON.stringify(this.$store.getters.todos));
        this.tdata = '';
      } else {
        alert('Please type a valid todo.');
      }
    },
    removeTodo(td){
      this.$store.dispatch('clearTodo', td);
      window.localStorage.setItem("todoo",JSON.stringify(this.$store.getters.todos));
    },
    removeAll(){
      if(!confirm('Are you sure...?')) return
      this.$store.dispatch('clearTodoAll');
      window.localStorage.setItem("todoo",JSON.stringify(this.$store.getters.todos));
    },
    savename(){
      if(this.uName != '' && this.uName.length < 9){
        window.localStorage.setItem("todooName", this.uName);
        this.editName = false;
      } else {
        alert('Max 8 chars & No empty values.');
      }
    }
  }
}

</script>


<style>
  *, body {
    font-family: 'Poppins', sans-serif;
  }
  body {
    margin:0;
    padding:0;
  }
  .cursor {
    cursor:pointer;
  }
  .td--home{
    padding-top: 30px;
    min-height: 100vh;
    margin:auto;
  }
  .footer-pop {
    position: fixed;
    bottom:0;
    left:0;
    right:0;
    padding:10px;
    padding-bottom:0;
    background-color: #00B8D9;
    margin:auto;
  }
  .footer-pop p{
    margin:0;
    font-size:10px;
    padding-top: 5px;
    color: #fff9;
  }
  .nameHeader {
    text-align:center;
  }
  .nameHeader h3 {
    margin:0;
    margin-bottom:30px;
    color: #36B37E;
  }
  @media only screen and (min-width: 768px){
    .td--home{
      width:50%;
    }
    .footer-pop {
      width:50%;
    }
  }
  @media only screen and (min-width: 1024px){
    .td--home{
      width:40%;
    }
    .footer-pop {
      width:40%;
    }
  }
  @media only screen and (min-width: 1440px){
    .td--home{
      width:30%;
    }
    .footer-pop {
      width:30%;
    }
  }
  .justify-between {
    justify-content:space-between;
  }
  .flex{
    display:flex;
  }
  .w-90 {
    width:90%;
  }
  .input {
      border:none;
      border-bottom: none;
      width: 90%;
      background-color: #0052CC;
      color:#fff;
  }
  .input:focus {
    border:none;
    outline:0;
  } 
  .input::placeholder {
    color:#fff;
  }
  .footer-pop .input{
    background-color: #00B8D9;
    border-bottom:1px solid #fff;
  }
  .empty {
    text-align: center;
  }
  .empty p {
    color: rgba(255,255,255,0.3);
    font-weight: bold;
    margin: 0;
    padding: 20px;
  }
  .addBtn {
    margin-left: 10px;
    background: none;
    font-size: 22px;
    border: none;
    border-radius: 50%;
    line-height: 1;
    background-color: #fff;
    color: #0747A6;
  }
  .saveBtn {
    margin-left: 10px;
    background: none;
    border: none;
    line-height: 1;
    background-color: #fff;
    color: #0747A6;
  }
  .box {
    width: 90%;
    margin: auto;
    border-radius: 5px;
    -webkit-box-shadow: 0 0 8px #818688;
    box-shadow: 0 0 8px #818688;
    background-color: #fff;
  }
  .box .box-header{
    padding:10px 15px;
    background-color: #0052CC;
    border-radius: 5px;
  }
  .box .box-body{
    padding:0;
    padding-bottom:5px;
    border-radius: 5px;
    color:#fff;
    background-color: #2684FF;
  }
  .box .box-footer{
    padding:10px 15px;
  }
  .list {
    margin:0;
    padding:0;
    list-style-type: none;
  }
  .list li{
    padding-bottom:5px;
    border-bottom: 1px solid #ffffff4f;
    padding: 5px 15px;
    align-items: center;
  }
  .lhead {
    margin:0;
    padding: 10px 15px;
  }
  .lhead .delall{
    font-size:10px;
    color:#fff;
    opacity:.6;
    cursor:pointer;
  }
  .delone {
    font-size:12px;
    color:#fff;
    opacity:.6;
    cursor:pointer;
  }
  
</style>
