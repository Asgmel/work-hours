export default (context) => {
  if (!localStorage.token) {
    return context.redirect('/')
  }
}
