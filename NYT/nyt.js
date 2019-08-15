const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //1
const key = 'nX4ndAkoSNvb77YfcUpwLQlvl8YrTxA8'; //2
let url; //3

// 1: Here we declare the baseURL of the API. This is the required API endpoint for the New York Times data.

// 2: Don't just mindlessly copy: You need to take the API Key that was emailed to you and put this in the value of the key variable. This will let the NYT know exactly what user is using their API.

// 3: We'll see later how we use the let url variable. We'll use it to make a dynamic search url.


//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

//RESULTS SECTION
const section = document.querySelector('section');

// Variable
nav.style.display = 'none';

// Pagination and Display
let pageNumber = 0;
console.log('PageNumber:', pageNumber);
let displayNav = false;

// Event Listeners
        //1                     //2   
searchForm.addEventListener('submit', fetchResults); 
nextBtn.addEventListener('click', nextPage); //3
previousBtn.addEventListener('click', previousPage); //3

// HERE'S HOW THIS WORKS:
// 1: First of all, remember that the searchForm variable targets the form element in the html page: ||const searchForm = document.querySelector('form'); || We use the searchForm variable and call the addEventListener method on it. We want to listen for things happening on the particular element, which in this case is the searchForm.

// 2: The event that we're looking for is the submit event. This is an HTML form event. Note that the submit event fires on a form, not a button (Links to an external site.). When this event happens (the form is submitted by pressing the submit button), we will fire off a function called fetchResults, the second parameter in the function.

// 3: The same is true for the other two items, except that they called are click events. When we click on the next button, we fire off a function called nextPage. When we click on the previous button, we run previousPage.

// EXTRA: Note that the click event is fired when a pointing device button (usually a mouse's primary button) is pressed and released on a single element.

// Fetch Results
// Accessing a REST API
                    //1
function fetchResults(e) {
    // console.log(e); //2
    e.preventDefault(); //1**
    // Assemble the full URL
    // url = baseURL + key + pageNumber + searchTerm.value;
    //ERROR//
    // index.html:1 Access to fetch at 'https://api.nytimes.com/svc/search/v2/articlesearch.jsonnX4ndAkoSNvb77YfcUpwLQlvl8YrTxA80sports' from origin 'null' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.
    // GET https://api.nytimes.com/svc/search/v2/articlesearch.jsonnX4ndAkoSNvb77YfcUpwLQlvl8YrTxA80sports net::ERR_FAILED
    // Uncaught (in promise) TypeError: Failed to fetch
    
    url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value; //3
    // console.log(url); //4
    console.log("URL:", url);
    //TWO CONDITIONALS
    //Start
    if(startDate.value !== '') {
        console.log(startDate.value)
        url += '&begin_date=' + startDate.value;
    };

    if(endDate.value !== '') {
        url += '&end_date=' + endDate.value;
    }
    //End

    //6
    fetch(url)
        .then(function(result) {
            // console.log(result)
            return result.json(); //7
        }).then(function(json) {
            console.log(json); //8
            displayResults(json); //9 & //11
        });
}

//10
function displayResults(json) {
    // console.log("DisplayResults", json);
    // console.log(json.response.docs);
    let articles = json.response.docs;
    // console.log(articles);
    while (section.firstChild) {
        section.removeChild(section.firstChild); //22
    }
    if (articles.length === 0) {
        console.log("No results");
    } else {
        //Display the data
        for (let i = 0; i < articles.length; i++) {
            // console.log(i);
            let article = document.createElement('article'); //12
            let heading = document.createElement('h2'); //13
            let link = document.createElement('a'); //16
            let img = document.createElement('img'); //32
            let para = document.createElement('p'); //23
            let clearfix = document.createElement('div'); //24

            let current = articles[i]; //17
            console.log("Current:", current); //18

            link.href = current.web_url; //19
            link.textContent = current.headline.main; //20

            para.textContent = 'Keywords: '; //25

            //26
            for (let j = 0; j < current.keywords.length; j++) {
                //27
                let span = document.createElement('span');
                    //Required Experimentation
                    // let span = document.createElement('p'); //<---Run this instead of let span = document.createElement('span'); above
                    // What happens in your search results when you run the code?
                    // What do you see in the 'elements' tab in Chrome tools?
                //28
                span.textContent += current.keywords[j].value + ' ';
                //29
                para.appendChild(span);
            }

            //33
            if(current.multimedia.length > 0) {
                //34
                img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
                //35
                img.alt = current.headline.main;
            }

            //30
            clearfix.setAttribute('class','clearfix');

            article.appendChild(heading); //14
            heading.appendChild(link); //21
            article.appendChild(img); //36
            article.appendChild(para); //31
            article.appendChild(clearfix); //31
            section.appendChild(article); //15
        }
    }

    if (articles.length === 10 && pageNumber > 0) {
        nav.style.display = 'block'
        previousBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    } else if (articles.length <= 10 && articles.length > 0 && pageNumber > 0) {
        nav.style.display = 'block'
        previousBtn.style.display = 'block';
        nextBtn.style.display = 'none';
    } else if(articles.length === 10 && pageNumber === 0) {
        nav.style.display = 'block'
        previousBtn.style.display = 'none';
        nextBtn.style.display = 'block';
    } else {
        nav.style.display = 'none';
    };
    //03-12-18 to 03-16-18 search = 90 hits
    
    // if (articles.length === 10) {
    //     nav.style.display = 'block'; //shows the nav display if 10 items are in the array
    // } else {
    //     nav.style.display = 'none'; //hides the nav display if less than 10 items are in the array
    // }
};

// nextPage()
function nextPage(e) {
    pageNumber++; //37
    fetchResults(e); //38
    console.log("Page number:", pageNumber); //39
};

// previousPage()
function previousPage(e) {
    if (pageNumber > 0) { //40
    pageNumber--; //41
    } else {
        return; //42
    }
    fetchResults(e); //43
    console.log("Page:", pageNumber); //44
}

// function nextPage() {
//     console.log("Next button clicked");
// } //5

// function previousPage() {
//     console.log("Next button clicked");
// } //5


/*-----------------------------------------------------------HERE IS WHAT HAPPENENING-----------------------------------------------------------*/
// 1: The little (e) is part of something in Javascript called an event handling function. Every event handling function receives an event object. For the purpose of this discussion, think of an object as a "thing" that holds a bunch of properties (variables) and methods (functions). The handle, the e, is similar to a variable that allows you to interact with the object.

// 2: We are logging the event object so that you can look at it in the console for learning purposes.

// 3" We are creating a versatile query string. The url variable is loaded with other variables and url requirements. We have our base for the API, our key, the page number that corresponds to the results array, and our specific value. Something to study on your own might be: ?, &, and &q= in a URL string. What are those?

// 4: We log the string so that we can see it. Later on, you can try another search and see how it changes.

// 5: We add in a few basic functions to define nextPage and previousPage and log them. If you leave out this step, your app will get an error.

// 1** We add the preventDefault method to make sure that a request isn't actually sent. In other words, even though we tell our code to submit the data, we don't actually want data to be submitted anywhere. This isn't a form where we are signing up for something or filling out data to be saved in a database. That is the default nature of a form element: to submit data, to send a POST request.

// 6: Remember that fetch is a reserved keyword in JavaScript that allows us to make a request for information, similar to using a GET request with HTTP. The url is given to fetch as a parameter, which sends the request to the url.

// 7: Meanwhile, it creates a promise containing a result object. This is our response. Remember that we use promises when we have asynchronous, long-running operations. The fetch gets the network resource, which might take a long time to resolve. It will convert the response into a json object by returning the result.json function.

// 8: That json object is used in another promise (set off by the second .then) to send the information received to another function. For now, we'll use console.log(json) to see the json data.
/* ----------------------------------------------------------------------------------------------------------------------------------------------
// SAY THAT AGAIN?
// Let's go through that again:

// 1: We make the fetch request.
// 2: We pass in the NYT url.
// 3: We create a promise .then that returns a response object called result.
// 4: The promise asynchronously returns a function that converts the result into usable json format - result.json() is that function call.
// 5: We create a second promise that has a function that takes in the json object.
// 6: We log the json object for now.
------------------------------------------------------------------------------------------------------------------------------------------------*/

// 9: We've taken out the console.log in our fetch and replaced it with displayResults(json).

// 10: We moved the console.log to a displayResults() function.

// 11: Now, just to recap: when the Promise returns the json, we fire off a function called displayResults that will work to manage that data.

// 12: We create an article variable that will create a node in the DOM that is an article element. Remember that article is an HTML5 element.

// 13: We also create a heading variable that creates a node in the DOM that is an h2 element.

// 14: We call appendChild() on the article element. This will create a child node on that element. We pass in heading to the appendChild method. This means that there will be an h2 element created inside each article element.

// 15: Since we have a section in our original html file, we call the appendChild() method on the section element. We pass in the article to that. This way, the article is a child of section, and the h2 is a grandchild of section.

// 16: We create a link variable that is going to use the a element, the anchor tag which will allow us to create an 'href' link.

// 17: We create a current variable that holds the data of the current article as we iterate.

// 18: We log the current data so that we can see it in the console.

// 19: Since link is an a element, we need to attach an href property to it. current.web_url grabs the hyperlink for the current article out of the json result. This will set the value for the link.href each time we iterate.

// 20: The text that we'll use in link.textContent is set to the value of current.headline.main, which is part of the json object from the NYT API. You can see this when you drill down into the data: 

// 21: Finally, we call the appendChild method on the heading element again. This will append a link as a child element in the DOM inside of each h2. See the screenshot for orientation: 

// 22: We run the displayResults function each time the button gets pressed. In this chunk of code, we are checking to see if the section element has any child elements. If the section.firstChild is true, then we call removeChild on the section variable, which targets the section element in the html file. This simply will clear out any child elements that are in the section.
/* ----------------------------------------------------------------------------------------------------------------------------------------------
// TEST
// Test the app by doing the following:

// 1: Open the app.
// 2: Open Chrome tools on the "elements" tab.
// 3: Do a search and get the results.
// 4: Without refreshing the page, do another search.
// 5: You should see the elements in the section disappear, and the new elements should be created.
------------------------------------------------------------------------------------------------------------------------------------------------*/

// 23: We've declared a paragraph variable that will append a p tag to the DOM to be used for some of our JSON data.

// 24: We're declaring a clearfix variable that will later on append a div to the DOM. More on that later.

// 25: We are adding the textContent attribute to our para variable. Each result will show this at the start of the p tag that is created by para.

// 26: Now, we have a for loop inside of our for loop. We are using this nested loop to iterate over the current object, specifically the keywords array for that object. If you look through the JSON results, you'll see that keywords is a property of the entire object, and it's an array. Here, we iterate through the length of the array for the current result object.

// 27:As we iterate, we create a <span> for each keyword. If you don't already know, a <span> will be an element that will end when the item ends. So, the <span> of Pizza will start at the P and end at the a. If we were to use a p tag here, it would cover the entirity of the parent object.

// 28: The textContent for each <span> will be the value found inside the keywords array inside the JSON object.

// 29: We append each <span> to the para node.

// 30: Remember that we still have an outer loop and printing the results. Here, we're using the setAttribute method to target our clearfix class. It's a class in the CSS file.

// 31: We add clearfix & para as children of article

// 32: We add an img variable that will create an image element.

// 33: We use a conditional to check the JSON for data. There is a multimedia property in the JSON. You should go look for it in the json. If that has anything in it (if the length is greater than 0), then, we'll do some stuff in the next steps.

// 34: If there is an object, we want to concatenate a string with the url for the html src value. We will add the first item in the multimedia array: current.multimedia[0].url. That is all confusing, so it helps here to think about a regular old image tag: <img src="www.myimage.com/54757578" alt="My Image" />. We are building that for each result item.

// 35: We need an alt if something should happen that the image isn't available. We set it to the value of the headline.

// 36: We append the image to the article element for each of our items.

// 37: We first increase the value of the pageNumber variable.

// 38: We rerun the fetchResults function.

// 39: We print the pageNumber variable so that we can see it increment.

// 40: We have to account for the user being on the first page (page 0), as a pageNumber of -1 would cause an error.

// 41: If the page number is over 0, we decrement the page number by 1.

// 42: If the value is 0, however, we return nothing and get out of the function, thus ensuring that the value won't drop below 0.

// 43: If the value wasn't 0 and we've decremented the page number, we run fetchResults again.