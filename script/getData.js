/* get data from server */
export async function getData() {
    const url = "http://demo.sibers.com/users";
    const response = await fetch(url);

    if (response.ok) {
        const json = await response.json();
        /* return necessary info */
        return json;
    }
    else {
        alert("Ошибка HTTP: " + response.status);
    }
}