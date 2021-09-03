const posts = document.querySelector('.posts')
const users = document.querySelector('.users')

const submit = document.getElementById('submit')
const editSubmit = document.getElementById('submit-edit')
const deleteButton = document.getElementById('delete')

const newAccount = document.getElementById('submit-new-account')
const login = document.getElementById('submit-login')
const commentSubmit = document.getElementById('submit-comment')

// Stores which item to edit/delete when the edit modal is up
let currentUser = null
let currentlyEditing = ''
let currentComments = []

function editModal (post) {
  // Sets the edit modal to have the data from the post clicked on
  $('#modal-edit').modal('open')
  const titleEdit = document.getElementById('title-edit')
  const bodyEdit = document.getElementById('body-edit')
  titleEdit.value = post.title
  bodyEdit.value = post.body

  currentlyEditing = post._id
}

function commentModal (post) {
    // Sets the comment modal to have the data from the post clicked on
    $('#modal-comment').modal('open')
    currentlyEditing = post._id
    currentComments = post.comments
}
  
function incrementLikes (post) {
    currentlyEditing = post._id
    let likes = post.likes
    likes+=1
    axios.put(`http://localhost:4000/posts/${currentlyEditing}`, {
        likes
    })
}

function showPosts (postData) {
  // Adds all of the posts to the dom
  posts.innerHTML = `<h2>Posts</h2>`
  postData.forEach(post => {
    if (!post.title) return

    const postNode = document.createElement('div')
    postNode.classList.add('post')

    const textNode = document.createElement('div')
    textNode.classList.add('text')
    postNode.appendChild(textNode)

    const userH = document.createElement('h4')
    userH.innerText = post.username
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

    const commentButton = document.createElement('button')
    commentButton.innerText = "Comment"
    commentButton.classList.add('btn')
    commentButton.classList.add('comment-btn')
    postNode.appendChild(commentButton)

    const commentSection = document.createElement('div')
    commentSection.classList.add('comment-section')
    postNode.appendChild(commentSection)

    let commentList = post.comments
    for(c of commentList){
        const commentP = document.createElement('p')
        commentP.innerText = c
        commentP.classList.add('comment')
        commentSection.appendChild(commentP)
    }

    likeButton.addEventListener('click', () => {incrementLikes(post)})
    commentButton.addEventListener('click', () => {commentModal(post)})
    textNode.addEventListener('click', () => { editModal(post) })

    posts.appendChild(postNode)
  })
}

function showUsers (userData) {
  // Adds all of the users to the dom
  users.innerHTML = `<h2>Users</h2>`
  userData.forEach(user => {
    if (!user.username) return

    const userNode = document.createElement('div')
    userNode.classList.add('user')

    const usernameH = document.createElement('h4')
    usernameH.innerText = user.username
    userNode.appendChild(usernameH)

    const emailP = document.createElement('p')
    emailP.innerText = user.email
    userNode.appendChild(emailP)

    users.appendChild(userNode)
  })
}

axios.get('http://localhost:4000/posts').then(response => {
  // gets the initial data
  showPosts(response.data)
})

axios.get('http://localhost:4000/users').then(response => {
  // gets the initial data
  showUsers(response.data)
})

editSubmit.addEventListener('click', (e) => {
  // submits the put request to edit a post
    const title = document.getElementById('title-edit').value
    const body = document.getElementById('body-edit').value
  
    axios.put(`http://localhost:4000/posts/${currentlyEditing}`, {
    title,
    body
  }).then(() => {
    $('#modal-edit').modal('close')
  })
})

commentSubmit.addEventListener('click', (e) => {
    // submits the put request to edit a post
    let comments = currentComments
    const newComment = document.getElementById('comment-add').value
    comments.push(newComment)

    axios.put(`http://localhost:4000/posts/${currentlyEditing}`, {
      comments
    }).then(() => {
      $('#modal-comment').modal('close')
    })
  })
  
submit.addEventListener('click', (e) => {
  // submits the post request to create a new post
  const username = currentUser.username
  console
  const title = document.getElementById('title').value
  const body = document.getElementById('body').value

  axios.post('http://localhost:4000/posts', {
    username,
    title,
    body
}).then(() => {
    $('#modal-create').modal('close')
  })
})

// login.addEventListener('click', (e) => {
//   // submits the post request to create a new post
//   const username = document.getElementById('username').value

//   axios.get(`http://localhost:4000/users${username}`).then(response => {
//     // gets the initial data
//     showPosts(response.data)
//   }).then((user) => {
//     currentUser = user.username
//     $('#modal-login').modal('close')
//   })
// })

newAccount.addEventListener('click', (e) => {
  // submits the post request to create a new post
  const username = document.getElementById('new-username').value
  const email = document.getElementById('new-email').value

  axios.post('http://localhost:4000/users', {
    username,
    email
}).then((user) => {
    currentUser = user
    $('#modal-new-account').modal('close')
  })
})

deleteButton.addEventListener('click', (e) => {
  // deletes an image
  axios.delete(`http://localhost:4000/posts/${currentlyEditing}`).then(() => {
    $('#modal-edit').modal('close')
  })
})

// initializes modal package
$('.modal').modal()