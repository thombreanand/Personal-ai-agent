from tools import greeting_tool, calculator_tool, datetime_tool


def personal_agent():

    print("Welcome to Personal AI Assistant!")

    while True:

        user_input = input("\nYou: ").lower().strip()

        if user_input in ["hello", "hi", "hey"]:
            response = greeting_tool()

        elif user_input == "calculate":

            num1 = float(input("Enter first number: "))
            operator = input("Enter operator (+, -, *, /): ")
            num2 = float(input("Enter second number: "))

            response = calculator_tool(num1, operator, num2)

        elif "time" in user_input or "date" in user_input:
            response = datetime_tool()

        elif user_input in ["exit", "quit", "bye"]:
            print("Agent: Goodbye!")
            break

        else:
            response = "I don't understand that command yet."

        print("Agent:", response)


if __name__ == "__main__":
    personal_agent()