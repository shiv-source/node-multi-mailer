const chai = require("chai");
const mocha = require("mocha");


//Assertion //
const should = chai.should();
const expect = chai.expect;

var multiMailer = require('../lib/index');

var resolver = require("../lib/resolver");


describe('node-multi-mailer' , async () => {
    
    it('multiMailer should be an object', async () => {

        try {

            expect(multiMailer).to.be.an('object');

        }
        catch(err) { throw err};
    });

    it('configuration should be a function', async () => {

        try {

            expect(multiMailer.configuration).to.be.a('function');
        }
        catch(err) { throw err};
    });

    it('SendGrid should be a function', async () => {

        try {

            expect(multiMailer.SendGrid).to.be.an('object');
        }
        catch(err) { throw err};
    });

    it('sendTextEmail should be a function', async () => {

        try {

            expect(multiMailer.SendGrid.sendTextEmail).to.be.a('function');
        }
        catch(err) { throw err};
    });
    
    it('sendEjsTemplateWithData should be a function', async () => {

        try {

            expect(multiMailer.SendGrid.sendEjsTemplateWithData).to.be.a('function');
        }
        catch(err) { throw err};
    });

    it('ejsTemplate should be a function', async () => {

        try {

            expect(resolver.ejsTemplate).to.be.a('function');
        }
        catch(err) { throw err};
    });

    it('getAttachments should be a function', async () => {

        try {

            expect(resolver.getAttachments).to.be.a('function');
        }
        catch(err) { throw err};
    });


    it('getContentType should be a function', async () => {

        try {

            expect(resolver.getContentType).to.be.a('function');
        }
        catch(err) { throw err};
    });

    it('getFilePath should be a function', async () => {

        try {

            expect(resolver.getFilePath).to.be.a('function');
        }
        catch(err) { throw err};
    });

    it('isFolderExists should be a function', async () => {

        try {

            expect(resolver.isFolderExists).to.be.a('function');
        }
        catch(err) { throw err};
    });


    it('setMessage should be a function', async () => {

        try {

            expect(resolver.setMessage).to.be.a('function');
        }
        catch(err) { throw err};
    });

});