import {test,expect} from "@playwright/test";
import { request } from "node:http";
import fs from "fs";
import { Faker } from "@faker-js/faker";

test("test for create customer api",async({request})=>
{
     const JsonPath='testdata/ApiData.json';
     let requestBody:any = JSON.parse(fs.readFileSync(JsonPath,'utf8'));
    

    const response = await request.post("/booking",{data:requestBody});

    const responseBody = await response.json();

    console.log(requestBody);

    expect(response.ok).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody).toHaveProperty("booking.firstname");
    expect(responseBody).toHaveProperty("booking.additionalneeds");

    const booking = responseBody.booking;
    expect(booking).toMatchObject({
        firstname :requestBody.firstname,
        lastname : requestBody.lastname,
        totalprice :requestBody.totalprice,
       // depositepaid : true,
        additionalneeds : requestBody.additionalneeds
    })

    expect(booking.bookingdates).toMatchObject({
            checkin : requestBody.bookingdates.checkin,
            checkout : requestBody.bookingdates.checkout
    })
})