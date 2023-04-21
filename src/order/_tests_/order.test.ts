import "dotenv/config";

import OrderController from "../order.controller";
import AuthenticationController from "../../authentication/authentication.controller";
import request from "supertest";

import App from "../../app";

let server: Express.Application;

beforeAll(async () => {
    server = new App([new OrderController(), new AuthenticationController()]).getServer();
});

describe("test API endpoints", () => {
    it("GET /orders", async () => {
        const response = await request(server).get("/orders");
        expect(response.statusCode).toEqual(200);
    });
    it("GET /orders/639757ec0c5330c7405f764d", async () => {
        const response = await request(server).get("/orders/639757ec0c5330c7405f764d");
        expect(response.statusCode).toEqual(401);
    });

    it("GET /auth/login", async () => {
        const response = await request(server).post("/auth/login").send({
            email: "masni6431@gmail.com",
            password: "Poppyflovers",
        });
        expect(response.statusCode).toEqual(200);
        expect(response.body._id).toEqual("63fc807e3f944579a10703c9");
        expect(response.body.address.city).toEqual("Szalmaharmad");
        expect(response.body.address.country).toEqual("Hungary");
        expect(response.body.address.street).toEqual("35 Spirál u.");
        expect(response.body.address.zip).toEqual(9464);
        expect(response.body.address._id).toEqual("643ce7201ad8361926b5def1");
        expect(response.body.shippingAddress.city).toEqual("Szalmaharmad");
        expect(response.body.shippingAddress.country).toEqual("Hungary");
        expect(response.body.shippingAddress.street).toEqual("35 Spirál u.");
        expect(response.body.shippingAddress.zip).toEqual(9464);
        expect(response.body.shippingAddress._id).toEqual("643ce7201ad8361926b5def2");
        expect(response.body.email).toEqual("masni6431@gmail.com");
        expect(response.body.firstName).toEqual("Barna");
        expect(response.body.lastName).toEqual("Orsolya");
    });

    it("GET /orders", async () => {
        const response = await request(server).get("/orders/639757ec0c5330c7405f764d");
        expect(response.statusCode).toEqual(200);
        expect(response.body.userId).toEqual("63fc807e3f944579a10703b9");
        expect(response.body.paymentStatus).toEqual("processed");
        expect(response.body.shippingAddress.country).toEqual("Zedónia");
        expect(response.body.shippingAddress.street).toEqual("154 Körkör u.");
        expect(response.body.shippingAddress.city).toEqual("Villámkert");
        expect(response.body.shippingAddress.zip).toEqual("43122");
        expect(response.body.billingAddress.country).toEqual("Zedónia");
        expect(response.body.billingAddress.street).toEqual("154 Körkör u.");
        expect(response.body.billingAddress.city).toEqual("Villámkert");
        expect(response.body.billingAddress.zip).toEqual("43122");
    });

    it("GET /auth/logout", async () => {
        const response = await request(server).post("/auth/logout");
        expect(response.text).toEqual("OK");
        expect(response.statusCode).toEqual(200);
    });
});
