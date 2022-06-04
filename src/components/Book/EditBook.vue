<template>
  <div class="container">
      <div class="row">
          <div class="col text-start">
              <h2>Editar Libro</h2>
          </div>
      </div>
      <div class="row">
          <div class="col">
              <div class="card">
                  <div class="card-bodu">
                      <form @submit="onSumbit">

                          <div class="form-group row m-3">
                              <label for="title" class="col-sm-2 col-form-label">Titulo</label>
                              <div class="col-sm-6">
                                  <input type="text" placeholder="Titulo" name="title" class="form-control" v-model.trim="form.title">
                              </div>
                          </div>
                          <div class="form-group row m-3">
                              <label for="description" class="col-sm-2 col-form-label">Descripcion</label>
                              <div class="col-sm-6">
                                  <textarea name="description" class="form-control" placeholder="Descripción" rows="3" v-model.trim="form.description"></textarea>
                              </div>
                          </div>
                          <div class="form-group row ">
                              <div class="col-sm-8 text-start">
                                    <button type="submit" class="btn btn-primary col-sm-3 m-2">Editar</button>
                                    <button type="button" class="btn btn-secondary col-sm-3 m-2" 
                                    @click="$router.push({name:'ListBook'})">Cancelar</button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import DjangoApi from '../../api/DjangoApi'
import Swal from 'sweetalert2'
export default {
    data(){
        return{
            bookId: this.$route.params.bookId,
            form:{
                title:'',
                description:'',
            }
        }
    },
    methods:{
        async onSumbit(evt){
            evt.preventDefault()
            const {data}=await DjangoApi.put(`/api/v1.0/books/${this.bookId}/`,this.form)
            console.log('Correctamente actualizado:', data)
            //alert('Correctamente actualizado')
            Swal.fire({
            icon: 'success',
            title: 'Libro actualizado exitosamente',
            })
        },
        async getBook(){
            const {data}=await DjangoApi.get(`/api/v1.0/books/${this.bookId}/`)
            this.form.title=data.title
            this.form.description=data.description
            console.log('data:', data)


        }
    },
    created(){
        this.getBook()
    }
}
</script>

<style>

</style>