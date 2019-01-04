display = (displayId) => {
    document.getElementById('code').style.display = 'none';
    document.getElementById('object').style.display = 'none';

    if (displayId != 'none') {
        document.getElementById(displayId).style.display = 'block';
    }
}

displayOverComponent = (displayId) => {
    document.getElementById(displayId).style.display = 'block';
}
