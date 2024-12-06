document.querySelectorAll('.link-button').forEach(button => {

    button.addEventListener('click', (event) => {

        const buttonId = event.target.id;
        const views = document.querySelectorAll('div.view');
        const buttons = document.querySelectorAll('.link-button');

        buttons.forEach( button => {
            if ( button.id == buttonId ){
                button.classList.add('textShadowAnimation');
            } else {
                button.classList.remove('textShadowAnimation');
            }
        })

        views.forEach( view => {
            if ( view.id == buttonId ){
                view.style.display = '';
            } else {
                view.style.display = 'none';
            }
        });
    });
});