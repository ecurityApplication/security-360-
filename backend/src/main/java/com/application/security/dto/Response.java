package com.application.security.dto;


import lombok.Builder;
import lombok.Data;


@Data
@Builder
public class Response {
   private String responseMessage;
   private String email;
   private String secretImageUri;
   private boolean mfaEnabled=true;
}

