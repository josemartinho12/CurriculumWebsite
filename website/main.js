const jwtToken = localStorage.getItem('jwtToken');

// Mostrar o botão de logout se o utilizador estiver com sessão iniciada
if (jwtToken) {
    document.getElementById('logoutButton').style.display = 'block';
}
    
// Adicionar evento de click ao botão de logout
document.getElementById('logoutButton').addEventListener('click', () => {
    // Remover o token JWT do local storage
    localStorage.removeItem('jwtToken');
    // Atualizar a página
    location.reload();
});

// Função para atualizar a secção de educação na página
function updateEducationSection() {
    // Obter o token JWT do armazenamento local
    const jwtToken = localStorage.getItem('jwtToken');

    // Fazer uma solicitação para o servidor para obter os dados de educação
    fetch('http://localhost:4242/api/education/get')
    .then(response => response.json())
    .then(data => {
        // Limpar a secção de educação antes de adicionar novos itens
        educationSection.innerHTML = '';

        // Para cada item de educação nos dados recebidos do servidor
        data.forEach(educationItem => {
            // Criação de uma nova div para o item de educação
            const infoContainer = document.createElement('div');
            infoContainer.classList.add('info-containers');

            // Criação dos elementos do item de educação
            const levelElement = document.createElement('h3');
            levelElement.textContent = educationItem.level;
            const degreeElement = document.createElement('p');
            degreeElement.textContent = educationItem.degree;
            const institutionElement = document.createElement('p');
            institutionElement.textContent = `${educationItem.institution} | ${educationItem.year}`;

            // Adicionar os elementos à div do item de educação
            infoContainer.appendChild(levelElement);
            infoContainer.appendChild(degreeElement);
            infoContainer.appendChild(institutionElement);

            // Criação dos botões "Editar" e "Remover" para cada item de educação
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            // Quando o botão "Editar" for clicado, o modal de edição é preenchido com os dados do item e mostrado
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
            // Quando o botão "Remover" for clicado, é enviada uma solicitação para o servidor para remover o item de educação
            deleteButton.addEventListener('click', () => {
                fetch(`http://localhost:4242/api/education/delete/${educationItem.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${jwtToken}`
                    }
                })
                .then(response => response.json())
                .then(() => {
                    // O item de educação é removido da página
                    educationSection.removeChild(infoContainer);
                });
            });

            // Se o utilizador não estiver autenticado, os botões "Editar" e "Remover" são ocultados
            if (!jwtToken) {
                editButton.style.display = 'none';
                deleteButton.style.display = 'none';
            }

            // Adicionar os botões à div do item de educação
            infoContainer.appendChild(editButton);
            infoContainer.appendChild(deleteButton);

            // Adicionar a div do item de educação à secção de educação
            educationSection.appendChild(infoContainer);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Atualizar a secção de educação quando a página é carregada
updateEducationSection();

// Quando o botão para fechar o modal de educação for clicado, o modal é ocultado
document.getElementById('closeEducationModal').addEventListener('click', () => {
    document.getElementById('addEducationModal').style.display = 'none';
});

// Quando o botão para abrir o modal de educação for clicado, o modal é mostrado
document.getElementById('openModalButton').addEventListener('click', () => {
    document.getElementById('addEducationModal').style.display = 'block';
});

// Quando o formulário no modal de educação é enviado
document.getElementById('addEducationForm').addEventListener('submit', event => {
    // O comportamento padrão do evento de envio é impedido para que a página não seja recarregada
    event.preventDefault();

    // Os valores dos campos do formulário são obtidos
    const id = document.getElementById('id').value;
    const level = document.getElementById('level').value;
    const degree = document.getElementById('degree').value;
    const institution = document.getElementById('institution').value;
    const year = document.getElementById('year').value;

    // Se um ID está definido, um item de educação existente será editado
    if (id) {
        fetch('http://localhost:4242/api/education/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
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
            // A secção de educação é atualizada para mostrar as alterações feitas
            updateEducationSection();

            // O modal é fechado e o formulário é limpo
            document.getElementById('addEducationModal').style.display = 'none';
            document.getElementById('addEducationForm').reset();
            document.getElementById('id').value = '';
        });
    } else {
        // Se um ID não está definido, um novo item de educação vai ser adicionado
        fetch('http://localhost:4242/api/education/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
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
            // A secção de educação é atualizada para mostrar o novo item adicionado
            updateEducationSection();

            // O modal é fechado e o formulário é limpo
            document.getElementById('addEducationModal').style.display = 'none';
            document.getElementById('addEducationForm').reset();
            document.getElementById('id').value = '';
        });
    }
    
    // Quando o botão para fechar o modal de adicionar educação for clicado, o modal é ocultado
    document.getElementById('closeAddEducationModal').addEventListener('click', () => {
        document.getElementById('addEducationModal').style.display = 'none';
      });
});

  
function updateInterestSection() {
    const jwtToken = localStorage.getItem('jwtToken');

    fetch('http://localhost:4242/api/interest/get')
        .then(response => response.json())
        .then(data => {
            const interestSection = document.getElementById('interestSection');
            interestSection.innerHTML = '';

            data.forEach(interest => {
                const div = document.createElement('div');
                div.className = 'info-containers';

                const h3 = document.createElement('h3');
                h3.textContent = interest.title;
                div.appendChild(h3);

                const p = document.createElement('p');
                p.textContent = interest.description;
                div.appendChild(p);

                const editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.addEventListener('click', () => {
                    document.getElementById('interestTitle').value = interest.title;
                    document.getElementById('interestDescription').value = interest.description;
                    document.getElementById('id').value = interest.id;
                    document.getElementById('addInterestModal').style.display = 'block';
                });
                
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Remover';
                deleteButton.addEventListener('click', () => {
                    fetch(`http://localhost:4242/api/interest/delete/${interest.id}`, { 
                        method: 'DELETE',
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`
                        }
                    })
                    .then(response => response.json())
                    .then(() => {
                        interestSection.removeChild(div); 
                    });
                });
                
                if (!jwtToken) {
                    editButton.style.display = 'none';
                    deleteButton.style.display = 'none';
                }

                div.appendChild(editButton);
                div.appendChild(deleteButton);

                interestSection.appendChild(div);

                
            });
        });
}

updateInterestSection();

document.getElementById('closeInterestModal').addEventListener('click', () => {
    document.getElementById('addInterestModal').style.display = 'none';
});

document.getElementById('addInterestForm').addEventListener('submit', event => {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const title = document.getElementById('interestTitle').value;
    const description = document.getElementById('interestDescription').value;

    if (id) {
        fetch('http://localhost:4242/api/interest/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`

            },
            body: JSON.stringify({
                id,
                title,
                description
            }),
        })
        .then(response => response.json())
        .then(() => {
            updateInterestSection();
        });
    } else {
        fetch('http://localhost:4242/api/interest/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`

            },
            body: JSON.stringify({
                title,
                description
            }),
        })
        .then(response => response.json())
        .then(() => {
            updateInterestSection();
        });
    }

    document.getElementById('addInterestModal').style.display = 'none';
    document.getElementById('addInterestForm').reset();
    document.getElementById('id').value = '';
});

document.getElementById('openInterestModalButton').addEventListener('click', () => {
    document.getElementById('addInterestModal').style.display = 'block';
});


function updateSoftSkillSection() {
    const jwtToken = localStorage.getItem('jwtToken');

    fetch('http://localhost:4242/api/softskill/get')
        .then(response => response.json())
        .then(data => {
            softSkillSection.innerHTML = '';

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
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`
                        }
                    })
                    .then(response => response.json())
                    .then(() => {
                        softSkillSection.removeChild(div);
                    });
                });

                if (!jwtToken) {
                    deleteButton.style.display = 'none';
                }

                div.appendChild(deleteButton);

                softSkillSection.appendChild(div);
            });
        });
}

updateSoftSkillSection();

document.getElementById('closeSoftSkillModal').addEventListener('click', () => {
    document.getElementById('addSoftSkillModal').style.display = 'none';
});

document.getElementById('addSoftSkillForm').addEventListener('submit', event => {
    event.preventDefault();

    const jwtToken = localStorage.getItem('jwtToken');

    const id = document.getElementById('id').value;
    const name = document.getElementById('softSkillName').value;

    if (id) {
        fetch('http://localhost:4242/api/softskill/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
                id,
                name
            }),
        })
        .then(response => response.json())
        .then(() => {
            updateSoftSkillSection();
        });
    } else {
        fetch('http://localhost:4242/api/softskill/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${jwtToken}`
            },
            body: JSON.stringify({
                name
            }),
        })
        .then(response => response.json())
        .then(() => {
            updateSoftSkillSection();
        });
    }

    document.getElementById('addSoftSkillModal').style.display = 'none';
    document.getElementById('addSoftSkillForm').reset();
    document.getElementById('id').value = '';
});

document.getElementById('openSoftSkillModalButton').addEventListener('click', () => {
    document.getElementById('addSoftSkillModal').style.display = 'block';
});

function updateHardSkillSection() {
    const jwtToken = localStorage.getItem('jwtToken');
    fetch('http://localhost:4242/api/hardskill/get')
        .then(response => response.json())
        .then(data => {
            hardSkillSection.innerHTML = '';

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
                        headers: {
                            'Authorization': `Bearer ${jwtToken}`
                        }
                    })
                    .then(response => response.json())
                    .then(() => {
                        hardSkillSection.removeChild(div);
                    });
                });

                if (!jwtToken) {
                    deleteButton.style.display = 'none';
                }

                div.appendChild(deleteButton);

                hardSkillSection.appendChild(div);
            });
        });
}

updateHardSkillSection();

document.getElementById('closeHardSkillModal').addEventListener('click', () => {
    document.getElementById('addHardSkillModal').style.display = 'none';
});

document.getElementById('addHardSkillForm').addEventListener('submit', event => {
    event.preventDefault();

    const jwtToken = localStorage.getItem('jwtToken');

    const name = document.getElementById('hardSkillName').value;

    fetch('http://localhost:4242/api/hardskill/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        },
        body: JSON.stringify({
            name,
        }),
    })
    .then(response => response.json())
    .then(() => {
        updateHardSkillSection();
    });

    document.getElementById('addHardSkillForm').reset();
    document.getElementById('addHardSkillModal').style.display = 'none';
});

document.getElementById('openHardSkillModalButton').addEventListener('click', () => {
    document.getElementById('addHardSkillModal').style.display = 'block';
});

document.getElementById('closeAddHardSkillModal').addEventListener('click', () => {
    document.getElementById('addHardSkillModal').style.display = 'none';
});
