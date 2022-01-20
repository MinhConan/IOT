function refresh() {
    var val = document.querySelector('input[name="profile"]:checked').value;
    setProfile(val);
}

function videoUp() {
    demoplayer.width(demoplayer.width() + 100);
}

function videoDown() {
    demoplayer.width(demoplayer.width() - 100);
}

function updateOnResize() {
    var desc = demoplayer.videojs.videoWidth() +
        "x" +
        demoplayer.videojs.videoHeight();
    document.getElementById("res").innerHTML = ("Displayed Resolution: " +
        desc);
    var current = document.getElementsByClassName("active button");
    for (var i = 0; i < current.length; i++) {
        if (current[i].id != "auto")
            current[i].setAttribute("class", "button");
    }
    var newactive = document.getElementsByName(desc);
    for (var j = 0; j < newactive.length; j++)
        newactive[j].setAttribute("class", "active button");
}

function requestResolution() {
    document.getElementById("auto").setAttribute("class", "button");
    for (var i = 0; i < qualityLevels.length; i++) {
        qualityLevels[i].enabled = (this.id == i);
    }
}

function requestAuto() {
    for (var i = 0; i < qualityLevels.length; i++) {
        qualityLevels[i].enabled = true;
    }
    document.getElementById("auto").setAttribute("class", "active button");
}

function addButton(bid, qlevel, desc, css) {
    var btn = document.createElement("BUTTON");
    document.body.appendChild(btn);
    btn.addEventListener("click", requestResolution);
    btn.innerHTML = desc;
    btn.setAttribute("id", bid);
    btn.setAttribute("class", css);
    btn.setAttribute("name", desc);
}

function changeOfResolution() {
    console.log("changeOfResolution", qualityLevels.length)
    console.timeEnd("create-m3u8");
    for (var i = 0; i < qualityLevels.length; i++) {
        var btn = document.getElementById(i);
        var qlevel = qualityLevels[i];
        var desc = qlevel.width + "x" + qlevel.height;
        var css = "button";
        if (i == qualityLevels.selectedIndex)
            css = "requested button";
        if (btn) {
            if (btn.getAttribute("class") != "active button")
                btn.setAttribute("class", css);
        }
        else
            addButton(i, qlevel, desc, css);
    }
}

function setProfile(profile) {
    var loop = document.getElementsByClassName("button").length - 1;
    for (var i = 0; i < loop; i++) {
        var btn = document.getElementById(i)
        if (btn)
            document.body.removeChild(btn);
    }
    var file = document.getElementById("FileName").value;
    demoplayer.source(file, { sourceTypes: ['hls'], transformation: { streaming_profile: profile } });
}

function changeOfSrc() {
    console.log("changeOfSrc", demoplayer.videojs.currentSrc());
}

document.getElementById("demo-player").addEventListener('resize', updateOnResize, false);
var cld = cloudinary.Cloudinary.new({ cloud_name: 'hadar' });
var demoplayer = cld.videoPlayer('demo-player');
//        videojs: {
//        controlBar: { 
//        children: ['playToggle','CurrentTimeDisplay','FullscreenToggle'] }}});
var qualityLevels = demoplayer.videojs.qualityLevels();
qualityLevels.on('change', changeOfResolution);
qualityLevels.on('addqualitylevel', function (event) { console.log(event.qualityLevel.width); });
demoplayer.on('loadedmetadata', changeOfSrc);
demoplayer.source('hd_trim2', {
    sourceTypes: ['hls'],
    transformation: { streaming_profile: 'hd' }
});