import mapboxgl from 'mapbox-gl';

export default function createPopup() {
  const popupContent = `

                    `;

  const popup = new mapboxgl.Popup({
    closeButton: false,
    maxWidth: 'none',
  });

  popup.setHTML(popupContent);

  popup.on('open', () => {
    const select = document.getElementById('peopleSelect') as HTMLSelectElement;
    const selectedContainer = document.getElementById('selectedPeople') as HTMLElement;
    const selectedOptions = new Set();

    select?.addEventListener('change', function () {
      const value = this.value;
      const text = this.options[this.selectedIndex].text;

      if (value && !selectedOptions.has(value)) {
        // Afficher le conteneur lorsqu'on ajoute le premier élément
        selectedContainer?.classList.remove('hidden');

        const div = document.createElement('div');
        div.className = 'flex items-center gap-2 mt-1';
        div.innerHTML = `
          <input type="checkbox" id="${value}" checked class="form-checkbox" />
          <label for="${value}">${text}</label>
        `;

        const checkbox = div.querySelector('input');
        checkbox?.addEventListener('change', function () {
          if (!this.checked) {
            div.remove();
            selectedOptions.delete(value);

            const option = document.createElement('option') as HTMLOptionElement;
            option.value = value;
            option.text = text;
            select.add(option);

            // Cacher le conteneur s'il n'y a plus d'éléments sélectionnés
            if (selectedOptions.size === 0) {
              selectedContainer?.classList.add('hidden');
            }
          }
        });

        selectedContainer?.appendChild(div);
        selectedOptions.add(value);

        select.remove(this.selectedIndex);
        select.value = '';
      }
    });
  });

  return {
    createPopupInstance: () => popup,
  };
}
