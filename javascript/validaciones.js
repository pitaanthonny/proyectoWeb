document.addEventListener("DOMContentLoaded", function() {
  // alert("Page is load")
});

function validar(){
const miBoton = document.getElementById("enviarDatos");
const miInput = document.getElementById("Nombre");


// Agregar un evento de clic al botón
miBoton.addEventListener("click", function() {
  const inputValor = miInput.value;
  
  if (inputValor.trim() === "") {
    alert("El campo de entrada está vacío. Por favor, escribe algo.");
  } else {
    alert("¡Campo de entrada válido! Valor: " + inputValor);
  }
});
}
const selectElement = document.getElementById('Provincia');

    fetch('https://gist.githubusercontent.com/Anthony0912/903cf82739e8662f3e757753921bbcf3/raw/eb8298c4c77032c74c4686678c2beea191b1d30a/locations.json')
      .then(response => response.json())
      .then(data => {
        const provincias = data.provincias;

        provincias.forEach(provincias => {
          const optionElement = document.createElement('option');
          optionElement.value = provincias.nombre;
          optionElement.textContent = provincias.nombre;

          selectElement.appendChild(optionElement);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
      const birthdateInput = document.getElementById("FechaNacimiento");
    const ageInput = document.getElementById("edad");
    const nameInput = document.getElementById("edad");
    nameInput.style.display = "none";

    birthdateInput.addEventListener("input", calculateAge);

    function calculateAge() {
      const birthdateValue = new Date(birthdateInput.value);
      const today = new Date();

      if (birthdateValue > today) {
        ageInput.value = "";
        return;
      }

      const age = today.getFullYear() - birthdateValue.getFullYear();

      if (
        today.getMonth() < birthdateValue.getMonth() ||
        (today.getMonth() === birthdateValue.getMonth() && today.getDate() < birthdateValue.getDate())
      ) {
        ageInput.value = (age - 1).toString();
      } else {
        ageInput.value = age.toString();
      }
    }