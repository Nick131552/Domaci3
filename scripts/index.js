let sliderList = document.getElementById("slider")
let ratingList = {elements: document.getElementById("ratingList").children, shown: [0, 1, 2, 3, 4, 5]}
let modalWindow = document.getElementById("modalWindow");
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
    }
}


function openModalWindow(e){
    let info = e.parentNode.children;
    modalWindow.style.display = "block"

    for (let i = 0; i < (info.length); i++){
        if (info[i].tagName != "BUTTON"){
            modalWindow.append(info[i].cloneNode(true))
        }
    }

}

function closeModalWindow(){
    modalWindow.style.display = "none"
    modalWindow.innerHTML = "<button onclick=\"closeModalWindow()\">X</button>"
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