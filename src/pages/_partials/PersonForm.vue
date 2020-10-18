<template>
  <modal
    name="PersonForm"
    height="auto"
    width="80%"
    :maxWidth="680"
    :adaptive="true"
  >
    <div class="card" style="margin-bottom: 0px">
      <div class="card-header">
        <h3 class="card-title text-white">
          {{ this.update ? "Update Person" : "New Person" }}
        </h3>
      </div>
      <!-- /.card-header -->
      <!-- form start -->
      <form class="form-horizontal" @submit.prevent="">
        <div class="card-body">
          <div :class="['form-group row', { 'has-error': errors.name }]">
            <label for="name" class="col-sm-2 col-form-label">Name</label>
            <div class="col-sm-10">
              <div v-if="errors.name">{{ errors.name[0] }}</div>
              <input
                required
                v-model="user.name"
                type="text"
                class="form-control"
                id="name"
                placeholder="Name"
              />
            </div>
          </div>

          <div :class="['form-group row', { 'has-error': errors.city }]">
            <label for="city" class="col-sm-2 col-form-label">City</label>
            <div class="col-sm-10">
              <div v-if="errors.city">{{ errors.city[0] }}</div>
              <input
                v-model="user.city"
                type="text"
                class="form-control"
                id="city"
                placeholder="City"
              />
            </div>
          </div>
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <button @click="$modal.hide('PersonForm')" class="btn btn-danger">
            Cancel
          </button>
          <input v-if="checkName"
            @click.prevent="onSubmit()"
            type="submit"
            class="btn btn-info float-right"
            value="Send"
          />
        </div>
        <!-- /.card-footer -->
      </form>
    </div>
  </modal>
</template>
<script>
import axios from "axios";
export default {
  props: {
    update: {
      require: false,
      type: Boolean,
      default: false,
    },
    user: {
      require: false,
      type: Object,
    },
  },
  data() {
    return {
      errors: {},
    };
  },
  methods: {
    onSubmit() {
      let action = this.update ? "updateUser" : "storeUser";

      this.$store
        .dispatch(action, this.user)
        .then(() => {
          this.$snotify.success("Success");
          this.$emit("success");
        })
        .catch((error) => {
          this.errors = error.errors;
        });
    },
  },

  computed: {
    checkName() {
      if (this.user.name !== "") return true;
      return false;
    },
  },
};
</script>
<style scoped>
</style>