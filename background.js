



document.getElementById("search-button").addEventListener("click", () => {
    // Get the value of the input field
    const channelName = document.getElementById("channel-name").value

    //Display msg in DIV element
    var messageDiv = document.getElementById("message");
    messageDiv.innerHTML = "The name of your content creator is: " + channelName;
})

