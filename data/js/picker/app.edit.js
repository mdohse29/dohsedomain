document.querySelectorAll('.badge').forEach(badge => {
    badge.addEventListener('click', function(){
        this.parentElement.remove();
    });
})