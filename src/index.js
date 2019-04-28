const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
//find toy Collection
const toyCollection = document.getElementById("toy-collection");

//find toyForm
const form = document.querySelector(".add-toy-form")


//find like button
const likeButton = document.querySelector(".like-btn")

//fetch to get toys
fetch("http://localhost:3000/toys")
.then(response => response.json())
.then(toys => {
  // console.log(toys)
  toys.forEach(toy => {
    // console.log(toy.id)
    let toyHtml = `<div class="card" id="${toy.id}">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p class="toy-likes">${toy.likes} Likes </p>
      <button class="like-btn">Like <3</button>
    </div>`;
    toyCollection.innerHTML += toyHtml;
  })

  // toyCollection.appendChild()
})

toyForm.addEventListener('submit', function(e) {
  event.preventDefault();
console.log(e);

const name = e.target[0].value
const image = e.target[1].value
fetch("http://localhost:3000/toys", {
  method: 'POST',

  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },

  body:
  JSON.stringify({
    "name": `${name}`,
    "image": `${image}`,
    "likes": 0
  })
})

})
// .then(resp => console.log(resp));

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

//add like button listener addEventListener
toyCollection.addEventListener('click', (e) => {
// event.preventDefault();
const id = e.target.parentNode.id
let likes = e.target.parentNode.childNodes[5].innerText
likes = parseInt(likes, 10);
// console.log(e.target.className === "like-btn");

if(e.target.className === "like-btn") {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',

    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({"likes": `${likes + 1}`})
}).then(function(e){

  toyCollection.innerHTML = ""
  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(toys => {
    // console.log(toys)
    toys.forEach(toy => {
      // console.log(toy.id)
      let toyHtml = `<div class="card" id="${toy.id}">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p class="toy-likes">${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      </div>`;
      toyCollection.innerHTML += toyHtml;
    })

    // toyCollection.appendChild()
  })
})


}

})





// OR HERE!
