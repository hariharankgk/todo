<template>
  <div class="td--home">
    <div class="box">
        <div class="box-header flex">
          <input type="text" class="input" v-model="tdata" placeholder="type here....">
          <button @click="addTotdo">Add</button>
        </div>
        <div class="box-body">
          <ul v-if="tdlist.length > 0">
            <li v-for="(x, index) in tdlist" :key="index">{{x}} <span @click="removeTodo(index)">x</span></li>
          </ul>
          <ul v-else>
            <li>No todo find..</li>
          </ul>
          <p>{{tdata}}</p>
        </div>
        <div class="box-footer"></div>
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
      } else {
        alert('Please type a valid todo.');
      }
    },
    removeTodo(td){
      this.$store.dispatch('clearTodo', td);
      window.localStorage.setItem("todoo",JSON.stringify(this.$store.getters.todos));
    }
  }
}

</script>


<style>
  .td--home{
    margin-top:30px;    
  }
  .flex{
    display:flex;
    justify-content: space-between;
  }
  .box {
    width:90%;
    margin:auto;
    border-radius:10px;
    box-shadow: 0 0 20px #efefef;
  }
  .box .box-header{
    padding:10px 15px;
  }
  .box .box-body{
    padding:10px 15px;
  }
  .box .box-footer{
    padding:10px 15px;
  }
  
</style>
