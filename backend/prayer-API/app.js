const express = require("express"); // Import Express
const app = express(); // Create an Express app
const port = 3000; // Define the port where the server will run

const sqlite3 = require("sqlite3").verbose(); // Import SQLite
const db = new sqlite3.Database("./prayers.db"); // Connect to the SQLite database

// Create the prayers table if it doesn't exist
db.serialize(() => {
  db.run(`
      CREATE TABLE IF NOT EXISTS prayers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        text TEXT,
        author TEXT
      )
    `);

  db.run(`
      CREATE TABLE IF NOT EXISTS occasional_prayers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT,
        text TEXT,
        author TEXT
      )
    `);

  db.run(`
        CREATE TABLE IF NOT EXISTS special_tablets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category TEXT,
          text TEXT,
          author TEXT
        )
      `);
  db.run(`
        CREATE TABLE IF NOT EXISTS obligatory_prayers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category TEXT,
          text TEXT,
          author TEXT
        )
      `);
  db.run(`
    CREATE TABLE IF NOT EXISTS quotes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category TEXT,
          length TEXT,
          text TEXT,
          author TEXT,
          ref TEXT
        )
    `);
  db.run(`
      CREATE TABLE IF NOT EXISTS songs (
  id INTEGER PRIMARY KEY,
  title TEXT,
  file_path TEXT
)
      `);
});

// Route to get all prayers
app.get("/prayers", (req, res) => {
  db.all("SELECT * FROM prayers", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ prayers: rows });
  });
});

// Route to get prayers by category
app.get("/prayers/:category", (req, res) => {
  const category = decodeURIComponent(req.params.category); // Decode the category from URL
  console.log(`Received request for category: ${category}`); // Log the category being searched

  db.all(
    "SELECT * FROM prayers WHERE category = ?",
    [category],
    (err, rows) => {
      if (err) {
        console.error(err.message); // Log any errors
        res.status(500).json({ error: err.message });
        return;
      }
      console.log(rows); // Log the rows returned from the database
      res.json({ prayers: rows });
    }
  );
});

// Route to get all occasional prayers
app.get("/occasional_prayers", (req, res) => {
  db.all("SELECT * FROM occasional_prayers", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ prayers: rows });
  });
});

// Route to get occasional prayers by category
app.get("/occasional_prayers/:category", (req, res) => {
  const category = decodeURIComponent(req.params.category);
  db.all(
    "SELECT * FROM occasional_prayers WHERE category = ?",
    [category],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ prayers: rows });
    }
  );
});

// Route to get all special tablets
app.get("/special_tablets", (req, res) => {
  db.all("SELECT * FROM special_tablets", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ prayers: rows });
  });
});

// Route to get special tablets by category
app.get("/special_tablets/:category", (req, res) => {
  const category = decodeURIComponent(req.params.category);
  db.all(
    "SELECT * FROM special_tablets WHERE category = ?",
    [category],
    (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ prayers: rows });
    }
  );
});

// Route to get all obligatory prayers
app.get("/obligatory_prayers", (req, res) => {
  db.all("SELECT * FROM obligatory_prayers", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ prayers: rows });
  });
});

app.get("/obligatory_prayers/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.get("SELECT * FROM obligatory_prayers WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ prayer: row });
  });
});

//route to all quotes
app.get("/quotes", (req, res) => {
  db.all("SELECT * FROM quotes", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ prayers: rows });
  });
});

// Route to get a random quote by length
app.get("/quotes/random/:length", (req, res) => {
  const { length } = req.params;
  const { author } = req.query;

  let query = "SELECT * FROM quotes WHERE length = ?";
  const params = [length];

  if (author) {
    query += " AND author = ?";
    params.push(author);
  }

  query += " ORDER BY RANDOM() LIMIT 1";

  db.get(query, params, (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ quote: row });
  });
});

// Route to fetch categories grouped by the first letter
app.get("/categories/:letter", (req, res) => {
  const { letter } = req.params;

  const query = `
    SELECT DISTINCT category 
    FROM quotes 
    WHERE category LIKE ? 
    ORDER BY category ASC
  `;

  db.all(query, [`${letter}%`], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const categories = rows.map((row) => row.category);
      res.json({ categories });
    }
  });
});

// Route to fetch quotes by category
app.get("/quotes/:category", (req, res) => {
  const { category } = req.params;

  const query = `
    SELECT id, text, author 
    FROM quotes 
    WHERE category = ?
    ORDER BY id ASC
  `;

  db.all(query, [category], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json({ quotes: rows });
    }
  });
});

// Route to get all songs
app.get("/songs", (req, res) => {
  db.all("SELECT * FROM songs", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ songs: rows });
  });
});
// Serve static files from the "songs" directory
app.use(
  "/songs",
  express.static(
    "C:/Users/ojan/Desktop/projects/Bahai19/backend/prayer-API/songs"
  )
);
// Route to get a specific song by ID
app.get("/songs/:id", (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM songs WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ song: row });
  });
});

// Basic route to test if the server is running
app.get("/", (req, res) => {
  res.send("Hello, World!"); // Respond with "Hello, World!" when visiting the root URL
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
