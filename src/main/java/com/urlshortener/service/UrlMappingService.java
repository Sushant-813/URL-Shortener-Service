package com.urlshortener.service;

import com.urlshortener.dtos.ClickEventDTO;
import com.urlshortener.dtos.UrlMappingDTO;
import com.urlshortener.exception.InvalidExpirationDateException;
import com.urlshortener.exception.UrlExpiredException;
import com.urlshortener.exception.UrlInactiveException;
import com.urlshortener.exception.UrlNotFoundException;
import com.urlshortener.models.ClickEvent;
import com.urlshortener.models.UrlMapping;
import com.urlshortener.models.User;
import com.urlshortener.repository.ClickEventRepository;
import com.urlshortener.repository.UrlMappingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
@AllArgsConstructor
public class UrlMappingService {

    private UrlMappingRepository urlMappingRepository;
    private ClickEventRepository clickEventRepository;
    private static final List<String> ALLOWED_SORT_FIELDS = List.of(
            "createdDate",
            "clickCount",
            "originalUrl",
            "shortUrl"
    );

    public UrlMappingDTO createShortUrl(
            String originalUrl,
            LocalDateTime expirationDate,
            User user) {

        if (expirationDate != null &&
                expirationDate.isBefore(LocalDateTime.now())) {
            throw new InvalidExpirationDateException(
                    "Expiration date must be in the future.");
        }

        String shortUrl = generateShortUrl();

        UrlMapping urlMapping = new UrlMapping();
        urlMapping.setOriginalUrl(originalUrl);
        urlMapping.setShortUrl(shortUrl);
        urlMapping.setUser(user);
        urlMapping.setExpirationDate(expirationDate);
        urlMapping.setCreatedDate(LocalDateTime.now());

        UrlMapping savedUrlMapping = urlMappingRepository.save(urlMapping);

        return convertToDto(savedUrlMapping);
    }

    private UrlMappingDTO convertToDto(UrlMapping urlMapping){
        UrlMappingDTO urlMappingDTO = new UrlMappingDTO();
        urlMappingDTO.setId(urlMapping.getId());
        urlMappingDTO.setOriginalUrl(urlMapping.getOriginalUrl());
        urlMappingDTO.setShortUrl(urlMapping.getShortUrl());
        urlMappingDTO.setClickCount(urlMapping.getClickCount());
        urlMappingDTO.setCreatedDate(urlMapping.getCreatedDate());
        urlMappingDTO.setUsername(urlMapping.getUser().getUsername());
        urlMappingDTO.setActive(urlMapping.isActive());
        urlMappingDTO.setExpirationDate(urlMapping.getExpirationDate());
        return urlMappingDTO;
    }

    private String generateShortUrl() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder shortUrl = new StringBuilder(8);
        for(int i=0; i<8;i++){
            shortUrl.append(characters.charAt(random.nextInt(characters.length())));
        }
        return shortUrl.toString();
    }

    public Page<UrlMappingDTO> getUrlsByUser(
            User user,
            int page,
            int size,
            String sortBy,
            String direction) {


        if (!ALLOWED_SORT_FIELDS.contains(sortBy)) {
            throw new IllegalArgumentException(
                    "Invalid sort field. Allowed values: " + ALLOWED_SORT_FIELDS
            );
        }

        if (!direction.equalsIgnoreCase("asc")
                && !direction.equalsIgnoreCase("desc")) {

            throw new IllegalArgumentException(
                    "Direction must be either asc or desc."
            );
        }

        Sort sort = direction.equalsIgnoreCase("desc")
                ? Sort.by(sortBy).descending()
                : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<UrlMapping> urlPage =
                urlMappingRepository.findByUserAndDeletedFalse(user, pageable);

        return urlPage.map(this::convertToDto);
    }

    public List<ClickEventDTO> getClickEventsByDate(String shortUrl, LocalDateTime start, LocalDateTime end) {
        UrlMapping urlMapping = urlMappingRepository.findByShortUrlAndDeletedFalse(shortUrl);
        if(urlMapping != null){
            return clickEventRepository.findByUrlMappingAndClickDateBetween(urlMapping, start, end).stream()
                    .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()))
                    .entrySet().stream()
                    .map(entry -> {
                        ClickEventDTO clickEventDTO = new ClickEventDTO();
                        clickEventDTO.setClickDate(entry.getKey());
                        clickEventDTO.setCount(entry.getValue());
                        return clickEventDTO;
                    })
                    .collect(Collectors.toList());
        }
        return null;
    }

    public Map<LocalDate, Long> getTotalClicksByUserAndDate(User user, LocalDate start, LocalDate end) {
        List<UrlMapping> urlMappings = urlMappingRepository.findByUser(user);
        List<ClickEvent> clickEvents = clickEventRepository.findByUrlMappingInAndClickDateBetween(urlMappings, start.atStartOfDay(), end.plusDays(1).atStartOfDay());
        return clickEvents.stream()
                .collect(Collectors.groupingBy(click -> click.getClickDate().toLocalDate(), Collectors.counting()));
    }

    public UrlMapping getOriginalUrl(String shortUrl) {

        UrlMapping urlMapping = urlMappingRepository.findByShortUrlAndDeletedFalse(shortUrl);

        if (urlMapping == null) {
            throw new UrlNotFoundException("Short URL not found.");
        }

        if (!urlMapping.isActive()) {
            throw new UrlInactiveException("Short URL is inactive.");
        }
        if (urlMapping.getExpirationDate() != null &&
                LocalDateTime.now().isAfter(urlMapping.getExpirationDate())) {

            throw new UrlExpiredException("Short URL has expired.");
        }

        urlMapping.setClickCount(urlMapping.getClickCount() + 1);
        urlMappingRepository.save(urlMapping);

        ClickEvent clickEvent = new ClickEvent();
        clickEvent.setClickDate(LocalDateTime.now());
        clickEvent.setUrlMapping(urlMapping);
        clickEventRepository.save(clickEvent);

        return urlMapping;
    }


    public List<UrlMappingDTO> searchUrls(User user, String query){
        List<UrlMapping> urlMappings =
                urlMappingRepository.findByUserAndOriginalUrlContainingIgnoreCaseOrUserAndShortUrlContainingIgnoreCase(
                        user,
                        query,
                        user,
                        query
                );
        return urlMappings.stream()
                .map(this::convertToDto)
                .toList();
    }
    public void deleteUrl(Long id, User user) {

        UrlMapping urlMapping = urlMappingRepository
                .findByIdAndUserAndDeletedFalse(id, user)
                .orElseThrow(() ->
                        new IllegalArgumentException("URL not found."));

        urlMapping.setDeleted(true);

        urlMappingRepository.save(urlMapping);
    }
    public UrlMappingDTO toggleUrlStatus(Long id, User user) {

        UrlMapping urlMapping = urlMappingRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new IllegalArgumentException("URL not found."));

        urlMapping.setActive(!urlMapping.isActive());

        UrlMapping updatedUrl = urlMappingRepository.save(urlMapping);

        return convertToDto(updatedUrl);
    }
}
