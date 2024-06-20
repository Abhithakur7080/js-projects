const searchInput = document.getElementById('searchInput');
const searchbtn = document.getElementById('searchbtn');
const favoriteContainer = document.getElementById('favorites');
const resultContainer = document.getElementById('resultContainer');

// search function to search a superhereo
searchbtn.addEventListener('click', () => {
    const superheroName = searchInput.value.trim();
    if (superheroName !== '') {
        searchSuperhero(superheroName);
    }
    else {
        resultContainer.innerHTML = ""
    }
});
// on press enter then also search 
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchSuperhero(searchInput.value.trim());
    }
});

// fetch data from marvel api
function searchSuperhero(superheroName) {
    const apiUrl = "https://gateway.marvel.com/v1/public/characters?nameStartsWith=" + superheroName + "&limit=8&ts=1&apikey=ef72f3e381e8392846544ea3fca89239&hash=47b1bb41804713b64ec5ff24ae0390a8";

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            displaySuperhero(data.data.results);
        })
        .catch(err => {
            console.log('Error:', err);
            displayErrorMessage();
        });
}

// on displaying the searched data of superheroes
function displaySuperhero(searchedSuperhero) {
    // check data from localStorage is added or not if added show added behavior else not added behavior
    let favouritesCharacterIDs = localStorage.getItem("favouritesCharacterIDs");
    // if null then set new data
    if (favouritesCharacterIDs == null) {
        favouritesCharacterIDs = new Map();
    }
    else if (favouritesCharacterIDs != null) {
        favouritesCharacterIDs = new Map(JSON.parse(localStorage.getItem("favouritesCharacterIDs")));
    }
    resultContainer.innerHTML = '';

    let count = 1;
    for (const key in searchedSuperhero) {
        if (count <= 5) {
            // render data in Array form
            let superhero = searchedSuperhero[key];
            resultContainer.innerHTML +=
                `<li class="superhero">
                    <div class="container">
                         '<i class="${favouritesCharacterIDs.has(`${superhero.id}`) ? "heart-icon fa-solid fa-heart fill" : "heart-icon fa-solid fa-heart unfill"}"></i>
                        <img src="${superhero.thumbnail["path"] + "." + superhero.thumbnail["extension"]}">
                        <div class="header">${superhero.name}</div>
                        <span class="superhero-info">see details</span>
                    </div>
                    <button class="${favouritesCharacterIDs.has(`${superhero.id}`) ? "fav minus" : "fav plus"}">${favouritesCharacterIDs.has(`${superhero.id}`) ? "Added" : "+ Add to Favorite"}</button>
                     
                    <div style="display:none;">
                         <span>${superhero.name}</span>
                         <span>${superhero.description}</span>
                         <span>${superhero.comics.available}</span>
                         <span>${superhero.series.available}</span>
                         <span>${superhero.stories.available}</span>
                         <span>${superhero.thumbnail.path + '/portrait_uncanny.' + superhero.thumbnail.extension}</span>
                         <span>${superhero.id}</span>
                         <span>${superhero.thumbnail.path + '/landscape_incredible.' + superhero.thumbnail.extension}</span>
                         <span>${superhero.thumbnail.path + '/standard_fantastic.' + superhero.thumbnail.extension}</span>
                    </div>
            </li>`
        }
        count++;

    }
}
//toggle the pages rendered using class
document.addEventListener('click', e => {
    let target = e.target;
    if (target.classList.contains("fav")) {
        addToFavourite(target);
    }
    if (target.classList.contains("superhero-info")) {
        openSinglePage(target);
        window.open("./single.html", "_blank");
    }
})
// add to favourite function to set the superhero to favourite
function addToFavourite(e) {
    // get information of a superhero which is to be added
    let heroInfo = {
        name: e.parentElement.children[2].children[0].innerHTML,
        description: e.parentElement.children[2].children[1].innerHTML,
        comics: e.parentElement.children[2].children[2].innerHTML,
        series: e.parentElement.children[2].children[3].innerHTML,
        stories: e.parentElement.children[2].children[4].innerHTML,
        portraitImage: e.parentElement.children[2].children[5].innerHTML,
        id: e.parentElement.children[2].children[6].innerHTML,
        landscapeImage: e.parentElement.children[2].children[7].innerHTML,
        squareImage: e.parentElement.children[2].children[8].innerHTML
    }
    // check if class available then go to add card else card is allready added
    if (e.classList.contains('plus')) {
        console.log("add");
        // get item in favoriteContainer or not if null then add this superhero to favoriteContainer else render data
        let favouritesArray = localStorage.getItem("favouriteCharacters");
        if (favouritesArray == null) {
            favouritesArray = [];
        }
        else {
            favouritesArray = JSON.parse(localStorage.getItem("favouriteCharacters"));
        }
        // parse the to json from localStorage
        let favouritesCharacterIDs = JSON.parse(localStorage.getItem("favouritesCharacterIDs"));
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
        e.setAttribute('class', 'minus');
        e.innerHTML = 'Added';
        e.parentElement.children[0].children[0].style.color = "red";
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
        e.setAttribute('class', 'plus');
    }
}

//onclick open information page
function openSinglePage(e) {
    // get info from searchedSuperhero
    let heroInfo = {
        name: e.parentElement.parentElement.children[2].children[0].innerHTML,
        description: e.parentElement.parentElement.children[2].children[1].innerHTML,
        comics: e.parentElement.parentElement.children[2].children[2].innerHTML,
        series: e.parentElement.parentElement.children[2].children[3].innerHTML,
        stories: e.parentElement.parentElement.children[2].children[4].innerHTML,
        portraitImage: e.parentElement.parentElement.children[2].children[5].innerHTML,
        id: e.parentElement.parentElement.children[2].children[6].innerHTML,
        landscapeImage: e.parentElement.parentElement.children[2].children[7].innerHTML,
        squareImage: e.parentElement.parentElement.children[2].children[8].innerHTML
    }
    //set data to the locastorage in string format
    localStorage.setItem("heroInfo", JSON.stringify(heroInfo));
}
// dispaly error message if error in searching
function displayErrorMessage() {
    resultContainer.innerHTML = `<li id="error"> Superhero not Found!! <li>`;
}
