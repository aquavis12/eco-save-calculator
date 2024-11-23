import { type ClientSchema, a, defineData } from '@aws-amplify/backend';


const schema = a.schema({
  FormSubmission: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      phoneNumber: a.string().required(),
      address: a.string(),
      city: a.string(),
      state: a.string(),
      ecoPoints:a.integer(),
      timestamp: a.datetime(),  // ISO 8601 formatted timestamp
    }).identifier(['email','phoneNumber'])
      .authorization(allow => [allow.publicApiKey()]),  // Public API key access


EwasteData: a
.model({
  email: a.email().required(),
  phoneNumber:a.string(), // This will act as the partition key
  selectedDevices: a.string(), // Stores selected devices as a comma-separated string
  updatedQuantities: a.string(),
  ecoPoints:a.integer(),
  totalWeight: a.float().default(0),  // Defaults to 0 if not provided
  totalLeadWeight: a.float().default(0),  // Defaults to 0 if not provided
  totalPlasticWeight: a.float().default(0),  // Defaults to 0 if not provided
  totalCopperWeight: a.float().default(0),  // Defaults to 0 if not provided
  totalAluminumWeight: a.float().default(0),  // Defaults to 0 if not provided
  timestamp: a.datetime(), 
})
    .authorization(allow => [allow.publicApiKey()]),  // Public API key access
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'apiKey',
    apiKeyAuthorizationMode: { expiresInDays: 30 }
  }
});



/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>



// Define the schema for the FormSubmission model

