const chai = require("chai");
const mocha = require("mocha");


//Assertion //
const should = chai.should();
const expect = chai.expect;

var multiMailer = require('..');


describe('node-multi-mailer' , async () => {
    
    it('multiMailer should be an object', async () => {

        try {

            expect(multiMailer).to.be.an('object');

        }
        catch(err) { throw err};
    });

    it('sendEmail should be a function', async () => {

        try {

            expect(multiMailer.sendEmail).to.be.a('function');
        }
        catch(err) { throw err};
    });

    it('sendHtmlEmail should be a function', async () => {

        try {


            expect(multiMailer.sendHtmlEmail).to.be.a('function');

        }
        catch(err) { throw err};
    });
    it('sendTextEmail should be a function', async () => {

        try {
            expect(multiMailer.sendTextEmail).to.be.a('function');

        }
        catch(err) { throw err};
    });

    it('configuration should be a function', async () => {

        try {
            expect(multiMailer.configuration).to.be.a('function');

        }
        catch(err) { throw err};
    });
    
});