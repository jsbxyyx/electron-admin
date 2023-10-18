const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`

var go_url = '';
window.electronAPI.onGoUrl((_event, value) => {
    console.log("onGoUrl:", value);
    window.location.href = go_url = value;
});

