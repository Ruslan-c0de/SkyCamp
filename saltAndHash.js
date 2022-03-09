import crypto from 'crypto';

// const crypto = require('crypto');

class Salt{
    #saltArray;
    constructor() {
        this.#saltArray = ["d","]","q","7","&","'","k",":","|","|","{","}",",","n","x","`","~","#","p","-",
        "^","w","$","9","@","u","3","a","A","_","[","&","(","*",")","+","-","4","/","b",".",">","<",":",]
    }

    generateSalt(){
        let saltForPassword = '';

        for(let i = 0; i < 15; i++){
            const randomIndex = Math.floor(Math.random() * this.#saltArray.length);
            saltForPassword += this.#saltArray[randomIndex];
        }

        return saltForPassword;
    }
}

export class Hash{
    constructor(){
        this.saltGenerator = new Salt();
    }
    generateHash(password){
        const salt = this.saltGenerator.generateSalt();
        // const passwordAndSalt = password.concat(salt);
        let hash = crypto.createHmac('sha256', salt);
        hash = hash.update(password);
        const res = hash.digest('hex');
        return res;
    }
}