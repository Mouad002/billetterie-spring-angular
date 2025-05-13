package com.example.billetteriebackend.entities;

public enum Status {
    DRAFT,         // Event is being created but not yet published
    PUBLISHED,     // Event is publicly visible and tickets can be sold
    REFUSED,       // Event is refused to be published
    CANCELED,      // Event is canceled — no more ticket sales, refunds may apply
    SOLD_OUT,      // All tickets are sold
    POSTPONED,     // Event is temporarily delayed to a new date
    COMPLETED      // Event has taken place
}
