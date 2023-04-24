import "dotenv/config";

import request from "supertest";

import App from "../../app";
import AuthenticationController from "../../authentication/authentication.controller";
import OrderController from "../order.controller";

let server: Express.Application;
let cookie: string | any;

beforeAll(async () => {
    server = new App([new OrderController(), new AuthenticationController()]).getServer();
    const response = await request(server).post("/auth/login").send({
        email: "masni6431@gmail.com",
        password: "Poppyflovers",
    });
    cookie = response.headers["set-cookie"];
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

    it("POST /orders/", async () => {
        const response = await request(server)
            .post("/orders/")
            .send({
                userId: "63fc807e3f944579a10703b5",
                paymentStatus: "processed",
                status: "shipped,",
                billingAddress: {
                    street: "Szent István út 7.",
                    city: "Győr",
                    country: "Hungary",
                    zip: 9023,
                },
            })
            .set("Cookie", cookie);
        expect(response.statusCode).toEqual(200);
    });

    it("DELETE /orders/644626d080590079a464b97d", async () => {
        const response = await request(server).delete("/orders/644626d080590079a464b97d").set("Cookie", cookie);
        expect(response.statusCode).toEqual(200);
    });

    it("GET /orders/639757ec0c5330c7405f764d", async () => {
        const response = await request(server).get("/orders/639757ec0c5330c7405f764d").set("Cookie", cookie);
        expect(response.statusCode).toEqual(200);
        expect(response.body._id).toEqual("639757ec0c5330c7405f764d");
        expect(response.body.userId._id).toEqual("63fc807e3f944579a10703b9");
        expect(response.body.paymentStatus).toEqual("processed");
        expect(response.body.status).toEqual("shipped");
        expect(response.body.shippingAdress.country).toEqual("Zedónia");
        expect(response.body.shippingAdress.street).toEqual("154 Körkör u.");
        expect(response.body.shippingAdress.city).toEqual("Villámkert");
        expect(response.body.shippingAdress.zip).toEqual("43122");
        expect(response.body.billingAddress.country).toEqual("Zedónia");
        expect(response.body.billingAddress.street).toEqual("154 Körkör u.");
        expect(response.body.billingAddress.city).toEqual("Villámkert");
        expect(response.body.billingAddress.zip).toEqual(43122);
    });

    it("GET /auth/logout", async () => {
        const response = await request(server).post("/auth/logout");
        expect(response.text).toEqual("OK");
        expect(response.statusCode).toEqual(200);
    });
});
