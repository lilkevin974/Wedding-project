var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slide_image = document.querySelector('.slide-image');
    const images      = slide_image.children;
    const slide_info  = document.querySelector('.slide-info');
    const info        = slide_info.getElementsByTagName('span');
    const dots        = document.getElementsByClassName("dot");
    
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

    for (i = 0; i < dots.length; i++) {
        dots[i].style.backgroundColor='#bbb';
    }
    selected_image.classList.add('opaque');
    dots[slideIndex-1].style.backgroundColor='#717171';

    showInfo()
    slideColor(selected_image.dataset.place)
} 
  
function showMap() {
    const active          = document.querySelector('.active');
    const mapContainer    = document.querySelector('.map-container');
    const maps            = mapContainer.children;
    const info            = document.querySelector('.info-reveal');
    const mairiePosition  = {lat: -20.879416, lng: 55.447837};
    const mairieContainer = document.getElementById('map-mairie');
  
    info.classList.remove('info-reveal')
    for (i=0; i < maps.length; i++){
        if (active.dataset.show == maps[i].dataset.show){
            if (active.dataset.show == 'mairie'){
                initMap(mairiePosition,mairieContainer)
            }
        }
    }
    mapContainer.classList.add('info-reveal')
}

function showInfo() {
    const mapContainer = document.querySelector('.map-container');
    const info         = document.querySelector('.steps');
    
    mapContainer.classList.remove('info-reveal');
    info.classList.add('info-reveal');
}

function slideColor(slide){
    let color
    let name
    const label   = document.querySelector('.slide-label');
    const showBut = document.querySelectorAll('.show');
    const textBut = document.querySelector('.text');
    const mapBut  = document.querySelector('.map')
    const icons   = document.querySelectorAll('.material-icons-round');
    if (slide == 'mairie'){color = '#f1faf9'; name  = 'Mairie';}
    else if (slide == 'eglise'){color = '#faeeeb'; name  = 'Eglise';}

    label.innerHTML=name;
    label.style.backgroundColor=color;
    
    textBut.style.backgroundColor=color;
    mapBut.style.backgroundColor='white';
    for (i=0; i<showBut.length; i++){
        showBut[i].addEventListener('click', (e)=> {
            showBut.forEach(element => element.style.backgroundColor='white')
            e.target.style.backgroundColor=color;
            console.log(e.target)
        })
    }
    icons.forEach(icon => icon.style.color=color)

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




function initMap(position,container) {
    // The location of Uluru
    var mairie = {lat: -20.879416, lng: 55.447837};
    // The map, centered at Uluru
    var map = new google.maps.Map(
        document.getElementById('map-mairie'), {
            mapId: '17a2994719f5f1cc',
            zoom: 15,
            center: mairie,
            disableDefaultUI: true,
            zoomControl: true,
            scaleControl: true,
            rotateControl: true,
            fullscreenControl: true
        });
    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: mairie, map: map});
  }
  