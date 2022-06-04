<template>
  <div class="container">
      <div class="row">
          <div class="col text-start">

            <h2>Listado de libros</h2>
            <button class="btn btn-primary m-2" @click="this.$router.push({name:'AddBook'})">Añadir</button>

              <div class="col-md-12">
                    <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">TITULO</th>
                        <th scope="col">DESCRIPCION</th>
                        <th scope="col">ACCIÓN</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in books" :key="item.id">
                            <th scope="row">{{item.id}}</th>
                            <td>{{item.title}}</td>
                            <td>{{item.description}}</td>
                            <td>
                                <div>
                                    <button class="btn btn-primary mx-2" 
                                     @click="this.$router.push({name:'Edit-book',params:{bookId:item.id}})">Editar</button>
                                    <button class="btn btn-danger mx-2"
                                    @click="this.deleteBook(item.id)">Eliminar</button>
                                </div>
                            </td>
                        </tr>
                        
                        
                    </tbody>
                    </table>
                  
              </div>
          </div>
      </div>
  </div>
</template>

<script>
//import axios from 'axios'
import DjangoApi from '../../api/DjangoApi'
import Swal from 'sweetalert2'
export default {
data(){
    return {
        fields:[
            {key:'title',label:'Titulo'},
            {Key:'description',label:'Descripcion'},
            {key:'action',label:'Acción'}
        ],
        books:[],
    }
},
methods:{
    async getBooks(){
        const {data}=await DjangoApi.get(`/api/v1.0/books/`)
        this.books=data
    },
    async deleteBook(id){

         const {isConfirmed}= await Swal.fire({
                title:'¿Está seguro?',
                text:'Una vez borrado no se puede recuperar',
                showDenyButton:true,
                confirmButtonText:'Sí,estoy seguro'
            })
            //Evaluamos que haya marcado si estoy seguro
            if(isConfirmed){
                new Swal({
                    title:'Espere por favor',
                    allowOutsideClick:false
                })
                Swal.showLoading()

                await DjangoApi.delete(`/api/v1.0/books/${id}/`)
                //Redirecccionare al usuario fuera de aqui
                this.getBooks()   
                // entry
                Swal.fire('Eliminado','','success')
            }  
    }
},
created(){
    this.getBooks()
}

}
</script>

<style>

</style>