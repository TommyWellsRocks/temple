export function backButtonListener(destinationURL) {
    document.querySelector(".back-button").addEventListener("click", () => {
        window.location.href = destinationURL;
    });
}