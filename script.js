const posts = document.querySelector('.posts')
const submit = document.getElementById('submit')
const editSubmit = document.getElementById('submit-edit')
const deleteButton = document.getElementById('delete')

// Stores which item to edit/delete when the edit modal is up
let currentlyEditing = ''

function editModal (post) {
  // Sets the edit modal to have the data from the post clicked on
  $('#modal-edit').modal('open')
  const titleEdit = document.getElementById('title-edit')
  const bodyEdit = document.getElementById('body-edit')
  titleEdit.value = post.title
  bodyEdit.value = post.body

  currentlyEditing = post._id
}

function incrementLikes (post) {
    currentlyEditing = post._id
    let likes = post.likes
    likes+=1
  
    axios.put(`http://localhost:4000/posts/${currentlyEditing}`, {
        likes
    }).then((resp) => {
      addPosts(resp.data)
      $('#modal-edit').modal('close')
    })
}

function addPosts (postData) {
  // Adds all of the posts to the dom
  posts.innerHTML = ''
  postData.forEach(post => {
    if (!post.title) return

    const postNode = document.createElement('div')
    postNode.classList.add('post')

    const textNode = document.createElement('div')
    textNode.classList.add('text')
    postNode.appendChild(textNode)

    const userH = document.createElement('h4')
    userH.innerText = post.user
    textNode.appendChild(userH)

    const titleP = document.createElement('p')
    titleP.innerText = post.title
    textNode.appendChild(titleP)

    const bodyP = document.createElement('p')
    bodyP.innerText = post.body
    textNode.appendChild(bodyP)

    const likesCounter = document.createElement('p')
    likesCounter.value = post.likes
    likesCounter.innerText = post.likes
    textNode.appendChild(likesCounter)

    const likeButton = document.createElement('button')
    likeButton.innerText = "Like"
    likeButton.classList.add('btn')
    likeButton.classList.add('like-btn')
    postNode.appendChild(likeButton)

    likeButton.addEventListener('click', () => {incrementLikes(post)})
    textNode.addEventListener('click', () => { editModal(post) })

    posts.appendChild(postNode)
  })
}


axios.get('http://localhost:4000/posts').then(response => {
  // gets the initial data
  addPosts(response.data)
})

editSubmit.addEventListener('click', (e) => {
  // submits the put request to edit a post
    const title = document.getElementById('title-edit').value
    const body = document.getElementById('body-edit').value
  
    axios.put(`http://localhost:4000/posts/${currentlyEditing}`, {
    title,
    body
  }).then((resp) => {
    addPosts(resp.data)
    $('#modal-edit').modal('close')
  })
})

submit.addEventListener('click', (e) => {
  // submits the post request to create a new post
  const user = document.getElementById('user').value
  const title = document.getElementById('title').value
  const body = document.getElementById('body').value

  axios.post('http://localhost:4000/posts', {
    user,
    title,
    body
  }).then((resp) => {
    addPosts(resp.data)
    $('#modal-create').modal('close')
  })
})

deleteButton.addEventListener('click', (e) => {
  // deletes an image
  axios.delete(`http://localhost:4000/posts/${currentlyEditing}`).then((resp) => {
    addPosts(resp.data)
    $('#modal-edit').modal('close')
  })
})

// initializes modal package
$('.modal').modal()