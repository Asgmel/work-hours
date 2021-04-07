<template>
  <div>
    <ModalFormController
      v-if="getAddHour"
      headline="Add Hour"
      :get-modal="getAddHour"
      @set-modal="setData('Hour', ...arguments)"
      @submit="submitData('hourForm', ...arguments)"
      @reset="resetData('hourForm')"
    >
      <FormAddHour ref="hourForm" />
    </ModalFormController>
    <ModalFormController
      v-if="getAddProject"
      headline="Add Project"
      :get-modal="getAddProject"
      @set-modal="setData('Project', ...arguments)"
      @submit="submitData('projectForm', ...arguments)"
      @reset="resetData('projectForm')"
    >
      <FormAddProject ref="projectForm" />
    </ModalFormController>
    <ModalFormController
      v-if="getAddDepartment"
      headline="Add Department"
      :get-modal="getAddDepartment"
      @set-modal="setData('Department', ...arguments)"
      @submit="submitData('departmentForm', ...arguments)"
      @reset="resetData('departmentForm')"
    >
      <FormAddDepartment ref="departmentForm" />
    </ModalFormController>

    <ModalWarning v-if="getWarningState" />
  </div>
</template>

<script>
export default {
  computed: {
    getAddHour() {
      return this.$store.getters['modals/getAddHour']
    },
    getAddProject() {
      return this.$store.getters['modals/getAddProject']
    },
    getAddDepartment() {
      return this.$store.getters['modals/getAddDepartment']
    },
    getWarningState() {
      return this.$store.getters['modals/getWarningState']
    },
  },
  methods: {
    setData(name, v) {
      this.$store.dispatch(`modals/setAdd${name}`, v)
    },
    submitData(ref, keepOpen) {
      this.$refs[ref].submit(keepOpen)
    },
    resetData(ref) {
      this.$refs[ref].resetValidation()
    },
  },
}
</script>
