package com.application.security.email;

import com.application.security.dto.EmailDetails;
import org.springframework.mail.SimpleMailMessage;

public interface EmailSender {
    //void send(String to, String email, String emailBody);
    void send(String to, String email, String emailBody, String filePath) ;
    public void sendSimpleMessage(String to, String subject, String text) ;
}