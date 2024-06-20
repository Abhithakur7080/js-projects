// get heroInfo from localStorage
let heroInfo = JSON.parse(localStorage.getItem("heroInfo"));
// get favoriteContainer from localStorage
let favInfo = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")))

const singleContainer = document.getElementById('singleContainer');

var title = document.getElementById('title');
var photo = document.getElementById('photo');
var desc = document.getElementById('desc');
var comics = document.getElementById('comics');
var series = document.getElementById('series');
var stories = document.getElementById('stories');

console.log(heroInfo);
// set name
title.innerHTML = heroInfo.name;

// set title of page
document.title = heroInfo.name;

// set photo
photo.setAttribute("src", heroInfo.squareImage);

// set description
if(heroInfo.description){
    desc.innerHTML = heroInfo.description;
}
else{
    desc.innerHTML = "No Description Available"
}

// set comics count
if(heroInfo.comics){
    comics.innerHTML = heroInfo.comics;
}
else{
    comics.innerHTML = "No Comics here"
}

// set series count
if(heroInfo.series){
    series.innerHTML = heroInfo.series;
}
else{
    series.innerHTML = "No Series here"
}
// set stories count
if(heroInfo.stories){
    stories.innerHTML = heroInfo.stories
}
else{
    stories.innerHTML = "No Stories here"
}

// call and set add to favoriteContainer
document.addEventListener('click', e => {
    let target = e.target;

    if(target.classList.contains("fav")){
        addToFavourite(target);
    }
})

// function for add to favoriteContainer
function addToFavourite(e){
    // check if class available then go to add card else card is allready added
    if(e.classList.contains('plus')) {
        // get item in favoriteContainer or not if null then add this superhero to favoriteContainer else render data
        let favouritesArray = localStorage.getItem("favouriteCharacters");
        if (favouritesArray == null) {
            favouritesArray = [];
        }
        else {
            favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
        }
        // parse the to json from localStorage
        let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
        if (favouritesCharacterIDs == null) {
            favouritesCharacterIDs = new Map();
        }
        else {
            favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
        }
        // set the id will available and set true
        favouritesCharacterIDs.set(heroInfo.id, true);
        
        favouritesArray.push(heroInfo);
        // stringify the data from localStorage to string format
        localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
        
        // set to the Array
        localStorage.setItem("favouriteCharacters", JSON.stringify(favouritesArray));
        // set some css here
        e.setAttribute('class', 'fav minus')
        e.innerHTML = "Added"
    }
    else {
        // parse the to json from localStorage
        let favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
        let favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
        let newFavouritesArray = [];
        // if available then delete
        favouritesCharacterIDs.delete(`${heroInfo.id}`);
        favouritesArray.forEach((favourite) => {
            if (heroInfo.id != favourite.id) {
                newFavouritesArray.push(favourite);
            }
        });
        // set to the new Array in string format
        localStorage.setItem("favouriteCharacters", JSON.stringify(newFavouritesArray));
        // stringify the data from localStorage to string format
        localStorage.setItem("favouritesCharacterIDs", JSON.stringify([...favouritesCharacterIDs]));
    }
}