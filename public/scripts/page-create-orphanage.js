// create map
const map = L.map('mapid').setView([-23.4978117, -47.4652636], 13,5)

// create and add tileLayer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

// create icon
const icon = L.icon({
    iconUrl: "/images/map-marker.svg",
    iconSize: [58, 68],
    iconAnchor: [29, 68],
})

let marker;

// create and add marker
map.on('click', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    document.querySelector('[name=lat]').value = lat;
    document.querySelector('[name=lng]').value = lng;

    // remover icon
    marker && map.removeLayer(marker)

    //add icon layer
    marker = L.marker([lat, lng], { icon })
        .addTo(map)
})

// adicionar o campo de fotos
function addPhotoField() {
    //pegar o container de fotos #images
    const container = document.querySelector('#images')
    //pegar o container para duplicar .new-image
    const fieldsContainer = document.querySelectorAll('.new-upload')
    //realizar o clone da ultima imagem aicionada.
    const newFieldContainer = fieldsContainer[fieldsContainer.length - 1].cloneNode(true)
    // verificar se o campo está vazio, se sim, não adicionarao container de imagens
    const input = newFieldContainer.children[0]
    if (input.value == "") {
        return
    }
    // limpar o campo antes de adicionar ao container de imagens
    input.value = ""
    // adicionar o clone ao container de #images
    container.appendChild(newFieldContainer)
}

function deleteField(event) {
    const span = event.currentTarget

    const fieldsContainer = document.querySelectorAll('.new-upload')

    if (fieldsContainer.length < 2) {
        // limpar o valor do campo
        span.parentNode.children[0].value = ""
        return
    }

    // deletar o campo
    span.parentNode.remove();
}

// select yes or não
function toggleSelect(event) {
    // retirar a class .active (dos botoes)
    document.querySelectorAll('.button-select button')
        .forEach(button => button.classList.remove('active'))

    // colocar a class .active nesse botão clicado
    const button = event.currentTarget
    button.classList.add('active')

    // atualizar o meu imput hidden com o valor selecionado
    const input = document.querySelector('[name="open_on_weekends"]')

    input.value = button.dataset.value
}

// function validate(event) {
//     const lat = event.latlng.lat
//     const lng = event.latlng.lng

//     document.querySelector('[name=lat]').value = lat
//     document.querySelector('[name=lng]').value = lng

//     if (lat.value && lng.value == "") {
//         event.preventDefault()
//         alert("Selecione um ponto no mapa")
//     } else {
//         return
//     }
// }