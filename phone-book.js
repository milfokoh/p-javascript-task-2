'use strict';

/**
 * Сделано задание на звездочку
 * Реализован метод importFromCsv
 */
const isStar = true;

/**
 * Телефонная книга
 */
let phoneBook = {
    users: new Map()
};

/**
 * Добавление записи в телефонную книгу
 * @param {String} phone
 * @param {String?} name
 * @param {String?} email
 * @returns {Boolean}
 */
phoneBook.add = function(phone, name, email = '') {
    if (!(typeof phone == 'string' && typeof name == 'string' && typeof email == 'string')) {
        // throw new TypeError ('Передаваемые аргументы должены быть строкой');
        return false;
    }
    if (name.length == 0 ) {
        // throw new Error('Передаваемые аргументы должены быть заданной длинны');
        return false;
    }  
    if (phone.length !==  10) {
        // throw new Error('Передаваемые аргументы должены быть заданной длинны');
        return false;
    }
    else if (/^[a-zA-Z]/.test(phone)) {
        // throw new Error('Передаваемый аргумент phone не должен содержать символы');
        return false;
    }

    for (let phoneMap of this.users.keys()) {
        if (phoneMap == phone) {
            return false;           
        }
    }
    if (!false) {
        this.users.set(phone, [name, email].filter(Boolean).join(' '));
        return true;        
    } else return true;  
}

/**
 * Обновление записи в телефонной книге
 * @param {String} phone
 * @param {String?} name
 * @param {String?} email
 * @returns {Boolean}
 */
phoneBook.update = function(phone, name, email = '') {
    if (name.length !== 0) {
        for (let phoneMap of this.users.keys()) {
            if (phoneMap == phone) {
                this.users.delete(phoneMap);
                this.users.set(phone, [name, email].filter(Boolean).join(' '));
                return true;          
            }
        }
    } else return false;
}

/**
 * Удаление записей по запросу из телефонной книги
 * @param {String} query
 * @returns {Number}
 */
phoneBook.findAndRemove = function(query) {
    let result = 0;
    this.users.forEach((value, key) => {
        if (value.includes(query) || key.includes(query) ) {
            this.users.delete(key);
            result++;
        }            
      });
      return result;
}

/**
 * Поиск записей по запросу в телефонной книге
 * @param {String} query
 * @returns {String[]}
 */
phoneBook.find = function(query) {
    let subStr ; let subValue;
    let result = [];
    if (query == '*') {
        this.users.forEach((value, key) => {
            subStr = `+7 (${key.substr(0, 3)}) ${key.substr(3, 3)}-${key.substr(6,2)}-${key.substr(8,2)}`;
            subValue = value.split(' ');
            result.push( [subValue[0], subStr, subValue[1]].filter(Boolean).join(', '));
          });
    }
    else {
        this.users.forEach((value, key) => {
            if (value.includes(query) || key.includes(query) ) {
                subStr = `+7 (${key.substr(0, 3)}) ${key.substr(3, 3)}-${key.substr(6,2)}-${key.substr(8,2)}`;
                subValue = value.split(' ');
                result.push( [subValue[0], subStr, subValue[1]].filter(Boolean).join(', '));
            }            
          });
    }
    return result.sort( (a, b) => a.localeCompare(b) );
}

/**
 * Импорт записей из csv-формата
 * @star
 * @param {String} csv
 * @returns {Number} – количество добавленных и обновленных записей
 */
phoneBook.importFromCsv = function(csv) {
    let result = 0;
    let arr = [];
    for (let i=0; i < csv.length; i++) {
        arr.push(csv[i].split(';').sort( (a, b) => a.localeCompare(b) ).join(' '));
        result++;
    }
    this.users.forEach((value, key) => {
        for (let i = 0; i < arr.length; i++) {
            let item = arr[i].slice(10).split(' ').filter(Boolean).join(' ');
            if (key == arr[i].slice(0,10)) {
                if (value !== item) {
                    this.users.delete(key);
                    this.users.set(key, item);
                }                
            } else {
                    this.users.set(arr[i].slice(0,10), item);
            }
        }

        if (/[ ]/.test(key)){
            this.users.delete(key);
            result--;
        }
    });
    return result;
}

module.exports = phoneBook;