import "dotenv/config";

import request from "supertest";

import App from "../../app";
import AuthenticationController from "../../authentication/authentication.controller";

let server: Express.Application;

beforeAll(async () => {
    server = new App([new AuthenticationController()]).getServer();
});

describe("test API endpoints", () => {
    it("GET /auth/register", async () => {
        const response = await request(server)
            .post("/auth/register")
            .send({
                firstName: "studentdfirstname",
                lastName: "studentlastname",
                email: "student001@jedlik.eu",
                email_verified: true,
                auto_login: true,
                roles: ["admin"],
                password: "student001",
                address: {
                    country: "Hungary",
                    street: "4 Földes Gábor u.",
                    city: "Győr",
                    zip: 9023
                },
                shippingAddress: {
                    country: "Hungary",
                    street: "4 Bolyai Farkas utca",
                    city: "Győr",
                    zip: 9023
                }
            });
        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual("User with email student001@jedlik.eu already exists");
        expect(response.body.status).toEqual(400);
    });

    it("GET /auth/login", async () => {
        const response = await request(server).post("/auth/login").send({
            email: "student001@jedlik.eu",
            password: "student001",
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body._id).toEqual("61b5e9c0f39e4edcf5b8a3b9");
        expect(response.body.address.city).toEqual("Győr");
        expect(response.body.address.country).toEqual("Hungary");
        expect(response.body.address.street).toEqual("4 Földes Gábor u.");
        expect(response.body.address.zip).toEqual(9023);
        expect(response.body.address._id).toEqual("641f202422f561f3f6f74406");
        expect(response.body.shippingAddress.city).toEqual("Győr");
        expect(response.body.shippingAddress.country).toEqual("Hungary");
        expect(response.body.shippingAddress.street).toEqual("4 Földes Gábor u.");
        expect(response.body.shippingAddress.zip).toEqual(9023);
        expect(response.body.shippingAddress._id).toEqual("641f202422f561f3f6f74407");
        expect(response.body.email).toEqual("student001@jedlik.eu");
        expect(response.body.firstName).toEqual("studentdfirstname");
        expect(response.body.lastName).toEqual("studentlastname");
    });

    it("GET /auth/logout", async () => {
        const response = await request(server).post("/auth/logout");
        expect(response.text).toEqual("OK");
        expect(response.statusCode).toEqual(200);
    });
});
