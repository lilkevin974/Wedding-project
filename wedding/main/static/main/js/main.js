var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let i;
    const slide_image = document.querySelector('.slide-image');
    const images = slide_image.children;
    const slide_info = document.querySelector('.slide-info')
    const info = slide_info.getElementsByTagName('span')
   /*  const dots = document.getElementsByClassName("dot"); */
    if (n > images.length) {slideIndex = 1}
    if (n < 1) {slideIndex = images.length}
    for (i = 0; i < images.length; i++) {
        images[i].classList.remove('opaque');
    }
    const selected_image = images[slideIndex-1]

    for (i=0; i < info.length; i++){
        if (selected_image.dataset.place == info[i].dataset.show){
            info[i].classList.add('active');
        }
        else{
            info[i].classList.remove('active')
        }

    }

    /* for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    } */
    selected_image.classList.add('opaque');
    /* dots[slideIndex-1].className += "active"; */
} 
  



// Ajax POST request to send confirmation
function confirmation(){


	const xhttp = new XMLHttpRequest();
	xhttp.open('POST', '/')
	xhttp.setRequestHeader("X-CSRFToken",  getCookie('csrftoken')); 
	xhttp.onload = () => {
        const registration = document.querySelector(".registration");
        const confirmation = document.querySelector(".confirmation")
        registration.style.animation='scale-down .8s forwards'
        registration.addEventListener('animationend', ()=> {
            registration.style.display='none'
            confirmation.style.display='flex'
            confirmation.style.animation='scale-up .8s forwards'
        })
        
    }
    const data={};
    data.email=document.querySelector('#email').value;
    data.last_name=document.querySelector('#nom').value;
    data.first_name=document.querySelector('#prénom').value;
    data.adults=document.querySelector('#adultes').value;
    data.children=document.querySelector('#enfants').value;
    data.message=document.querySelector('#message').value;

    console.log(data)
    j_data=JSON.stringify(data)

	xhttp.send(j_data);
          return false;
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}