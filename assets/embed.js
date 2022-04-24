"use stric";
console.log("Extension YFW ready");
var teatro = false;
var yfw_init = false;

function open_full_windowed() {
    localStorage.yfw = "true";
    document.body.classList.add('yfw');
    // window.addEventListener("resize", resize_controls);
    // if (document.querySelector('ytd-watch-flexy').theater == false) {
    console.log(document.querySelector('ytd-watch-flexy').getAttribute('theater'))
    console.log(document.querySelector('ytd-watch-flexy').theater)
    if (document.querySelector('ytd-watch-flexy').getAttribute('theater') == null) {
        document.querySelector('.ytp-size-button').click();
    }
    document.getElementById("yfw_button").innerHTML = icon_min;
    window.dispatchEvent(new Event('resize'));
    if (document.activeElement != document.body) document.activeElement.blur();
}

function close_full_windowed() {
    localStorage.yfw = "false";
    document.body.classList.remove('yfw');
    // window.removeEventListener("resize", resize_controls);
    document.getElementById("yfw_button").innerHTML = icon_max;
    window.dispatchEvent(new Event('resize'));
    if (document.activeElement != document.body) document.activeElement.blur();
    if (!teatro) {
        document.querySelector('.ytp-size-button').click();
    }
}

function set_theater() {
    if (document.querySelector('ytd-watch-flexy').getAttribute('theater') == null) {
        teatro = false;
    } else {
        teatro = true;
    }
}

function init() {
    if (yfw_init == false) {

        if (localStorage.yfw == undefined) {
            localStorage.yfw = "false";
        }

        set_theater();

        document.querySelector('.ytp-size-button').addEventListener('click', function(e) {
            set_theater();
        });

        if (document.getElementById("yfw_button")) {
            var button = document.getElementById("yfw_button");
        } else {
            var button = document.createElement('button');
        }

        button.innerHTML = icon_max;
        button.setAttribute('id', 'yfw_button');
        button.setAttribute('class', 'ytp-full-windowed-button ytp-button');
        //button.setAttribute('title', 'Full Windowed');
        button.onclick = function() {
            if (localStorage.yfw == "true") {
                close_full_windowed();
            } else {
                open_full_windowed();
            }
        }

        // button.addEventListener('click', function(e) {
        //     if (localStorage.yfw == "true") {
        //         close_full_windowed();
        //     } else {
        //         open_full_windowed();
        //     }
        // });
        // document.querySelector('.ytp-chrome-controls .ytp-right-controls').childNodes[1].insertAdjacentElement('afterend', button);

        document.querySelector('.ytp-button.ytp-settings-button').insertAdjacentElement('afterend', button);
        document.body.addEventListener('keyup', function(e) {
            if (location.pathname == "/watch") {

                if (e.keyCode == 84) {
                    if (localStorage.yfw == "true") {
                        if (document.querySelector('ytd-watch-flexy').getAttribute('theater') == null) {
                            document.querySelector('.ytp-size-button').click();
                        }
                    }else{
                        set_theater();
                    }
                }

                if (e.keyCode == 27) {
                    if (localStorage.yfw == "true") {
                        close_full_windowed();
                    }
                }

                if (e.keyCode == 87 && e.shiftKey) {
                    var target = e.target.id;
                    if (target != "search" && target != "contenteditable-root") {
                        if (localStorage.yfw == "false") {
                            open_full_windowed();
                        } else {
                            close_full_windowed();
                        }
                    }
                }

            }

        });
    }

    yfw_init = true;

    if (location.pathname == "/watch") {
        if (localStorage.yfw == "true") {
            open_full_windowed();
        }
    }

    if (location.pathname == "/") {
        close_full_windowed();
    }
}

function resize_controls() {
    if (localStorage.yfw == "true") {
        setTimeout(function() {
            var width = window.innerWidth;
            var controls = document.querySelector(".ytp-chrome-bottom");
            var controls_width = controls.style.width;
            controls_width = (controls_width).substring(0, controls_width.length - 2);
            if (controls_width < width) {
                controls.style.left = ((width - controls_width) / 2) + "px";
            } else {
                controls.style.left = "0px";
            }
        }, 500);
    }
}
// document.querySelector('ytd-watch').getAttribute('theater')
//Old check theather
// document.querySelector('.ytp-size-button').childNodes[0].innerHTML.includes("d=\"m 26,13 0,10 -16,0 0,-10 z m -14,2 12,0 0,6 -12,0 0,-6 z\"")

// window.addEventListener("spfdone", process); // old youtube design
// window.addEventListener("yt-navigate-start", process); // new youtube design

// document.addEventListener("DOMContentLoaded", process); // one-time early processing
// window.addEventListener("load", postProcess); // one-time late postprocessing 
// body.addEventListener("yt-navigate-finish", function(event) {

// window.addEventListener("yt-navigate-start", process); // new youtube design

// document.addEventListener("DOMContentLoaded", process); // one-time early processing
// window.addEventListener("load", postProcess); // one-time late postprocessing 

//document.addEventListener("DOMContentLoaded", init); 

// document.addEventListener("DOMContentLoaded", function() {
//     console.log("DOMContentLoaded");
//     window.dispatchEvent(new Event('yt-navigate-finish'));

// });

//FORCE INIT
document.body.addEventListener("yt-navigate-start", init);
document.body.addEventListener("yt-navigate-finish", init);
setTimeout(function() {
    init();
}, 1000);


var icon_max = '<svg height="100%" viewBox="0 0 36 36" width="100%"><rect x="9" y="18" width="9" height="9" style="fill:none;stroke:#fff;stroke-opacity:1;stroke-width:2px;"/><polyline points="9 16.2 9 9 13 9" style="fill:none;stroke:#fff;stroke-opacity:1;stroke-width:2px;"/><line x1="16" y1="9" x2="21.5" y2="9" style="fill:none;stroke:#fff;stroke-opacity:1;stroke-width:2px;"/><polyline points="23 9 27 9 27 13" style="fill:none;stroke:#fff;stroke-opacity:1;stroke-width:2px;"/><line x1="27" y1="16" x2="27" y2="21.5" style="fill:none;stroke:#fff;stroke-opacity:1;stroke-width:2px;"/><polyline points="27 23 27 27 19.8 27" style="fill:none;stroke:#fff;stroke-opacity:1;stroke-width:2px;"/></svg>';

var icon_min = '<svg height="100%" viewBox="0 0 36 36" width="100%"><polyline points="18 23.5 18 27 14.5 27" style="fill:none;stroke:#fff;stroke-opacity:1;stroke-width:2px;"/><polyline points="12.5 27 9 27 9 23.5" style="fill:none;stroke:#fff;stroke-opacity:1;stroke-width:2px;"/><polyline points="9 21.5 9 18 12.5 18" style="fill:none;stroke:#fff;stroke-opacity:1;stroke-width:2px;"/><polyline points="14.5 18 18 18 18 21.5" style="fill:none;stroke:#fff;stroke-opacity:1;stroke-width:2px;"/><polyline points="9 16.2 9 9 27 9 27 27 19.8 27" style="fill:none;stroke:#fff;stroke-opacity:1;stroke-width:2px;"/></svg>';