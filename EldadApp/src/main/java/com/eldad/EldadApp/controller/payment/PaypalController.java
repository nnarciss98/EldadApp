package com.eldad.EldadApp.controller.payment;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
@Slf4j
public class PaypalController {

    private final PaypalService paypalService;

    @PostMapping("/create")
    public ResponseEntity<String> createPayment(
            @RequestParam("method") String method,
            @RequestParam("amount") String amount,
            @RequestParam("currency") String currency,
            @RequestParam("description") String description
    ) {
        try {
            String cancelUrl = "http://localhost:8080/api/payment/cancel";
            String successUrl = "http://localhost:8080/api/payment/success";
            Payment payment = paypalService.createPayment(
                    Double.valueOf(amount),
                    currency,
                    method,
                    "sale",
                    description,
                    cancelUrl,
                    successUrl
            );

            // Find the approval URL to redirect the user to PayPal for approval
            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    return ResponseEntity.ok(links.getHref());
                }
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Approval URL not found");
        } catch (PayPalRESTException e) {
            log.error("Error occurred during payment creation: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during payment creation");
        }
    }

    @GetMapping("/success")
    public ResponseEntity<String> paymentSuccess(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("PayerID") String payerId
    ) {
        try {
            Payment payment = paypalService.executePayment(paymentId, payerId);
            if (payment.getState().equals("approved")) {
                return ResponseEntity.ok("Payment successful!");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Payment not approved");
            }
        } catch (PayPalRESTException e) {
            log.error("Error occurred during payment execution: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred during payment execution");
        }
    }

    @GetMapping("/cancel")
    public ResponseEntity<String> paymentCancel() {
        return ResponseEntity.ok("Payment cancelled by user");
    }

    @GetMapping("/error")
    public ResponseEntity<String> paymentError() {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during the payment process");
    }
}

