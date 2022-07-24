<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col">
          <ContactList/>
        </div>
        <div class="col">
          <ContactForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ContactList from './components/ContactList.vue';
import ContactForm from './components/ContactForm.vue'; 

export default {
    name: "App",
    components: { ContactList, ContactForm }
}
</script>

<style>

</style>
