package com.application.security.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.Set;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class AuthenticationResponse {

    // @JsonProperty("access_token")
    private String accessToken;
    // @JsonProperty("refresh_token")
    private String refreshToken;
    private String role;
    private boolean mfaEnabled;
    private String secretImageUri;
}
