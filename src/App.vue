<template>
  <div class="td--home">
    <link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet">
    <div class="nameHeader">
      <h3 @click="editName = true"><span class="cursor">{{uName ? uName : 'Hari\'s'}}</span> - TODO</h3>
    </div>
    <div class="box">
        <div class="box-header flex justify-between">
          <input type="text" class="input" @keyup.enter="addTotdo" v-model="tdata" placeholder="Type here...." v-focus>
          <button @click="addTotdo" class="cursor addBtn">+</button>
        </div>
    </div>
    <br/>
     <div class="flex filters" v-if="todoItems.length > 0">
      <span class="cursor" :class="{'active' : tdfilter == -1}" @click="tdfilter = -1">All</span>
      <span class="cursor" :class="{'active' : tdfilter == 0}" @click="tdfilter = 0">Pending</span>
      <span class="cursor" :class="{'active' : tdfilter == 1}" @click="tdfilter = 1">Completed</span>
    </div>
    <div class="box">
      <div class="box-body">
        <div v-if="tdlist.length > 0">
          <p class="flex justify-between lhead">
            <span>Total : {{tdlist.length}}</span>
            <span class="delall cursor" @click="removeAll">Delete All</span>
          </p>
          <ul class="list">
            <li v-for="(x) in tdlist" :key="x.key" class="flex justify-between" :class="{'completed' : x.done}">
              <span><input type="checkbox" :checked="x.done" @change="toggleTodo(x)" class="check cursor"><span class="check-custom cursor"></span></span>
              <span class="w-90">{{x.value}}</span> 
              <span class="delone cursor" @click="removeTodo(x.value)">x</span>
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
      tdfilter: -1,
      todoItems: JSON.parse(window.localStorage.getItem('todoo') || '[]'),
      editName:false
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
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
    tdlist() {
      const todos = this.todoItems;
      if(this.tdfilter >= 0){
        let dval = this.tdfilter == 1 ? true : false;
        return todos.filter(x => x.done === dval);
      } else {
        return this.todoItems;
      }
    }
  },
  methods: {
    addTotdo(){
      if(this.tdata != ''){
        // this.$store.dispatch('saveTodo', this.tdata);
        this.todoItems.push({'value':this.tdata, 'done': false, 'key':Math.floor(Math.random() * 10000)});
        this.setlocal();
        this.tdata = '';
        this.tdfilter = 0;
      } else {
        alert('Please type a valid todo.');
      }
    },
    removeTodo(td){
      // this.$store.dispatch('clearTodo', td);
      const rval = this.todoItems.indexOf(td);
      this.todoItems.splice(rval, 1);
      this.setlocal();
    },
    removeAll(){
      const self = this; 
      if(!confirm('Are you sure...?')) return false;
      // this.$store.dispatch('clearTodoAll');
      console.log(self.todoItems);
      if(self.tdfilter >= 0){
        let dval = this.tdfilter == 1 ? true : false;
        // console.log(self.todoItems.findIndex(v => v.done === dval));
        self.todoItems.splice(self.todoItems.findIndex(v => v.done === dval), 1);
      } else {
        this.todoItems = [];
      }
      this.setlocal();
    },
    toggleTodo(item){
      const index = this.todoItems.indexOf(item);
      const td = {'value' : item.value, 'done': !item.done};
      this.todoItems.splice(index, 1, td); 
      this.setlocal();
      this.tdlist;
    },
    savename(){
      if(this.uName != '' && this.uName.length < 9){
        window.localStorage.setItem("todooName", this.uName);
        this.editName = false;
      } else {
        alert('Max 8 chars & No empty values.');
      }
    },
    setlocal(){
      window.localStorage.setItem("todoo",JSON.stringify(this.todoItems));
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
    min-height: calc(100vh - 30px);
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
  .addBtn:focus {
    border:none;
    outline:0;
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
    position: relative;
  }
  .list li.completed{
    opacity:0.6;
  }
  .list li.completed span.w-90{
    text-decoration: line-through;
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
  .filters {
    padding:0px 15px 10px;
    width:90%;
    margin:auto;
  }
  .filters span {
    font-size:12px;
    margin-right:10px;
  }
  .filters span.active {
    background-color: #0052cc;
    color: #fff;
    padding: 0px 10px;
    border-radius: 20px;
  }
  /* Custom Radio */
  .check {
    position: absolute;
    opacity: 0;
    left: 6px;
    top: 10px;
    z-index: 1;
  }
  .check-custom {
    position: absolute;
    top: 10px;
    left: 6px;
    height: 12px;
    width: 12px;
    background-color: transparent;
    border-radius: 50%;
    border: 2px solid #fff;
  }
  .check-custom::after {
    position: absolute;
    content: "";
    left: 10px;
    top: 10px;
    height: 0px;
    width: 0px;
    border-radius: 50%;
    border: solid #009BFF;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(0deg) scale(0);
    -ms-transform: rotate(0deg) scale(0);
    transform: rotate(0deg) scale(0);
    opacity:1;
  }
  input.check:checked ~ .check-custom {
    background-color: #FFFFFF;
    border-radius: 50%;
    -webkit-transform: rotate(0deg) scale(1);
    -ms-transform: rotate(0deg) scale(1);
    transform: rotate(0deg) scale(1);
    opacity:1;
    border: 2px solid #FFFFFF;
  }
  input.check:checked ~ .check-custom::after {
    -webkit-transform: rotate(45deg) scale(1);
    -ms-transform: rotate(45deg) scale(1);
    transform: rotate(45deg) scale(1);
    opacity:1;
    left: 4px;
    top: 0;
    width: 3px;
    height: 8px;
    border: solid #009BFF;
    border-width: 0 2px 2px 0;
    background-color: transparent;
    border-radius: 0;
  }
  
</style>
