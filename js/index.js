class TodoApp {

    constructor() {
        this.notes = JSON.parse(window.localStorage.getItem('@notes') || `{ "data": []}`);

        this.formAddNotes = document.getElementById('form-add-note');
        this.noteList = document.getElementById('notes');


        this.initEvents();
    }


    initEvents() {
        this.updateListObserve();
        this.formAddNotes.addEventListener('submit', event => {
            event.preventDefault();

            const el = [...event.target.elements].filter(el => el.type === 'text');
            this.createNote(el[0].value || '');
            event.target.reset();
        });
    
    
        document.addEventListener('click', e => {
            if (e.target.parentElement === this.noteList) {
                if(confirm('Deseja remover a nota?')) {
                    this.deleteNote(e.target)
                }
            }
        })
    }



    updateListObserve() {
        Array.observe(this.notes.data, (changes) => {
            
            let index  = null;
            let value = '';
            let status = '';

            console.log('Data is changed', changes);

            if(changes[0].type === 'splice') {
                index = changes[0].index;
                value = changes[0].object[index];
                status = (changes[0].addedCount > 0) ? 'created' : 'removed'
            }

            if(changes[0].type === 'update') {
                index = changes[0].name;
                value = changes[0].object[index];
                status = 'updated';
            }



            if(!value && status === 'created' && status === 'updated') {
                return;
            }

            if(status === 'updated') {
                console.log('Implementar!');
            }

            if(status === 'removed') {
                let listOfNotes = this.noteList.querySelectorAll('li');
                this.noteList.removeChild(listOfNotes[index]);
            }

            if(status === 'created') {
                let newLi = document.createElement('li');
                newLi.innerHTML = value;
                this.noteList.appendChild(newLi);
            }


            window.localStorage.setItem('@notes', JSON.stringify(this.notes))
        })
    }


    createNote(value) {
        if(value && value.length) this.notes.data.push(value);
    }

    deleteNote(note) {
        [...this.noteList.children].forEach((item, index) => {
            if(item === note) this.notes.data.splice(index, 1);
        });
    }
}





document.addEventListener('DOMContentLoaded', (e) => {

    // Registrando o SERVICE WORKER
    if ('serviceWorker' in navigator) {
        // o correto => ('./app.service.worker.js');
        // Estamos utilizando node.js entao .....
        navigator
        .serviceWorker
        .register('/pwa/app.service.worker.js')
        .then((register) => {console.log('Service Worker is Registered!')})
        .catch((err) => console.error('Inválid Worker!', err));
    
    }

    new TodoApp()
});