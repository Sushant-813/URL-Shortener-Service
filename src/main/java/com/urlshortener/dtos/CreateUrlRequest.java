package com.urlshortener.dtos;

import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateUrlRequest {

    @NotBlank(message = "Original URL cannot be blank")
    @URL(message = "Original URL must be a valid URL")
    private String originalUrl;

    @Future(message = "Expiration date must be in the future")
    private LocalDateTime expirationDate;
}
