

// Ajax POST request to send confirmation
function confirmation(){


	const xhttp = new XMLHttpRequest();
	xhttp.open('POST', '/')
	xhttp.setRequestHeader("X-CSRFToken",  getCookie('csrftoken')); 
	xhttp.onload = () => {
		const data = xhttp.responseText;
		
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