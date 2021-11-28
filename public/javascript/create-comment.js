//query select new comment button
const newCommentBtn = document.querySelector('#new-comment-btn')
//query select new comment form
const newCommentForm = document.querySelector('#new-comment-form')
//query select submit for button
const submitFromBtn = document.querySelector('#new-comment-submit')

//hide form
newCommentForm.style.display = 'none'

//on click of new comment button show the comment form
function displayFormHandler (event){
  event.preventDefault()

  newCommentForm.style.display = 'flex'
}

//async fetch call to create new comment then reload the page
async function submitNewCommentHandler (event){
  event.preventDefault()

  //get the comment content
  const comment_content = document.querySelector(`#comment-content`)
  .value.trim()
  
  //get the post id from the website link
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ]

  //if there is no comment content do nothing if there is create the new comment
  if(comment_content){
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    //if the comment is okay then reload the page other wise alert what is wrong
    if(response.ok){
      document.location.reload()
    } else {
      alert(response.statusText)
    }
  }
  

}

//eventlistener for the new comment button
newCommentBtn.addEventListener('click', displayFormHandler)

//eventlistener for the submit form button
submitFromBtn.addEventListener('click', submitNewCommentHandler)


