package com.urlshortener.dtos;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CreateUrlRequest {

    private String originalUrl;

    private LocalDateTime expirationDate;
}