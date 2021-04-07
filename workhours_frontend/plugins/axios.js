export default function ({ $axios }) {
  $axios.onRequest((config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
    }
  })

  $axios.onError((error) => {
    if (error.response.status === 401) {
      localStorage.removeItem('token')
    }
  })
}
