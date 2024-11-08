class Agente {
    constructor(nombre, rol, habilidades, imagen, descripcion, nacionalidad) {
    }
  }
  
  let agentes = [];
  
  async function getAgents() {
    try {
      const response = await fetch('https://valorant-api.com/v1/agents');
      const data = await response.json();
  
      agentes = data.data.map(agente => new Agente(
        agente.displayName,
        agente.role ? agente.role.displayName : 'Sin rol',
        agente.abilities.map(ability => ability.displayName),
        agente.displayIcon,
        agente.description || 'Descripción no disponible', 
        agente.nationality 
      ));
  
      renderAgentes(agentes);
    } catch (error) {
      console.error("Error al obtener los datos de los agentes:", error);
    }
  }
  
  function renderAgentes(agentes) {
    const container = document.getElementById('agentsContainer');
    container.innerHTML = '';
  
    agentes.forEach(agente => {
      const agenteDiv = document.createElement('div');
      agenteDiv.className = 'agent';
  
      // lista de habilidades
      const habilidadesList = agente.habilidades.map(habilidad => `<li>${habilidad}</li>`).join('');
  
      // Renderizar la nacionalidad solo si está definida
      const nacionalidadDisplay = agente.nacionalidad ? `<p class="nacionalidad">${agente.nacionalidad}</p>` : '';
  
      agenteDiv.innerHTML = `
        <img src="${agente.imagen}" alt="${agente.nombre}">
        <h2>${agente.nombre}</h2>
        <p class="rol">${agente.rol}</p>
        <p class="descripcion">${agente.descripcion}</p>
        ${nacionalidadDisplay} <!-- Renderiza solo si hay nacionalidad -->
        <ul>${habilidadesList}</ul>
      `;
  
      container.appendChild(agenteDiv);
    });
  }
  
  
  document.getElementById('searchBar').addEventListener('input', event => {
    const searchText = event.target.value.toLowerCase();
    const filteredAgents = agentes.filter(agente =>
      agente.nombre.toLowerCase().includes(searchText) || 
      agente.rol.toLowerCase().includes(searchText) 
    );
    renderAgentes(filteredAgents); 
  });
  
  
  window.onload = getAgents;