# summary

Respond to a task (prompt) from a user, extracting information from a
Salesforce instance if appropriate.

# description

Respond to a prompt from a user, extracting information from a
Salesforce instance if appropriate.

# flags.task.summary

The task (prompt) from the user

# flags.task.description

The task the user would like the model to perform

# flags.username.summary

The full Salesforce username to retrieve any data.

# flags.username.description

The full Salesforce username to retrieve any data.

# examples

- Create an email containing account information

<%= config.bin %> <%= command.id %> -t "Create an email introducing GenePoint, a new account we are tracking in Salesforce. Include the industry and number of employee details from our Salesforce database" 
    -u <username>

