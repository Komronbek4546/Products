const addButton = document.querySelector(".addbtn")
const elTbody = document.querySelector(".tbody")
const elModalWrapper = document.querySelector(".modal-wrapper")
const elModal = document.querySelector(".modal")

let products = JSON.parse(window.localStorage.getItem("products")) || [];

// Add Product 
addButton.addEventListener("click", (e) => {
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
        <form class="add-product">
            <div class="Product-add">
                 <div class="product-inputs-wrapper">
                   <img src="./img/addimage.png" alt="img" width="200px" height="200px"/>
                     <input class="visually-hidden" type="file" >
                     <input class="product-input-layer" type="text" name="name" placeholder="Enter Product Name">
                     <input class="product-input-layer" type="text" name="type" placeholder="Enter Product Type">
                     <input class="product-input-layer" type="number" name="size" placeholder="Enter Product Size">
                 </div>
               <div class="product-buttons">
                   <button onclick="logOutCancel()" type="button" class="product-cancel">Cancel</button>
                   <button type="submit" class="product-add">Add</button>
               </div>
            </div>
           
        </form>
    `
    const elAddForm = document.querySelector(".add-product")
    elAddForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let data = {
            id: products.length,
            img: URL.createObjectURL(e.target[0].files[0]),
            name: e.target[1].value,
            type: e.target[2].value,
            size: e.target[3].value,
        }
        products.push(data)
        renderproducts(products, elTbody)
        elModalWrapper.classList.remove("open-modal")
        window.localStorage.setItem("products", JSON.stringify(products))
    })
})

function logOutCancel() {
    elModalWrapper.classList.remove("open-modal")
}

//render products

function renderproducts(arr, list) {
   list.innerHTML = ""
    arr.map(item => {
        let elTr = document.createElement("div")
        elTr.innerHTML = `
        <div class="product-wrapper">
        <div class="product-wrapper-img">
                <img src="${item.img}" alt="product-image"  width="200px" height="200px" />
            </div>
            <p class="product-item-name">Product Name:${item.name}</p>
            <p class="product-item-name">Poduct Type:${item.type}</p>
            <p class="product-item-name">Product Price:${item.size} $</p>
            <div class="product-item product-item-btn">
                <button onclick="uptadeClick(${item.id})" class="product-update-btn">Update</button>
                <button onclick="deleteClick(${item.id})" class="product-delete-btn">Delete</button>
            </div>
        </div>
            
        `
        list.appendChild(elTr)
        console.log(item)
    })
}

renderproducts(products, elTbody)


elModalWrapper.addEventListener("click", (e) => {
    if (e.target.id == "modal-wrapper") {
        elModalWrapper.classList.remove("open-modal")
    }
})


// Update Product

function uptadeClick(id) {
    elModalWrapper.classList.add("open-modal")
    const data = products.find(item => item.id == id)
    elModal.innerHTML = `
             <form class="uptade-product">
            <div class="Product-add">
                 <div class="product-inputs-wrapper">
                     <img  class="Uptade-render-img" src="${data.img}" width="200px" height="200px"/><img/>
                     <input class="visually-hidden UptadeRenderImgInp" type="file" >
                     <input  value="${data.name}" class="product-input-layer" type="text" name="name" placeholder="Enter Product Name">
                     <input  value="${data.type}" class="product-input-layer" type="text" name="type" placeholder="Enter Product Type">
                     <input  value="${data.size}" class="product-input-layer" type="number" name="size" placeholder="Enter Product Size">
                 </div>
               <div class="product-buttons">
                   <button onclick="logOutCancel()" type="button" class="product-cancel">Cancel</button>
                   <button type="submit" class="product-add">Update</button>
               </div>
            </div>
           
        </form>
        
    `
    const elupdateproduct = document.querySelector(".uptade-product")
    const elUptadeRenderImgInp = document.querySelector(".UptadeRenderImgInp")
    const elUptadeRenderImg = document.querySelector(".Uptade-render-img")

    elUptadeRenderImgInp.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            elUptadeRenderImg.src = reader.result;
        };
        reader.readAsDataURL(file);
    });

    elupdateproduct.addEventListener("submit", (e) => {
        e.preventDefault();
        data.img = elUptadeRenderImg.src;
        data.name = e.target[1].value;
        data.type = e.target[2].value;
        data.size = e.target[3].value;
       

        renderproducts(products, elTbody);
        window.localStorage.setItem("products", JSON.stringify(products));
        elModalWrapper.classList.remove("open-modal");
    });

}

// delete user start

function deleteClick(id) {
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
        <div class="delete-wrapper">
            <h1></h1>
            <div class="delete-product-btn-wrapper">
                <button class="delete-btn-cancel" onclick="logOutCancel()">Cancel</button>
                <button class="delete-btn-sure"  onClick="deleteSureClick(${id})">Delete</button>
            </div>
        </div>
    `
}

function deleteSureClick(id) {
    const data = products.findIndex(item => item.id == id)
    products.splice(data, 1)
    elModalWrapper.classList.remove("open-modal")
    renderproducts(products, elTbody)
    window.localStorage.setItem("products", JSON.stringify(products))
}




