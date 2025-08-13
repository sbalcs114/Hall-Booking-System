package com.examly.springapp;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.math.BigDecimal;
// import java.net.http.HttpHeaders;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.examly.springapp.model.Booking;
import com.examly.springapp.model.Hall;
import com.examly.springapp.model.Payment;
import com.examly.springapp.model.User;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class SpringappApplicationTests {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void contextLoads() {
        // Your test code here
    }

    // Test cases for Hall endpoints
    @Test
    public void testGetAvailableHalls() {
        ResponseEntity<String> response = restTemplate.getForEntity("/api/halls", String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testAddHall() {
        Hall hall = new Hall("Conference Room A", "Downtown", 50, "Projector, Wifi", BigDecimal.valueOf(300), true);
        ResponseEntity<Hall> response = restTemplate.postForEntity("/api/halls", hall, Hall.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    public void testUpdateHall() {
        Hall hall = new Hall("Banquet Hall B", "Suburb", 200, "AC, Wifi", BigDecimal.valueOf(1000), true);
        ResponseEntity<Hall> createdHall = restTemplate.postForEntity("/api/halls", hall, Hall.class);
        
        Long hallId = createdHall.getBody().getId();
        hall.setName("Updated Banquet Hall B");
        hall.setPrice(BigDecimal.valueOf(1200));
        
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<Hall> requestEntity = new HttpEntity<>(hall, headers);
        ResponseEntity<Hall> response = restTemplate.exchange("/api/halls/" + hallId, HttpMethod.PUT, requestEntity, Hall.class);
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Updated Banquet Hall B", response.getBody().getName());
    }

    // @Test
    // public void testDeleteHall() {
    //     Hall hall = new Hall("Banquet Hall C", "City Center", 150, "Projector, Wifi", BigDecimal.valueOf(700), true);
    //     ResponseEntity<Hall> createdHall = restTemplate.postForEntity("/api/halls", hall, Hall.class);
        
    //     Long hallId = createdHall.getBody().getId();
    //     restTemplate.delete("/api/halls/" + hallId);
        
    //     ResponseEntity<Hall> response = restTemplate.getForEntity("/api/halls/" + hallId, Hall.class);
    //     assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    // }

    // Test cases for Booking endpoints
    @Test
    public void testGetAllBookings() {
        ResponseEntity<String> response = restTemplate.getForEntity("/api/bookings", String.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testCreateBooking() {
        Booking booking = new Booking(1L, 1L, "Corporate Meeting", 30, new Date(), "10AM-1PM", "Confirmed");
        ResponseEntity<Booking> response = restTemplate.postForEntity("/api/bookings", booking, Booking.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    // @Test
    // public void testCancelBooking() {
    //     Booking booking = new Booking(1L, 1L, "Birthday Party", 50, new Date(), "3PM-6PM", "Confirmed");
    //     ResponseEntity<Booking> createdBooking = restTemplate.postForEntity("/api/bookings", booking, Booking.class);
        
    //     Long bookingId = createdBooking.getBody().getId();
    //     restTemplate.delete("/api/bookings/" + bookingId);
        
    //     ResponseEntity<Booking> response = restTemplate.getForEntity("/api/bookings/" + bookingId, Booking.class);
    //     assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    // }

    // Test cases for Payment endpoints
    @Test
    public void testProcessPayment() {
        Payment payment = new Payment(1L, BigDecimal.valueOf(500), "Credit Card", "Completed", new Date());
        ResponseEntity<Payment> response = restTemplate.postForEntity("/api/payments", payment, Payment.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    public void testGetPaymentDetails() {
        Payment payment = new Payment(1L, BigDecimal.valueOf(300), "Debit Card", "Completed", new Date());
        ResponseEntity<Payment> createdPayment = restTemplate.postForEntity("/api/payments", payment, Payment.class);
        
        Long paymentId = createdPayment.getBody().getId();
        ResponseEntity<Payment> response = restTemplate.getForEntity("/api/payments/" + paymentId, Payment.class);
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    // Test cases for User endpoints
    @Test
    public void testRegisterUser() {
        User user = new User("jane.doe@example.com", "Jane Doe", "1234567890");
        ResponseEntity<User> response = restTemplate.postForEntity("/api/users/register", user, User.class);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    public void testGetUserById() {
        User user = new User("john.smith@example.com", "John Smith", "0987654321");
        ResponseEntity<User> createdUser = restTemplate.postForEntity("/api/users/register", user, User.class);
        
        Long userId = createdUser.getBody().getId();
        ResponseEntity<User> response = restTemplate.getForEntity("/api/users/" + userId, User.class);
        
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    // Additional combined test cases
    // @Test
    // public void testGetAllEntities() {
    //     ResponseEntity<String> hallsResponse = restTemplate.getForEntity("/api/halls", String.class);
    //     ResponseEntity<String> bookingsResponse = restTemplate.getForEntity("/api/bookings", String.class);
    //     ResponseEntity<String> paymentsResponse = restTemplate.getForEntity("/api/payments", String.class);
    //     ResponseEntity<String> usersResponse = restTemplate.getForEntity("/api/users", String.class);
        
    //     assertEquals(HttpStatus.OK, hallsResponse.getStatusCode());
    //     assertEquals(HttpStatus.OK, bookingsResponse.getStatusCode());
    //     assertEquals(HttpStatus.OK, paymentsResponse.getStatusCode());
    //     assertEquals(HttpStatus.OK, usersResponse.getStatusCode());
    // }

    @Test
    public void testEndToEndBookingProcess() {
        Hall hall = new Hall("Wedding Hall", "Downtown", 100, "AC, Sound System", BigDecimal.valueOf(800), true);
        ResponseEntity<Hall> createdHall = restTemplate.postForEntity("/api/halls", hall, Hall.class);
        Long hallId = createdHall.getBody().getId();

        User user = new User("test.user@example.com", "Test User", "0123456789");
        ResponseEntity<User> createdUser = restTemplate.postForEntity("/api/users/register", user, User.class);
        Long userId = createdUser.getBody().getId();

        Booking booking = new Booking(userId, hallId, "Wedding", 100, new Date(), "12PM-4PM", "Confirmed");
        ResponseEntity<Booking> createdBooking = restTemplate.postForEntity("/api/bookings", booking, Booking.class);
        assertEquals(HttpStatus.OK, createdBooking.getStatusCode());

        Payment payment = new Payment(createdBooking.getBody().getId(), BigDecimal.valueOf(800), "Credit Card", "Completed", new Date());
        ResponseEntity<Payment> createdPayment = restTemplate.postForEntity("/api/payments", payment, Payment.class);
        assertEquals(HttpStatus.OK, createdPayment.getStatusCode());
    }
}


