import mapboxgl from "mapbox-gl";

export default function createPopup({title}: { title: string }) {
  const popupContent = `
                        <div class="rounded-lg overflow-hidden w-64 sm:w-80">
                          <div class="relative p-2 flex flex-col items-center justify-center">
                            <button class="close-button absolute top-2 right-2 bg-white rounded-md">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 7l10 10M7 17L17 7"/>
                                </svg>
                            </button>
                            <div class="flex items-center justify-between bg-gray gap-4">
                                <h3 class="text-yellow text-base sm:text-lg">${title}</h3>
                             </div>
                            <div class="h-48 w-full border border-gray-400 border-dashed rounded-md mt-4 flex flex-col items-center justify-center gap-4 text-gray-400 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     width="3em"
                                     height="3em"
                                     viewBox="0 0 24 24">
                                  <path fill="none"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5l5-5m-5-7v12"/>
                                </svg>
                                <div class="flex flex-col items-center justify-center">
                                    <span>Cliquer ou glissez-déposez une image</span>
                                    <span>JPG, PNG ou WEBP</span>
                                    <span>25mb max</span>
                                </div>
                            </div>
                            <span>Aucune image ajoutée</span>
                            <div class="border-b border-gray-200 rounded-full w-full my-4"></div>
                            <div class="flex flex-col gap-1 w-full mb-4">
                                <label for="title" class="text-base">Titre</label>
                                <input name="title" id="title" class="border border-gray-300 rounded-lg w-full p-1 focus-visible:outline-0" type="text" placeholder="Ajouter un titre"/>
                            </div>
                            <div class="flex flex-col gap-1 w-full mb-4">
                                <label for="description" class="text-base">Description</label>
                                <textarea name="description" id="description" class="border border-gray-300 rounded-lg w-full p-1 focus-visible:outline-0" type="text" placeholder="Ajouter une description" rows="4"></textarea>
                            </div>
                            <div class="flex flex-col gap-1 w-full mb-4">
                                <label for="peopleSelect" class="text-base">Personnes</label>
                                <select id="peopleSelect" name="peopleSelect" class="border border-gray-300 rounded-lg w-full p-1 focus-visible:outline-0">
                                    <option value="">Sélectionner une personne</option>
                                    <option value="person1">Personne 1</option>
                                    <option value="person2">Personne 2</option>
                                    <option value="person3">Personne 3</option>
                                </select>
                                <div id="selectedPeople" class="mt-1 hidden"></div>
                            </div>
                            <div class="flex flex-col gap-1 w-full mb-4">
                                <label for="place" class="text-base">Lieu</label>
                                <input name="place" id="place" class="border border-gray-300 rounded-lg w-full p-1 focus-visible:outline-0" type="text" placeholder="Ajouter un lieu"/>
                            </div>
                            <div class="flex flex-col gap-1 w-full">
                                <label for="date" class="text-base">Date</label>
                                <input name="date" id="date" class="border border-gray-300 rounded-lg w-full p-1 focus-visible:outline-0" type="date" placeholder="Ajouter un lieu"/>
                            </div>
                          </div>
                        </div>
                    `;

  const popup = new mapboxgl.Popup({
    closeButton: false,
    maxWidth: "none",
  });

  popup.setHTML(popupContent);

  popup.on("open", () => {
    const select = document.getElementById("peopleSelect") as HTMLSelectElement;
    const selectedContainer = document.getElementById("selectedPeople") as HTMLElement;
    const selectedOptions = new Set();

    select?.addEventListener("change", function () {
      const value = this.value;
      const text = this.options[this.selectedIndex].text;

      if (value && !selectedOptions.has(value)) {
        // Afficher le conteneur lorsqu'on ajoute le premier élément
        selectedContainer?.classList.remove("hidden");

        const div = document.createElement("div");
        div.className = "flex items-center gap-2 mt-1";
        div.innerHTML = `
          <input type="checkbox" id="${value}" checked class="form-checkbox" />
          <label for="${value}">${text}</label>
        `;

        const checkbox = div.querySelector("input");
        checkbox?.addEventListener("change", function () {
          if (!this.checked) {
            div.remove();
            selectedOptions.delete(value);

            const option = document.createElement("option") as HTMLOptionElement;
            option.value = value;
            option.text = text;
            select.add(option);

            // Cacher le conteneur s'il n'y a plus d'éléments sélectionnés
            if (selectedOptions.size === 0) {
              selectedContainer?.classList.add("hidden");
            }
          }
        });

        selectedContainer?.appendChild(div);
        selectedOptions.add(value);

        select.remove(this.selectedIndex);
        select.value = "";
      }
    });
  });

  return {
    createPopupInstance: () => popup,
  };
}
