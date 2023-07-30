const inputSearch = document.querySelector("[data-inputSearch]");
const btnSubmit = document.querySelector(".submit-btn");
const url = "https://api.github.com/users/";
const profileImg = document.querySelector(".profile-img");
const profileName = document.querySelector(".name");
const joinedDate = document.querySelector(".joined-date");
const userLink = document.querySelector(".userLink");
const bio = document.querySelector(".bio");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
const repo = document.querySelector(".repo");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const user_location = document.querySelector(".location");
const blogLink = document.querySelector(".blog-Link");
const twitter = document.querySelector(".twitter-Link");
const company = document.querySelector(".company");
const noResult = document.querySelector(".no-results");
const themeBtn = document.querySelector(".themeBtn");
const themeText = document.querySelector(".themeText");
const themeIcon = document.querySelector(".themeIcon");
const root = document.documentElement.style;


let darkMode = false;


inputSearch.addEventListener("input", function(){
    noResult.classList.remove("active");

})

inputSearch.addEventListener("keydown", function(e) {
    if(!e){
        var e = window.event;
    }

    if(e.key == "Enter"){
       if(inputSearch.value !== ""){
            getUserData(url + inputSearch.value);
       }

    }
});

themeBtn.addEventListener("click", function() {
    if(darkMode === false){
        darkModeProperties();  
    }
    else{
        lightModeProperties();
    }
})




btnSubmit.addEventListener("click", function(){
    if(inputSearch.value !== ""){
        getUserData(url + inputSearch.value);
        // console.log(inputSearch.value);
    }
});

 async function getUserData (gitUrl){
    try {
        let response = await fetch(gitUrl);
        let data = await response.json();
        // console.log(data);
        updateProfile(data);
    } catch (error) {
        throw error;
    };
}

function init(){
    getUserData(url + "madhavxsingh");

    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //     // User prefers dark mode
    //     darkModeProperties();
    //   } else {
    //     // User prefers light mode
    //     lightModeProperties();
    //   }
      
    const preferDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if(localStorage.getItem("dark-mode") === null){

        if(preferDarkMode){
            darkModeProperties();
        }
        else{
            lightModeProperties();
        }
    }
    else{
        if(localStorage.getItem("dark-mode") === "true"){
            darkModeProperties();
        }
        else{
            lightModeProperties();
        }
    }

}
init();


function updateProfile(data){
    if(data.message !== "Not Found"){
        noResult.classList.remove("active");
   
        function checkNull(param1, param2){
            if(param1 === "" || param1 === null){
            param2.style.opactiy = 0.5;
            param2.previousElementSibling.style.opactiy = 0.5;
            return false;
            }
            else{
            return true;
            }
        }

    profileImg.src = `${data.avatar_url}`;

    profileName.innerText = data.name === "null" ? data.login : data.name;
    datesegment  = data.created_at.split("T").shift().split("-");
    joinedDate.innerText = `Joined ${datesegment[2]} ${months[datesegment[1]-1]} ${datesegment[0]}`;
    userLink.innerText = `@${data.login}`;
    userLink.href = `${data.html_url}`;
    bio.innerText = data.bio === null ? "This profile has no bio " : data.bio;

    repo.innerText = data.public_repos;

    followers.innerText = data.followers;
    following.innerText = data.following;
    user_location.innerText = checkNull(data.location, user_location) ? data.location : "Not Available";
    blogLink.innerText = checkNull(data.blog, blogLink) ? `${data.blog}` : "Not Available";
    blogLink.href = checkNull(data.blog, blogLink) ? data.blog : "#";

    twitter.innerText = checkNull(data.twitter_username, twitter) ? `${data.twitter_username}` : "Not Available";
    twitter.href = checkNull(data.twitter_username, twitter) ?  `https://twitter.com/${data.twitter_username}` : "#" ; 
    company.innerText = checkNull(data.company, company) ? `${data.company}` : "Not Available";

}
else{
    noResult.classList.add("active");
    setTimeout(function(){
        noResult.classList.remove("active");
    },3000)
}

}

function darkModeProperties(){
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)")
    themeText.innerText = "LIGHT";
    themeIcon.src = "./images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
    localStorage.setItem("dark-mode", "true")
}

function lightModeProperties(){
    root.setProperty("--lm-bg", "#f6f8ff");
    root.setProperty("--lm-bg-content", "#fefefe");
    root.setProperty("--lm-text", "4b6a9b");
    root.setProperty("--lm-text-alt", "2b3442");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)")
    themeText.innerText = "DARK";
    themeIcon.src = "./images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", "false");
}