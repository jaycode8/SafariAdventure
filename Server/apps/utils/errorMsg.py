
def customErrorMessage(error_data):
    error_messages = error_data.get("error", {})
    error_message = None
    for field, messages in error_messages.items():
        if messages:
            error_message = messages[0]
        return error_message
        break
