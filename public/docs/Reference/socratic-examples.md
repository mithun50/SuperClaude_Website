# Socratic Learning Examples - Real Discovery Sessions

> **Live Examples**: See actual Socratic discovery sessions demonstrating the learning process

## 🎯 Clean Code Discovery Examples

### Example 1: Meaningful Names Discovery

#### Starting Code
```javascript
function calc(d, r, n) {
    const m = r / 12;
    const p = Math.pow(1 + m, n);
    return d * m * p / (p - 1);
}
```

#### Socratic Discovery Session
```yaml
ai_question_1: "What do you think this function does when you first look at it?"
typical_user_response: "I have no idea... something with math?"

ai_question_2: "What information would help you understand its purpose?"
typical_user_response: "The variable names don't tell me anything meaningful"

ai_question_3: "If you had to explain this to a teammate, what would you need to figure out first?"
typical_user_response: "What d, r, and n represent, and what the calculation is for"

ai_question_4: "What would make this function's purpose immediately obvious?"
typical_user_response: "Better variable names that explain what they represent"

ai_validation: |
  "Exactly! You've discovered what Robert Martin calls 'intention-revealing names.' 
  In Clean Code Chapter 2, he emphasizes that names should tell you why something 
  exists, what it does, and how it's used - without requiring mental translation."

ai_application: "How would you rename these variables to reveal the function's intent?"
```

#### Discovery Outcome
```javascript
function calculateMonthlyLoanPayment(principal, annualRate, monthsToRepay) {
    const monthlyRate = annualRate / 12;
    const compound = Math.pow(1 + monthlyRate, monthsToRepay);
    return principal * monthlyRate * compound / (compound - 1);
}
```

**Learning Achievement**: User discovers intention-revealing names principle through guided observation

---

### Example 2: Single Responsibility Discovery

#### Starting Code
```javascript
function processUser(userData) {
    // Validate input
    if (!userData.email || !userData.email.includes('@')) {
        throw new Error('Invalid email format');
    }
    
    // Hash password
    const salt = 'secretSalt123';
    const hashedPassword = hashFunction(userData.password + salt);
    
    // Save to database
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    database.execute(query, [userData.name, userData.email, hashedPassword]);
    
    // Send welcome email
    emailService.send(userData.email, 'Welcome!', 'Thanks for joining our platform!');
    
    // Log the event
    logger.info(`New user registered: ${userData.email} at ${new Date()}`);
    
    return { success: true, userId: database.lastInsertId };
}
```

#### Socratic Discovery Session
```yaml
ai_question_1: "Walk through this function step by step. What different operations do you see?"
typical_user_response: "It validates data, hashes passwords, saves to database, sends email, and logs"

ai_question_2: "How many different reasons might this function need to change?"
typical_user_response: "If validation rules change, password hashing changes, database schema changes, email templates change, or logging format changes"

ai_question_3: "What would happen if you only wanted to change the email message?"
typical_user_response: "I'd have to modify this big function even though I'm only changing one small part"

ai_question_4: "How might you organize this differently to make changes easier?"
typical_user_response: "Maybe separate each responsibility into its own function?"

ai_validation: |
  "Perfect! You've discovered the Single Responsibility Principle. Robert Martin 
  teaches that functions should 'do one thing and do it well.' When functions 
  handle multiple responsibilities, they become harder to understand, test, and modify."

ai_application: "What would you name the separate functions for each responsibility?"
```

#### Discovery Outcome
```javascript
function registerUser(userData) {
    const validatedData = validateUserInput(userData);
    const hashedPassword = hashUserPassword(validatedData.password);
    const userId = saveUserToDatabase(validatedData, hashedPassword);
    sendWelcomeEmail(validatedData.email);
    logUserRegistration(validatedData.email);
    return { success: true, userId };
}

function validateUserInput(userData) { /* validation logic */ }
function hashUserPassword(password) { /* hashing logic */ }
function saveUserToDatabase(data, password) { /* database logic */ }
function sendWelcomeEmail(email) { /* email logic */ }
function logUserRegistration(email) { /* logging logic */ }
```

**Learning Achievement**: User discovers Single Responsibility Principle through consequence analysis

---

## 🏗 Design Pattern Discovery Examples

### Example 1: Observer Pattern Discovery

#### Starting Code
```javascript
class WeatherStation {
    constructor() {
        this.temperature = 0;
        this.phoneApp = new PhoneApp();
        this.webDisplay = new WebDisplay();
        this.emailAlert = new EmailAlert();
    }
    
    setTemperature(temp) {
        this.temperature = temp;
        this.phoneApp.updateTemperature(temp);
        this.webDisplay.updateTemperature(temp);
        this.emailAlert.updateTemperature(temp);
    }
    
    addNewDisplay(display) {
        // How do we handle this without modifying setTemperature?
    }
}
```

#### Socratic Discovery Session
```yaml
ai_question_1: "What happens when the temperature changes in this weather station?"
typical_user_response: "It updates the phone app, web display, and email alert"

ai_question_2: "What would you need to change if you wanted to add a new type of display?"
typical_user_response: "I'd have to modify the setTemperature method to call the new display"

ai_question_3: "What problem do you see with the weather station knowing about every specific display?"
typical_user_response: "It's tightly coupled - the weather station has to know about all the different display types"

ai_question_4: "How could you notify multiple displays without the weather station knowing their specific types?"
typical_user_response: "Maybe have a list of displays and just call the same method on all of them?"

ai_question_5: "What kind of relationship would that create between the weather station and the displays?"
typical_user_response: "One weather station could notify many displays, but the displays would all have the same interface"

ai_validation: |
  "Excellent! You've identified the Observer pattern. The GoF describes it as 
  defining a one-to-many dependency between objects so that when one object 
  changes state, all its dependents are notified and updated automatically."

ai_application: "How would you implement this pattern with a common interface for all displays?"
```

#### Discovery Outcome
```javascript
class WeatherStation {
    constructor() {
        this.temperature = 0;
        this.observers = [];
    }
    
    addObserver(observer) {
        this.observers.push(observer);
    }
    
    removeObserver(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    
    setTemperature(temp) {
        this.temperature = temp;
        this.notifyObservers();
    }
    
    notifyObservers() {
        this.observers.forEach(observer => observer.update(this.temperature));
    }
}

// All displays implement the same interface
class PhoneApp {
    update(temperature) { /* update phone display */ }
}

class WebDisplay {
    update(temperature) { /* update web display */ }
}
```

**Learning Achievement**: User discovers Observer pattern through coupling analysis

---

### Example 2: Strategy Pattern Discovery

#### Starting Code
```javascript
class PaymentProcessor {
    processPayment(amount, paymentType) {
        if (paymentType === 'credit') {
            // Credit card processing logic
            console.log('Processing credit card payment');
            return this.processCreditCard(amount);
        } else if (paymentType === 'paypal') {
            // PayPal processing logic
            console.log('Processing PayPal payment');
            return this.processPayPal(amount);
        } else if (paymentType === 'bitcoin') {
            // Bitcoin processing logic
            console.log('Processing Bitcoin payment');
            return this.processBitcoin(amount);
        } else {
            throw new Error('Unsupported payment type');
        }
    }
    
    // What happens when we need to add Apple Pay, Google Pay, bank transfer, etc.?
}
```

#### Socratic Discovery Session
```yaml
ai_question_1: "What different approaches could be used to process payments in this system?"
typical_user_response: "Credit card, PayPal, Bitcoin, and potentially others like Apple Pay"

ai_question_2: "What would happen to this function if you needed to add five more payment methods?"
typical_user_response: "The if-else chain would get really long and complex"

ai_question_3: "What would you need to change each time you add a new payment method?"
typical_user_response: "I'd have to modify the processPayment function and add new if-else conditions"

ai_question_4: "How could you add new payment methods without changing the existing code?"
typical_user_response: "Maybe have separate classes for each payment method?"

ai_question_5: "What would stay the same versus what would change between different payment approaches?"
typical_user_response: "They all process a payment amount, but the specific steps are different for each"

ai_validation: |
  "Perfect! You've discovered the Strategy pattern. It defines a family of algorithms, 
  encapsulates each one, and makes them interchangeable. The algorithm varies 
  independently from clients that use it."

ai_application: "How would you design the common interface that all payment strategies would implement?"
```

#### Discovery Outcome
```javascript
class PaymentProcessor {
    constructor(paymentStrategy) {
        this.strategy = paymentStrategy;
    }
    
    setStrategy(paymentStrategy) {
        this.strategy = paymentStrategy;
    }
    
    processPayment(amount) {
        return this.strategy.pay(amount);
    }
}

// Strategy interface implemented by all payment methods
class CreditCardStrategy {
    pay(amount) {
        console.log(`Processing $${amount} via credit card`);
        // Credit card specific logic
    }
}

class PayPalStrategy {
    pay(amount) {
        console.log(`Processing $${amount} via PayPal`);
        // PayPal specific logic
    }
}

class BitcoinStrategy {
    pay(amount) {
        console.log(`Processing $${amount} via Bitcoin`);
        // Bitcoin specific logic
    }
}

// Usage
const processor = new PaymentProcessor(new CreditCardStrategy());
processor.processPayment(100);

// Easy to switch strategies
processor.setStrategy(new PayPalStrategy());
processor.processPayment(100);
```

**Learning Achievement**: User discovers Strategy pattern through extensibility analysis

---

## 🔄 Cross-Domain Discovery Examples

### Example: Clean Code Principles in Design Patterns

#### Pattern with Clean Code Issues
```javascript
class ObserverImpl {
    constructor() {
        this.obs = []; // Poor naming
        this.d = null;  // What is 'd'?
    }
    
    add(o) { this.obs.push(o); } // Unclear method name
    
    upd(newD) { // What does 'upd' mean? What is 'newD'?
        this.d = newD;
        this.obs.forEach(o => o.upd(this.d)); // Propagating unclear naming
    }
}
```

#### Integrated Discovery Session
```yaml
ai_question_1: "This code implements a design pattern. Can you identify which pattern from its behavior?"
user_discovery: "Observer pattern - it notifies multiple objects of changes"

ai_question_2: "Now that you recognize the pattern, what do you notice about the code quality?"
user_observation: "The names are unclear and abbreviated"

ai_question_3: "How do the unclear names affect your understanding of the pattern implementation?"
user_insight: "It's harder to see how the Observer pattern works when the names don't reveal intent"

ai_question_4: "How could Clean Code principles improve this pattern implementation?"
user_synthesis: "Better names would make the pattern more self-documenting and easier to understand"

ai_validation: |
  "Excellent synthesis! You're seeing how Clean Code principles and Design Patterns 
  work together. Clear, intention-revealing names make patterns more recognizable 
  and maintainable. Both aim to make code easier to understand and modify."
```

#### Improved Implementation
```javascript
class NewsPublisher {
    constructor() {
        this.subscribers = [];
        this.latestNews = null;
    }
    
    addSubscriber(subscriber) { 
        this.subscribers.push(subscriber); 
    }
    
    publishNews(newsContent) {
        this.latestNews = newsContent;
        this.notifyAllSubscribers();
    }
    
    notifyAllSubscribers() {
        this.subscribers.forEach(subscriber => 
            subscriber.receiveNews(this.latestNews)
        );
    }
}
```

**Learning Achievement**: User synthesizes Clean Code principles with Design Pattern implementation

---

## 🎯 Learning Progression Examples

### Beginner Level Discovery
- **Focus**: Concrete observations and clear code issues
- **Questions**: "What do you see here?" "How does this work?"
- **Guidance**: High level with clear hints and direction
- **Outcomes**: Recognition of obvious problems and simple improvements

### Intermediate Level Discovery
- **Focus**: Pattern recognition and principle connections
- **Questions**: "Why might this approach cause problems?" "What principle applies here?"
- **Guidance**: Medium level with guided discovery
- **Outcomes**: Understanding of underlying principles and their applications

### Advanced Level Discovery
- **Focus**: Architectural implications and design trade-offs
- **Questions**: "How would this decision impact system evolution?" "What alternatives exist?"
- **Guidance**: Low level encouraging independent thinking
- **Outcomes**: Strategic design thinking and principle synthesis

---

**Key Insight**: These examples show how Socratic discovery transforms passive learning into active knowledge construction, creating lasting understanding that transfers to new situations.