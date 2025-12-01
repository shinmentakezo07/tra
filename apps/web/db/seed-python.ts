import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema";
import * as dotenv from "dotenv";
import { eq } from 'drizzle-orm';

dotenv.config({ path: ".env.local" });

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema });

async function seed() {
  console.log("Seeding Python Course...");

  // 1. Create or Get Python Course
  let pythonCourse = await db.query.courses.findFirst({
      where: eq(schema.courses.slug, "python-mastery")
  });

  if (!pythonCourse) {
      const [newCourse] = await db.insert(schema.courses).values({
        title: "Python Mastery",
        description: "The ultimate beginner's guide to Python. Master variables, loops, functions, and data structures with hands-on practice.",
        slug: "python-mastery",
        level: "Beginner",
        image: "bg-gradient-to-br from-blue-600 to-yellow-400",
        published: true,
      }).returning();
      pythonCourse = newCourse;
      console.log("Created Python Course");
  } else {
      console.log("Python Course already exists");
  }

  // 2. Clear existing lessons for this course to ensure clean slate
  await db.delete(schema.lessons).where(eq(schema.lessons.courseId, pythonCourse.id));
  console.log("Cleared existing lessons for Python Course");

  // 3. Add Lessons
  const lessonsData = [
    {
      title: "Introduction to Python & Variables",
      slug: "intro-variables",
      order: 1,
      content: `# Introduction to Python & Variables

Python is a high-level, interpreted programming language known for its ease of use and readability. It's perfect for beginners and powerful enough for experts.

## Variables
Variables are containers for storing data values. In Python, you don't need to declare the type of a variable.

\`\`\`python
x = 5
name = "John"
print(x)
print(name)
\`\`\`

## Naming Rules
* Must start with a letter or underscore
* Cannot start with a number
* Case-sensitive (age, Age and AGE are different variables)`,
      codeSnippet: `message = "Hello, Python World!"
print(message)

# Try changing the message variable above
# and adding a new variable for your age`,
      exercises: JSON.stringify([
          {
              question: "Create a variable named 'city' and assign it the value 'New York'. Then print it.",
              hint: "Use the = operator to assign values.",
              solution: "city = 'New York'\nprint(city)",
              starterCode: "# Create your variable here\n\nprint(city)"
          },
          {
              question: "Create two variables, 'a' and 'b', with values 10 and 20. Print their sum.",
              hint: "You can use the + operator between variables.",
              solution: "a = 10\nb = 20\nprint(a + b)",
              starterCode: "a = 10\nb = 20\n# Print sum here"
          }
      ]),
      quiz: JSON.stringify([
          {
              question: "Which of the following is a valid variable name?",
              options: ["2myvar", "my-var", "my_var", "my var"],
              correctIndex: 2
          },
          {
              question: "How do you output text to the console in Python?",
              options: ["echo()", "print()", "console.log()", "write()"],
              correctIndex: 1
          },
          {
              question: "Python variables are case-sensitive.",
              options: ["True", "False"],
              correctIndex: 0
          },
          {
              question: "What is the output of: x = 5; y = 10; print(x + y)?",
              options: ["510", "15", "xy", "Error"],
              correctIndex: 1
          },
          {
              question: "Which symbol is used for comments in Python?",
              options: ["//", "/*", "#", "--"],
              correctIndex: 2
          }
      ])
    },
    {
      title: "Data Types & Operators",
      slug: "datatypes-operators",
      order: 2,
      content: `# Data Types & Operators

Python has several built-in data types that are used to define the operations possible on them and the storage method for each of them.

## Common Data Types
* **Text Type:** \`str\`
* **Numeric Types:** \`int\`, \`float\`, \`complex\`
* **Sequence Types:** \`list\`, \`tuple\`, \`range\`
* **Boolean Type:** \`bool\`

## Operators
Operators are used to perform operations on variables and values.
* Arithmetic: \`+\`, \`-\`, \`*\`, \`/\`, \`%\`
* Comparison: \`==\`, \`!=\`, \`>\`, \`<\`, \`>=\`, \`<=\`
* Logical: \`and\`, \`or\`, \`not\``,
      codeSnippet: `x = 10      # int
y = 3.14    # float
name = "Py" # str
is_fun = True # bool

print(type(x))
print(x + y)`,
      exercises: JSON.stringify([
          {
              question: "Convert the integer 5 to a float and print it.",
              hint: "Use the float() function.",
              solution: "print(float(5))",
              starterCode: "num = 5\n# Convert and print"
          },
          {
              question: "Check if 10 is greater than 5 and print the result (True/False).",
              hint: "Use the > operator.",
              solution: "print(10 > 5)",
              starterCode: "# Write your comparison here"
          },
          {
              question: "Calculate the remainder of 15 divided by 4.",
              hint: "Use the modulo operator %.",
              solution: "print(15 % 4)",
              starterCode: "# Print remainder"
          }
      ]),
      quiz: JSON.stringify([
          {
              question: "What is the data type of x = 5.5?",
              options: ["int", "float", "str", "bool"],
              correctIndex: 1
          },
          {
              question: "Which operator is used for exponentiation?",
              options: ["^", "**", "*", "exp"],
              correctIndex: 1
          },
          {
              question: "What is the result of 10 // 3?",
              options: ["3.33", "3", "1", "3.0"],
              correctIndex: 1
          },
          {
              question: "What is the type of 'True' (with quotes)?",
              options: ["bool", "int", "str", "float"],
              correctIndex: 2
          },
          {
              question: "Which operator returns True if both statements are true?",
              options: ["&", "and", "&&", "plus"],
              correctIndex: 1
          }
      ])
    },
    {
      title: "Conditional Statements",
      slug: "conditionals",
      order: 3,
      content: `# Conditional Statements

Conditional statements allow you to execute different blocks of code based on whether a condition is true or false.

## The if...elif...else statement
\`\`\`python
if condition1:
    # code to execute if condition1 is true
elif condition2:
    # code to execute if condition2 is true
else:
    # code to execute if neither is true
\`\`\`

## Indentation
Python relies on indentation (whitespace at the beginning of a line) to define scope in the code.`,
      codeSnippet: `age = 18

if age >= 18:
    print("You are an adult")
else:
    print("You are a minor")`,
      exercises: JSON.stringify([
          {
              question: "Write an if statement that prints 'Positive' if the variable 'num' is greater than 0.",
              hint: "Use if num > 0:",
              solution: "num = 5\nif num > 0:\n    print('Positive')",
              starterCode: "num = 5\n# Write your if statement"
          },
          {
              question: "Check if a number is even or odd. Print 'Even' or 'Odd'.",
              hint: "A number is even if number % 2 == 0",
              solution: "num = 4\nif num % 2 == 0:\n    print('Even')\nelse:\n    print('Odd')",
              starterCode: "num = 4\n# Write if/else block"
          },
          {
              question: "Write an if/elif/else chain. If score >= 90 print 'A', elif score >= 80 print 'B', else print 'C'.",
              hint: "Pay attention to indentation.",
              solution: "score = 85\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelse:\n    print('C')",
              starterCode: "score = 85\n# Write chain here"
          }
      ]),
      quiz: JSON.stringify([
          {
              question: "What keyword is used for 'else if' in Python?",
              options: ["elseif", "else if", "elif", "if else"],
              correctIndex: 2
          },
          {
              question: "Indentation in Python is optional.",
              options: ["True", "False"],
              correctIndex: 1
          },
          {
              question: "Which statement is executed if the condition is False?",
              options: ["if", "elif", "else", "then"],
              correctIndex: 2
          },
          {
              question: "How do you check if a equals b?",
              options: ["a = b", "a == b", "a === b", "a equals b"],
              correctIndex: 1
          },
          {
              question: "What happens if you skip indentation in an if block?",
              options: ["It runs normally", "It prints a warning", "IndentationError", "It skips the block"],
              correctIndex: 2
          }
      ])
    },
    {
      title: "Loops (For & While)",
      slug: "loops",
      order: 4,
      content: `# Loops

Loops are used to iterate over a sequence (list, tuple, dictionary, set, or string) or execute a block of code as long as a condition is true.

## While Loop
With the while loop we can execute a set of statements as long as a condition is true.

\`\`\`python
i = 1
while i < 6:
  print(i)
  i += 1
\`\`\`

## For Loop
A for loop is used for iterating over a sequence.

\`\`\`python
fruits = ["apple", "banana", "cherry"]
for x in fruits:
  print(x)
\`\`\``,
      codeSnippet: `print("Counting to 5:")
for i in range(1, 6):
    print(i)

print("While loop:")
count = 0
while count < 3:
    print("Count is " + str(count))
    count += 1`,
      exercises: JSON.stringify([
          {
              question: "Use a for loop to print numbers from 0 to 4.",
              hint: "Use range(5)",
              solution: "for i in range(5):\n    print(i)",
              starterCode: "# Write for loop"
          },
          {
              question: "Use a while loop to print 'Hello' 3 times.",
              hint: "Create a counter variable",
              solution: "i = 0\nwhile i < 3:\n    print('Hello')\n    i += 1",
              starterCode: "# Write while loop"
          },
          {
              question: "Loop through the list ['red', 'green', 'blue'] and print each item.",
              hint: "for color in colors:",
              solution: "colors = ['red', 'green', 'blue']\nfor color in colors:\n    print(color)",
              starterCode: "colors = ['red', 'green', 'blue']\n# Loop through list"
          }
      ]),
      quiz: JSON.stringify([
          {
              question: "Which function is often used to generate a sequence of numbers for loops?",
              options: ["sequence()", "range()", "list()", "loop()"],
              correctIndex: 1
          },
          {
              question: "How do you stop a loop before it has finished all iterations?",
              options: ["stop", "exit", "break", "return"],
              correctIndex: 2
          },
          {
              question: "How do you skip the current iteration and continue with the next?",
              options: ["continue", "skip", "next", "pass"],
              correctIndex: 0
          },
          {
              question: "What does range(3) generate?",
              options: ["1, 2, 3", "0, 1, 2", "1, 2", "0, 1, 2, 3"],
              correctIndex: 1
          },
          {
              question: "Can you have a loop inside a loop?",
              options: ["Yes", "No"],
              correctIndex: 0
          }
      ])
    },
    {
      title: "Functions Basics",
      slug: "functions",
      order: 5,
      content: `# Functions

A function is a block of code which only runs when it is called. You can pass data, known as parameters, into a function. A function can return data as a result.

## Creating a Function
In Python a function is defined using the \`def\` keyword:

\`\`\`python
def my_function():
  print("Hello from a function")
\`\`\`

## Calling a Function
To call a function, use the function name followed by parenthesis:

\`\`\`python
my_function()
\`\`\``,
      codeSnippet: `def greet(name):
    return "Hello, " + name

print(greet("Alice"))
print(greet("Bob"))`,
      exercises: JSON.stringify([
          {
              question: "Create a function named 'say_hi' that prints 'Hi!'. Call it.",
              hint: "def say_hi():",
              solution: "def say_hi():\n    print('Hi!')\nsay_hi()",
              starterCode: "# Define function\n\n# Call function"
          },
          {
              question: "Create a function 'add' that takes two parameters and returns their sum. Print the result of add(5, 3).",
              hint: "def add(x, y): return x + y",
              solution: "def add(x, y):\n    return x + y\nprint(add(5, 3))",
              starterCode: "# Define add function\n\n# Call and print"
          },
          {
              question: "Create a function that returns the square of a number. Test it with 4.",
              hint: "return num * num",
              solution: "def square(n):\n    return n * n\nprint(square(4))",
              starterCode: "# Define square function"
          }
      ]),
      quiz: JSON.stringify([
          {
              question: "Which keyword is used to create a function?",
              options: ["function", "create", "def", "func"],
              correctIndex: 2
          },
          {
              question: "How do you return a value from a function?",
              options: ["return", "output", "result", "back"],
              correctIndex: 0
          },
          {
              question: "Variables defined inside a function are:",
              options: ["Global", "Local", "Universal", "Static"],
              correctIndex: 1
          },
          {
              question: "What is a parameter?",
              options: ["A variable inside the function", "A variable passed into the function", "The return value", "The function name"],
              correctIndex: 1
          },
          {
              question: "Can a function call itself?",
              options: ["Yes", "No"],
              correctIndex: 0
          }
      ])
    }
  ];

  for (const lesson of lessonsData) {
      await db.insert(schema.lessons).values({
          ...lesson,
          courseId: pythonCourse.id
      });
  }
  console.log("Added 5 Python lessons with exercises and quizzes");

  console.log("Seeding completed!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
