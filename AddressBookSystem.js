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

    // Count persons by City
    countByCity() {
        const cityCount = this.contacts.reduce((acc, contact) => {
            acc[contact.city] = (acc[contact.city] || 0) + 1;
            return acc;
        }, {});

        console.log("\nNumber of Contacts by City:");
        Object.entries(cityCount).forEach(([city, count]) => {
            console.log(`${city}: ${count}`);
        });
    }

    // Count persons by State
    countByState() {
        const stateCount = this.contacts.reduce((acc, contact) => {
            acc[contact.state] = (acc[contact.state] || 0) + 1;
            return acc;
        }, {});

        console.log("\nNumber of Contacts by State:");
        Object.entries(stateCount).forEach(([state, count]) => {
            console.log(`${state}: ${count}`);
        });
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

// Example Usage
const manager = new AddressBookManager();
manager.createAddressBook("Friends");

const friendsBook = manager.getAddressBook("Friends");

try {
    const contact1 = new Contact("Alice", "Brown", "123 Park Lane", "New York", "NY", "100001", "123-456-7890", "alice@example.com");
    const contact2 = new Contact("Bob", "Smith", "456 Elm Street", "Los Angeles", "CA", "900002", "987-654-3210", "bob@example.com");
    const contact3 = new Contact("Charlie", "Davis", "789 Sunset Blvd", "New York", "NY", "940001", "555-789-4561", "charlie@example.com");
    const contact4 = new Contact("David", "Evans", "321 Maple Ave", "Chicago", "IL", "600003", "111-222-3333", "david@example.com");
    const contact5 = new Contact("Eve", "Foster", "654 Broadway", "Los Angeles", "CA", "900003", "444-555-6666", "eve@example.com");

    friendsBook.addContact(contact1);
    friendsBook.addContact(contact2);
    friendsBook.addContact(contact3);
    friendsBook.addContact(contact4);
    friendsBook.addContact(contact5);

    // Counting contacts by city
    friendsBook.countByCity();

    // Counting contacts by state
    friendsBook.countByState();

} catch (error) {
    console.error("Error:", error.message);
}

friendsBook.listContacts();
