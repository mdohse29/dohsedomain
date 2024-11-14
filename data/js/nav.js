window.onload = function(){
    document.querySelector('button.navbar-toggler').addEventListener('click', function(){
        let target = this.getAttribute('data-bs-target');
        console.log(target)
        let navbar = document.querySelector(target);

        if (navbar.classList.contains('show')){
            navbar.classList.remove('show');
            navbar.classList.add('collapse');
        }else{
            navbar.classList.add('show');
            navbar.classList.remove('collapse');
        }
    })
}