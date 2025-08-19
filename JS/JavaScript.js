const url = 'https://dog.ceo/api/breeds/list/all';

const breedsDropdown = document.getElementById('breeds-dropdown');
const button = document.getElementById('criar-usuario')
const button2 = document.getElementById('button2');

if (breedsDropdown){
  function populateDropdown(breeds) {
  
    breedsDropdown.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.textContent = 'Selecione uma raça';
    defaultOption.value = '';
    breedsDropdown.appendChild(defaultOption);

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed;
      option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1); 
      breedsDropdown.appendChild(option);
    });
  }
}

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição. Status: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    
    const allBreeds = Object.keys(data.message);
    console.log(allBreeds); 
    
    populateDropdown(allBreeds);
  })
  .catch(error => {
    console.error('Ocorreu um erro ao buscar as raças:', error);
    breedsDropdown.innerHTML = '<option>Erro ao carregar raças.</option>';
  });
if (breedsDropdown){
  breedsDropdown.addEventListener('change', (event) => {          
    
    for (let i = 1; i <= 8; i++) {
        const imagem = document.getElementById(`image${i}`);
        imagem.innerHTML = '';
    }

    const selectedBreed = event.target.value;
    
    if (selectedBreed) {
        console.log('Raça selecionada:', selectedBreed);

        fetchDogImages(selectedBreed);
    }
});
}

function fetchDogImages(breedName) {
    const url = `https://dog.ceo/api/breed/${breedName}/images/random/10`;

        fetch(url).then(response => {
          return response.json();
        })
        .then(data => {
            console.log(data); 
            const images = data.message;
           
            for(let i = 0; i<=9;i++){
                const imgElement = document.createElement('img');
                const imagem = document.getElementById(`image${i+1}`);
                imgElement.src = images[i+1];
                imgElement.alt = 'Imagem de um cachorro';
                imgElement.width = 300; 
                imgElement.height = 300;
                imagem.appendChild(imgElement);
            }
            
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
}

let usuariosCriados = [];

const buttonCriar = document.getElementById('criar-usuario');
const buttonAtualizar = document.getElementById('button2');

if (buttonCriar) {
  buttonCriar.addEventListener('click', function() {
    const nome = document.getElementById('nomeUsuario').value;
    const emprego = document.getElementById('empregoUsuario').value;

    if (!nome || !emprego) {
      alert('Preencha todos os campos!');
      return;
    }

    fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: nome, job: emprego })
    })
    .then(response => response.json())
    .then(data => {
      usuariosCriados.push({
        id: data.id,
        nome: nome,
        emprego: emprego
      });
      alert('Usuário criado com sucesso!');
      document.getElementById('nomeUsuario').value = '';
      document.getElementById('empregoUsuario').value = '';
    })
    .catch(() => {
      alert('Erro ao criar usuário!');
    });
  });
}

if (buttonAtualizar) {
  buttonAtualizar.addEventListener('click', function() {
    const tabelaCorpo = document.getElementById('tabela-corpo');
    tabelaCorpo.innerHTML = '';

    usuariosCriados.forEach(usuario => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nome}</td>
        <td>${usuario.emprego}</td>
      `;
      tabelaCorpo.appendChild(tr);
    });
  });
}