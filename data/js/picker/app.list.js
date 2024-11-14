const browserInfo = navigator.userAgent;
if (browserInfo.includes('Mobile') || browserInfo.includes('mobile')){
    document.querySelectorAll('.gift-item').forEach(gift => {
        gift.querySelector('a').classList.add(...['link-primary', 'text-decoration-underline']);
    })
}