// Author: Nicholas D'Amico
// Contact: nickalan82@icloud.com
// Checked project in:
// Treehouse Project 7: Interactive Video Player


///////////////////////////////////////////////////
// ELEMENT REFERENCES
///////////////////////////////////////////////////


// SELECT VIDEO PLAYER
var $video = $("#videoPlayer")[0];
// VIDEO CONTAINER
var $videoContainer = $('.video-container');
// SELECT PLAYER BUTTONS
var $controls = $('.controls');
var $pBar = $('#progressBar');
var $playBtn = $("#playBtn");
var $volBtn = $("#volumeBtn");
var $fullScreenBtn = $("#fullScreenBtn");

// HIDES CONTROLS AT START
$controls.hide();


///////////////////////////////////////////////////
// FUNCTIONS
///////////////////////////////////////////////////

/////////////////////////////////////////
// PLAY FUNCTION
/////////////////////////////////////////
function vidPlay() {
    // Check if video is paused state
    if ($video.paused) {
        // Call play method
        $video.play();
        $playBtn.fadeOut(function() {
            $playBtn.children().attr('src', 'icons/pause-icon.png');
        });
        // Replace play icon w/pause-icon
        $playBtn.fadeIn();
    } else {
        // Call pause method
        $video.pause();
        $playBtn.fadeOut(function() {
            $playBtn.children().attr('src', 'icons/play-icon.png');
        });
        // Replace pause-icon w/play-icon
        $playBtn.fadeIn();
    }
}

/////////////////////////////////////////
// FULLSCREEN FUNCTION
/////////////////////////////////////////
function fullScreen() {
    if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        if ($video.requestFullscreen) {
            $video.requestFullscreen();
        } else if ($video.msRequestFullscreen) {
            $video.msRequestFullscreen();
        } else if ($video.mozRequestFullScreen) {
            $video.mozRequestFullScreen();
        } else if ($video.webkitRequestFullscreen) {
            $video.webkitRequestFullscreen();
        }

    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}

/////////////////////////////////////////
// MUTE FUNCTION
/////////////////////////////////////////
function mute() {
    // CHECK VIDEO MUTED BOOLEAN
    if ($video.muted) {
        // IF 'TRUE', UN-MUTE AUDIO
        $video.muted = false;
        // REPLACE ICON W/ON-ICON.PNG
        $(this).children().attr('src', 'icons/volume-on-icon.png');
    } else {
        // IF 'FALSE', MUTE AUDIO
        $video.muted = true;
        // REPLACE ICON W/OFF-ICON.PNG
        $(this).children().attr('src', 'icons/volume-off-icon.png');
    }
}



/////////////////////////////////////////
// UPDATE TIME DISPLAY FUNCTION
/////////////////////////////////////////
function updateDisplayTime() {
    var currentTime = $video.currentTime;
    var $time = $('.time');
    if (currentTime < 10) {
        $time.html('00:0' + Math.floor(currentTime) + ' / 00:59');
    } else {
        $time.html('00:' + Math.floor(currentTime) + ' / 00:59');
    }
}

/////////////////////////////////////////
// UPATE CURRENT TIME FUNCTION
/////////////////////////////////////////
function updateTime(time) {
    $video.currentTime = time;
}

/////////////////////////////////////////
// FILLS PROGRESS BAR AS VIDEO PLAYS
/////////////////////////////////////////
function updateProgressBar(time) {
    $pBar.attr('value', time);
}

/////////////////////////////////////////
// CLICK AND SEEK ON PROGRESSBAR
/////////////////////////////////////////

function seekableProgressBar(x) {
    // VIDEO DURATION
    var maxDuration = $video.duration;
    // X = event.pageX CLICK POSITION
    var position = x - $pBar.offset().left;
    var percentage = Math.floor(maxDuration * position / $pBar.width());
    if (percentage > maxDuration) {
        percentage = 59;
    }
    if (percentage < 0) {
        percentage = 0;
    }

    updateProgressBar(percentage);
    updateTime(percentage);
}

/////////////////////////////////////////
// media playback time changes, sentences
// in  transcript should highlight.
/////////////////////////////////////////
function highlightTranscript(time) {
    var startTime,
        endTime,
        $transcript = $('p[class^="transcript"] span');

    $transcript.each(function() {
        startTime = $(this).attr('data-start-time');
        endTime = $(this).attr('data-end-time');
        if ($(this).attr('class') === 'highlight') {
            $(this).removeClass('highlight');
        }
        if (time >= startTime && time <= endTime) {
            $(this).addClass('highlight');
        }

    });

}



///////////////////////////////////////////////////
// EVENTS
///////////////////////////////////////////////////

// EVENT 'CLICK' PLAY BTN
$playBtn.on('click', vidPlay);

// EVENT 'CLICK' FULLSCREEN BTN
$fullScreenBtn.on('click', fullScreen);

// EVENT 'CLICK' MUTE BUTTON
$volBtn.on('click', mute);

// EVENT 'MOUSEENTER' VIDEO CONTAINER SHOWS CONTROLS
$videoContainer.mouseenter(function() {
    $controls.fadeIn(300);
});

// EVENT 'MOUSEENTER' VIDEO CONTAINER HIDES CONTROLS
$videoContainer.mouseleave(function() {
    $controls.fadeOut(300);
});

///////////////////////////////////////////////////
// PROGRESS BAR EVENTS
///////////////////////////////////////////////////

// UPDATES PROGRESS BAR ELEMENT MAX VALUE PROP ON LOAD
$video.addEventListener('loadedmetadata', function() {
    var length = $video.duration;
    $pBar.attr('max', length);
});

// EVENT ON 'TIMEUPDATE'.
//UPDATES PROGRESS BAR AND TIME
$video.addEventListener('timeupdate', function() {
    var time = $video.currentTime;
    updateProgressBar(time);
    updateDisplayTime();
    highlightTranscript(time);
}, false);

// EVENT 'CLICK' ON PROGRESS BAR ELEMENT
$pBar.on('mousedown', function(e) {
    seekableProgressBar(e.pageX);
});

///////////////////////////////////////////////////
// TRANSCRIPT EVENT CLICK
///////////////////////////////////////////////////
