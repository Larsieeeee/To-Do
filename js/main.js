addEventsToInput();
changeTitleToInput();

function addEventsToInput() {
// addEventToInput pakt alle elementen met de klassen "toDo__input en dan gaat de taskInput door de length heen"
    var taskInput = document.getElementsByClassName("toDo__input")
    for (var i = 0; i < taskInput.length; i++) {
        //als je een toets loslaat dan moet je de newTask functie uitvoeren
        taskInput[i].onkeyup = function (event) {
            newTask(event);
        }
    }
}

function changeTitleToInput(){
    // De changeTitleToInput gaat alle "toDo__headers" vragen
    var headers = document.getElementsByClassName("toDo__header");
    for(var i = 0; i < headers.length; i++){
        // nadat je hebt gevraagd naar de "toDo__headers" gaan ze er een voor een doorheen lopen en dan voegt die een onclick toe
        headers[i].onclick = function(){
            // hier slaat de onclick de oude titel op
            var oldtitle = this.children[0].innerText;
            // daarna halen we de h2 helemaal weg
            this.children[0].remove();
            // dan maken we hier weer een input
            var newInput = document.createElement("input");
            // hier geven het dan een klas om te stylen
            newInput.classList = "toDo__headerInput";
            // en vervolgens geven we de value de titel die we net hebben opgeslagen
            newInput.value = oldtitle;
            // daarna voeg je de input toe aan de header
            this.appendChild(newInput);
            // de focus zorgt ervoor dat je de blauwe lijnen kan zien om daarin te typen
            newInput.focus();

            // als je weer ENTER op de nieuwe input klikt dan voert ie weer iets nieuws uit
            newInput.onkeyup = function(event){
                if(event.key === "Enter"){
                    // hier komt een nieuwe titel die we eerder hebben opgeslagen
                    var newTitle = event.target.value;
                    // daarna maakt het een h2
                    var newHeading = document.createElement("h2");
                    // hij voegt de h2 toe aan die header
                    event.target.parentElement.appendChild(newHeading);
                    // daar komt de text dan in
                    newHeading.innerText = newTitle;
                    // hier voegt die dan de klasse toe
                    newHeading.classList = "toDo__heading";
                    // en hier haalt die de input dan weer weg
                    this.remove();
                }
            }
        }
    }
}


function newTask(event) {
    // als je op de Enter toetsknop drukt dan gaat de task een aantal dingen opzoeken
    if (event.key === "Enter") {
        // De task gaat in de input gaat 2 keer naar het parentElement en daarvan de eerste twee kinderen
        var tasks = event.target.parentElement.parentElement.children[1].children[0];
        // vervolgens maak je een nieuwe task aan en dat doe je dan met document.createElement("li");
        var newTask = document.createElement("li");
        // als je de nieuwe task doet dan heb je avondeten getyped en vervolgens maak je een nieuwe task aan (li) en daar zit je dan die text in
        newTask.innerText = event.target.value;
        // we voegen aan die task (li) een klasse toets
        newTask.classList = "toDo__task";
        // de dataset.running false betekend dat we weten wat we met de timer doen
        newTask.dataset.running = "false";
        // aan de lijst geven we een nieuwe task mee
        tasks.appendChild(newTask);
        // en dan resetten we de input want de input is de event.target
        event.target.value = "";
        // als je op de nieuwe task clickt dan moeten we de SetOrclearTimer zetten
        newTask.onclick = function (event) {
            setOrClearTimer(event);
        }
    }
}
var tasks = document.getElementsByClassName("toDo__task");
var timer = null;
for (var i = 0; i < tasks.length; i++) {
    tasks[i].onclick = function (event) {
        setOrClearTimer(event);
    }
}

function toDone(event) {
    timer = setTimeout(function () {
        var doneTask = document.createElement("li");
        doneTask.classList = "toDo__task toDo__task--done";
        doneTask.innerText = event.target.innerText;
        document.getElementById("js--done").appendChild(doneTask);
        event.target.remove();
    }, 2000)
}

function setOrClearTimer(event) {
    // hier kijkt de setOrClearTimer of de data.running wel op false staat
    if (event.target.dataset.running === "false") {
        // daarna moet je een timer gaan runnen
        event.target.classList.toggle("toDo__task--done");
        event.target.dataset.running = "true"
        // en dan voeg je de functie ToDone uit
        // de toDone functie zorgt er dan ook voor dat de li verdwijnt en dan na 2 seconden de li naar de klaar kaartje word verplaatst
        toDone(event);
    }

    // als de dataset.running op true staat, dan moet ie de timer weg halen
    else if (event.target.dataset.running === "true") {
        event.target.classList.toggle("toDo__task--done");
        clearTimeout(timer);
        event.target.dataset.running = "false"
    }
}

var fab = document.getElementById("js--fab");
fab.onclick = function () {
    makeNewCard();
}

function makeNewCard() {
    /* make the card */
    var newTodo = document.createElement("article");
    newTodo.classList = "toDo";

    /*make the header*/
    var newHeader = document.createElement("header");
    newHeader.classList = "toDo__header";

    /* make the heading*/
    var newHeading = document.createElement("h2");
    newHeading.classList = "toDo__heading";
    newHeading.innerText = "Default";

    /* make the section*/
    var newSection = document.createElement("section");
    newSection.classList = "toDo__body";

    /* make the UL*/
    var newList = document.createElement("ul");
    newList.classList = "toDo__tasks";

    /* make the footer*/
    var newFooter = document.createElement("footer");
    newFooter.classList = "toDo__footer";

    /* make the input*/
    var newInput = document.createElement("input");
    newInput.classList = "toDo__input";
    newInput.type = "text";
    newInput.placeholder = "Enter a task...";
    newInput.id = "js--input";


    // hier wordt alle HTML elementen met de juiste klasse en de juiste text samengevoegd
    newFooter.appendChild(newInput);
    newSection.appendChild(newList);
    newHeader.appendChild(newHeading);
    newTodo.appendChild(newHeader);
    newTodo.appendChild(newSection);
    newTodo.appendChild(newFooter);


    // daarna worden de elementen in de body toe gevoegd
    document.getElementsByTagName("body")[0].appendChild(newTodo);

    // en daarna gaan alle inputs opnieuw ervoor zorgen dat het bij de juiste kaartje komt
    addEventsToInput();
    // en het zorgt ervoor dat alle titels klikbaar zijn
    changeTitleToInput();
}



// functies

// 1. een functie gaat pas lopen als jij dat zegt.
// 2. een functie is een stukje herbruikbare code wat we kunnen oproepen
// 3. we kunnen dingen aan een functie meegeven