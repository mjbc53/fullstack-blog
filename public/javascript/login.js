const loginBtn = document.querySelector('#login-btn')
const signupBtn = document.querySelector('#signup-btn')

async function signupFormHandler (event){
  event.preventDefault()
  const username = document.querySelector('#username-signup')
  const password = document.querySelector('#password-signup')

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
    }else{
      alert(response.statusText)
    }
  }else{
    alert('Something was enter incorrectly')
  }
}


async function loginFormHandler (event){
  event.preventDefault()
 
  const username = document.querySelector('#username-login')
  const password = document.querySelector('#password-login')

  if( username && password){
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
  }else{
    alert('Something was enter incorrectly')
  }
}


loginBtn.addEventListener('click', loginFormHandler)

signupBtn.addEventListener('click', signupFormHandler)