let currentPageUrl = 'https://rickandmortyapi.com/api/character'

window.onload = async () => {
    try{
        await loadCharacter(currentPageUrl);

    } catch (error) {
        console.log(error);
        alert('Não é possivel carregar cards')
    }

    const nextButton = document.getElementById('next-button');
    const backButton = document.getElementById('back-button');

    nextButton.addEventListener('click', loadNextPage);
    backButton.addEventListener('click', loadPreviousPage);
}

async function loadCharacter(url) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    try{
        const response = await fetch(url);
        const responseJson = await response.json();

        responseJson.results.forEach((characters) => {
            
            const cards = document.createElement('div');
            cards.style.backgroundImage = `url(${characters.image})`;
            cards.className = 'cards';

            const cardsBg = document.createElement('div');
            cardsBg.className = 'cards-bg';

            const cardsName = document.createElement('span');
            cardsName.className = 'cards-name';
            cardsName.innerHTML = `${characters.name}`;

            mainContent.appendChild(cards)
            cards.appendChild(cardsBg)
            cardsBg.appendChild(cardsName)

            cards.onclick = () => {
                const modal = document.getElementById('modal');
                modal.style.visibility = 'visible'

                const modalContent = document.getElementById('modal-content');
                modalContent.innerHTML = '';

                const modalImage = document.createElement('div');
                modalImage.className = 'modal-image';
                modalImage.style.backgroundImage = `url(${characters.image})`;

                const name = document.createElement('span');
                name.className = 'modal-details';
                name.innerText = `Nome: ${characters.name}`

                const status = document.createElement('span');
                status.className = 'modal-details';
                status.innerText = `Status: ${convertStatus(characters.status)}`

                const specie = document.createElement('span');
                specie.className = 'modal-details';
                specie.innerText = `Especie: ${convertSpecie(characters.species)}`

                const gender = document.createElement('span');
                gender.className = 'modal-details';
                gender.innerText = `Genero: ${convertGender(characters.gender)}`

                const origin = document.createElement('span');
                origin.className = 'modal-details';
                origin.innerText = `Origem: ${convertOrigin(characters.origin.name)}`
               
                modalContent.appendChild(modalImage)
                modalContent.appendChild(name)
                modalContent.appendChild(status)
                modalContent.appendChild(specie)
                modalContent.appendChild(gender)
                modalContent.appendChild(origin)
            }
        });

        const nextButton = document.getElementById('next-button');
        const backButton = document.getElementById('back-button');

        nextButton.disabled = !responseJson.info.next;
        backButton.disabled = !responseJson.info.prev;

        backButton.style.visibility = responseJson.info.prev? 'visible' : 'hidden';

        currentPageUrl = url

    } catch(error) {
        console.log(error)
        alert('erro ao carregar personagens')
    }
}

function hideModal () {
    const modal = document.getElementById('modal')
    modal.style.visibility = 'hidden'
}

async function loadNextPage() {
    if(!currentPageUrl) return;

    try{
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()
        
        await loadCharacter(responseJson.info.next);

    } catch(error) {
        console.log(error)
        alert('Erro ao carregar próxima pagina')
    }
}

async function loadPreviousPage() {
    if(!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl);
        const responseJson = await response.json();
 
        await loadCharacter(responseJson.info.prev);
    } catch(error) {
        console.log(error);
        alert('Erro ao carregar pagina anterior')
    }
}

function convertStatus(status) {
    const estaVivo = {
        alive: 'vivo',
        dead: 'morto',
        unknown: 'desconhecido'
    }

    return estaVivo[status.toLowerCase()] || status;
}

function convertSpecie(specie) {
    const raca = {
        human: 'humano',
        alien: 'alienigena',
        robot: 'robo',
        undefined: 'indefinida'
    }

    return raca[specie.toLowerCase()] || specie;
}

function convertGender(gender) {
    const genero = {
        male: 'masculino',
        female: 'feminino',
        unknown: 'desconhecido'
    }

    return genero[gender.toLowerCase()] || gender;
}

function convertOrigin(origin) {
    const origem = {
        earth: 'terra',
        unknown: 'desconhecida'
    }

    return origem[origin.toLowerCase()] || origin;
}