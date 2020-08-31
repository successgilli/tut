const fetchUrl = async (url, options={}) => {
    const response = await fetch(url, options);
    const res = await response.json();

    return res;
};

export const postTask = async (name) => {
    const url = '/todo';
    const response = await fetchUrl(url, {
        method: 'POST',
        body: JSON.stringify({name}),
        headers: { 'Content-Type': 'application/json' }
    });

    const { data } = response;

    return data
};

export const deleteTask = async (id) => {
    const url = `/todo/${id}`;

    const response = await fetchUrl(url, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    console.log(response, ' ==> delete');
    const { data } = response;

    return data;
};
