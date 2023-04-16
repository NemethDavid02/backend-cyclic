import "dotenv/config";

import OrderController from "order/order.controller";
import request from "supertest";

import App from "../../app";

let server: Express.Application;

beforeAll(async () => {
    server = new App([new OrderController()]).getServer();
});

describe("test API endpoints", () => {
    it("GET /orders", async () => {
        const response = await request(server).get("/orders/639757ec0c5330c7405f764d");
        expect(response.statusCode).toEqual(400);
        expect(response.body._id).toEqual("639757ec0c5330c7405f764d");
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
});
