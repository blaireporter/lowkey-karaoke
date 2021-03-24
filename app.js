const app = {};

app.getLyrics = function(artist, title){
    $.ajax({
        url: `https://api.lyrics.ovh/v1/${artist}/${title}/`,
        method: 'GET',
        dataType: 'JSON',
    }).then(function(response){
        $('.lyrics-container').empty();
        app.displayLyrics(response)
    });
}

app.getDetails = function(){
    const artistInput = $('#artistInput');
    const songInput = $('#songInput');
    $('form').on('submit',function(event){
        event.preventDefault();
        $('.lyrics-container').empty();
        const artist = artistInput.val();
        const song = songInput.val();
        app.getLyrics(artist, song);
    })
    $('form').trigger("reset");
};


app.displayLyrics = function(lyricsData){
      const htmlToAppend = `
        <div class="lyrics">
            <p class="lyrics">${lyricsData.lyrics}</p>
        </div>
      `;
      $('.lyrics-container').append(htmlToAppend);
}

app.init = function () {
    app.getDetails();
    app.getLyrics();    
}

$(document).ready(function(){
    app.init();
});