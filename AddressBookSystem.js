import java.util.*;
import java.util.stream.Collectors;

class Contact {
    private String firstName, lastName, address, city, state, zip, phone, email;

    public Contact(String firstName, String lastName, String address, String city, String state, String zip, String phone, String email) {
        this.firstName = validateName(firstName, "First Name");
        this.lastName = validateName(lastName, "Last Name");
        this.address = validateField(address, "Address", 4);
        this.city = validateField(city, "City", 4);
        this.state = validateField(state, "State", 4);
        this.zip = validateZip(zip);
        this.phone = validatePhone(phone);
        this.email = validateEmail(email);
    }

    private String validateName(String name, String field) {
        if (!name.matches("^[A-Z][a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException(field + " must start with a capital letter and have at least 3 characters.");
        }
        return name;
    }

    private String validateField(String value, String field, int minLength) {
        if (value.length() < minLength) {
            throw new IllegalArgumentException(field + " must have at least " + minLength + " characters.");
        }
        return value;
    }

    private String validateZip(String zip) {
        if (!zip.matches("^\\d{6}$")) {
            throw new IllegalArgumentException("Zip Code must be exactly 6 digits.");
        }
        return zip;
    }

    private String validatePhone(String phone) {
        if (!phone.matches("^\\d{3}-\\d{3}-\\d{4}$")) {
            throw new IllegalArgumentException("Phone Number must be in format XXX-XXX-XXXX.");
        }
        return phone;
    }

    private String validateEmail(String email) {
        if (!email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
            throw new IllegalArgumentException("Invalid email format.");
        }
        return email;
    }

    public String getCity() { return city; }
    public String getState() { return state; }
    public String getZip() { return zip; }
    public String getFullName() { return firstName + " " + lastName; }

    @Override
    public String toString() {
        return String.format("%s %s, %s, %s, %s, %s, %s, %s",
                firstName, lastName, address, city, state, zip, phone, email);
    }
}

class AddressBook {
    private String name;
    private List<Contact> contacts;

    public AddressBook(String name) {
        this.name = name;
        this.contacts = new ArrayList<>();
    }

    public void addContact(Contact contact) {
        boolean duplicate = contacts.stream().anyMatch(c -> c.getFullName().equals(contact.getFullName()));
        if (duplicate) {
            System.out.println("Duplicate Entry: " + contact.getFullName() + " already exists in " + name);
            return;
        }
        contacts.add(contact);
        System.out.println("Contact added successfully to " + name + "!");
    }

    public void listContacts() {
        if (contacts.isEmpty()) {
            System.out.println("No contacts available in " + name + ".");
            return;
        }
        System.out.println("\nContacts in " + name + ":");
        contacts.forEach(System.out::println);
    }

    // ✅ **Sorting Functions**
    public void sortByCity() {
        contacts = contacts.stream()
                .sorted(Comparator.comparing(Contact::getCity))
                .collect(Collectors.toList());
        System.out.println("\nContacts Sorted by City:");
        listContacts();
    }

    public void sortByState() {
        contacts = contacts.stream()
                .sorted(Comparator.comparing(Contact::getState))
                .collect(Collectors.toList());
        System.out.println("\nContacts Sorted by State:");
        listContacts();
    }

    public void sortByZip() {
        contacts = contacts.stream()
                .sorted(Comparator.comparing(Contact::getZip))
                .collect(Collectors.toList());
        System.out.println("\nContacts Sorted by Zip:");
        listContacts();
    }
}

class AddressBookManager {
    private List<AddressBook> addressBooks;

    public AddressBookManager() {
        this.addressBooks = new ArrayList<>();
    }

    public void createAddressBook(String name) {
        addressBooks.add(new AddressBook(name));
        System.out.println("New Address Book '" + name + "' created successfully!");
    }

    public AddressBook getAddressBook(String name) {
        return addressBooks.stream()
                .filter(book -> book.name.equals(name))
                .findFirst()
                .orElse(null);
    }
}

public class AddressBookApp {
    public static void main(String[] args) {
        AddressBookManager manager = new AddressBookManager();
        manager.createAddressBook("Friends");

        AddressBook friendsBook = manager.getAddressBook("Friends");

        try {
            Contact contact1 = new Contact("Alice", "Brown", "123 Park Lane", "New York", "NY", "100001", "123-456-7890", "alice@example.com");
            Contact contact2 = new Contact("Bob", "Smith", "456 Elm Street", "Los Angeles", "CA", "900002", "987-654-3210", "bob@example.com");
            Contact contact3 = new Contact("Charlie", "Davis", "789 Sunset Blvd", "New York", "NY", "940001", "555-789-4561", "charlie@example.com");
            Contact contact4 = new Contact("David", "Evans", "321 Maple Ave", "Chicago", "IL", "600003", "111-222-3333", "david@example.com");
            Contact contact5 = new Contact("Eve", "Foster", "654 Broadway", "Los Angeles", "CA", "900003", "444-555-6666", "eve@example.com");

            friendsBook.addContact(contact1);
            friendsBook.addContact(contact2);
            friendsBook.addContact(contact3);
            friendsBook.addContact(contact4);
            friendsBook.addContact(contact5);

            // ✅ **Sort Contacts by City, State, and Zip**
            friendsBook.sortByCity();
            friendsBook.sortByState();
            friendsBook.sortByZip();

        } catch (IllegalArgumentException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}
