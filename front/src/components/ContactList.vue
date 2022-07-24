
<template>
  <div class="list row">
    <div class="col-md-12">
      <h4>Contact List</h4>

      <table class="table table-striped">
        <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Nom</th>
      <th scope="col">Prénom</th>
      <th scope="col">Téléphone</th>
      <th scope="col">Email</th>
    </tr>
  </thead>
  <tbody>
    <tr :class="{ active: index == currentIndex }"
          v-for="(contact, index) in $store.state.contacts"
          :key="index">
      <th scope="row"><input type="checkbox" 
                    :id="`${contact.id}`" 
                    class="form-check-input"
                    :value="`${contact.id}`" 
                    v-model="checkedContact"></th>
      <td>{{ contact.name }}</td>
      <td>{{ contact.firstname }}</td>
      <td>{{ contact.phone_number }}</td>
      <td>{{ contact.email }}</td>
    </tr>
  </tbody>
</table>
      <button class="m-3 btn btn-sm btn-danger" @click="removeMultipleContact">
        Remove
      </button>
    </div>
  </div>
</template>
<script>

export default {
  name: "contact-list",
  data() {
    return {
      checkedContact:[],
      contacts: [],
      currentContact: null,
      currentIndex: -1,
      name: ""
    };
  },
  methods: {
    refreshList() {
      this.retrieveAllContact();
      this.currentContact = null;
      this.currentIndex = -1;
    }, 
    setActiveContact(contact, index) {
      this.currentContact = contact;
      this.currentIndex = contact ? index : -1;
    },
    removeMultipleContact() {
        this. $store.dispatch('removContact', this.checkedContact)
    }
  },
  mounted() {
   this. $store.dispatch('fetchContact')
  }
};
</script>
<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>