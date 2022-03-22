function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin',
    }, options))
        .then(response => {
            return response.json();
        });
}

/**
 * Returns a promise where the data is the rep log collection
 *
 * @return {Promise<Response>}
 */
export function getRepLogs() {
    return fetchJson('/reactjs/public/index.php/reps')
        .then(data => data.items);
}

export function deleteRepLog(id) {
    return fetchJson(`/reactjs/public/index.php/reps/${id}`, {
        method: 'DELETE',
    })
}