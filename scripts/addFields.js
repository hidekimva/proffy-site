document.querySelector('#add-time').addEventListener('click', cloneField)

function cloneField () {                         //cloneNode(True, copia os dado do filedset)
    const newFieldContainer = document.querySelector('.schedule-item').cloneNode(true)
  
    const fields = newFieldContainer.querySelectorAll('input')

    fields.forEach(function(field) {
        field.value = ""        
    });  

    //appendChild adicona um fliho para a TAG passada (#schudele-items)
    document.querySelector('#schedule-items').appendChild(newFieldContainer)
}