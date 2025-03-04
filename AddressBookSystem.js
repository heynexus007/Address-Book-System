class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        this.firstName = this.validateName(firstName, "First Name");
        this.lastName = this.validateName(lastName, "Last Name");
        this.address = this.validateAddressField(address, "Address");
        this.city = this.validateAddressField(city, "City");
        this.state = this.validateAddressField(state, "State");
        this.zip = this.validateZip(zip);
        this.phone = this.validatePhone(phone);
        this.email = this.validateEmail(email);
    }

    validateName(name, field) {
        const nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
        if (!nameRegex.test(name)) {
            throw new Error(`${field} must start with a capital letter and have at least 3 characters.`);
        }
        return name;
    }

    validateAddressField(value, field) {
        if (value.length < 4) {
            throw new Error(`${field} must have at least 4 characters.`);
        }
        return value;
    }

    validateZip(zip) {
        const zipRegex = /^\d{6}$/;
        if (!zipRegex.test(zip)) {
            throw new Error("Zip Code must be exactly 6 digits.");
        }
        return zip;
    }

    validatePhone(phone) {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error("Phone Number must be in format XXX-XXX-XXXX.");
        }
        return phone;
    }

    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }
        return email;
    }

    display() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zip}, ${this.phone}, ${this.email}`;
    }
}

class AddressBook {
    constructor(name) {
        this.name = name;
        this.contacts = [];
    }

    addContact(contact) {
        // Check for duplicate by filtering contacts with the same full name
        const isDuplicate = this.contacts.some(c => c.firstName === contact.firstName && c.lastName === contact.lastName);
        
        if (isDuplicate) {
            console.log(`Duplicate Entry: ${contact.firstName} ${contact.lastName} already exists in ${this.name}.`);
            return;
        }

        this.contacts.push(contact);
        console.log(`Contact added to ${this.name} successfully!`);
    }

    listContacts() {
        if (this.contacts.length === 0) {
            console.log(`No contacts available in ${this.name}.`);
        } else {
            console.log(`Contacts in ${this.name}:`);
            this.contacts.forEach((contact, index) => {
                console.log(`${index + 1}. ${contact.display()}`);
            });
        }
    }

    findContact(firstName, lastName) {
        return this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
    }

    editContact(firstName, lastName, updatedDetails) {
        const contact = this.findContact(firstName, lastName);
        if (contact) {
            Object.keys(updatedDetails).forEach(key => {
                if (contact[key] !== undefined) {
                    contact[key] = updatedDetails[key];
                }
            });
            console.log(`Contact ${firstName} ${lastName} updated successfully!`);
        } else {
            console.log(`Contact ${firstName} ${lastName} not found.`);
        }
    }

    deleteContact(firstName, lastName) {
        const index = this.contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
        if (index !== -1) {
            this.contacts.splice(index, 1);
            console.log(`Contact ${firstName} ${lastName} deleted successfully!`);
        } else {
            console.log(`Contact ${firstName} ${lastName} not found.`);
        }
    }

    countContacts() {
        const count = this.contacts.reduce(acc => acc + 1, 0);
        console.log(`Total number of contacts in ${this.name}: ${count}`);
        return count;
    }
}

class AddressBookManager {
    constructor() {
        this.addressBooks = [];
    }

    createAddressBook(name) {
        const newAddressBook = new AddressBook(name);
        this.addressBooks.push(newAddressBook);
        console.log(`New Address Book '${name}' created successfully!`);
    }

    getAddressBook(name) {
        return this.addressBooks.find(book => book.name === name);
    }

    listAddressBooks() {
        if (this.addressBooks.length === 0) {
            console.log("No Address Books available.");
        } else {
            console.log("Available Address Books:");
            this.addressBooks.forEach((book, index) => {
                console.log(`${index + 1}. ${book.name}`);
            });
        }
    }
}

//Usage
const manager = new AddressBookManager();
manager.createAddressBook("Friends");

const friendsBook = manager.getAddressBook("Friends");

try {
    const contact1 = new Contact("Alice", "Brown", "123 Park Lane", "New York", "NY", "100001", "123-456-7890", "alice@example.com");
    const contact2 = new Contact("Bob", "Smith", "456 Elm Street", "Los Angeles", "CA", "900002", "987-654-3210", "bob@example.com");
    const contact3 = new Contact("Alice", "Brown", "789 Sunset Blvd", "San Francisco", "CA", "940001", "555-789-4561", "alice.b@example.com");

    friendsBook.addContact(contact1);
    friendsBook.addContact(contact2);
    // This should be rejected as a duplicate
    friendsBook.addContact(contact3); 

    // Counting the contacts
    friendsBook.countContacts();

} catch (error) {
    console.error("Error: ", error.message);
}

friendsBook.listContacts();
