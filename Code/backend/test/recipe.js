const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app");
const Recipe = require("../models/recipe")

chai.use(chaiHttp);
chai.should();

describe("Post Recipes Route", () => {
  it("should create a document in database", (done) => {
    chai
      .request(app)
      .post("/api/v4/recipes/Addrecipes")
      .type("form")
      .send({
        recipe_name: "Testing Recipe",
        recipe_ingredients: "Dummy, ingredients, chai, mocha, git",
        recipe_cuisine: "NodeJS with Express",
        recipe_time: "15",
        recipe_url: "https://youtu.be/MLTRHc5dk6s?si=FygvpvY7fTOSFqIi",
        recipe_instructions:
          "Check documentation for testing examples and implementations.",
      })
      .end(async (err, res) => {
        if (err) {
          console.log("Yeh hai Error", err);
        }
        await Recipe.deleteMany({TranslatedRecipeName: "Testing Recipe"})
        res.should.have.status(201);
        done();
      });
  });
});

describe("Get Recipes Route", () => {
  describe("Get Request", () => {
    it("should Fetch all the documents in database", (done) => {
      chai
        .request(app)
        .get("/api/v4/recipes")
        .end((err, res) => {
          if (err) {
            console.log("Yeh hai Error", err);
          }
          res.should.have.status(200);
          done();
        });
    });
    it("should Fetch documents based on Ingredients", (done) => {
      chai
        .request(app)
        .get("/api/v4/recipes")
        .query({ CleanedIngredients: "salt, karela, amchur" })
        .end((err, res) => {
          if (err) {
            console.log("Yeh hai Error", err);
          }
          res.should.have.status(200);
          done();
        });
    });
    it("should Fetch documents based on cuisine", (done) => {
      chai
        .request(app)
        .get("/api/v4/recipes")
        .query({ Cuisine: "mexican" })
        .end((err, res) => {
          if (err) {
            console.log("Yeh hai Error", err);
          }
          res.should.have.status(200);
          done();
        });
    });
    it("should Fetch documents based on combination of ingredients and cuisine", (done) => {
      chai
        .request(app)
        .get("/api/v4/recipes")
        .query({
          CleanedIngredients: "salt, karela, amchur",
          Cuisine: "indian",
        })
        .end((err, res) => {
          if (err) {
            console.log("Yeh hai Error", err);
          }
          res.should.have.status(200);
          done();
        });
    });
    it("should Fetch documents based on type of Diet", (done) => {
      chai
        .request(app)
        .get("/api/v4/recipes")
        .query({ typeOfDiet: "Vegan" })
        .end((err, res) => {
          if (err) {
            console.log("Yeh hai Error", err);
          }
          res.should.have.status(200);
          done();
        });
    });
    it("should Fetch documents based on time", (done) => {
      chai
        .request(app)
        .get("/api/v4/recipes")
        .query({ totalTime: 30 })
        .end((err, res) => {
          if (err) {
            console.log("Yeh hai Error", err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
});

describe("Get Cuisines Route", () => {
  it("should get all distinct Cuisines in database", (done) => {
    chai
      .request(app)
      .get("/api/v4/recipes/cuisines")
      .end((err, res) => {
        if (err) {
          console.log("Yeh hai Error", err);
        }
        res.should.have.status(200);
        done();
      });
  });
});
