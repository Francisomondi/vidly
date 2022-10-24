const express = require("express")
const router = express.Router()

const genres = [{
        id: 1,
        name: "genre 1",
        description: "this is the first genre"
    },
    {
        id: 2,
        name: "genre 2",
        description: "this is the second genre"
    },
    {
        id: 3,
        name: "genre 3",
        description: "this is the third genre"
    }
];

router.get("/", (req, res) => {
    res.send("Hello this is my home page");
});


//add genre
router.post("/", (req, res) => {
    const {
        error
    } = validateGenre(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    genres.push(genre);
    res.send(genres);
})

//get all genres
router.get("/api/genres", (req, res) => {
    res.send(genres);
});


//get single genre
router.get("/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("genre not found");
    res.send(genre);
});

//update genre
router.put("/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("genre not found");

    const {
        error
    } = validateGenre(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    genre.name = req.body.name;
    genre.description = req.body.description;

    res.send(genre);


});

//delete genre
router.delete("/:id", (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("genre not found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);
    res.send(genre)
});

//joi validation function
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),

        description: Joi.string()
            .min(3)
            .required()
    });

    return schema.validate(genre);
}

module.exports = router;