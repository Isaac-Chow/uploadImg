var imagesObject=[];

function handleFileSelect(evt){
    var files=evt.target.files;

    for(var i = 0, f; f = files[i]; i++){
        if (!f.type.match("image.*")){
            continue;
        }

        var reader = new FileReader();

        reader.onload = function(e){
            displayImgData(e.target.result)
            addImage(e.target.result);
        };

        reader.readAsDataURL(f);
    }
}

function loadFromLocalStorage(){
    var images=JSON.parse(localStorage.getItem("images"))

    if(images&&images.length>0){
        imagesObject=images;

        displayNumberOfImgs();
        images.forEach(displayImgData);
    }
}

function addImage(imgData){
    imagesObject.push(imgData);
    displayNumberOfImgs();
    localStorage.setItem("images", JSON.stringify(imagesObject));
}

function displayImgData(imgData){
    var span=document.createElement("span");
    span.innerHTML=`<img class="thumb" src="${imgData}">`;
    document.getElementById("list").insertBefore(span,null);
    // addIcon(imgData);
}

function displayNumberOfImgs(){
    if(imagesObject.length>0){

        document.getElementById("state").innerHTML=imagesObject.length+"image"+((imagesObject.length>1)?"s":"") + "stored in your browser";
        document.getElementById("deleteImgs").style.display="inline";
    }else{
        document.getElementById("state").innerHTML="No images stored in your browser";
        document.getElementById("deleteImgs").style.display="none";
    }
}

function deleteImages(){
    imagesObject=[];
    localStorage.removeItem("images");
    displayNumberOfImgs()
    document.getElementById("list").innerHTML="";   
}

const iconLink = 'https://cdn-icons-png.flaticon.com/128/3706/3706340.png'

function addIcon(iconLink){
    var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    link.href = iconLink;
    document.getElementsByTagName('head')[0].appendChild(link);
}

addIcon(iconLink);

document.getElementById("file").addEventListener("change", handleFileSelect, false);
document.getElementById("deleteImgs").addEventListener("click", deleteImages);
loadFromLocalStorage();