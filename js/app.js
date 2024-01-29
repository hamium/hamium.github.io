function ip() {
    var textToCopy = document.getElementById("servip");
    textToCopy.select();
    document.execCommand("copy"); // fuck you
    alert("copied ip! [mc.hamhimstudio.com]");
}
