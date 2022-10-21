let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');

chai.should();

chai.use(chaiHttp);

describe('Users Test', () => {
    var path = "/users/";

    it('should return all users', (done) => {
        chai.request(server)
            .get(path)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
    });

    it('should return a user by Id', (done) => {
        const userId = 1;
        chai.request(server)
            .get(path + userId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id').eq(userId);;
                res.body.should.have.property('nombre');
                res.body.should.have.property('apellido');
                res.body.should.have.property('dni');
                done();
            })
    });

    it('It should NOT FOUND a user', (done) => {
        const userId = 200;
        chai.request(server)
            .get(path + userId)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('No existe un usuario con el ID de su consulta. Revise los datos');
                done();
        });
    }),

    it("It should POST a user", (done) => {
        const userToPost = {
            nombre: "nombreTest", 
            apellido: "apellidoTest", 
            dni: 12345678 
        };
        chai.request(server)                
            .post(path)
            .send(userToPost)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('nombre');
                res.body.should.have.property('apellido');
                res.body.should.have.property('dni');
                done();
            });
    }),

    it("It should NOT POST a user - name null", (done) => {
        const userToPost = { 
            apellido: 'apellidoTest', 
            dni: 12345678, 
        };
        chai.request(server)                
            .post(path)
            .send(userToPost)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                done();
            });
    }),

    it("It should NOT POST a user - apellido null", (done) => {
        const userToPost = {
            nombre: 'nombreTest', 
            dni: 12345678, 
        };
        chai.request(server)                
            .post(path)
            .send(userToPost)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                done();
            });
    }),

    it("It should NOT POST a user - dni null", (done) => {
        const userToPost = {
            nombre: 'nombreTest', 
            apellido: 'apellidoTest', 
        };
        chai.request(server)                
            .post(path)
            .send(userToPost)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                res.body.should.have.property('errors');
                done();
            });
    }),

    it("It should UPDATE a user", (done) => {
        let userId = 2;
        const userToUpdate = {
            nombre: 'nombre-test', 
            apellido: 'apellido-test', 
            dni: 12345678, 
        };
        chai.request(server)
            .put(path + userId)
            .send(userToUpdate)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('id');
                res.body.should.have.property('nombre');
                res.body.should.have.property('apellido');
                res.body.should.have.property('dni');;
                done();
            });
    }),

    it("It should NOT UPDATE a user", (done) => {
        let userId = 50;
        const userToUpdate = {
            nombre: 'nombre-test', 
            apellido: 'apellido-test', 
            dni: 12345678, 
        };
        chai.request(server)
            .put(path + userId)
            .send(userToUpdate)
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('No existe un usuario con el ID de su consulta. Revise los datos');
                done();
            });
    }),

    it("It should DELETE a user", (done) => {
        let userId = 1;
        chai.request(server)
            .delete(path + userId)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('El registro fué eliminado exitosamente');
                done();
            });
    }),

    it("It should NOT DELETE a user", (done) => {
        let userId = 200;
        chai.request(server)
            .delete(path + userId)
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('message').eq('No existe un usuario con el ID de su consulta. Revise los datos');
                done();
            });
    })


    
});



