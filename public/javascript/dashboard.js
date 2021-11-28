//query select delete button
const deleteBtn = document.querySelector('#delete-post')

//async function that will get the post id then delete it
async function deletePostHandler (event){
  event.preventDefault()

  //get the furtherest out parent element
  const thisPost = event.currentTarget.parentNode.parentNode
  //get the href link from anchor tag
  const hrefLink = thisPost.querySelector(`a`).href
  //split the hreflink and get the number at the end of it
  const breakdownHref = hrefLink.split('/').slice(-1)
  //then convert it to a int
  const postId =  parseInt(breakdownHref[0])
  
  //Delete request
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  
  //if response ok then reload the page else alert what went wrong
  if(response.ok){
    document.location.reload()
  } else {
    alert(response.statusText)
  }
}

//eventlistener for deleting a post
deleteBtn.addEventListener('click', deletePostHandler)