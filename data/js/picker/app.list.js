const browserInfo = navigator.userAgent;
console.log(browserInfo)
if (browserInfo.includes('Mobile') || browserInfo.includes('mobile')){
    console.log('check')
    document.querySelectorAll('.gift-item').forEach(gift => {
        gift.querySelector('a').classList.add(...['link-primary', 'text-decoration-underline']);
    })
}