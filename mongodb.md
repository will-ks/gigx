# MongoDB Instructions

* Use database "gigx"

   `use gigx`

* Create indexes:

   *
```
   db.listings.createIndex({title: "text", artist: "text", genre: "text", location: "text"})
```