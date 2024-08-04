document.getElementById("btn").addEventListener("click", () => {
    let value = document.querySelectorAll("input[type=input]");
    let result = value[1].value / (value[0].value * value[0].value);
    console.log(result);
    document.querySelector("input[type=text]").value = result
})


