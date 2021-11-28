const newPostBtn = document.querySelector('#new-post-btn')

const submitPostBtn = document.querySelector('#submit-post-btn')

const newPostForm = document.querySelector('#new-post-form')

newPostForm.style.display = 'none'

function displayFormHandler(event){
  event.preventDefault()

  newPostForm.style.display = 'flex'
}

async function submitNewpostHandler (event) {
  event.preventDefault()

  const title = document.querySelector('#new-post-title')
    .value.trim() 

  const post_content = document.querySelector('#new-post-content')
    .value.trim() 

    if(title && post_content){
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          post_content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      if(response.ok){
        document.location.reload()
      }else{
        alert(response.statusText)
      }
    }
}

submitPostBtn.addEventListener('click', submitNewpostHandler)

newPostBtn.addEventListener('click', displayFormHandler)