// Fazer uma requisição GET para obter todos os dados de educação
fetch('http://localhost:4242/api/education/get')
.then(response => response.json())
.then(data => {
    // Limpando a seção de educação antes de adicionar novos itens
    educationSection.innerHTML = '';
    // Criação de novos elementos HTML para cada item de educação
    data.forEach(educationItem => {
        // Criar a div "info-containers"
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('info-containers');

        // Criar o elemento h3
        const levelElement = document.createElement('h3');
        levelElement.textContent = educationItem.level;
        
        // Criar os elementos p
        const degreeElement = document.createElement('p');
        degreeElement.textContent = educationItem.degree;
        
        const institutionElement = document.createElement('p');
        institutionElement.textContent = `${educationItem.institution} | ${educationItem.year}`;

        // Adicionar h3 e p's ao "info-containers"
        infoContainer.appendChild(levelElement);
        infoContainer.appendChild(degreeElement);
        infoContainer.appendChild(institutionElement);

        // Criar botões "Editar" e "Remover"
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => {
        document.getElementById('level').value = educationItem.level;
        document.getElementById('degree').value = educationItem.degree;
        document.getElementById('institution').value = educationItem.institution;
        document.getElementById('year').value = educationItem.year;
        document.getElementById('id').value = educationItem.id;
        document.getElementById('addEducationModal').style.display = 'block';
        
      });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remover';
        deleteButton.addEventListener('click', () => {
            fetch(`http://localhost:4242/api/education/delete/${educationItem.id}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(() => {
                // Remover o item de educação do DOM
                educationSection.removeChild(infoContainer);
            });
        });

        infoContainer.appendChild(editButton);
        infoContainer.appendChild(deleteButton);

        // Adicionar "info-containers" à seção de educação
        educationSection.appendChild(infoContainer);

        // Adicionar uma quebra de linha
        const br = document.createElement('br');
        educationSection.appendChild(br);
      });
    })
    .catch(error => console.error('Error:', error));


 // Abrir o modal quando o botão for clicado
document.getElementById('openModalButton').addEventListener('click', () => {
    document.getElementById('addEducationModal').style.display = 'block';
});

// Lidar com o envio do formulário
document.getElementById('addEducationForm').addEventListener('submit', event => {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const level = document.getElementById('level').value;
    const degree = document.getElementById('degree').value;
    const institution = document.getElementById('institution').value;
    const year = document.getElementById('year').value;

    if (id) {
        // Se o ID estiver definido, estamos editando um item existente
        fetch('http://localhost:4242/api/education/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                level,
                degree,
                institution,
                year,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Atualizar o item de educação no DOM
            const educationItem = document.querySelector(`#educationItem${id}`);
            educationItem.querySelector('h3').textContent = data.level;
            educationItem.querySelector('p').textContent = data.degree;
            educationItem.querySelector('p').textContent = `${data.institution} | ${data.year}`;
        });
    } else {
        // Se o ID não estiver definido, estamos adicionando um novo item
        fetch('http://localhost:4242/api/education/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                level,
                degree,
                institution,
                year,
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Adicionar o novo item de educação ao DOM
            const infoContainer = document.createElement('div');
            infoContainer.classList.add('info-containers');
            infoContainer.id = `educationItem${data.id}`;

            const levelElement = document.createElement('h3');
            levelElement.textContent = data.level;
            infoContainer.appendChild(levelElement);

            const degreeElement = document.createElement('p');
            degreeElement.textContent = data.degree;
            infoContainer.appendChild(degreeElement);

            const institutionElement = document.createElement('p');
            institutionElement.textContent = `${data.institution} | ${data.year}`;
            infoContainer.appendChild(institutionElement);

            educationSection.appendChild(infoContainer);
            const br = document.createElement('br');
            educationSection.appendChild(br);
        });
    }

    // Fechar o modal e limpar o formulário
    document.getElementById('addEducationModal').style.display = 'none';
    document.getElementById('addEducationForm').reset();
    document.getElementById('id').value = '';

  });

