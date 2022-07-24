<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="name">Name *</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="contact.name"
          name="name"
        /> 
      </div> 
      <div class="form-group">
        <label for="firstname">First Name *</label>
        <input
          type="text"
          class="form-control"
          id="firstname"
          required
          v-model="contact.firstname"
          name="firstname"
        /> 
      </div> 
      <div class="form-group">
        <label for="phone_number">Phone Number *</label>
        <input
          type="text"
          class="form-control"
          id="phone_number"
          required
          v-model="contact.phone_number"
          name="phone_number"
        />
        
      </div> 
      <div class="form-group">
        <label for="email">Email *</label>
        <input
          type="text"
          placeholder="john@gmail.com"
          class="form-control"
          id="email"
          required
          v-model="contact.email"
          name="email"
        /> 
      </div> 
      <button @click="saveContact" class="btn btn-success">Submit</button>
    </div> 
  </div>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required , email} from '@vuelidate/validators'

export default {
  name: "add-contact",
  data() {
    return {
      v$: useValidate(),
      contact: {
        name: "",
        firstname: "",
        phone_number: "",
        email: ""
      }
    };
  },
  methods: {
    saveContact() {
      this.v$.$validate()
      if (!this.v$.$error) { 

        var data = {
          name: this.contact.name,
          firstname: this.contact.firstname,
          phone_number: this.contact.phone_number,
          email: this.contact.email,
        };
        console.log(data);
        this.$store.dispatch('addConstact', data)
        this.contact = {};
      }else{
        console.log("none");
      }
      
    }
  },
  validations() {
    return {
      contact: {
        name: { required },
        firstname: { required },
        phone_number: { required },
        email: { required, email },
      }
    }
  }
};
</script>
<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>