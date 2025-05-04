export const postNewJoke = async (jokeText) => {

    const response = await fetch("http://localhost:8088/jokes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jokeText)
    });
    
    return await response.json();

}