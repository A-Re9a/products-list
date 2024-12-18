var productNameInput= document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById("productDescriptionInput");
var productImgInput = document.getElementById("productImgInput");
var searchProductInput = document.getElementById("searchProductInput"); 
var productPhotoGroup = document.getElementById("productPhotoGroup");
var imgGroup = document.getElementById("imgGroup");
var labelName = document.getElementById("labelName")
var productContainer=[];
var addBtn=document.getElementById("addBtn");
var updateBtn=document.getElementById("updateBtn");
var myIndex=0;
var imgName;

if (localStorage.getItem('products') !== null){
    productContainer=JSON.parse(localStorage.getItem('products'));
    displayProducts(productContainer);
}
function addProducts(){
    if (valid(productNameInput, 'nameAlert') && valid(productPriceInput, 'numberAlert')&& valid(productCategoryInput, 'categoryAlert')&& valid(productDescriptionInput, 'descriptionAlert') ) {
    var ImgInputNm=productImgInput.files[0]?.name;
    console.log(ImgInputNm)
    if( ImgInputNm== undefined){
        ImgInputNm =`placeholder.webp`
    }
    var product={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        description:productDescriptionInput.value,
        phot:`pho/${ImgInputNm}`,
    }

    productContainer.push(product);
    localStorage.setItem('products',JSON.stringify(productContainer));
    clear();
    displayProducts(productContainer);
} else {
    alert('Please enter a valid inputs');
}
}

function clear(){
    productNameInput.value=null;
    productPriceInput.value=null;
    productCategoryInput.value=null;
    productDescriptionInput.value=null;
    productImgInput.value=null
}

function displayProducts(proCon){
    var cartona=``;
    for(var i=0; i<proCon.length;i++){
        cartona+=`<div class="productsList col-md-4 " >
        <div class="card text-center">
        <img class="product-img rounded my-2" src="${proCon[i].phot}" alt="">
        <h5 class="my-2 border-bottom text-white" >Name: ${proCon[i].name}</h5>
        <p class="my-2 border-bottom text-white">product category: ${proCon[i].category}</p>
        <p class="my-2 border-bottom text-white">product Price: ${proCon[i].price} $</p>
        <div class="d-flex justify-content-center align-items-center gap-2 ">
        <button onclick="deletProduct(${i})" class="btn btn-outline-danger my-3 btn-sm w-50 m-1 ">Delet Product </button>
        <button onclick="updateProduct(${i})" class="btn btn-outline-info my-3 btn-sm w-50 m-1 ">Update Product </button>
        </div>
    </div>
    </div>`
    } 
    document.getElementById("productList").innerHTML=cartona;
}

function deletProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem('products',JSON.stringify(productContainer));
    displayProducts(productContainer);
}

function updateProduct(index){
    myIndex=index;
    productNameInput.value=productContainer[index].name;
    productPriceInput.value=productContainer[index].price;
    productCategoryInput.value=productContainer[index].category;
    productDescriptionInput.value=productContainer[index].description;

    addBtn.classList.add("d-none");
    updateBtn.classList.remove("d-none");
    productPhotoGroup.classList.add("d-none");
    imgGroup.classList.remove("d-none");
    searchProductInput.classList.add("d-none");
    labelName.classList.remove("d-none");
    imgGroup.innerHTML = `<label for="productImgInput"><img style="height: 200px;" class="product-img rounded m-2" src="${productContainer[index].phot}"  alt=""></label>`
    imgName=productContainer[index].phot;
}

function updateProducts(){
    if (valid(productNameInput, 'nameAlert') && valid(productPriceInput, 'numberAlert')&& valid(productCategoryInput, 'categoryAlert')&& valid(productDescriptionInput, 'descriptionAlert') ) {
    productContainer[myIndex].name=productNameInput.value;
    productContainer[myIndex].price=productPriceInput.value;
    productContainer[myIndex].category=productCategoryInput.value;
    productContainer[myIndex].description=productDescriptionInput.value;
    productContainer[myIndex].phot=imgName; 
    addBtn.classList.remove("d-none");
    updateBtn.classList.add("d-none");
    productPhotoGroup.classList.remove("d-none");
    searchProductInput.classList.remove("d-none");
    imgGroup.classList.add("d-none");
    labelName.classList.add("d-none")
    localStorage.setItem('products',JSON.stringify(productContainer));
    clear();
    displayProducts(productContainer);
} else {
    alert('Please enter a valid inputs');
}
}


function searchProduct(){
    var searchValue = searchProductInput.value;
    var searchProValue = [];
    for(var i=0; i<productContainer.length;i++){
        if(productContainer[i].name.toLowerCase().includes(searchValue.toLowerCase())){
            searchProValue.push(productContainer[i]) ;
        }
        
    } 
    displayProducts(searchProValue);
}

function productImgInputChange(){
    var productImgName=`pho/${productImgInput.files[0]?.name}`;
    imgName =productImgName;
    imgGroup.innerHTML = `<label for="productImgInput"><img style="height: 200px;" class="product-img rounded m-2" src="${productImgName}"  alt=""></label>`
}


// ************visit Website ******************
//******************** * validation************
function valid(element, alertId) {
    var msg = document.getElementById(alertId);
    var regEx = {
        productNameInput: /^[a-zA-Z 0-9 ]{2,}$/,
        productPriceInput: /^[0-9 ]{3,}$/,
        productCategoryInput: /^[a-z A-Z]{2,}$/,
    productDescriptionInput: /[\w\s]+/,

    };
    if (regEx[element.id].test(element.value) == true) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        msg.classList.add('d-none');
        return true;

    } else {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        msg.classList.remove('d-none');
        return false;
    }
}
