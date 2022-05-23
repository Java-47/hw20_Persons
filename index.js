const persons = [];

addPerson.onclick = function () {
    deleteStats();
    const person = new Person(personId.value.trim(), firstName.value.trim(), lastName.value.trim(), age.value);
    if (persons.findIndex(item => item.id === person.id) >= 0) {
        alert(`Person with id = ${person.id} exists`);
    } else {
        persons.push(person);
        const li = createInfoElement(`ID: ${person.id}, ${person.firstName}, ${person.lastName}, age: ${person.age}`, 'li');
        personsList.append(li);
        //HW
        const delBtn = document.createElement('button')
        delBtn.append(document.createTextNode("X"))
        li.append(delBtn)
        delBtn.onclick = e =>{
            deleteStats();
            persons.splice(persons.lastIndexOf(person), 1)
            e.target.parentElement.remove();
            //console.log(persons)   
        }
    }
    personId.value = firstName.value = lastName.value = age.value = '';
};

calcStats.onclick = function () {
    const divStats = document.createElement('div');
    let age = persons.reduce((accum, p) => accum + p.age, 0) / persons.length;
    const h3avg = createInfoElement(`Average age: ${age.toFixed(1)}`, 'h3');
    age = persons.reduce((min, p) => p.age < min ? p.age : min, persons[0].age);
    const h3min = createInfoElement(`Min age: ${age}`, 'h3');
    age = persons.reduce((max, p) => p.age > max ? p.age : max, persons[0].age);
    const h3max = createInfoElement(`Max age: ${age}`, 'h3');
    divStats.append(h3avg, h3min, h3max);
    if (stats.firstElementChild.nextElementSibling) {
        stats.replaceChild(divStats, stats.firstElementChild.nextElementSibling);
    } else {
        stats.appendChild(divStats);
    }
};
function deleteStats()
{
    const stats = document.getElementById('stats');
    if(stats.firstElementChild.nextElementSibling)
    {
        stats.firstElementChild.nextElementSibling.remove();
    }
}

function createInfoElement(content, tag) {
    const element = document.createElement(tag);
    const text = document.createTextNode(content);
    element.appendChild(text);
    return element;
}

function Person(id, firstName, lastName, age){
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = +age;
}