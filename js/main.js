let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")

let mood = "create";
let tmp;
//  + + + = total
function getTotale() {
    if (price !=="") {
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor = "#040";
    }else {
        total.innerHTML = "";
        total.style.backgroundColor = "#a00d02";
    }
}
// create 
    let dataPro;
    if( window.localStorage.product != null ) {
        dataPro = JSON.parse(window.localStorage.product)
    }else {
        dataPro = []
    }
submit.onclick = function () {
    let newPro = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        count : count.value,
        total : total.innerHTML,
        category : category.value.toLowerCase(),
    }
        if(title.value != "" && price.value != "" && category.value != "" && newPro.count <= 100){
            if(mood === "create"){
                if(newPro.count > 1){
                for(let i = 0; i < newPro.count ; i++) {
                    dataPro.push(newPro)
                    }
                }else{
                    dataPro.push(newPro)
                }
            }else {
                dataPro[tmp] = newPro
                mood = "create"
            } 
            clearData()
        }
        
        window.localStorage.setItem("product", JSON.stringify(dataPro))
        showData()
        getTotale()
        submit.innerText = "create"
        count.style.display = "block"
}   
// clear inputs
function clearData () {
        title.value = '';
        price.value = '';
        taxes.value = '';
        ads.value = '';
        discount.value = '';
        count.value = '';
        total.innerHTML = '';
        category.value = '';
}
// show data
function showData() {
    table = "";
    for (let i = 0 ; i < dataPro.length; i++) {
        table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick = updateData(${i}) id="update">update</button></td>
                <td><button onclick = deleteData(${i}) id="delete">delete</button></td>
            </tr>`
    }
    document.getElementById("body").innerHTML = table;
    // button delete All
    let deleteAll = document.getElementById("deleteAll")
    if (dataPro.length > 0) {
        deleteAll.innerHTML = `
        <button onclick='deleteAll()'> deleteAll (${dataPro.length}) </button>
        `
    }else {
        deleteAll.innerHTML = ``
    }
    // getTotale() //problem
}
showData()
// // delete item
function deleteData(i) {
    dataPro.splice(i , 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}
// deleteAll
function deleteAll() {
    window.localStorage.clear()
    dataPro.splice(0)
    showData()
}
// update data
function updateData(i) {
    title.value = dataPro[i].title 
    price.value = dataPro[i].price 
    ads.value = dataPro[i].ads 
    taxes.value = dataPro[i].taxes 
    category.value = dataPro[i].category 
    getTotale() 
    count.style.display = "none"
    discount.value = dataPro[i].discount 
    title.value = dataPro[i].title 
    submit.innerText = "update"
    mood = "update"
    tmp = i
    scroll({
        top:0,
        behavior:"smooth",
    })
}
// search 
let searchMode = "title";
function getSearchMood(id) {
    let search = document.getElementById("search")
    if(id === "saerchTitle") {
        searchMode = "title"
        search.placeholder = "search by title"
    }else{
        searchMode = "category"
        search.placeholder = "search by category"
    }
    search.focus()
    search.value = ""
    showData()
}
// search data
function searchData(value) {
    let table = ''
    if (searchMode === "title") {
        for(let i = 0 ; i < dataPro.length;i++) {
            if(dataPro[i].title.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick = updateData(${i}) id="update">update</button></td>
                <td><button onclick = deleteData(${i}) id="delete">delete</button></td>
            </tr>`
            }else{}
        }
    }else {
        for(let i = 0 ; i < dataPro.length;i++) {
            if(dataPro[i].category.includes(value.toLowerCase())) {
                table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button onclick = updateData(${i}) id="update">update</button></td>
                <td><button onclick = deleteData(${i}) id="delete">delete</button></td>
            </tr>`
            }else{}
        }
    }
document.getElementById("body").innerHTML = table;
}

