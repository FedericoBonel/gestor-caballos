package com.bonelfederico.gestorcaballos.utils;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class EncoderProviderImpl implements EncoderProvider {

    @Override
    public PasswordEncoder getEncoder() {
        return new BCryptPasswordEncoder();
    }
}
