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

    // Validate First and Last Name -(Capitalized & min 3 characters)
    validateName(name, field) {
        const nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
        if (!nameRegex.test(name)) {
            throw new Error(`${field} must start with a capital letter and have at least 3 characters`);
        }
        return name;
    }

    // Validate Address, City, and State -(Min 4 characters)
    validateAddressField(value, field) {
        if (value.length < 4) {
            throw new Error(`${field} must have at least 4 characters`);
        }
        return value;
    }

    // Validate ZIP Code -(6 digits)
    validateZip(zip) {
        const zipRegex = /^\d{6}$/;
        if (!zipRegex.test(zip)) {
            throw new Error("Zip Code must be exactly 6 digits");
        }
        return zip;
    }

    // Validate Phone Number -(Format: xxx-xxx-xxxx)
    validatePhone(phone) {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error("Phone Number must be in format XXX-XXX-XXXX");
        }
        return phone;
    }

    // Validate Email -(Basic Email Pattern)
    validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format");
        }
        return email;
    }

    display() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zip}, ${this.phone}, ${this.email}`;
    }

    // Method to update contact details-
    updateDetails(updatedDetails) {
        Object.keys(updatedDetails).forEach(key => {
            if (this[key] !== undefined) {
                this[key] = updatedDetails[key];
            }
        });
        console.log("Contact updated successfully!");
    }
}

class AddressBook {
    constructor(name) {
        this.name = name;
        this.contacts = [];
    }

    addContact(contact) {
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

    // Find contact by name
    findContact(firstName, lastName) {
        return this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
    }

    // Edit contact details
    editContact(firstName, lastName, updatedDetails) {
        const contact = this.findContact(firstName, lastName);
        if (contact) {
            contact.updateDetails(updatedDetails);
        } else {
            console.log(`Contact ${firstName} ${lastName} not found`);
        }
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
            console.log("No Address Books available");
        } else {
            console.log("Available Address Books: ");
            this.addressBooks.forEach((book, index) => {
                console.log(`${index + 1}. ${book.name}`);
            });
        }
    }
}

// Usage
const manager = new AddressBookManager();
manager.createAddressBook("Friends");
manager.createAddressBook("Office");

const friendsBook = manager.getAddressBook("Friends");

try {
    // Adding a contact
    const contact1 = new Contact("Rahul", "Sharma", "123 Park Lane", "New York", "NY", "100001", "123-456-7890", "rahulsh@example.com");
    friendsBook.addContact(contact1);

    // Finding and editing the contact
    friendsBook.editContact("Jack", "Smith", { city: "Los Angeles", phone: "987-654-3210" });

} catch (error) {
    console.error("Error: ", error.message);
}

friendsBook.listContacts();
