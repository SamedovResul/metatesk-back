const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.getElementById('submit');
const login = document.querySelector('.login-component')
const studentComponent = document.querySelector('.student-component')
// const th = document.querySelectorAll('.th')


submit.addEventListener("click", function(e) {
  e.preventDefault()
  
  console.log( login)
  
  const data = {
    password:password.value,
    email:email.value
  }

  const url='/admin/signIn';
  if(data.email && data.password){
    console.log()
    axios({
      method:'post',
      url:url,
      data
    }).then((response) =>{
      if(response.data){
        // login.remove()
        axios({
          method:'get',
          url:'/student',
           headers: {"Authorization" : `Bearer ${response.data}`}
        }).then((res) =>{
          // window.location.href = '/student'
          console.log(res.data)
          
        }).catch(err=> console.log(err))
      }
      console.log(response.data)
    }).catch(err=> console.log(err))
  }
    

} )

