const fs = require("node:fs/promises");
const path = require("node:path");
const {nanoid} = require("nanoid");

const contactPath = path.join(__dirname, "db", "contacts.json");

console.log(contactPath);
 

async function listContacts() {
    const data = await fs.readFile(contactPath, {encoding: "utf-8"})
    return JSON.parse(data);
};

async function getContactById(contactId) {
const id = String(contactId);
const contacts = await listContacts();
const result = contacts.find((item) => item.id === id);
return result || null;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name, 
        email,
        phone,
    };
    contacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return contacts;
}

async function removeContact(contactId) {
    const id = String(contactId);
    const contacts = await listContacts();
    const index = contacts.findIndex((item => item.id === id));
    if (index === -1){
        return null;
    }
    const [results] = contacts.splice(index, 1);
    await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
    return results;
};

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
};