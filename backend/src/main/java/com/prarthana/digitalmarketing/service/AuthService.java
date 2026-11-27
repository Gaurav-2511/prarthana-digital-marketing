package com.prarthana.digitalmarketing.service;

import com.prarthana.digitalmarketing.dto.request.LoginRequest;
import com.prarthana.digitalmarketing.dto.response.LoginResponse;

public interface AuthService {

    LoginResponse login(LoginRequest request);
}
