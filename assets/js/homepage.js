var repoContainerEl =document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var getUserRepos = function(user) {
  //format the github api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  //make a request to the url
  fetch(apiUrl).then(function(response) {
    response.json().then (function(data) {
      displayRepos(data,user);
    }); 
  });
};
getUserRepos("microsoft");

var userFormEL = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var formSubmitHandler = function(event) {
  event.preventDefault();

  //get the value from the input element
  var username = nameInputEl.value.trim();
  if (username) {
    getUserRepos(username);
    nameInputEl.value="";
  } else {
    alert ("Please eneter a Github username");
  }
  console.log(event);
};

userFormEL.addEventListener("submit", formSubmitHandler);

var displayRepos = function (repos, searchTerm) {
  console.log(repos);
  console.log(searchTerm);

  //clear old content
  repoContainerEl.textContent ="";
  repoSearchTerm.textContent = searchTerm;

  //loop over repos
  for (var i =0 ; i <repos.length; i++){
    //format repo ma,e
    var repoName = repos[i].owner.login + "/" + repos[i].name ;
    //creat a container for each repo

    var repoEl = document.createElement ("div");
    repoEl.classList = "list-item flex-tow justify-space-between align center";

    //create a span element to hodl repository name

    var titleEl = document.createElement("span");
    titleEl.textContent =repoName;

    //append to container
    repoEl.appendChild(titleEl);

    //create status element
    var statusEl = document.createElement("span");
    statusEl.classList ="flex-row align-center";
    //check if tcurrent repo has issues or not
    if (repos[i].open_issues_count > 0 ) {
      statusEl.innerHTML =
      "<i class ='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML ="<i class ='fas fa-check-square status-icon icon-success'></i>";
    }

    //append container to the dom
    repoContainerEl.appendChild(repoEl);

  
  }
  
};