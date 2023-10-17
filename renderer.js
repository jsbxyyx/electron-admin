const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`

window.go_url = '';
window.electronAPI.onServerReady((_event, value) => {
    if (value == 1) {
        window.location.href = window.go_url;
    }
});

window.electronAPI.onGoUrl((_event, value) => {
    window.go_url = value;
});