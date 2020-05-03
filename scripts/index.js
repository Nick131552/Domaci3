
let sliderList = document.getElementById("slider")

let ratingList = {elements: document.getElementById("ratingList").children, shown: [0, 1, 2, 3, 4, 5]}
let bestList = document.getElementById("bestList").children

let modalWindow = document.getElementById("modalWindow");


let lunch = {0: "chicken", 1: "croissant", 2: "eggs", 3: "beef", 4: "fish", 5: "soup", 6: "sandwich", 7: "chicken", 8: "salad", 9: "rice"}
let dessert = {0: "ice-cream", 1: "waffle", 2: "pancake", 3: "cake", 4: "crepe", 5: "donut", 6: "cookie", 7: "fruit", 8: "pie", 9: "scone"}
let list = {0: lunch, 1: dessert}

let food = list[Math.floor(Math.random()*2).toString()][Math.floor(Math.random()*10).toString()]

let healthLabel = {0:'Balanced', 1:'High-protein', 2:'Low-fat', 3:'Low-carb'}
let label = healthLabel[Math.floor(Math.random()*4).toString()]


let a = document.getElementsByClassName("slide")

sliderList.addEventListener("mouseenter", function(){
    document.addEventListener("keydown", moveSlide)
})
sliderList.addEventListener("mouseleave", function(){
    document.removeEventListener("keydown", moveSlide)
})

function moveSlide(e){
    if (e.keyCode == '37'){
        setTimeout(function(){a[0].click()}, 0)
    }
    else if (e.keyCode == '39'){
        setTimeout(function(){a[1].click()}, 0)
    }
}


let slidePos = [1, 2, 3];
function slide(dir){
    if (dir === 'right'){
        if (slidePos[2] != 10){
            a[1].setAttribute("href", "#slide"+(slidePos[2]+1))
            slidePos = slidePos.map(elem => elem+1);
        }
        else {
            a[1].setAttribute("href", "#slide"+1)
            slidePos = [1, 2, 3];
        }
    }

    else if (dir === 'left'){
        if (slidePos[0] != 1){
            a[0].setAttribute("href", "#slide"+(slidePos[0]-1))
            slidePos = slidePos.map(elem => elem-1);
        }
        else {
            a[0].setAttribute("href", "#slide"+10)
            slidePos = [8, 9, 10];
        }

        

        else if(direction === 'right'){
            sliderList[0].parentNode.removeChild(sliderList[0])
            
            if (window.innerWidth <= 450){
                sliderList[0].style.opacity = "0"
                sliderList[1].style.opacity = "0"
                sliderList[2].style.opacity = "0"
                sliderList[0].style.transition = "opacity 2s"
                sliderList[0].style.margin = "0 0.5vw 0 30vw"
                }
            else {
                sliderList[0].style.opacity = "1"
                sliderList[0].style.transition = "opacity 2s"
                sliderList[0].style.margin = "0 0.5vw 0 10vw"
            }

            sliderList[0].style.opacity = "0"
            sliderList[3].style.opacity = "1"

            setTimeout(function(){
                sliderList[0].style.transition = "";
                sliderList[0].style.margin = "0 0.5vw 0 0vw"
            }, 1)

            for (let m = 0; m < 5; m++){
                if (sliderClone["shown"][m] != 9){
                    sliderClone["shown"][m]++
                }
                else {
                    sliderClone["shown"][m] = 0;
                }
            }
            sliderList[0].parentNode.appendChild(sliderClone['elements'][sliderClone["shown"][4]])
        
            sliderList[0].lastElementChild.setAttribute("onclick", "")
            sliderList[3].lastElementChild.setAttribute("onclick", "openModalWindow(this)")


    }
    setTimeout(function(){transitionAvailable = true}, 2000)
}}



function openModalWindow(e){
    if (modalWindow.style.display !== "flex" && transitionAvailable){
        modalWindow.style.display = "flex"
        transitionAvailable = false;

            if(window.innerWidth<window.innerHeight){
                modalWindow.style.width = "90vw";
                }
            else {
                modalWindow.style.width = "90vh";
            }
            modalWindow.style.height = "90vh"

            setTimeout(function(){
                modalWindow.innerHTML = "<button onclick=\"closeModalWindow()\">X</button>"+e.parentNode.innerHTML;
                if(modalWindow.lastElementChild.tagName == "BUTTON"){
                    modalWindow.removeChild(modalWindow.lastElementChild)
                }
                transitionAvailable = true
            }, 1000)
    }
}

function closeModalWindow(){
    if (transitionAvailable){
        transitionAvailable = false;
        modalWindow.style.height = "0vh"
    modalWindow.style.width = "0vw"

    modalWindow.innerHTML = ""
    
    setTimeout(function(){
        modalWindow.style.display = "none"
        modalWindow.innerHTML = ""
        transitionAvailable = true
    }, 1000)
    }
}


function loadMore(){
    ratingList["elements"][6].style.display = "flex"
    ratingList["elements"][7].style.display = "flex"
    ratingList["elements"][8].style.display = "flex"

    document.getElementById("topRated").lastElementChild.innerText = "CLOSE";
    document.getElementById("topRated").lastElementChild.onclick = close;
}

function close(){
    ratingList["elements"][6].style.display = "none"
    ratingList["elements"][7].style.display = "none"
    ratingList["elements"][8].style.display = "none"

    document.getElementById("topRated").lastElementChild.innerText = "LOAD MORE";
    document.getElementById("topRated").lastElementChild.onclick = loadMore;
}





function load(){
fetch('https://api.edamam.com/search?q='+food+'&app_id=05b25fe9&app_key=4ac7b2f30d6e35231997c00de0a9bd45')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
      data = data["hits"]

    for (let i = 0; i < data.length; i++){
        data[i] = [data[i]["recipe"]["label"], data[i]["recipe"]["image"], data[i]["recipe"]["healthLabels"]]
        if (data[i][0].indexOf('(') != -1){
            data[i][0] = data[i][0].substr(0, data[i][0].indexOf('('))+data[i][0].substr(data[i][0].indexOf(')')+1, data[i][0].length)
        }
    
        sliderList[i].getElementsByClassName("productName")[0].innerText = data[i][0]
        sliderList[i].firstElementChild.setAttribute("src", data[i][1])
        sliderList[i].getElementsByClassName("productDetails")[0].innerText = data[i][2]
    }
    for (let i = 0; i < 10; i++){
    sliderClone["elements"][i] = sliderList[i].cloneNode();
    sliderClone["elements"][i].innerHTML = sliderList[i].innerHTML
}
sliderList[1].style.opacity = "1"
sliderList[2].style.opacity = "1"
sliderList[3].style.opacity = "1"

while (sliderList.length > 5){
   sliderList[0].parentNode.removeChild(sliderList[5])
}
  });


  food = list[Math.floor(Math.random()*2).toString()][Math.floor(Math.random()*10).toString()]

fetch('https://api.edamam.com/search?q='+food+'&from=0&to=9&app_id=05b25fe9&app_key=4ac7b2f30d6e35231997c00de0a9bd45')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
      data = data["hits"]

    for (let i = 0; i < data.length; i++){
        data[i] = [data[i]["recipe"]["label"], data[i]["recipe"]["image"], data[i]["recipe"]["healthLabels"]]
        if (data[i][0].indexOf('(') != -1){
            data[i][0] = data[i][0].substr(0, data[i][0].indexOf('('))+data[i][0].substr(data[i][0].indexOf(')')+1, data[i][0].length)
        }
        ratingList["elements"][i].firstElementChild.setAttribute("src", data[i][1])
        ratingList["elements"][i].getElementsByClassName("name")[0].innerText = data[i][0]
        ratingList["elements"][i].getElementsByClassName("info1")[0].innerText = data[i][2][0]
        ratingList["elements"][i].getElementsByClassName("info2")[0].innerText = data[i][2][1]
        ratingList["elements"][i].getElementsByClassName("info3")[0].innerText = data[i][2][2]
    }
  });


  
  food = list[Math.floor(Math.random()*2).toString()][Math.floor(Math.random()*10).toString()]
  bestList[0].parentNode.parentNode.firstElementChild.innerText = label+" "+food+" recipes"
  
  fetch('https://api.edamam.com/search?q='+food+'&diet='+label.toLowerCase()+'&from=0&to=3&app_id=05b25fe9&app_key=4ac7b2f30d6e35231997c00de0a9bd45')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        data = data["hits"]
  
      for (let i = 0; i < data.length; i++){
          data[i] = [data[i]["recipe"]["label"], data[i]["recipe"]["image"], data[i]["recipe"]["healthLabels"]]
          if (data[i][0].indexOf('(') != -1){
              data[i][0] = data[i][0].substr(0, data[i][0].indexOf('('))+data[i][0].substr(data[i][0].indexOf(')')+1, data[i][0].length)
          }
          bestList[i].firstElementChild.setAttribute("src", data[i][1])
          bestList[i].getElementsByClassName("name")[0].innerText = data[i][0]
      }
    });
}

load()
