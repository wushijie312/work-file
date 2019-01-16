<template>
    <div>
        <div>
            welcome user

        </div>
    </div>
</template>



<script>

    export default{
        data(){
            return{
                data:'page1'
            }
        },
        computed:{
            reversedMessage: function () {
                return this.data.split('').reverse().join('')
            }

        }
    }

    </script>