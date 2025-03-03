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

    // Validate First and Last Name (Capitalized & min 3 characters)
    validateName(name, field) {
        const nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
        if (!nameRegex.test(name)) {
            throw new Error(`${field} must start with a capital letter and have at least 3 characters`);
        }
        return name;
    }

    // Validate Address, City, and State (Min 4 characters)
    validateAddressField(value, field) {
        if (value.length < 4) {
            throw new Error(`${field} must have at least 4 characters`);
        }
        return value;
    }

    // Validate ZIP Code (6 digits)
    validateZip(zip) {
        const zipRegex = /^\d{6}$/;
        if (!zipRegex.test(zip)) {
            throw new Error("Zip Code must be exactly 6 digits");
        }
        return zip;
    }

    // Validate Phone Number (Format: xxx-xxx-xxxx)
    validatePhone(phone) {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error("Phone Number must be in format XXX-XXX-XXXX");
        }
        return phone;
    }

    // Validate Email (Basic Email Pattern)
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
}

class AddressBook {
    constructor() {
        this.contacts = [];
    }

    addContact(contact) {
        this.contacts.push(contact);
        console.log("Contact added successfully!");
    }

    listContacts() {
        if (this.contacts.length === 0) {
            console.log("No contacts available");
        } else {
            this.contacts.forEach((contact, index) => {
                console.log(`${index + 1}. ${contact.display()}`);
            });
        }
    }
}

//Error Handling
const addressBook = new AddressBook();

try {
    const contact1 = new Contact("Rahul", "Sharma", "354 Street", "Indore", "MP", "34467", "123-456-7890", "rahulsh@example.com");
    addressBook.addContact(contact1);
} catch (error) {
    console.error("Error: ", error.message);
}

addressBook.listContacts();
