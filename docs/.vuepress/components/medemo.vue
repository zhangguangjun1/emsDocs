<template>
    <div class="">
        
        <h1>{{mytitle}}</h1>
        <h3>{{msg}}</h3>
        <button @click="click">click</button>
    </div>
</template>
<script>
export default {
    props:['mytitle'],
    data(){
        return{
            msg:'hellow'
        }
    },
    methods:{
        click(){
            alert('click')
            console.log(this.title);
        }
    },
}
</script>
<style  scoped>
    button{
        color:red
    }
</style>