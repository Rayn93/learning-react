function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin',
    }, options))
        .then(checkStatus)
        .then(response => {
            return response.text()
                .then(text => text ? JSON.parse(text) : '');
        });
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 400) {
        return response;
    }

    const error = new Error(response.statusText);
    error.response = response;

    throw error
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

export function createRepLog(repLog) {
    return fetchJson(`/reactjs/public/index.php/reps`, {
        method: 'POST',
        body: JSON.stringify(repLog),
        header: {
            'Content-Type': 'application/json',
        }
    })
}