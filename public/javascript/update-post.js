const submitPostBtn = document.querySelector('#submit-post-btn')

async function submitNewpostHandler (event) {
  event.preventDefault()

  const title = document.querySelector('#update-post-title')
    .value.trim() 

  const post_content = document.querySelector('#update-post-content')
    .value.trim() 

  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ]

    if(title && post_content){
      const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          post_content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if(response.ok){
        document.location.replace('/dashboard')
      }else{
        alert(response.statusText)
      }
    }
}

submitPostBtn.addEventListener('click', submitNewpostHandler)