document.querySelectorAll('#edit, #confirm').forEach(btn => {
    btn.addEventListener('click', function(){
        window.open(this.getAttribute('loc'), '_self');
    })
})

