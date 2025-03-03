class Contact {
    constructor(firstName, lastName, address, city, state, zip, phone, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phone = phone;
        this.email = email;
    }

    display() {
        return `${this.firstName} ${this.lastName}, ${this.address}, ${this.city}, ${this.state}, ${this.zip}, ${this.phone}, ${this.email}`;
    }
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        this.contacts.push(contact);
    }

    listContacts() {
        this.contacts.forEach((contact, index) => {
            console.log(`${index + 1}. ${contact.display()}`);
        });
    }
}

// Example Usage
const addressBook = new AddressBook();
const contact1 = new Contact("Rahul", "Sharan", "435 Street", "Indore", "MP", "235456", "123-456-7890", "rahulsh@example.com");
addressBook.addContact(contact1);
addressBook.listContacts();
