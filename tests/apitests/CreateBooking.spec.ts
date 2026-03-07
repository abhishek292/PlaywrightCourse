import {test,expect} from "@playwright/test";
import { request } from "node:http";

test("test for create customer api",async({request})=>
{
    const requestBody = {
        firstname :"haxae",
        lastname: "bazar",
        totalprice :1000,
        depositpaid : true,
        bookingdates : {
            checkin : "2025-07-01",
            checkout : "2025-07-05"
        },
        "additionalneeds" : "super bowls"
    }

    const response = await request.post("/booking",{data:requestBody});

    const responseBody = await response.json();

    console.log(requestBody);

    expect(response.ok).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody).toHaveProperty("booking.firstname");
    expect(responseBody).toHaveProperty("booking.additionalneeds");

    const booking = responseBody.booking;
    expect(booking).toMatchObject({
        firstname :"haxae",
        lastname : "bazar",
        totalprice :1000,
       // depositepaid : true,
        additionalneeds : "super bowls"
    })

    expect(booking.bookingdates).toMatchObject({
            checkin : "2025-07-01",
            checkout : "2025-07-05"
    })
})