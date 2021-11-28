const loginBtn = document.querySelector('#login-form')
const signupBtn = document.querySelector('#signup-form')

async function signupFormHandler(event){
  event.preventDefault()
  const username = document.querySelector('#username-signup').value.trim()
  const password = document.querySelector('#password-signup').value.trim()

  console.log(username, password)

  if( username && password){
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username, 
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(response.ok){
      console.log('success')
      document.location.replace('/dashboard')
    }else{
      alert(response.statusText)
    }
  }
}


async function loginFormHandler (event){
  event.preventDefault()
 
  const username = document.querySelector('#username-login').value.trim()
  const password = document.querySelector('#password-login').value.trim()

  if(username && password){
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({
        username, 
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(response.ok){
      document.location.replace('/')
    }else{
      alert(response.statusText)
    }
  }
}


loginBtn.addEventListener('submit', loginFormHandler)

signupBtn.addEventListener('submit', signupFormHandler)