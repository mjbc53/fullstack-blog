const deleteBtn = document.querySelector('#delete-post')
const updateBtn = document.querySelector('#update-post')


async function deletePostHandler (event){
  event.preventDefault()

  const thisPost = event.currentTarget.parentNode.parentNode
  const hrefLink = thisPost.querySelector(`a`).href
  const breakdownHref = hrefLink.split('/').slice(-1)
  const postId =  parseInt(breakdownHref[0])
  
  const response = await fetch(`/api/posts/${postId}`, {
    method: 'DELETE',
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

async function updatePostHandler (event) {
  event.preventDefault()

  
}

deleteBtn.addEventListener('click', deletePostHandler)