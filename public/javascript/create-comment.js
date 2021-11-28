const newCommentBtn = document.querySelector('#new-comment-btn')

const newCommentForm = document.querySelector('#new-comment-form')

const submitFromBtn = document.querySelector('#new-comment-submit')

newCommentForm.style.display = 'none'

function displayFormHandler (event){
  event.preventDefault()

  newCommentForm.style.display = 'flex'
}


async function submitNewCommentHandler (event){
  event.preventDefault()

  const comment_content = document.querySelector(`#comment-content`)
  .value.trim()
  
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ]

  if(comment_content){
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if(response.ok){
      document.location.reload()
    } else {
      alert(response.statusText)
    }
  }
  

}







newCommentBtn.addEventListener('click', displayFormHandler)

submitFromBtn.addEventListener('click', submitNewCommentHandler)


