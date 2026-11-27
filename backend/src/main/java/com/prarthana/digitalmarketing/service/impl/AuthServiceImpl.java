
package com.prarthana.digitalmarketing.service.impl;

import com.prarthana.digitalmarketing.dto.request.LoginRequest;
import com.prarthana.digitalmarketing.dto.response.LoginResponse;
import com.prarthana.digitalmarketing.entity.User;
import com.prarthana.digitalmarketing.repository.UserRepository;
import com.prarthana.digitalmarketing.security.JwtService;
import com.prarthana.digitalmarketing.service.AuthService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final long jwtExpiration;

    public AuthServiceImpl(
            AuthenticationManager authenticationManager,
            UserRepository userRepository,
            JwtService jwtService,
            @Value("${jwt.expiration}") long jwtExpiration) {

        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.jwtExpiration = jwtExpiration;
    }

    @Override
    public LoginResponse login(LoginRequest request) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new IllegalStateException(
                        "Authenticated user not found."
                ));

        String token = jwtService.generateToken(
                user.getUsername(),
                user.getRole()
        );

        return new LoginResponse(
                token,
                "Bearer",
                jwtExpiration,
                user.getUsername(),
                user.getRole()
        );
    }
}
