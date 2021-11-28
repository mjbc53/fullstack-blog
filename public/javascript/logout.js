//query call logout button
const logoutBtn = document.querySelector('#logout')

//asynce function that will logout a user
async function logoutHandler() {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  //if response ok then return to homepage else alert what went wrong
  if(response.ok){
    document.location.replace('/')
  } else{
    alert(response.statusText)
  }
}

//eventlistner that will logout
logoutBtn.addEventListener('click', logoutHandler)