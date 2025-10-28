// Usamos fetch para cargar el archivo JSON
fetch('datos.json')
  .then(response => {
    // Verificamos si la solicitud fue exitosa
    if (!response.ok) {
      throw new Error('Error al cargar el archivo JSON');
    }
    return response.json();  // Convertimos la respuesta a formato JSON
  })
  .then(data => {
    // Llamamos a la función para renderizar los datos
    renderizarDatos(data);
  })
  .catch(error => {
    console.error('Hubo un problema con la solicitud Fetch:', error);
  });

// Función para renderizar los datos en HTML
function renderizarDatos(datos) {
  const contenedor = document.getElementById('datos');
  
  // Recorremos las regiones del JSON
  for (let region in datos) {
    const regionDiv = document.createElement('div');
    regionDiv.classList.add('region');
    
    const regionTitulo = document.createElement('h2');
    regionTitulo.textContent = region;
    regionDiv.appendChild(regionTitulo);

    // Recorremos las instituciones de cada región
    for (let institucion in datos[region]) {
      const institucionDiv = document.createElement('div');
      institucionDiv.classList.add('institucion');

      const institucionTitulo = document.createElement('h3');
      institucionTitulo.textContent = institucion;
      institucionDiv.appendChild(institucionTitulo);

      // Creamos la lista de puestos
      const puestosLista = document.createElement('ul');
      datos[region][institucion].forEach(puesto => {
        const puestoItem = document.createElement('li');
        puestoItem.textContent = puesto;
        puestosLista.appendChild(puestoItem);
      });
      institucionDiv.appendChild(puestosLista);

      regionDiv.appendChild(institucionDiv);
    }

    contenedor.appendChild(regionDiv);
  }
}

