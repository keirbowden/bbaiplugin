# summary

Explains a Salesforce concept.

# description

Explains a Salesforce concept for a particular audience.

# flags.topic.summary

The topic to explain.

# flags.topic.description

The topic to explain.

# flags.style.summary

The style of the explanation - who is the audience?

# flags.style.description

The style of the explanation - e.g. business, technical, admins, developer - defaults to programmer

# examples

- Explain permission sets to a programmer audience

  <%= config.bin %> <%= command.id %> -t "permission sets"

- Explain sharing to an executive audience

  <%= config.bin %> <%= command.id %> -t sharing -s executive

# info.results

Here are the results