// LensHop - Part 1: Scaffold & UI
// JavaScript functionality will be implemented in Part 2.
// Current setup contains structural layouts and initial UI elements.
console.log("LensHop UI Loaded Successfully.");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = input.value.trim();
  if (!query) return;                        // ignore empty searches

  const url = "https://commons.wikimedia.org/w/api.php?action=query" +
    "&generator=search&gsrsearch=" + encodeURIComponent(query) +
    "&gsrnamespace=6&gsrlimit=12&prop=imageinfo&iiprop=url&iiurlwidth=300&format=json&origin=*";

  const response = await fetch(url);
  if (!response.ok) throw new Error(response.status);
  const data = await response.json();

  const items = Object.values(data.query.pages);
  render(items);                             // the function from block 3
});
