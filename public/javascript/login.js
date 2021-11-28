//query select login and signup buttons
const loginBtn = document.querySelector('#login-form')
const signupBtn = document.querySelector('#signup-form')

//async function that will create a user and sign them in
async function signupFormHandler(event){
  event.preventDefault()
  //get username and password
  const username = document.querySelector('#username-signup').value.trim()
  const password = document.querySelector('#password-signup').value.trim()

  //if username and password make fetch call
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

    //if response ok then console.log and go to dashboard
    //else alert what went wrong
    if(response.ok){
      console.log('success')
      document.location.replace('/dashboard')
    }else{
      alert(response.statusText)
    }
  }
}

//async function that will log a user in
async function loginFormHandler (event){
  event.preventDefault()
 
  //get username and password
  const username = document.querySelector('#username-login').value.trim()
  const password = document.querySelector('#password-login').value.trim()

  //if username and password make fetch call
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

    //if response ok then console.log and go to homepage
    //else alert what went wrong
    if(response.ok){
      document.location.replace('/')
    }else{
      alert(response.statusText)
    }
  }
}

//eventlistener to login
loginBtn.addEventListener('submit', loginFormHandler)
//eventlistener to signup
signupBtn.addEventListener('submit', signupFormHandler)