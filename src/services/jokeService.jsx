export const postNewJoke = async (jokeText) => {

    const response = await fetch("http://localhost:8088/jokes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jokeText)
    });
    
    return await response.json();

}

export const getAllJokes = async () => {
    return await fetch("http://localhost:8088/jokes").then((res) => res.json());
}

export const updateJokeTold = async (joke) => {
    joke.told = !joke.told;

    await fetch(`http://localhost:8088/jokes/${joke.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: joke.id,
            text: joke.text,
            told: joke.told
        })
    })
}