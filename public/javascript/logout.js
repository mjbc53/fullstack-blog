const logoutBtn = document.querySelector('#logout')

async function logoutHandler() {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if(response.ok){
    document.location.replace('/')
  } else{
    alert(response.statusText)
  }
}

logoutBtn.addEventListener('click', logoutHandler)