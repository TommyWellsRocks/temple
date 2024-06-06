export function backButtonListener(destinationURL: string) {
    document.querySelector(".back-button")!.addEventListener("click", () => {
        window.location.href = destinationURL;
    });
}