let sliderList = document.getElementById("sliderList").children;
let sliderClone = {elements: [], shown: [0, 1, 2, 3, 4]}
let loaded = true;


let ratingList = {elements: document.getElementById("ratingList").children, shown: [0, 1, 2, 3, 4, 5]}
let modalWindow = document.getElementById("modalWindow");


document.getElementById("slider").addEventListener("mouseenter", function(){
    document.addEventListener("keydown", mouseInSlider)
})
document.getElementById("slider").addEventListener("mouseleave", function(){
    document.removeEventListener("keydown", mouseInSlider)
})
function mouseInSlider(e){
    if (e.keyCode == '39'){
        moveSlider('right')
    }
    else if (e.keyCode == '37'){
        moveSlider('left')
    }
}

setInterval(function(){moveSlider('right')}, 3000)
function moveSlider(direction){
    if (loaded) {
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

            sliderList[0].lastElementChild.setAttribute("onclick", "")
            sliderList[1].lastElementChild.setAttribute("onclick", "openModalWindow(this)")
            sliderList[2].lastElementChild.setAttribute("onclick", "openModalWindow(this)")
            sliderList[3].lastElementChild.setAttribute("onclick", "openModalWindow(this)")
            sliderList[4].lastElementChild.setAttribute("onclick", "")
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
            sliderList[1].lastElementChild.setAttribute("onclick", "openModalWindow(this)")
            sliderList[2].lastElementChild.setAttribute("onclick", "openModalWindow(this)")
            sliderList[3].lastElementChild.setAttribute("onclick", "openModalWindow(this)")
            sliderList[4].lastElementChild.setAttribute("onclick", "")
        }
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
                modalWindow.style.width = (i/10).toString()+"vh"
                modalWindow.style.height = (i/10).toString()+"vh"
            }, 1)
        }
    }
}

function closeModalWindow(){
    for( let i=900; i > 0; i--){
        setTimeout(function(){
            modalWindow.style.width = (i/10).toString()+"vh"
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

    document.getElementsByTagName("main")[0].style.height = "110vh";
    document.getElementById("topRated").lastElementChild.innerText = "CLOSE";
    document.getElementById("topRated").lastElementChild.onclick = close;
}

function close(){
    ratingList["elements"][6].style.display = "none"
    ratingList["elements"][7].style.display = "none"
    ratingList["elements"][8].style.display = "none"

    document.getElementsByTagName("main")[0].style.height = "90vh";
    document.getElementById("topRated").lastElementChild.innerText = "LOAD MORE";
    document.getElementById("topRated").lastElementChild.onclick = loadMore;
}




let rand = {0: "coffee", 1: "croissant", 2: "donut", 3: "hot-dog", 4: "french-fries", 5: "hamburger", 6: "sandwich", 7: "chicken", 8: "waffle", 9: "ice-cream"}
let food = rand[Math.floor(Math.random()*10).toString()]

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
    loaded = true;
  });

  food = rand[Math.floor(Math.random()*10).toString()]
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
  