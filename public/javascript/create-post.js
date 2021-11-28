//query select the new post button
const newPostBtn = document.querySelector('#new-post-btn')
//query select the submit new post button
const submitPostBtn = document.querySelector('#submit-post-btn')
//query  select now post form
const newPostForm = document.querySelector('#new-post-form')

//hide new post form
newPostForm.style.display = 'none'

//when new post button is clicked then show the new post form
function displayFormHandler(event){
  event.preventDefault()

  newPostForm.style.display = 'flex'
}

//async fetch call to create new post then reload the page
async function submitNewpostHandler (event) {
  event.preventDefault()

  //get title of new post
  const title = document.querySelector('#new-post-title')
    .value.trim() 

    //get new post content
  const post_content = document.querySelector('#new-post-content')
    .value.trim() 

    //if no title or no post content do not create new post
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
      
      //if response is ok then reload the page else alert what is wrong
      if(response.ok){
        document.location.reload()
      }else{
        alert(response.statusText)
      }
    }
}

//eventlistener to submit new post
submitPostBtn.addEventListener('click', submitNewpostHandler)
//eventlistener to display post form
newPostBtn.addEventListener('click', displayFormHandler)