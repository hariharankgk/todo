<template>
  <div class="td--home">
    <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet">
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
            <span class="delall" @click="removeAll">Delete All</span>
          </p>
          <ul class="list">
            <li v-for="(x, index) in tdlist" :key="index" class="flex justify-between">
              <span class="w-90">{{x}}</span> <span class="delone" @click="removeTodo(index)">x</span>
            </li>
          </ul>
        </div>
        <div v-else class="empty">
          <p>{ No Todo Found....! }</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() { 
    return {
      tdata:''
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
  .td--home{
    padding-top: 30px;
    min-height: 100vh;
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
