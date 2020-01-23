let req;

function fetchVideos(pageToken) {
    $('#results').empty();
    let userInput = $('#userInput').val();
    let apiKey = 'AIzaSyDiQtgSkoS73Sg6DY5nr_CKm0gnbHRbIbo';
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${userInput}&type=video&maxResults=10&key=${apiKey}&pageToken=${pageToken}`;

    if (userInput === '') {
        console.log("The user input is empty.");

        return;
    }

    $.ajax({
        url : url,
        method : "GET",
        dataType : "json",
        success : function(responseJSON) {
            req = responseJSON;
            displayResults(responseJSON);
        },
        error : function(err) {
            console.log(err);
        }
    });
}

function displayResults(responseJSON) {
    let videos = responseJSON.items;
    let results = $("#results");

    videos.forEach((video) => {
        let videoID = video.id.videoId;
        let videoTitle = video.snippet.title;
        let img = video.snippet.thumbnails.medium.url;
        let url = `https://www.youtube.com/watch?v=${videoID}`;

        results.append(`<div class="video">
            <p> <a href="${url}" target="_blank">${videoTitle}</a> </p>
            <a href="${url}" target="_blank"> <img src=${img} /> </a>
        </div>`);
    });
}

function buttons() {
    $('#prevButton').on('click', (event) => {
        if(req.hasOwnProperty('prevPageToken')) {
            fetchVideos(req.prevPageToken);
        }
    });

    $('#nextButton').on('click', (event) => {
        if(req.hasOwnProperty('nextPageToken')) {
            fetchVideos(req.nextPageToken);
        }
    });
}

function watchForm() {
    let form = $('#videos');

    form[0].addEventListener('submit', (event) => {
        event.preventDefault();

        $('#prevButton').toggleClass('hideButtons');
        $('#nextButton').toggleClass('hideButtons');
        
        fetchVideos('');
    });
}

function init() {
    watchForm();
    buttons();
}

init();