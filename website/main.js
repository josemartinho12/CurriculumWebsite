function updateEducationSection() {
    
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
            
        });
    })
    .catch(error => console.error('Error:', error));
}

updateEducationSection();

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
        .then(() => {
            // Atualizar a página para refletir as alterações
            updateEducationSection();

             // Fechar o modal e limpar o formulário
             document.getElementById('addEducationModal').style.display = 'none';
             document.getElementById('addEducationForm').reset();
             document.getElementById('id').value = '';
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
        .then(() => {
            // Atualizar a página para mostrar o novo item
            updateEducationSection();

            // Fechar o modal e limpar o formulário
            document.getElementById('addEducationModal').style.display = 'none';
            document.getElementById('addEducationForm').reset();
            document.getElementById('id').value = '';
        });
    }

    document.getElementById('closeAddEducationModal').addEventListener('click', () => {
        document.getElementById('addEducationModal').style.display = 'none';
      });
      
});


  
  // Obter a seção de interesse do DOM
const interestSection = document.querySelector('.interestSection');

// Atualizar a seção de interesse
function updateInterestSection() {
    // Fazer uma requisição GET para buscar todas as áreas de interesse
    fetch('http://localhost:4242/api/interest/get')
        .then(response => response.json())
        .then(data => {
            // Limpar a seção de interesse
            const interestSection = document.getElementById('interestSection');
            interestSection.innerHTML = '';

            // Adicionar cada área de interesse à seção
            data.forEach(interest => {
                const div = document.createElement('div');
                div.className = 'info-containers';

                const h3 = document.createElement('h3');
                h3.textContent = interest.title;
                div.appendChild(h3);

                const p = document.createElement('p');
                p.textContent = interest.description;
                div.appendChild(p);

                // Criar botões "Editar" e "Remover"
                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.addEventListener('click', () => {
                    document.getElementById('interestTitle').value = interest.title;
                    document.getElementById('interestDescription').value = interest.description;
                    document.getElementById('id').value = interest.id;
                    document.getElementById('addInterestModal').style.display = 'block';
                });
                 // Adicionar uma quebra de linha
                const br = document.createElement('br');
                educationSection.appendChild(br);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Remover';
                deleteButton.addEventListener('click', () => {
                    fetch(`http://localhost:4242/api/interest/delete/${interest.id}`, {
                        method: 'DELETE',
                    })
                    .then(response => response.json())
                    .then(() => {
                        // Remover o item de interesse do DOM
                        interestSection.removeChild(div);
                    });
                });

                div.appendChild(editButton);
                div.appendChild(deleteButton);

                interestSection.appendChild(div);

                
            });
        });
}

updateInterestSection();

// Lidar com o envio do formulário de interesse
document.getElementById('addInterestForm').addEventListener('submit', event => {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const title = document.getElementById('interestTitle').value;
    const description = document.getElementById('interestDescription').value;

    if (id) {
        // Se o ID estiver definido, estamos editando um item existente
        fetch('http://localhost:4242/api/interest/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                title,
                description
            }),
        })
        .then(response => response.json())
        .then(() => {
            // Atualizar a seção de interesse
            updateInterestSection();
        });
    } else {
        // Se o ID não estiver definido, estamos adicionando um novo item
        fetch('http://localhost:4242/api/interest/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description
            }),
        })
        .then(response => response.json())
        .then(() => {
            // Atualizar a seção de interesse
            updateInterestSection();
        });
    }

    // Fechar o modal e limpar o formulário
    document.getElementById('addInterestModal').style.display = 'none';
    document.getElementById('addInterestForm').reset();
    document.getElementById('id').value = '';
});

// Abrir o modal quando o botão for clicado
document.getElementById('openInterestModalButton').addEventListener('click', () => {
    document.getElementById('addInterestModal').style.display = 'block';
});

// Obter a seção de soft skills do DOM
const softSkillSection = document.querySelector('.softSkillSection');

// Atualizar a seção de soft skills
function updateSoftSkillSection() {
    // Fazer uma requisição GET para buscar todas as soft skills
    fetch('http://localhost:4242/api/softskill/get')
        .then(response => response.json())
        .then(data => {
            // Limpar a seção de soft skills
            softSkillSection.innerHTML = '';

            // Adicionar cada soft skill à seção
            data.forEach(softSkill => {
                const div = document.createElement('div');
                div.className = 'info-containers';

                const p = document.createElement('p');  
                p.textContent = softSkill.name;
                div.appendChild(p);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Remover';
                deleteButton.addEventListener('click', () => {
                    fetch(`http://localhost:4242/api/softskill/delete/${softSkill.id}`, {
                        method: 'DELETE',
                    })
                    .then(response => response.json())
                    .then(() => {
                        // Remover a soft skill do DOM
                        softSkillSection.removeChild(div);
                    });
                });

                div.appendChild(deleteButton);

                softSkillSection.appendChild(div);
            });
        });
}


updateSoftSkillSection();

// Lidar com o envio do formulário de soft skills
document.getElementById('addSoftSkillForm').addEventListener('submit', event => {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const name = document.getElementById('softSkillName').value;

    if (id) {
        // Se o ID estiver definido, estamos editando um item existente
        fetch('http://localhost:4242/api/softskill/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                name
            }),
        })
        .then(response => response.json())
        .then(() => {
            // Atualizar a seção de soft skills
            updateSoftSkillSection();
        });
    } else {
        // Se o ID não estiver definido, estamos adicionando um novo item
        fetch('http://localhost:4242/api/softskill/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name
            }),
        })
        .then(response => response.json())
        .then(() => {
            // Atualizar a seção de soft skills
            updateSoftSkillSection();
        });
    }

    // Fechar o modal e limpar o formulário
    document.getElementById('addSoftSkillModal').style.display = 'none';
    document.getElementById('addSoftSkillForm').reset();
    document.getElementById('id').value = '';
});

// Abrir o modal quando o botão for clicado
document.getElementById('openSoftSkillModalButton').addEventListener('click', () => {
    document.getElementById('addSoftSkillModal').style.display = 'block';
});

// Obter a seção de hard skills do DOM
const hardSkillSection = document.querySelector('.hardSkillSection');

function updateHardSkillSection() {
    console.log('funçao chamada')
    // Fazer uma requisição GET para buscar todas as hard skills
    fetch('http://localhost:4242/api/hardskill/get')
        .then(response => response.json())
        .then(data => {
            // Limpar a seção de hard skills
            hardSkillSection.innerHTML = '';

            // Adicionar cada hard skill à seção
            data.forEach(hardSkill => {
                const div = document.createElement('div');
                div.className = 'info-containers';

                const p = document.createElement('p');
                p.textContent = hardSkill.name;
                div.appendChild(p);

                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Remover';
                deleteButton.addEventListener('click', () => {
                    fetch(`http://localhost:4242/api/hardskill/delete/${hardSkill.id}`, {
                        method: 'DELETE',
                    })
                    .then(response => response.json())
                    .then(() => {
                        // Remover a hard skill do DOM
                        hardSkillSection.removeChild(div);
                    });
                });

                div.appendChild(deleteButton);

                hardSkillSection.appendChild(div);
            });
        });
}

updateHardSkillSection();

// Lidar com o envio do formulário de hard skill
document.getElementById('addHardSkillForm').addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('hardSkillName').value;

    // Estamos adicionando uma nova hard skill
    fetch('http://localhost:4242/api/hardskill/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name,
        }),
    })
    .then(response => response.json())
    .then(() => {
        // Atualizar a seção de hard skills
        updateHardSkillSection();
    });

    // Limpar o formulário
    document.getElementById('addHardSkillForm').reset();
});

// Abrir o modal de adição de hard skill
document.getElementById('openHardSkillModalButton').addEventListener('click', () => {
    document.getElementById('addHardSkillModal').style.display = 'block';
});

// Fechar o modal de adição de hard skill
document.getElementById('closeAddHardSkillModal').addEventListener('click', () => {
    document.getElementById('addHardSkillModal').style.display = 'none';
});
