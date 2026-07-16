package com.urlshortener.repository;

import com.urlshortener.models.UrlMapping;
import com.urlshortener.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;
@Repository
public interface UrlMappingRepository extends JpaRepository<UrlMapping, Long> {
    UrlMapping findByShortUrlAndDeletedFalse(String shortUrl);
    List<UrlMapping> findByUser(User user);
    Page<UrlMapping> findByUserAndDeletedFalse(User user, Pageable pageable);
    Optional<UrlMapping> findByIdAndUserAndDeletedFalse(Long id, User user);
    Optional<UrlMapping> findByIdAndUser(Long id, User user);
    List<UrlMapping> findByUserAndOriginalUrlContainingIgnoreCaseOrUserAndShortUrlContainingIgnoreCase(
            User user,
            String originalUrl,
            User userAgain,
            String shortUrl
    );
}
