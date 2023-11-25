const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../app");

chai.use(chaiHttp);
chai.should();

describe("Sign In Route", () => {
  describe("Get Request", () => {
    it("should return sign in page", (done) => {
      chai
        .request(app)
        .get("/api/v4/signIn")
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("Post Request", () => {
    it("should return successfully signed in", (done) => {
      chai
        .request(app)
        .post("/api/v4/signIn")
        .send({
          username: "tanay",
          password: "tanay",
        })
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
});

describe("Sign Up Route", () => {
  describe("Get Request", () => {
    it("should return sign up page", (done) => {
      chai
        .request(app)
        .get("/api/v4/signUp")
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
  describe("Post request", () => {
    it("should return signed up", (done) => {
      chai
        .request(app)
        .post("/api/v4/signUp")
        .send({
          username: "smit123456",
          password: "smit1234"
        })
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
});

describe("Sign Out Route", () => {
  describe("Get Request", () => {
    it("should return successfully logged out", (done) => {
      chai
        .request(app)
        .get("/api/v4/signOut")
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          res.should.have.status(200);
          done();
        });
    });
  });
});

describe("Get User Profile Test", () => {
  describe("Get Request", () => {
    it("should return the user profile", (done) => {
      chai
        .request(app)
        .get("/api/v4/userProfile")
        .send({
          username: "tanay",
        })
        .end((err, res) => {
          if (err) {
            console.log(err);
          }
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
