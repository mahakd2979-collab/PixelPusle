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

try {
  const res = await fetch(url);
  if (!res.ok) throw new Error(res.status);   // bad status -> jump to catch
  const data = await res.json();
  const items = Object.values(data.query.pages);

  if (items.length === 0) {
    status.textContent = "No results. Try another search.";  // EMPTY state
  } else {
    render(items);                                           // RESULTS state
  }
} catch (err) {
  status.textContent = "Something went wrong. Please try again."; // ERROR state
}
