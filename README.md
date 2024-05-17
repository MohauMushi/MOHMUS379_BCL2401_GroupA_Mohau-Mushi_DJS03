# DJS03 Project Brief: Book Connect - Abstractions

# Project Overview:
The "Book Connect" project aimed to refactor an existing web application by applying the principles of abstraction, encapsulation, and modularization. The primary focus was to enhance code maintainability, extensibility, and readability by creating objects and functions to represent and manage various components of the application.

![alt text](image.png)

#### Tasks

1. **Code Analysis**: Start by understanding the current implementation of the "Book Connect" application, including its HTML structure and JavaScript functionality.
2. **Plan Refactoring**: Identify sections of the code that can be made more abstract and modular. Look for patterns and repetitive code that can be simplified.
3. **Implement Abstraction**:
   - **Objects**: Define objects to represent key elements of the application, such as books, authors, and genres. Utilize the provided data (e.g., `authors`, `genres`, `books`) to populate these objects.
   - **Functions**: Create functions that handle repetitive tasks, such as rendering the book list, handling user interactions, and applying filters.
4. **Enhance Functionality**: Ensure that the application remains fully functional after refactoring. Test all features to confirm that users can still search, filter, and view books as intended.
5. **Documentation and Comments**: Throughout the refactoring process, document your code. Provide comments that explain the purpose and functionality of objects and functions.
6. **Adherence to Styleguides**: Ensure your code follows JavaScript and HTML coding standards and best practices for readability and maintainability.

#### Discussion and Reflection

**Rationale behind the refactoring decisions:**

1. **Object Creation**: In this project, the `Author`, `Genre`, and `Book` classes were introduced in the their `objects.js` file to be able to encapsulate the respective data and provide a more structured way of handling these entities.

2. **Data Abstraction**: The `data` object served as a location for referencing different DOM elements used throughout the application. This abstraction separates the concerns of DOM manipulation from the core application logic.

3. **Document Fragments**: The use of document fragments (`bookListFragment`, `searchResultFragment`, `genreFragment`, and `authorFragment`) was to make the code more readable and as they are in their only file and exported and then imported. The fragments allowed us to create and append elements in memory, which resulted in a faster rendering and better perceived performance.

4. **Function Separation**: The refactored code separated concerns which was introducing separate functions for rendering book lists, creating options for genres and authors, handling search submissions, showing more books, and managing book click events. This separation of concerns improves code readability and maintainability.

**How abstraction has made the code more maintainable and extendable:**

1. **Modularity**: The abstracting of the entities (Authors, Genres, and Books) into separate classes, it made the code to become more modular. Each class encapsulates their own data and behavior, making it easier to reason about and modify individual components without affecting the rest of the application.

2. **Code Organization**: The `data` object centralizes DOM element references, making it easier to locate and update these references if needed. This organization also improves code readability and maintainability by separating the DOM manipulation concerns from the core application logic.

3. **Separation of Concerns**: By separating concerns into individual functions, such as rendering book lists, handling search submissions, and managing book click events, it becomes easier forme to understand and modify specific pieces of functionality without affecting the entire application.

**Challenges faced during the refactoring process and how they were overcome:**

One potential challenge during the refactoring process was dealing with existing code dependencies as the code was long, very confusing, did lots of mistakes during the process, which resulted in me restarting the challenge from the beginning and i had to ensure that the refactored components work seamlessly with the rest of the application. This challenge was overcame by carefully analyzing the existing codebase, identifying dependencies, and ensuring that the refactored components maintain the same functionality as the original code, and lots and lots of google how to structure some of the function and how to make one function to work in another functions.

Another challenge was implementing abstraction to define objects to represent key elements of the application, such as books, authors, and genres, using the provided data to populate those objects. The challenge was overcame by doing the objects at the end of refactoring the function and i was able to find the solution on how to implement object in my code, finally i was able to make it function proper through lots of trial and errors, which i faced along the way.

Another challenge was on organizing and structuring the code in a way that promotes maintainability and extensibility. But i managed by implementation of separating concerns, using descriptive variable and function names, and adding comments to explain complex logic or decision-making processes.

**Reflections on how this exercise has deepened my understanding of JavaScript programming concepts:**

1. **Object-Oriented Programming (OOP)**: The implementation of classes for Authors, Genres, and Books, I gained practical experience in applying OOP principles in JavaScript. This was archived by doing my research and googling for so clarity to deepen my understanding of OOP.

2. **DOM Manipulation and Performance Optimization**: The use of document fragments and the separation of DOM manipulation logic from the core application logic demonstrated best practices for efficient DOM manipulation and performance optimization.

3. **Code Organization and Separation of Concerns**: The importance of separating concerns and organizing code into modular and reusable components. This approach not only improves code maintainability but also enhances code readability and collaboration, which made me also to understand and know what is required to achieve the end goal of the challenge.

4. **Abstraction and Code Reusability**: The creation of the `data` object and the use of separate functions for specific tasks exemplify the principles of abstraction and code reusability, and the creating the `createBookPreview()` function, for the code to be reusable instead of being DRY, just have to callback the function to work in another function.

Overall, this refactoring exercise has reinforced my understanding of fundamental JavaScript concepts and provided practical experience in applying best practices for code organization, maintainability, and performance optimization. But i still have to do revision of Object-Oriented Programming (OOP) for me to fully understand them properly.

