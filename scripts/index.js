let sliderList = document.getElementById("sliderList").children;
let sliderClone = {elements: [], shown: [0, 1, 2]}//shown: [0, 1, 2, 3, 4]
let loaded = false;


let ratingList = {elements: document.getElementById("ratingList").children, shown: [0, 1, 2, 3, 4, 5]}
let bestList = document.getElementById("bestList").children

let modalWindow = document.getElementById("modalWindow");

let lunch = {0: "chicken", 1: "croissant", 2: "eggs", 3: "beef", 4: "fish", 5: "soup", 6: "sandwich", 7: "chicken", 8: "salad", 9: "rice"}
let dessert = {0: "ice-cream", 1: "waffle", 2: "pancake", 3: "cake", 4: "crepe", 5: "donut", 6: "cookie", 7: "fruit", 8: "pie", 9: "scone"}
let drink = {0: "coffee", 1: "milkshake", 2: "tea", 3: "juice", 4: "smoothie"}
let list = {0: lunch, 1: dessert, 2: drink}

let food = list[Math.floor(Math.random()*3).toString()][Math.floor(Math.random()*5).toString()]

let healthLabel = {0:'Balanced', 1:'High-protein', 2:'Low-fat', 3:'Low-carb'}
let label = healthLabel[Math.floor(Math.random()*4).toString()]

document.getElementById("slider").addEventListener("mouseenter", function(){
    document.addEventListener("keydown", mouseInSlider)
})
document.getElementById("slider").addEventListener("mouseleave", function(){
    document.removeEventListener("keydown", mouseInSlider)
})
function mouseInSlider(e){
    if (e.keyCode == '39' && loaded){
        moveSlider('right')
    }
    else if (e.keyCode == '37' && loaded){
        moveSlider('left')
    }
}

setInterval(function(){moveSlider('right')}, 3000)
/*function moveSlider(direction){
    if (loaded) {
        loaded = false
        if (direction === 'left'){
            sliderList[4].parentNode.removeChild(sliderList[4])
            sliderList[0].style.margin = "0 0.5vw 0 10.5vw"

            for( let i = 4000; i >= 0; i--){
                setTimeout(function(){
                    sliderList[0].style.margin = "0 0.5vw 0 "+((1000-(i/4)%1000)*0.015).toString()+"vw"
                    sliderList[3].style.opacity = (0.001*i/4).toString();
                    sliderList[0].style.opacity = ((1000-(i/4)%1000)/1000).toString();
                }, 1)
                if (i == 0){
                    for (let m = 0; m < 5; m++){
                        setTimeout(function(){sliderList[1].style.margin = "0 0.5vw 0 0.5vw"}, 2)

                        if (sliderClone["shown"][m] != 0){
                            sliderClone["shown"][m]--
                        }
                        else {
                            sliderClone["shown"][m] = 9;
                        }
                    }
                    setTimeout(function(){sliderList[0].parentNode.insertBefore(sliderClone['elements'][sliderClone["shown"][0]], sliderList[0].parentNode.firstElementChild)}, 0)
                }
            }

            sliderList[3].lastElementChild.setAttribute("onclick", "")
        }

        else if(direction === 'right'){
            sliderList[0].parentNode.removeChild(sliderList[0])
            sliderList[0].style.margin = "0 0.5vw 0 10.5vw"

            for( let i = 4000; i >= 0; i--){
                setTimeout(function(){
                    sliderList[0].style.margin = "0 0.5vw 0 "+(i*0.015/4).toString()+"vw"
                    sliderList[0].style.opacity = (0.001*i/4).toString();
                    sliderList[3].style.opacity = ((1000-(i/4)%1000)/1000).toString();
                }, 1)
                if (i == 0){
                    sliderList[0].style.margin = "0 0.5vw 0 0.5vw"
                    for (let m = 0; m < 5; m++){
                        if (sliderClone["shown"][m] != 9){
                            sliderClone["shown"][m]++
                        }
                        else {
                            sliderClone["shown"][m] = 0;
                        }
                    }
                    sliderList[0].parentNode.appendChild(sliderClone['elements'][sliderClone["shown"][4]])
                }
            }
            sliderList[0].lastElementChild.setAttribute("onclick", "")
            sliderList[3].lastElementChild.setAttribute("onclick", "openModalWindow(this)")
        }
        setTimeout(function(){loaded = true}, 1000)
    }
}
*/
function moveSlider(direction){
    if (loaded) {
        loaded = false
        if (direction === 'left'){
            sliderList[2].parentNode.removeChild(sliderList[2])
            sliderList[0].style.margin = "0 0.5vw 0 10.5vw"

            for( let i = 4000; i >= 0; i--){
                setTimeout(function(){
                    sliderList[0].style.margin = "0 0.5vw 0 "+((1000-(i/4)%1000)*0.015).toString()+"vw"
                    sliderList[1].style.opacity = (0.001*i/4).toString();
                    sliderList[0].style.opacity = ((1000-(i/4)%1000)/1000).toString();
                }, 1)
                if (i == 0){
                    for (let m = 0; m < sliderClone["shown"].length; m++){
                        setTimeout(function(){sliderList[1].style.margin = "0 0.5vw 0 0.5vw"}, 2)

                        if (sliderClone["shown"][m] != 0){
                            sliderClone["shown"][m]--
                        }
                        else {
                            sliderClone["shown"][m] = 9;
                        }
                    }
                    setTimeout(function(){sliderList[0].parentNode.insertBefore(sliderClone['elements'][sliderClone["shown"][0]], sliderList[0].parentNode.firstElementChild)}, 0)
                }
            }

            sliderList[1].lastElementChild.setAttribute("onclick", "")
        }

        else if(direction === 'right'){
            sliderList[0].parentNode.removeChild(sliderList[0])
            sliderList[0].style.margin = "0 0.5vw 0 10.5vw"

            for( let i = 4000; i >= 0; i--){
                setTimeout(function(){
                    sliderList[0].style.margin = "0 0.5vw 0 "+(i*0.015/4).toString()+"vw"
                    sliderList[0].style.opacity = (0.001*i/4).toString();
                    sliderList[1].style.opacity = ((1000-(i/4)%1000)/1000).toString();
                }, 1)
                if (i == 0){
                    sliderList[0].style.margin = "0 0.5vw 0 0.5vw"
                    for (let m = 0; m < sliderClone["shown"].length; m++){
                        if (sliderClone["shown"][m] != 9){
                            sliderClone["shown"][m]++
                        }
                        else {
                            sliderClone["shown"][m] = 0;
                        }
                    }
                    sliderList[0].parentNode.appendChild(sliderClone['elements'][sliderClone["shown"][2]])
                }
            }
            sliderList[0].lastElementChild.setAttribute("onclick", "")
            sliderList[1].lastElementChild.setAttribute("onclick", "openModalWindow(this)")
        }
        setTimeout(function(){loaded = true}, 1000)
    }
}

function openModalWindow(e){
    if (modalWindow.style.display !== "flex"){
        let info = e.parentNode.children;
        modalWindow.style.display = "flex"

        for (let i = 0; i < (info.length); i++){
            if (info[i].tagName != "BUTTON"){
                modalWindow.append(info[i].cloneNode(true))
            }
        }

        for( let i=0; i < 900; i++){
            setTimeout(function(){
                modalWindow.style.width = (i/10).toString()+"vw"//vh
                modalWindow.style.height = (i/10).toString()+"vh"
            }, 1)
        }
    }
}

function closeModalWindow(){
    for( let i=900; i > 0; i--){
        setTimeout(function(){
            modalWindow.style.width = (i/10).toString()+"vw"//vh
            modalWindow.style.height = (i/10).toString()+"vh"
        }, 1)
    }

    modalWindow.innerHTML = ""
    
    setTimeout(function(){
        modalWindow.style.display = "none"
    modalWindow.innerHTML = "<button onclick=\"closeModalWindow()\">X</button>"
    }, 90)
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





function reload(){
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
//sliderList[2].style.opacity = "1"
//sliderList[3].style.opacity = "1"

while (sliderList.length > 3){//5
   sliderList[0].parentNode.removeChild(sliderList[3])//5
}
    loaded = true;
  });


  food = list[Math.floor(Math.random()*3).toString()][Math.floor(Math.random()*5).toString()]

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


  
  food = list[Math.floor(Math.random()*3).toString()][Math.floor(Math.random()*5).toString()]
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

setTimeout(function(){reload()}, 60000)