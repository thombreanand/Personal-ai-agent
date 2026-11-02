from datetime import datetime


# Tool 1: Greeting
def greeting_tool():
    return "Hello! Welcome to your Personal AI Assistant."


# Tool 2: Calculator
def calculator_tool(num1, operator, num2):

    if operator == "+":
        return num1 + num2

    elif operator == "-":
        return num1 - num2

    elif operator == "*":
        return num1 * num2

    elif operator == "/":
        if num2 == 0:
            return "Cannot divide by zero"
        return num1 / num2

    else:
        return "Invalid operator"


# Tool 3: Date and Time
def datetime_tool():
    return datetime.now().strftime("%d-%m-%Y %I:%M %p")