import { test, expect } from '../../fixtures/hooks-fixture'
import apiPathData from '../../data/api-data/api-path-data.json'
import restfulAPIData from '../../data/api-data/restful-api-module-data.json'

test('[Restful-Booker > Booking] Verify that the user is able to fetch all the booking IDs using GET API and receive valid response', {
    tag: ['@API', '@UAT'],
    annotation: {
        type: "Test Case Link",
        description: "https://jiraticket/VTHREE-9876"
    }
}, async ({ request }) => {
    await test.step('Send GET request to fetch all booking IDs', async () => {
        const bookingIdsReq = await request.get(apiPathData.booking_path);
        const bookingIdsJsonResp = await bookingIdsReq.json();

        await test.step('Validate response status and status text', async () => {
            expect(bookingIdsReq.status()).toBe(200);
            expect(bookingIdsReq.statusText()).toBe('OK');
        });

        await test.step('Validate response headers', async () => {
            expect(bookingIdsReq.headers()['content-type'])
                .toContain(restfulAPIData.content_type);
        });

        await test.step('Validate booking IDs response is not empty', async () => {
            expect(bookingIdsJsonResp.length).toBeGreaterThan(0);
        });
    });
})

test('[Restful-Booker > Booking] Verify that the user is able to fetch for a booking ID using GET API and receive valid response', {
    tag: ['@API', '@UAT'],
    annotation: {
        type: "Test Case Link",
        description: "https://jiraticket/VTHREE-9877"
    }
}, async ({ request }) => {
    await test.step('Send GET request to fetch all booking IDs', async () => {
        const bookingIdsReq = await request.get(apiPathData.booking_path);
        const bookingIdsJsonResp = await bookingIdsReq.json();

        const bookingId = bookingIdsJsonResp[0].bookingid;

        await test.step('Send GET request to fetch booking details using booking ID', async () => {
            const bookingIdReq = await request.get(`${apiPathData.booking_path}/${bookingId}`);
            const bookingIdJsonResp = await bookingIdReq.json();
            //console.log(bookingIdJsonResp)

            await test.step('Validate response status', async () => {
                expect(bookingIdReq.status()).toBe(200);
            });

            await test.step('Validate booking details response structure', async () => {
                expect(bookingIdJsonResp).toBeTruthy();
                expect(bookingIdJsonResp.firstname).toEqual(restfulAPIData.first_name)
                expect(bookingIdJsonResp.lastname).toEqual(restfulAPIData.last_name)
                expect(bookingIdJsonResp.totalprice).toEqual(restfulAPIData.Total_price)
            });
        });
    });
})

test('[Restful-Booker > Booking] Create a new booking using POST and retreive data', {
    tag: ['@API', '@UAT'],
    annotation: {
        type: "Test Case Link",
        description: "https://jiraticket/VTHREE-9878"
    }
}, async ({ request }) => {
    await test.step('Send POST request to create a new booking', async () => {
        const createBookingReq = await request.post(apiPathData.booking_path, {
            data: restfulAPIData.create_booking_payload
        });
        const createdBookingResp = await createBookingReq.json();
        await test.step('Validate response status and status text', async () => {
            expect(createBookingReq.status()).toBe(200);
            expect(createBookingReq.statusText()).toBe('OK');
        });
        await test.step('Validate response headers', async () => {
            expect(createBookingReq.headers()['content-type'])
                .toContain(restfulAPIData.content_type);
        });
        await test.step('Validate response with given payload', async () => {
            expect(createdBookingResp.booking)
                .toMatchObject(restfulAPIData.create_booking_payload);
        });
    });
})

test('[Restful-Booker > Booking] Update a booking using PUT and validate data', {
    tag: ['@API', '@UAT'],
    annotation: {
        type: "Test Case Link",
        description: "https://jiraticket/VTHREE-9879"
    }
}, async ({ request, commonAPIUtils }) => {
    await test.step('Send PUT request to update booking', async () => {
        const bookingIdsReq = await request.get(apiPathData.booking_path);
        const bookingIdsJsonResp = await bookingIdsReq.json();

        const bookingId = bookingIdsJsonResp[0].bookingid;
        const tokenValue = await commonAPIUtils.createToken();
        const updateBookingReq = await request.put(`${apiPathData.booking_path}/${bookingId}`, {
            headers: {
                Cookie: `token=${tokenValue}`
            },
            data: restfulAPIData.update_booking_payload
        });
        const updatedBookingResp = await updateBookingReq.json();
        await test.step('Validate response status and status text', async () => {
            expect(updateBookingReq.status()).toBe(200);
            expect(updateBookingReq.statusText()).toBe('OK');
        });
        await test.step('Validate response headers', async () => {
            expect(updateBookingReq.headers()['content-type'])
                .toContain(restfulAPIData.content_type);
        });
        await test.step('Validate response with given payload', async () => {
            expect(updatedBookingResp)
                .toMatchObject(restfulAPIData.update_booking_payload);
        });
    });
})


test('[Restful-Booker > Booking] Update a partial booking using PATCH and validate data', {
    tag: ['@API', '@UAT'],
    annotation: {
        type: "Test Case Link",
        description: "https://jiraticket/VTHREE-9880"
    }
}, async ({ request, commonAPIUtils }) => {
    await test.step('Send PATCH request to partial update booking', async () => {
        const bookingIdsReq = await request.get(apiPathData.booking_path);
        const bookingIdsJsonResp = await bookingIdsReq.json();

        const bookingId = bookingIdsJsonResp[0].bookingid;
        const tokenValue = await commonAPIUtils.createToken();
        const partialUpdateBookingReq = await request.patch(`${apiPathData.booking_path}/${bookingId}`, {
            headers: {
                Cookie: `token=${tokenValue}`
            },
            data: restfulAPIData.partial_update_booking_payload
        });
        const partialUpdatedBookingResp = await partialUpdateBookingReq.json();
        await test.step('Validate response status and status text', async () => {
            expect(partialUpdateBookingReq.status()).toBe(200);
            expect(partialUpdateBookingReq.statusText()).toBe('OK');
        });
        await test.step('Validate response headers', async () => {
            expect(partialUpdateBookingReq.headers()['content-type'])
                .toContain(restfulAPIData.content_type);
        });
        await test.step('Validate response with given payload', async () => {
            expect(partialUpdatedBookingResp)
                .toMatchObject(restfulAPIData.partial_update_booking_payload);
        });
    });
})

test('[Restful-Booker > Booking] Update a delete booking using DELETE and validate data', {
    tag: ['@API', '@UAT'],
    annotation: {
        type: "Test Case Link",
        description: "https://jiraticket/VTHREE-9881"
    }
}, async ({ request, commonAPIUtils }) => {
    await test.step('Send DELETE request to delete booking', async () => {
        const bookingIdsReq = await request.get(apiPathData.booking_path);
        const bookingIdsJsonResp = await bookingIdsReq.json();

        const bookingId = bookingIdsJsonResp[0].bookingid;
        const tokenValue = await commonAPIUtils.createToken();
        const deleteBookingReq = await request.delete(`${apiPathData.booking_path}/${bookingId}`, {
            headers: {
                Cookie: `token=${tokenValue}`
            },
        });
        await test.step('Validate response status and status text', async () => {
            expect(deleteBookingReq.status()).toBe(201);
            expect(deleteBookingReq.statusText()).toBe('Created');
        });
        await test.step('Validate response headers', async () => {
            expect(deleteBookingReq.headers()['content-type'])
                .toContain(restfulAPIData.deleted_content_type);
        });
        await test.step('Validate response status and status text', async () => {
            const deleteBookingResp = await request.get(`${apiPathData.booking_path}/${bookingId}`)
            expect(deleteBookingResp.status()).toBe(404);
            expect(deleteBookingResp.statusText()).toBe("Not Found");
        });

    });
})