var bookName=document.getElementById("bookName");
var bookUrl=document.getElementById("bookUrl");
var btnSubmit=document.getElementById("btnSubmit");
var tableInfo=document.getElementById("tableInfo");

var sitesList=[];

if(localStorage.getItem("sitesList")==null)
{
    sitesList=[];
}
else
{
    sitesList=JSON.parse(localStorage.getItem("sitesList")) ;
    displaySites()
}
// ~----------------------------- Add a Site---------------------------- 

function add()
{
    if(nameChecker()&&urlChecker())
    {
        var site={
            name:bookName.value,
            url:bookUrl.value,
        }
        sitesList.push(site);
        localStorage.setItem("sitesList",JSON.stringify(sitesList));
        displaySites();
        clear();}
        else
        {
            swal({
                icon:"error",
                title: "Site Name or Url is not valid, Please follow the rules below :",
                text: `1-Site name must contain at least 3 characters
                2-Site URL must be a valid one`,
                type: "error",
                confirmButtonText: "Cool"
              });

        }
    
   
}

// ~----------------------------- Display Sites---------------------------- 

function displaySites()
{
    var cartona="";
    for(var i=0;i<sitesList.length;i++)
    {
        cartona+=`
        <tr> 
            <td>${i+1}</td>
            <td class="text-capitalize">${sitesList[i].name}</td>
            <td>
            <a href="${sitesList[i].url}">
            <button class="btn btn__visit">
             <i class="fa-solid fa-eye pe-2"></i>
             Visit
            </button>
            </a>
            </td>
            <td>
            <button class="btn btn__delete" onclick="deleteSite(${i})">
            <i class="fa-solid fa-trash-can"></i>
             Delete
            </button>
            </td>
        </tr>
        `
    }

    tableInfo.innerHTML=cartona;
}

// ~----------------------------- Delete Site ---------------------------- 
function deleteSite(num)
{
    sitesList.splice(num,1);
    localStorage.setItem("sitesList",JSON.stringify(sitesList));
    displaySites();
}

// ~-----------------------------Clear Input Values ---------------------------- 

function clear()
{
    bookName.value="";
    bookUrl.value="";
}

// ~----------------------------- Name Validation---------------------------- 

function nameChecker()
{
    var regexName=/^[A-Za-z]{3,}$/;

    if(regexName.test(bookName.value))
    {
        bookName.classList.replace("is-invalid","is-valid")
        return true;
    }
    else
    {
        bookName.classList.add("is-invalid")
        return false;
    }

}

// ~----------------------------- URL Validation ---------------------------- 

function urlChecker()
{
    var regexUrl=/^(https:\/\/)?(www\.)?[A-Za-z0-9_\.]{1,}\.[a-z]{3}$/;

    if(regexUrl.test(bookUrl.value))
    {
        bookUrl.classList.replace("is-invalid","is-valid")
        return true;
    }
    else
    {
        bookUrl.classList.add("is-invalid")
        return false;
    }


}