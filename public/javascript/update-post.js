//query select the submit new post button
const submitPostBtn = document.querySelector('#submit-post-btn')

//async fetch call to create new post then reload the page
async function submitNewpostHandler (event) {
  event.preventDefault()
  //get updated title
  const title = document.querySelector('#update-post-title')
    .value.trim() 
  //get updated post content
  const post_content = document.querySelector('#update-post-content')
    .value.trim() 

  //get post id from the query params
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ]

  //if no title or no post content do not update post
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
    
     //if response is ok then go to dashboard the page else alert what is wrong
    if(response.ok){
      document.location.replace('/dashboard')
    }else{
      alert(response.statusText)
    }
  }
}

//eventlistener for updating a new post
submitPostBtn.addEventListener('click', submitNewpostHandler)