let sliderList = {elements: document.getElementById("sliderList").children, shown: [0, 1, 2]}
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
    if (direction === 'left'){
        if (sliderList["shown"][0] != 0){
            sliderList["elements"][sliderList["shown"][0]-1].style.display = "block";
            sliderList["elements"][sliderList["shown"][2]].style.display = "none";

            sliderList["shown"][0]--;
            sliderList["shown"][1]--;
            sliderList["shown"][2]--;
        }
    else {
        sliderList["elements"][sliderList["shown"][0]].style.display = "none";
        sliderList["elements"][sliderList["shown"][1]].style.display = "none";
        sliderList["elements"][sliderList["shown"][2]].style.display = "none";
        sliderList["elements"][7].style.display = "block";
        sliderList["elements"][8].style.display = "block";
        sliderList["elements"][9].style.display = "block";


        sliderList["shown"][0] = 7;
        sliderList["shown"][1] = 8;
        sliderList["shown"][2] = 9;
    }
    }

    else if(direction === 'right'){
        if (sliderList["shown"][2] != 9){
            sliderList["elements"][sliderList["shown"][0]].style.display = "none";
            sliderList["elements"][sliderList["shown"][2]+1].style.display = "block";

            sliderList["shown"][0]++;
            sliderList["shown"][1]++;
            sliderList["shown"][2]++;
        }
        else {
            sliderList["elements"][sliderList["shown"][0]].style.display = "none";
            sliderList["elements"][sliderList["shown"][1]].style.display = "none";
            sliderList["elements"][sliderList["shown"][2]].style.display = "none";
            sliderList["elements"][0].style.display = "block";
            sliderList["elements"][1].style.display = "block";
            sliderList["elements"][2].style.display = "block";


            sliderList["shown"][0] = 0;
            sliderList["shown"][1] = 1;
            sliderList["shown"][2] = 2;
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
    ratingList["elements"][6].style.display = "block"
    ratingList["elements"][7].style.display = "block"
    ratingList["elements"][8].style.display = "block"

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

/*fetch('https://api.edamam.com/search?q=coffee&app_id=05b25fe9&app_key=4ac7b2f30d6e35231997c00de0a9bd45')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
  });*/