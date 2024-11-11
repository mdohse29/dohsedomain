function inputNum(){
    let inputs = document.querySelectorAll('input');
    return parseInt(inputs[inputs.length - 1].id.replace('gift', '')) + 1;
}

document.querySelector('#cancel').addEventListener('click', () => {
    let inputs = document.querySelectorAll('input');

    for (let i of inputs){
        i.value = '';
    }

    window.open('/picker', '_self');
});

document.querySelector('#add').addEventListener('click', () => {
    if (document.querySelector('.inputs').childElementCount <= 8){

        let inp = mkInp({type:'text', class:'form-control', required:'true', name:`giftlist[gift${inputNum()}]`, id:`gift${inputNum()}`, placeholder:'Gift Idea', label: `Gift ${inputNum()}`})

        document.querySelector('.inputs').append(nestElem([
            mkDiv({class:'extra'}),
            {
                1: nestElem([
                    mkDiv({class:'form-floating'}),
                    {
                        1: inp.input,
                        2: inp.label
                    }
                ]),
                2: mkSpan({class:'badge text-bg-danger', inner:'X', title:'Remove Gift', listeners: [{type:'click', execute: function(){this.parentElement.remove()}}]})
            }
        ]));
    }
})