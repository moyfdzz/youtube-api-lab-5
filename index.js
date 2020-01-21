function fetchVideos() {
    let userInput = $('#userInput').val();
    let apiKey = 'AIzaSyDiQtgSkoS73Sg6DY5nr_CKm0gnbHRbIbo';
    let baseURL = `https://www.googleapis.com/youtube/v3`;
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${userInput}&type=video&maxResults=10&key=${apiKey}`;
    //https://www.googleapis.com/youtube/v3/search?part=snippet&q=$Trump&type=video&videoCaption=closedCaption&key=AIzaSyDiQtgSkoS73Sg6DY5nr_CKm0gnbHRbIbo

    $.ajax({
        url : url,
        method : "GET",
        dataType : "json",
        success : function(responseJSON) {
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
    $("#results").empty();

    videos.forEach((video) => {
        let videoID = video.id.videoId;
        let videoTitle = video.snippet.title;
        let img = video.snippet.thumbnails.medium.url;
        let url = `https://www.youtube.com/watch?v=${videoID}`;

        results.append(`<div class="video">
            <a href="${url}" target="_blank"> ${videoTitle} </a>
            <a href="${url}" target="_blank"> <img src=${img} /> </a>
        </div>`);
    })
}

function watchForm() {
    let form = $('#videos');

    form[0].addEventListener('submit', (event) => {
        event.preventDefault();

        fetchVideos();
    });
}

function init() {
    watchForm();
}

init();