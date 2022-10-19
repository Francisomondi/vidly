const Joi = require('joi');
const express = require("express");

const app = express();

app.use(express.json());

const courses = [{
        id: 1,
        name: "course 1",
        description: "this is the first course"
    },
    {
        id: 2,
        name: "course 2",
        description: "this is the second course"
    },
    {
        id: 3,
        name: "course 3",
        description: "this is the third course"
    }
];

app.get("/", (req, res) => {
    res.send("Hello this is my home page");
});


//add course
app.post("/api/courses", (req, res) => {
    const {
        error
    } = validateCourse(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    courses.push(course);
    res.send(courses);
})

//get all courses
app.get("/api/courses", (req, res) => {
    res.send(courses);
});


//get single course
app.get("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("course not found");
    res.send(course);
});

//update course
app.put("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("course not found");

    const {
        error
    } = validateCourse(req.body);
    if (error) return res.status(400).send(result.error.details[0].message);

    course.name = req.body.name;
    course.description = req.body.description;

    res.send(course);


});

//delete course
app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send("course not found");

    const index = courses.indexOf(course);
    courses.splice(index, 1);
    res.send(course)
});

//joi validation function
function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(30)
            .required(),

        description: Joi.string()
            .min(3)
            .required()
    });

    return schema.validate(course);
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));