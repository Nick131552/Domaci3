let itemList = document.getElementsByClassName("list-products")[0];
let shoppingList = document.getElementsByClassName("shopping-cart")[0];
let container = document.getElementsByClassName("container")[0];
let savedProducts = {HTMLcode: shoppingList.innerHTML}
itemList.innerHTML = JSON.parse(getJSON('https://jsonblob.com/api/jsonBlob/ba56388b-83ea-11ea-a8bf-93d75a331476'))



if (JSON.parse(localStorage.getItem('products'))["HTMLcode"] != undefined){
    savedProducts = JSON.parse(localStorage.getItem('products'))
    shoppingList.innerHTML = savedProducts["HTMLcode"]
}

let total = document.getElementsByClassName("shopping-cart-summary")[0].firstElementChild.firstElementChild;


function addItem(){
    if(document.getElementById("image").value != ""
    && document.getElementById("name").value != ""
    && document.getElementById("price").value != ""
    && document.getElementById("description").value != ""
    &&Number(document.getElementById("price").value)*100%1 == 0){

        let newItem = document.createElement("DIV")

        let value = '<img src='+document.getElementById("image").value+' /><p class="name">'+document.getElementById("name").value+'</p><p class="price">$'+document.getElementById("price").value+'</p><button class="details-button" onclick="openModalWindow(this)">Details</button><p style="display:none" class="details">'+document.getElementById("description").value+'</p><button class="buy-button" onclick="addToShoppingCart(this)">Buy</button>'
        newItem.innerHTML = value;
        newItem.setAttribute("class" , "product")
    
        itemList.append(newItem)
        save()
    }
}

function openModalWindow(e){
    let modal = document.createElement("DIV");
    modal.setAttribute("class", "modal");
    modal.id = "modal"
    container.append(modal)

    for( let i=0; i < 1000; i++){
        setTimeout(function(){
            modal.style.width = (i/25).toString()+"vw"
        modal.style.height = (i/25).toString()+"vw"
        }, 1)
    }

    let modalContent = '<button class="close" onclick="closeModalWindow()">X</button><br><p class="name">'+e.parentNode.getElementsByClassName("name")[0].innerHTML+'</p><img src='+e.parentNode.firstChild.getAttribute("src")+' /><p>'+e.parentNode.getElementsByClassName("details")[0].innerHTML+'</p><p>'+e.parentNode.getElementsByClassName("price")[0].innerHTML+'</p><button class="buy-button">Buy</button>'
    setTimeout(function(){modal.innerHTML = modalContent;}, 200)
}


function closeModalWindow(){
    let modal= document.getElementById("modal")

    setTimeout(function(){container.removeChild(modal)}, 200)
    modal.innerHTML = "";

    for( let i=1000; i > 0; i--){
        setTimeout(function(){
            modal.style.width = (i/25).toString()+"vw"
            modal.style.height = (i/25).toString()+"vw"
        }, 1)
    }

}

function addToShoppingCart(e){
    if (savedProducts[e.parentNode.getElementsByClassName("name")[0].innerHTML] != e.parentNode.innerHTML){
    let newProduct = document.createElement("DIV")

    let shoppingCartContent = '<div class="product-info"><div><h3>'+e.parentNode.getElementsByClassName("name")[0].innerHTML+'</h3><p class="totalProductPrice">'+e.parentNode.getElementsByClassName("price")[0].innerHTML+' &times; 1</p></div><img src='+e.parentNode.firstChild.getAttribute("src")+' /></div><div class="product-count"><button onclick="changeProductNum(this, \'-\')">-</button><span class="productNum">1</span><button onclick="changeProductNum(this,\'+\')">+</button></div>'
    newProduct.innerHTML = shoppingCartContent;
    newProduct.setAttribute("class", "shopping-cart-product")
    shoppingList.firstElementChild.append(newProduct);

    total.innerHTML = "$"+(Number(total.innerHTML.substr(1,total.innerHTML.length-1))+Number(e.parentNode.getElementsByClassName("price")[0].innerHTML.substr(1, e.parentNode.getElementsByClassName("price")[0].innerHTML.length-1))).toString()
    savedProducts[e.parentNode.getElementsByClassName("name")[0].innerHTML] = e.parentNode.innerHTML;
    save()
    }
}

function changeProductNum(e, a){
    let productNum = e.parentNode.getElementsByClassName("productNum")[0]
    let productPrice = e.parentNode.parentNode.getElementsByClassName("totalProductPrice")[0]

    if (a === "+"){
        if(Number(productNum.innerHTML) < 10){
            productNum.innerHTML = (Number(productNum.innerHTML)+1).toString();
            productPrice.innerHTML = (productPrice.innerHTML).substr(0, productPrice.innerHTML.length-1)+(Number(productNum.innerHTML)).toString();
            total.innerHTML = "$"+(Number(total.innerHTML.substr(1,total.innerHTML.length-1))+Number(productPrice.innerHTML.substring((productPrice.innerHTML).lastIndexOf("$") + 1, (productPrice.innerHTML).indexOf(" ")))).toString()
        }
    }
    else {
        if(Number(productNum.innerHTML) > 1 && Number(productNum.innerHTML)<10){
            productNum.innerHTML = (Number(productNum.innerHTML)-1).toString();
            productPrice.innerHTML = (productPrice.innerHTML).substr(0, productPrice.innerHTML.length-1)+(Number(productNum.innerHTML)).toString();
            total.innerHTML = "$"+(Number(total.innerHTML.substr(1,total.innerHTML.length-1))-Number(productPrice.innerHTML.substring((productPrice.innerHTML).lastIndexOf("$") + 1, (productPrice.innerHTML).indexOf(" ")))).toString()
        }
        else if (Number(productNum.innerHTML) == 1){
            total.innerHTML = "$"+(Number(total.innerHTML.substr(1,total.innerHTML.length-1))-Number(productPrice.innerHTML.substring((productPrice.innerHTML).lastIndexOf("$") + 1, (productPrice.innerHTML).indexOf(" ")))).toString()
            shoppingList.firstElementChild.removeChild(e.parentNode.parentNode)
            delete savedProducts[e.parentNode.parentNode.firstElementChild.firstElementChild.firstElementChild.innerHTML]
        }
        else if (Number(productNum.innerHTML) == 10){
            productNum.innerHTML = (Number(productNum.innerHTML)-1).toString();
            productPrice.innerHTML = (productPrice.innerHTML).substr(0, productPrice.innerHTML.length-2)+(Number(productNum.innerHTML)).toString();
            total.innerHTML = "$"+(Number(total.innerHTML.substr(1,total.innerHTML.length-1))-Number(productPrice.innerHTML.substring((productPrice.innerHTML).lastIndexOf("$") + 1, (productPrice.innerHTML).indexOf(" ")))).toString()
        }
    }

    save();
}


function purchaseModalWindow(){
    let purchaseWindow = document.createElement("DIV")
    purchaseWindow.setAttribute("class", "purchaseWindow")
    purchaseWindow.innerText = "Your purchase was successful!"

    document.getElementsByClassName("container")[0].appendChild(purchaseWindow)
    setTimeout(function() {document.getElementsByClassName("container")[0].removeChild(document.getElementsByClassName("container")[0].lastElementChild)}, 2000)
}

function save(){
    putJSON('https://jsonblob.com/api/jsonBlob/ba56388b-83ea-11ea-a8bf-93d75a331476')
    savedProducts["HTMLcode"] = shoppingList.innerHTML
    localStorage.setItem("products", JSON.stringify(savedProducts))
}


function getJSON(url)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function putJSON(url)
{
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(itemList.innerHTML),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
}

