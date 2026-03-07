import {test,expect} from "@playwright/test";
import { request } from "node:http";
import {  faker } from "@faker-js/faker";
import {DateTime} from "luxon";

test("test for create customer api",async({request})=>
    {
         const firstName =   faker.person.firstName();
         const lastNmae = faker.person.lastName();
         const totalPrice = faker.number.int({min:1000,max:5000})
         const depositePaid = faker.datatype.boolean();
         const checkIn = DateTime.now().toFormat("yyyy-MM-dd");
         const checkOut = DateTime.now().plus({day:5}).toFormat("yyyy-MM-dd")

    const requestBody = {
        firstname :firstName ,
        lastname: lastNmae,
        totalprice :totalPrice,
        depositpaid : depositePaid,
        bookingdates : {
            checkin : checkIn,
            checkout : checkOut
        },
        "additionalneeds" : "super bowls"
    }

     console.log(requestBody);

    const response = await request.post("/booking",{data:requestBody});

    const responseBody = await response.json();

   

    expect(response.ok).toBeTruthy();
    expect(response.status()).toBe(200);

    expect(responseBody).toHaveProperty("booking.firstname");
    expect(responseBody).toHaveProperty("booking.additionalneeds");

    const booking = responseBody.booking;
    expect(booking).toMatchObject({
        firstname :firstName,
        lastname : lastNmae,
        totalprice :totalPrice,
        depositpaid : depositePaid,
        additionalneeds : "super bowls"
    })

    expect(booking.bookingdates).toMatchObject({
            checkin :checkIn,
            checkout : checkOut
    })
})