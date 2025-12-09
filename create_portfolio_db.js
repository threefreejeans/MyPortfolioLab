db = db.getSiblingDB("Portfolio");


// 1. contacts
db.createCollection("contacts", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["firstname", "lastname", "email"],
            properties: {
                firstname: { bsonType: "string", description: "must be a string" },
                lastname: { bsonType: "string", description: "must be a string" },
                email: { bsonType: "string", pattern: "^.+@.+\\..+$", description: "must be an email string" }
            }
        }
    }
});

// 2. projects
db.createCollection("projects", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "firstname", "lastname", "email", "completion", "description"],
      properties: {
        title:      { bsonType: "string", description: "must be a string" },
        firstname:  { bsonType: "string", description: "must be a string" },
        lastname:   { bsonType: "string", description: "must be a string" },
        email:      { bsonType: "string", pattern: "^.+@.+\\..+$", description: "must be an email string" },
        completion: { bsonType: "date", description: "must be a date" },
        description:{ bsonType: "string", description: "must be a string" }
      }
    }
  }
});

// 3. educations
db.createCollection("educations", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["title", "firstname", "lastname", "email", "completion", "description"],
      properties: {
        title:      { bsonType: "string", description: "must be a string" },
        firstname:  { bsonType: "string", description: "must be a string" },
        lastname:   { bsonType: "string", description: "must be a string" },
        email:      { bsonType: "string", pattern: "^.+@.+\\..+$", description: "must be an email string" },
        completion: { bsonType: "date", description: "must be a date" },
        description:{ bsonType: "string", description: "must be a string" }
      }
    }
  }
});

// 4. users
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "email", "password", "created", "updated"],
      properties: {
        name:     { bsonType: "string", description: "must be a string" },
        email:    { bsonType: "string", pattern: "^.+@.+\\..+$", description: "must be an email string" },
        password: { bsonType: "string", description: "hashed password string" },
        created:  { bsonType: "date", description: "creation date" },
        updated:  { bsonType: "date", description: "last update date" }
      }
    }
  }
});

print("create_portfolio_db.js finished");