<template>
    <div>Register</div>

    <input type="text" v-model="email" name="email" placeholder="Email">
    <input type="password" v-model="password" name="password" placeholder="Password">
    <button @click="register">Register</button>
  </template>
  
  <script>
  import AuthService from '@/services/AuthService';
  export default {
    data() {
        return {
          email:'',
          password:''
            
        }
    },
    methods: {
     async register() {
      const response = await AuthService.register({
        email: this.email,
        password: this.password
      })
        console.log(response.data)
      },
    }
  }
  </script>
  
  
  <style scoped>
 
  </style>
  