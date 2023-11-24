if ('webkitSpeechRecognition' in window || 'speechRecognition' in window) {
    let recognition = new (window.speechRecognition || window.webkitSpeechRecognition)();
    let input = document.querySelector("#inputform")
    let submit = document.querySelector("#submitbutton")
    let tasklist = document.querySelector("#taskque")

    input.addEventListener("focus", function speech() {
        recognition.start();
    });
    recognition.onresult = (key) => {
        let text = key.results[0][0].transcript;
        input.value = text;
        addtask()
    }

    function addtask() {
        let tasktext = input.value.trim();
        if (tasktext !== '') {
            let taskitem = document.createElement("li")
            taskitem.innerHTML = `
            </span>${tasktext}<span><button onclick="deleteitem(this)">Delete</button>
            `
            tasklist.appendChild(taskitem);
            input.value = '';
        }

        recognition.onend = () => {
            recognition.stop()
        }
    }

    function deleteitem(e) {
        let liparentelem = e.parentNode;
        tasklist.remove(liparentelem);
    }
}

else {
    alert("your browser does not support the SpeechRecognition feature")
}